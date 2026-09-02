import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;
    signup(name, email, password, phone);
    toast({ title: "Account created ✦", description: "Welcome to ZenShe Spa." });
    navigate("/profile");
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md deco-card">
        <div className="text-center mb-8">
          <p className="font-display text-3xl tracking-[0.2em] mb-1">ZENSHE</p>
          <p className="text-[9px] tracking-[0.5em] uppercase text-primary font-body">Spa · Tunisia</p>
        </div>
        <h1 className="font-heading text-3xl font-light text-center mb-2 tracking-wide">Create Account</h1>
        <p className="text-center text-muted-foreground text-xs tracking-wider mb-8">Join the ZenShe circle</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Full Name", value: name, set: setName, placeholder: "Jane Doe" },
            { label: "Email", value: email, set: setEmail, placeholder: "jane@example.com", type: "email" },
            { label: "Phone", value: phone, set: setPhone, placeholder: "(555) 123-4567" },
            { label: "Password", value: password, set: setPassword, placeholder: "••••••••", type: "password" },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-2 block text-muted-foreground">{f.label}</label>
              <Input
                type={f.type || "text"}
                value={f.value}
                onChange={e => f.set(e.target.value)}
                placeholder={f.placeholder}
                required={f.label !== "Phone"}
                className="rounded-none"
              />
            </div>
          ))}
          <Button type="submit" className="w-full deco-gradient text-primary-foreground hover:opacity-90 rounded-none tracking-[0.2em] uppercase text-xs py-5">
            Create Account
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-6 tracking-wide">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
