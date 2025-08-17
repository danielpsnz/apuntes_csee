import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (!hero || !title || !subtitle || !cta) return;

    // Initial animation on load
    const tl = gsap.timeline();
    
    gsap.set([title, subtitle, cta], { opacity: 0, y: 30 });
    
    tl.to(title, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
      .to(cta, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");

  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('productos');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center gradient-hero px-4 py-20"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
        >
          Apuntes y resúmenes para la
          <span className="block bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            oposición al Cuerpo Superior
          </span>
          <span className="block text-foreground">
            de Estadísticos del Estado
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Material organizado, actualizado y listo para que optimices tu estudio
        </p>
        
        <div ref={ctaRef} className="pt-4">
          <Button 
            onClick={scrollToProducts}
            size="lg"
            className="text-lg px-8 py-6 gradient-primary hover:opacity-90 transition-all duration-300 shadow-elegant hover:shadow-lg transform hover:scale-105"
          >
            Ver apuntes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;