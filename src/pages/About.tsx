import data from "@/data/data.json";
import SectionHeading from "@/components/SectionHeading";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();

  return (
    <div className="pt-20">
      {/* Story */}
      <section className="section-padding bg-background">
        <div ref={storyRef} className={`max-w-4xl mx-auto ${storyVisible ? "animate-fade-up" : "opacity-0"}`}>
          <SectionHeading title="Our Story" subtitle="A passion for beauty, born from dedication" />
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2018, Luxe Nail & Beauty Bar was born from a simple belief: every person deserves to feel pampered, beautiful, and confident. What started as a small studio has blossomed into Beverly Hills' most beloved beauty destination.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our founder, Sophia Laurent, envisioned a space where artistry meets relaxation — a sanctuary where clients can escape the everyday and emerge feeling their absolute best.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, our team of expert artists continues that vision, combining cutting-edge techniques with the warmth and care that makes every visit feel like coming home.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500"
                alt="Salon interior"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 gold-gradient rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary/30">
        <SectionHeading title="Our Philosophy" />
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Artistry", desc: "Every service is performed with meticulous attention to detail and creative flair." },
            { title: "Wellness", desc: "We believe beauty treatments should nourish both body and soul." },
            { title: "Sustainability", desc: "We're committed to eco-friendly products and responsible practices." },
          ].map(v => (
            <div key={v.title} className="glass-card p-6">
              <h3 className="font-heading text-xl font-semibold mb-3 text-primary">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <SectionHeading title="Meet the Team" subtitle="The talented artists behind your transformation" />
        <div ref={teamRef} className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.team.map((member, i) => (
            <div
              key={member.id}
              className={`text-center group ${teamVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors duration-300">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-lg font-semibold">{member.name}</h3>
              <p className="text-xs uppercase tracking-wider text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
