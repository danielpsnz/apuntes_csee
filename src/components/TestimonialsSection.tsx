import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      text: "Gracias a estos resúmenes pude organizar mi estudio de forma más eficiente. El material está muy bien estructurado y actualizado.",
      author: "María González",
      role: "Opositora 2023"
    },
    {
      id: 2,
      text: "Los apuntes me ayudaron a entender conceptos complejos de manera clara. Sin duda una inversión que valió la pena.",
      author: "Carlos Ruiz",
      role: "Estadístico del Estado"
    },
    {
      id: 3,
      text: "Material de calidad excepcional. Me permitió optimizar mi tiempo de estudio y enfocarme en lo realmente importante.",
      author: "Ana Martín",
      role: "Opositora 2024"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    gsap.fromTo(title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(cards.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: cards,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
        >
          Lo que dicen nuestros estudiantes
        </h2>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <Quote className="text-primary mb-4 h-8 w-8" />
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;