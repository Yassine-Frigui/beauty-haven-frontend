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
    toast({ title: "Profile updated! ✨" });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="pt-20">
      <section className="section-padding bg-background">
        <SectionHeading title="My Profile" />

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Info */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-lg font-semibold">Personal Information</h3>
              <Button variant="outline" size="sm" onClick={() => editing ? handleSave() : setEditing(true)}>
                {editing ? "Save" : "Edit"}
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Name</label>
                {editing ? <Input value={name} onChange={e => setName(e.target.value)} /> : <p className="font-medium">{user.name}</p>}
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Email</label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Phone</label>
                {editing ? <Input value={phone} onChange={e => setPhone(e.target.value)} /> : <p className="font-medium">{user.phone || "Not set"}</p>}
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className="glass-card p-6">
            <h3 className="font-heading text-lg font-semibold mb-4">Booking History</h3>
            {bookings.length === 0 ? (
              <p className="text-muted-foreground text-sm">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {bookings.map(b => (
                  <div key={b.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{b.service}</p>
                      <p className="text-xs text-muted-foreground">{b.date} at {b.time}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      b.status === "Completed" ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button variant="outline" onClick={handleLogout} className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
            Sign Out
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
