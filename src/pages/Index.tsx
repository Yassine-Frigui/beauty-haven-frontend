import { Link } from "react-router-dom";
import { Star, Sparkles, Heart, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-salon.jpg";
import data from "@/data/data.json";
import SectionHeading from "@/components/SectionHeading";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`${!done ? "border-r-2 border-primary" : ""}`}>
      {displayed}
    </span>
  );
};

const ServicePreview = () => {
  const { ref, isVisible } = useScrollAnimation();
  const featured = data.services.slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <SectionHeading title="Our Services" subtitle="Indulge in our curated selection of premium beauty treatments" />
      <div ref={ref} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((service, i) => (
          <div
            key={service.id}
            className={`glass-card overflow-hidden group hover:shadow-lg transition-all duration-300 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="h-48 overflow-hidden">
              <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">{service.category}</p>
              <h3 className="font-heading text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{service.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{service.duration}</span>
                <span className="font-semibold text-primary">${service.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/services">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View All Services
          </Button>
        </Link>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % data.testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = data.testimonials[current];

  return (
    <section className="section-padding bg-secondary/30">
      <SectionHeading title="What Our Clients Say" />
      <div ref={ref} className={`max-w-2xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-lg italic text-foreground mb-6 font-heading">"{t.text}"</p>
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">— {t.name}</p>
        <div className="flex justify-center gap-2 mt-6">
          {data.testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation();
  const items = [
    { icon: Sparkles, title: "Premium Products", desc: "We use only the finest professional-grade products for every treatment." },
    { icon: Heart, title: "Personalized Care", desc: "Every appointment is tailored to your unique style and preferences." },
    { icon: Shield, title: "Hygiene First", desc: "Strict sanitization protocols ensure a safe, clean environment." },
    { icon: Star, title: "Expert Artists", desc: "Our team of certified professionals brings years of expertise." },
  ];

  return (
    <section className="section-padding bg-background">
      <SectionHeading title="Why Choose Us" subtitle="Experience the Luxe difference with every visit" />
      <div ref={ref} className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Index = () => (
  <>
    {/* Hero */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Luxe Beauty Bar" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/60" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4 animate-fade-in">Welcome to</p>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-6">
          <TypewriterText text="Luxe Nail & Beauty Bar" />
        </h1>
        <p className="text-cream/80 text-lg md:text-xl mb-8 animate-fade-in" style={{ animationDelay: "2s" }}>
          Where Elegance Meets Self-Care
        </p>
        <div className="animate-fade-in" style={{ animationDelay: "2.5s" }}>
          <Link to="/booking">
            <Button size="lg" className="gold-gradient text-primary-foreground font-semibold tracking-wide hover:opacity-90 transition-opacity px-8 py-6 text-base">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </section>

    <ServicePreview />
    <Testimonials />
    <WhyChooseUs />
  </>
);

export default Index;
