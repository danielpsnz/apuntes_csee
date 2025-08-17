import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { config } from "https://deno.land/std@0.190.0/dotenv/mod.ts";

// Load environment variables from a .env file
const env = await config();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = env["SECRET_KEY"];
    if (!stripeKey) throw new Error("SECRET_KEY is not set");
    logStep("Stripe key verified");

    const supabaseUrl = env["SUPABASE_URL"];
    const supabaseServiceKey = env["SUPABASE_SERVICE_ROLE_KEY"];
    if (!supabaseUrl || !supabaseServiceKey) throw new Error("Supabase env variables are not set");

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });

    const { email, items, totalAmount } = await req.json();
    logStep("Request data received", { email, itemsCount: items?.length, totalAmount });

    if (!email || !items || !totalAmount) {
      throw new Error("Missing required fields: email, items, or totalAmount");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    logStep("Creating Stripe checkout session", { lineItemsCount: lineItems.length });

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
    });

    logStep("Stripe session created", { sessionId: session.id });

    const { error: orderError } = await supabaseClient.from("orders").insert({
      email,
      items,
      total_amount: totalAmount,
      stripe_session_id: session.id,
      status: "pending",
    });

    if (orderError) {
      logStep("Database error", { error: orderError.message });
      throw new Error(`Database error: ${orderError.message}`);
    }

    logStep("Order saved to database");

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
