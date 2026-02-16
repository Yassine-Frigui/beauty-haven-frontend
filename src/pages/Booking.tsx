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
    toast({ title: "Booking Confirmed! 🎉", description: `${selectedService?.name} on ${selectedDate} at ${selectedTime}. We look forward to seeing you!` });
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
    <div className="pt-20">
      <section className="section-padding bg-background">
        <SectionHeading title="Book an Appointment" subtitle="Your journey to beauty begins here" />

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i <= step ? "gold-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className="hidden sm:block ml-2 text-xs uppercase tracking-wider text-muted-foreground">{s}</span>
                {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-0.5 mx-2 ${i < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Step 0: Service */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Category</label>
                <div className="flex flex-wrap gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setSelectedService(null); }}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedCategory === cat ? "gold-gradient text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {selectedCategory && (
                <div className="space-y-3">
                  <label className="text-sm font-medium mb-2 block">Select Service</label>
                  {filteredServices.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedService?.id === s.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-heading font-semibold">{s.name}</h4>
                          <p className="text-sm text-muted-foreground">{s.duration}</p>
                        </div>
                        <span className="font-heading font-bold text-primary">${s.price}</span>
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
                <label className="text-sm font-medium mb-2 block">Select Date</label>
                <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
              </div>
              {selectedDate && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Time</label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {data.timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 rounded text-sm transition-all ${
                          selectedTime === slot ? "gold-gradient text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
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
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 123-4567" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Notes (optional)</label>
                <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special requests..." />
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-heading text-xl font-semibold mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{selectedService?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span>{selectedService?.category}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span>{selectedService?.duration}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{selectedDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span>{selectedTime}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>{name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{email}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span>{phone}</span></div>
                {notes && <div className="flex justify-between"><span className="text-muted-foreground">Notes</span><span>{notes}</span></div>}
                <div className="border-t border-border pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span><span className="text-primary">${selectedService?.price}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 0}>Back</Button>
            {step < 3 ? (
              <Button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="gold-gradient text-primary-foreground hover:opacity-90">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gold-gradient text-primary-foreground hover:opacity-90">
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
