import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!email) {
      toast({
        title: "Email requerido",
        description: "Por favor, introduce tu email para continuar.",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Añade productos a tu carrito antes de proceder al pago.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          email,
          items: items.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity
          })),
          totalAmount: Math.round(totalPrice * 100) // Convert to cents
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Clear cart and redirect to Stripe
        clearCart();
        window.open(data.url, '_blank');
        navigate('/');
        toast({
          title: "Redirigiendo al pago",
          description: "Se ha abierto una nueva pestaña para completar el pago.",
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error en el pago",
        description: "Ha ocurrido un error al procesar el pago. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">Tu carrito está vacío</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la tienda
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => navigate('/')} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la tienda
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Finalizar compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">{item.price * item.quantity}€</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">{totalPrice}€</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Información de pago
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Recibirás la confirmación de compra y los materiales en este email.
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handlePayment}
                    disabled={isLoading || !email}
                    className="w-full gradient-primary"
                    size="lg"
                  >
                    {isLoading ? "Procesando..." : `Pagar ${totalPrice}€ con Stripe`}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Pago seguro procesado por Stripe. Se abrirá una nueva pestaña.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;