import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import data from "@/data/data.json";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  if (!user) {
    navigate("/login");
    return null;
  }

  const bookings = data.bookingHistory.filter(b => b.userId === user.id);

  const handleSave = () => {
    updateProfile({ name, phone });
    setEditing(false);
    toast({ title: "Profile updated ✦" });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="pt-24">
      <section className="section-padding bg-background">
        <SectionHeading title="My Profile" />

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Info */}
          <div className="deco-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-xl font-medium tracking-wide">Personal Information</h3>
              <Button variant="outline" size="sm" onClick={() => editing ? handleSave() : setEditing(true)} className="rounded-none text-[10px] tracking-[0.2em] uppercase">
                {editing ? "Save" : "Edit"}
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Name", value: user.name, editValue: name, set: setName, editable: true },
                { label: "Email", value: user.email, editable: false },
                { label: "Phone", value: user.phone || "Not set", editValue: phone, set: setPhone, editable: true },
              ].map(field => (
                <div key={field.label}>
                  <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold text-muted-foreground">{field.label}</label>
                  {editing && field.editable ? (
                    <Input value={field.editValue} onChange={e => field.set!(e.target.value)} className="rounded-none mt-1" />
                  ) : (
                    <p className="font-medium mt-1">{field.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Booking History */}
          <div className="deco-card">
            <h3 className="font-heading text-xl font-medium tracking-wide mb-6">Booking History</h3>
            {bookings.length === 0 ? (
              <p className="text-muted-foreground text-sm">No bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map(b => (
                  <div key={b.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{b.service}</p>
                      <p className="text-[10px] text-muted-foreground tracking-wider">{b.date} at {b.time}</p>
                    </div>
                    <span className={`text-[10px] px-3 py-1 tracking-[0.2em] uppercase font-body font-semibold ${
                      b.status === "Completed" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button variant="outline" onClick={handleLogout} className="w-full rounded-none border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground tracking-[0.15em] uppercase text-xs">
            Sign Out
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
