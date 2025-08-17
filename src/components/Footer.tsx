import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Apuntes Estadísticos del Estado
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Material de calidad para preparar tu oposición al Cuerpo Superior de Estadísticos del Estado.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-4">Enlaces legales</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Aviso legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-4">Contacto</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>danielperezsanz21@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        <div className="text-center text-muted-foreground">
          <p>&copy; 2025 Apuntes Estadísticos del Estado. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;