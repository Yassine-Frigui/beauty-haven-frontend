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
    toast({ title: "Message Sent! 💌", description: "We'll get back to you within 24 hours." });
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="pt-20">
      <section className="section-padding bg-background">
        <SectionHeading title="Get in Touch" subtitle="We'd love to hear from you" />

        <div ref={ref} className={`max-w-5xl mx-auto grid md:grid-cols-2 gap-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Message</label>
              <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we help?" rows={5} />
            </div>
            <Button type="submit" className="w-full gold-gradient text-primary-foreground hover:opacity-90">Send Message</Button>
          </form>

          {/* Info */}
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div><h4 className="font-medium text-sm">Address</h4><p className="text-sm text-muted-foreground">{salon.address}</p></div>
              </div>
              <div className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div><h4 className="font-medium text-sm">Phone</h4><p className="text-sm text-muted-foreground">{salon.phone}</p></div>
              </div>
              <div className="flex gap-3 items-start">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div><h4 className="font-medium text-sm">Email</h4><p className="text-sm text-muted-foreground">{salon.email}</p></div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex gap-3 items-start mb-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <h4 className="font-medium text-sm">Hours</h4>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                {Object.entries(salon.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between capitalize">
                    <span>{day}</span><span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <a href={salon.social.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" /> Instagram
              </a>
              <a href={salon.social.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" /> Facebook
              </a>
            </div>

            {/* Map placeholder */}
            <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">📍 Map — 1234 Rose Avenue, Beverly Hills</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
