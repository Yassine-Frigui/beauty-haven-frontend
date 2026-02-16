import { useState } from "react";
import data from "@/data/data.json";
import SectionHeading from "@/components/SectionHeading";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const categories = ["All", ...Array.from(new Set(data.services.map(s => s.category)))];

const Services = () => {
  const [active, setActive] = useState("All");
  const { ref, isVisible } = useScrollAnimation();
  const filtered = active === "All" ? data.services : data.services.filter(s => s.category === active);

  return (
    <div className="pt-24">
      <section className="section-padding bg-background">
        <SectionHeading title="The Menu" subtitle="Our complete collection of artisanal beauty treatments" />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 text-[10px] font-body font-semibold tracking-[0.3em] uppercase transition-all duration-300 rounded-none ${
                active === cat
                  ? "deco-gradient text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={ref} className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service, i) => (
            <div
              key={service.id}
              className={`group ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="deco-corner overflow-hidden mb-4">
                <div className="h-52 overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-body font-semibold mb-1">{service.category}</p>
              <h3 className="font-heading text-xl font-medium mb-2">{service.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
              <div className="flex justify-between items-center border-t border-border pt-3">
                <span className="text-xs text-muted-foreground tracking-wider">{service.duration}</span>
                <span className="font-heading text-xl text-primary font-medium">${service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
