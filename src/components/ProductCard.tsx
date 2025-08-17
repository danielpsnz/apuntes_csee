import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  isPopular?: boolean;
  onAddToCart: () => void;
  onSeeSample: () => void;
}

const ProductCard = ({ 
  title, 
  description, 
  price, 
  originalPrice, 
  isPopular = false,
  onAddToCart, 
  onSeeSample
}: ProductCardProps) => {
  return (
    <Card className={`relative h-full shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 ${
      isPopular ? 'border-primary bg-accent/30' : ''
    }`}>
      {isPopular && (
        <Badge className="absolute -top-2 left-4 gradient-primary text-primary-foreground">
          ¡Más popular!
        </Badge>
      )}
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col justify-between flex-1">
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>
        
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
              {price}€
            </span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {originalPrice}€
              </span>
            )}
          </div>
          
          <Button 
            onClick={onAddToCart}
            className="w-full gradient-primary hover:opacity-90 transition-all duration-300"
            size="lg"
          >
            Añadir al carrito
          </Button>
          <Button 
            onClick={onSeeSample}
            className="w-full gradient-secondary hover:opacity-90 transition-all duration-300"
            size="lg"
          >
            Ver muestra
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;