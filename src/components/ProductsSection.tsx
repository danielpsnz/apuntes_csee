import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import CartDrawer from "./CartDrawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  isPopular?: boolean;
  sampleUrl?: string; // 👈 added for sample notes
}

const ProductsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { addItem } = useCart();

  const [products] = useState<Product[]>([
    {
      id: "1",
      title:
        "Bloque 1: Producción Estadística Oficial: Principios Básicos del Ciclo de Producción de Operaciones Estadísticas",
      description:
        "Introducción a la estadística oficial, ciclo de producción de operaciones estadísticas y principios básicos.",
      price: 20,
      sampleUrl: "/samples/produccion.pdf", 
    },
    {
      id: "2",
      title: "Bloque 2: Inferencia y Modelización Estadística",
      description:
        "Fundamentos de inferencia estadística, estimación, contrastes de hipótesis y modelos estadísticos.",
      price: 20,
      sampleUrl: "/samples/inferencia.pdf",
    },
    {
      id: "3",
      title: "Bloque 3: Derecho",
      description:
        "Aspectos legales de la estadística, normativa y derechos relacionados con la producción estadística.",
      price: 20,
      sampleUrl: "/samples/derecho.pdf",
    },
    {
      id: "4",
      title: "Bloque 4: Cuentas Nacionales",
      description:
        "Cuentas nacionales, contabilidad nacional y análisis de la economía a través de las cuentas.",
      price: 20,
      sampleUrl: "/samples/cuentas.pdf",
    },
    {
      id: "5",
      title: "Bloque 5: Almacenamiento y modelos de datos",
      description:
        "Almacenamiento de datos, bases de datos y modelos de datos utilizados en la estadística moderna.",
      price: 20,
      sampleUrl: "/samples/informatica.pdf",
    },
    {
      id: "6",
      title: "Bloque 6: Demografía",
      description:
        "Estudio de la población, demografía y análisis demográfico aplicado a la estadística oficial.",
      price: 20,
      sampleUrl: "/samples/demografia.pdf",
    },
    {
      id: "pack",
      title: "Pack Bloque Común (6 Bloques)",
      description:
        "Todos los 6 bloques con material completo, resúmenes, esquemas y casos prácticos. Material actualizado 2025.",
      price: 100,
      originalPrice: 120,
      isPopular: true,
      sampleUrl: "/samples/pack.pdf",
    },
  ]);

  const [openSample, setOpenSample] = useState<null | Product>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    // Animation on scroll
    gsap.fromTo(
      title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      cards.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cards,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
    });
    toast({
      title: "Producto añadido",
      description: `${product.title} se ha añadido a tu carrito.`,
    });
  };

  const handleSeeSample = (product: Product) => {
    setOpenSample(product);
  };

  return (
    <section
      id="productos"
      ref={sectionRef}
      className="py-20 px-4 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
          >
            Material de estudio disponible
          </h2>
          <CartDrawer />
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              originalPrice={product.originalPrice}
              isPopular={product.isPopular}
              onAddToCart={() => handleAddToCart(product)}
              onSeeSample={() => handleSeeSample(product)} // 👈 sample handler
            />
          ))}
        </div>
      </div>

      {/* Dialog for sample preview */}
      <Dialog open={!!openSample} onOpenChange={() => setOpenSample(null)}>
        <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
          <DialogHeader className="pb-2">
            <DialogTitle>Muestra: {openSample?.title}</DialogTitle>
          </DialogHeader>
          {openSample?.sampleUrl && (
            <iframe
              src={`${openSample.sampleUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="flex-1 w-full border-0 rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductsSection;
