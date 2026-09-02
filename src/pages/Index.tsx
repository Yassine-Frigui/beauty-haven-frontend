import { Link } from "react-router-dom";
import { Star, Sparkles, Heart, Shield, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-spa.jpg";
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
    }, 80);
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
  const featured = data.services.slice(0, 3);

  return (
    <section className="section-padding bg-background">
      <SectionHeading title="Signature Rituals" subtitle="Herbal steam and womb care ceremonies crafted for every season of womanhood" />
      <div ref={ref} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {featured.map((service, i) => (
          <div
            key={service.id}
            className={`group ${isVisible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="deco-corner overflow-hidden mb-5">
              <div className="h-64 overflow-hidden">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-body font-semibold mb-2">{service.category}</p>
            <h3 className="font-heading text-2xl font-light mb-2">{service.name}</h3>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{service.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground tracking-wide">{service.duration}</span>
              <span className="font-heading text-lg text-primary">{service.price} TND</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-14">
        <Link to="/services">
          <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.2em] uppercase text-xs px-8 py-5 rounded-none">
            Explore All Rituals <ArrowRight className="w-3.5 h-3.5 ml-2" />
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
    <section className="section-padding bg-secondary/30 deco-sunburst">
      <SectionHeading title="Words From Our Women" />
      <div ref={ref} className={`max-w-2xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <div className="flex justify-center gap-1 mb-6">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-xl md:text-2xl italic text-foreground mb-8 font-heading font-light leading-relaxed">"{t.text}"</p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-px bg-primary/40" />
          <p className="text-[10px] font-body font-semibold tracking-[0.4em] uppercase text-primary">{t.name}</p>
          <div className="w-8 h-px bg-primary/40" />
        </div>
        <div className="flex justify-center gap-3 mt-8">
          {data.testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rotate-45 transition-colors duration-300 ${i === current ? "bg-primary" : "border border-border"}`}
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
    { icon: Sparkles, title: "Organic Herbs", desc: "Every blend is grown and hand-picked in Tunisia, free of synthetics." },
    { icon: Heart, title: "Personalised Care", desc: "Each ritual is adapted to your cycle, your body and your season of life." },
    { icon: Shield, title: "Safe & Private", desc: "Single-use liners, sterilised seats and fully private treatment suites." },
    { icon: Star, title: "Trained Practitioners", desc: "Certified womb care specialists and clinical herbalists." },
  ];

  return (
    <section className="section-padding bg-background">
      <SectionHeading title="The ZenShe Difference" subtitle="Why women across Tunis trust us with their wellness" />
      <div ref={ref} className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center border border-primary/30 rotate-45">
              <item.icon className="w-6 h-6 text-primary -rotate-45" />
            </div>
            <h3 className="font-heading text-lg font-medium mb-2 tracking-wide">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
        <img src={heroImage} alt="ZenShe Spa steam ritual room in Tunis" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-espresso/65" />
        <div className="absolute inset-0 deco-sunburst opacity-40" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
          <div className="w-12 h-px bg-cream/30" />
          <span className="text-cream/60 text-[10px] tracking-[0.6em] uppercase font-body">Tunis · Since 2019</span>
          <div className="w-12 h-px bg-cream/30" />
        </div>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream tracking-[0.15em] mb-6">
          <TypewriterText text="ZENSHE" />
        </h1>
        <p className="font-heading text-xl sm:text-2xl md:text-3xl text-cream/80 font-light tracking-wider mb-4 animate-fade-in" style={{ animationDelay: "1.5s" }}>
          Spa · Tunisia
        </p>
        <p className="text-cream/50 text-xs tracking-[0.4em] uppercase mb-10 animate-fade-in" style={{ animationDelay: "2s" }}>
          Feminine Wellness, Rooted in Nature
        </p>
        <div className="animate-fade-in" style={{ animationDelay: "2.5s" }}>
          <Link to="/booking">
            <Button className="deco-gradient text-primary-foreground font-body tracking-[0.3em] uppercase text-xs hover:opacity-90 transition-opacity px-10 py-6 rounded-none">
              Book Your Ritual
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom deco border */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-4">
        <div className="flex-1 h-px bg-cream/10" />
        <div className="mx-6 flex gap-2">
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/50" />
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/50" />
        </div>
        <div className="flex-1 h-px bg-cream/10" />
      </div>
    </section>

    <ServicePreview />
    <Testimonials />
    <WhyChooseUs />
  </>
);

export default Index;
