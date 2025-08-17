import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">¡Pago completado!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Tu compra se ha procesado correctamente. Recibirás un email con los materiales de estudio en los próximos minutos.
            </p>
            <p className="text-sm text-muted-foreground">
              Si no recibes el email, revisa tu carpeta de spam o contacta con nosotros.
            </p>
            <div className="pt-4">
              <Button onClick={() => navigate('/')} className="gradient-primary">
                Volver a la tienda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;