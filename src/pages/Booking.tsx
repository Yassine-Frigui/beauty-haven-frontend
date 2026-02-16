import { useState } from "react";
import { Check } from "lucide-react";
import data from "@/data/data.json";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const categories = Array.from(new Set(data.services.map(s => s.category)));
const steps = ["Service", "Date & Time", "Your Details", "Confirm"];

const Booking = () => {
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState<typeof data.services[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const filteredServices = data.services.filter(s => s.category === selectedCategory);

  const canNext = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedDate && !!selectedTime;
    if (step === 2) return !!name.trim() && !!email.trim() && !!phone.trim();
    return true;
  };

  const handleSubmit = () => {
    toast({ title: "Booking Confirmed! ✦", description: `${selectedService?.name} on ${selectedDate} at ${selectedTime}. We look forward to welcoming you.` });
    setStep(0);
    setSelectedCategory("");
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
  };

  return (
    <div className="pt-24">
      <section className="section-padding bg-background">
        <SectionHeading title="Reserve Your Visit" subtitle="Your journey to refined beauty begins here" />

        {/* Progress — Art Deco style */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-9 h-9 rotate-45 flex items-center justify-center text-xs font-body font-semibold transition-colors ${
                  i <= step ? "deco-gradient text-primary-foreground" : "border border-border text-muted-foreground"
                }`}>
                  <span className="-rotate-45">{i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}</span>
                </div>
                <span className="hidden sm:block ml-3 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body">{s}</span>
                {i < steps.length - 1 && <div className={`w-8 sm:w-14 h-px mx-3 ${i < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Step 0: Service */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3 block text-muted-foreground">Select Category</label>
                <div className="flex flex-wrap gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setSelectedService(null); }}
                      className={`px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-body transition-all rounded-none ${
                        selectedCategory === cat ? "deco-gradient text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {selectedCategory && (
                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-2 block text-muted-foreground">Select Service</label>
                  {filteredServices.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`w-full text-left p-4 border transition-all rounded-none ${
                        selectedService?.id === s.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-heading font-medium text-lg">{s.name}</h4>
                          <p className="text-xs text-muted-foreground tracking-wide">{s.duration}</p>
                        </div>
                        <span className="font-heading text-xl text-primary">${s.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3 block text-muted-foreground">Select Date</label>
                <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="rounded-none" />
              </div>
              {selectedDate && (
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3 block text-muted-foreground">Select Time</label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {data.timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 px-3 text-xs tracking-wide transition-all rounded-none ${
                          selectedTime === slot ? "deco-gradient text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-5">
              {[
                { label: "Full Name", value: name, set: setName, placeholder: "Jane Doe" },
                { label: "Email", value: email, set: setEmail, placeholder: "jane@example.com", type: "email" },
                { label: "Phone", value: phone, set: setPhone, placeholder: "(555) 123-4567" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-2 block text-muted-foreground">{f.label}</label>
                  <Input type={f.type || "text"} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} className="rounded-none" />
                </div>
              ))}
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-2 block text-muted-foreground">Notes (optional)</label>
                <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special requests..." className="rounded-none" />
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="deco-card space-y-4">
              <h3 className="font-heading text-2xl font-light mb-6 tracking-wide">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                {[
                  ["Service", selectedService?.name],
                  ["Category", selectedService?.category],
                  ["Duration", selectedService?.duration],
                  ["Date", selectedDate],
                  ["Time", selectedTime],
                  ["Name", name],
                  ["Email", email],
                  ["Phone", phone],
                  ...(notes ? [["Notes", notes]] : []),
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground tracking-wide">{label}</span>
                    <span className="font-medium">{val}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-4 flex justify-between text-lg font-heading">
                  <span>Total</span>
                  <span className="text-primary">${selectedService?.price}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 0} className="rounded-none tracking-[0.15em] uppercase text-xs">
              Back
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="deco-gradient text-primary-foreground hover:opacity-90 rounded-none tracking-[0.15em] uppercase text-xs">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="deco-gradient text-primary-foreground hover:opacity-90 rounded-none tracking-[0.15em] uppercase text-xs">
                Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
