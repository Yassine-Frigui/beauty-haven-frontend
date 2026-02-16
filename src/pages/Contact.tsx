import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import data from "@/data/data.json";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();
  const { salon } = data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message Sent ✦", description: "We'll get back to you within 24 hours." });
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="pt-24">
      <section className="section-padding bg-background">
        <SectionHeading title="Get in Touch" subtitle="We'd love to hear from you" />

        <div ref={ref} className={`max-w-5xl mx-auto grid md:grid-cols-2 gap-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "Name", value: name, set: setName, placeholder: "Your name" },
              { label: "Email", value: email, set: setEmail, placeholder: "your@email.com", type: "email" },
            ].map(f => (
              <div key={f.label}>
                <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-2 block text-muted-foreground">{f.label}</label>
                <Input type={f.type || "text"} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} className="rounded-none" />
              </div>
            ))}
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-2 block text-muted-foreground">Message</label>
              <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we help?" rows={5} className="rounded-none" />
            </div>
            <Button type="submit" className="w-full deco-gradient text-primary-foreground hover:opacity-90 rounded-none tracking-[0.2em] uppercase text-xs py-5">
              Send Message
            </Button>
          </form>

          {/* Info */}
          <div className="space-y-6">
            <div className="deco-card space-y-5">
              {[
                { icon: MapPin, label: "Address", value: salon.address },
                { icon: Phone, label: "Phone", value: salon.phone },
                { icon: Mail, label: "Email", value: salon.email },
              ].map(item => (
                <div key={item.label} className="flex gap-4 items-start">
                  <item.icon className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold text-muted-foreground mb-0.5">{item.label}</h4>
                    <p className="text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="deco-card">
              <div className="flex gap-3 items-center mb-4">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <h4 className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold text-muted-foreground">Hours</h4>
              </div>
              <div className="space-y-1.5 text-sm">
                {Object.entries(salon.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between capitalize">
                    <span className="text-muted-foreground">{day}</span><span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-5">
              <a href={salon.social.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors uppercase">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a href={salon.social.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors uppercase">
                <Facebook className="w-4 h-4" /> Facebook
              </a>
            </div>

            <div className="bg-muted h-48 flex items-center justify-center border border-border">
              <p className="text-muted-foreground text-xs tracking-wider">📍 1234 Rose Avenue, Beverly Hills</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
