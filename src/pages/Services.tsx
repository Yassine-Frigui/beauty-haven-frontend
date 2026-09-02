import { useState } from "react";
import { Link } from "react-router-dom";
import data from "@/data/data.json";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const categories = ["All", ...Array.from(new Set(data.services.map(s => s.category)))];

const Services = () => {
  const [active, setActive] = useState("All");
  const { ref, isVisible } = useScrollAnimation();
  const filtered = active === "All" ? data.services : data.services.filter(s => s.category === active);

  return (
    <div className="pt-24">
      <section className="section-padding bg-background">
        <SectionHeading title="Our Rituals" subtitle="Herbal steaming, hammam and womb wellness care in the heart of Tunis" />

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
                <span className="font-heading text-xl text-primary font-medium">{service.price} TND</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Memberships */}
      <section className="section-padding bg-secondary/30 deco-sunburst">
        <SectionHeading title="Memberships" subtitle="Make your ritual a rhythm — monthly care with member-only privileges" />
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {data.memberships.map((plan, i) => (
            <div
              key={plan.id}
              className={`deco-card flex flex-col h-full ${plan.featured ? "border-primary/60 md:-translate-y-3 shadow-lg" : ""}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {plan.featured && (
                <p className="text-[9px] tracking-[0.4em] uppercase text-primary font-body font-semibold mb-3 text-center">Most Loved</p>
              )}
              <h3 className="font-heading text-3xl font-light text-center tracking-wide">{plan.name}</h3>
              <div className="deco-line my-4" />
              <p className="text-center font-heading text-4xl text-primary font-medium">
                {plan.price} <span className="text-base tracking-wider">TND</span>
              </p>
              <p className="text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-1 mb-5">{plan.period}</p>
              <p className="text-sm text-muted-foreground text-center leading-relaxed mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex gap-3 items-start text-sm">
                    <span className="w-1.5 h-1.5 rotate-45 bg-primary mt-1.5 shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="block">
                <Button
                  className={`w-full rounded-none tracking-[0.25em] uppercase text-[10px] py-5 ${
                    plan.featured
                      ? "deco-gradient text-primary-foreground hover:opacity-90"
                      : "bg-transparent border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Choose {plan.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground tracking-wider mt-10">
          All memberships are month-to-month and can be paused or cancelled anytime.
        </p>
      </section>
    </div>
  );
};

export default Services;

