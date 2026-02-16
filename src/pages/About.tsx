import data from "@/data/data.json";
import SectionHeading from "@/components/SectionHeading";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();

  return (
    <div className="pt-24">
      {/* Story — asymmetric layout */}
      <section className="section-padding bg-background">
        <div ref={storyRef} className={`max-w-6xl mx-auto ${storyVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
              <div className="deco-corner">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500"
                  alt="Salon interior"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-body font-semibold mb-4">Our Story</p>
              <h2 className="font-heading text-4xl md:text-5xl font-light mb-8 leading-tight">A Legacy of<br />Refined Beauty</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2018, Luxe Nail & Beauty Bar was born from a simple belief: every person deserves to feel pampered, beautiful, and confident. What started as a small studio has blossomed into Beverly Hills' most beloved beauty destination.
                </p>
                <p>
                  Our founder, Sophia Laurent, envisioned a space where artistry meets relaxation — a sanctuary where clients can escape the everyday and emerge feeling their absolute best.
                </p>
                <p>
                  Today, our team of expert artists continues that vision, combining cutting-edge techniques with the warmth and care that makes every visit feel like coming home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-secondary/30 deco-sunburst">
        <SectionHeading title="Our Philosophy" />
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: "Artistry", desc: "Every service is performed with meticulous attention to detail and creative flair." },
            { title: "Wellness", desc: "We believe beauty treatments should nourish both body and soul." },
            { title: "Sustainability", desc: "We're committed to eco-friendly products and responsible practices." },
          ].map(v => (
            <div key={v.title} className="deco-card text-center">
              <h3 className="font-heading text-xl font-medium mb-3 text-primary tracking-wide">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <SectionHeading title="Our Artisans" subtitle="The talented hands behind your transformation" />
        <div ref={teamRef} className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {data.team.map((member, i) => (
            <div
              key={member.id}
              className={`text-center group ${teamVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="w-36 h-36 mx-auto mb-5 overflow-hidden border border-primary/20 rotate-0 group-hover:border-primary/50 transition-colors duration-500" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-lg font-medium">{member.name}</h3>
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-body mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
