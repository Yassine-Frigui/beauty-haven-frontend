import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast({ title: "Welcome back ✦" });
      navigate("/profile");
    } else {
      toast({ title: "Invalid credentials", description: "Please check your email and password.", variant: "destructive" });
    }
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md deco-card">
        <div className="text-center mb-8">
          <p className="font-display text-3xl tracking-[0.2em] mb-1">ZENSHE</p>
          <p className="text-[9px] tracking-[0.5em] uppercase text-primary font-body">Spa · Tunisia</p>
        </div>
        <h1 className="font-heading text-3xl font-light text-center mb-2 tracking-wide">Welcome Back</h1>
        <p className="text-center text-muted-foreground text-xs tracking-wider mb-8">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-2 block text-muted-foreground">Email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" required className="rounded-none" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-2 block text-muted-foreground">Password</label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="rounded-none" />
          </div>
          <Button type="submit" className="w-full deco-gradient text-primary-foreground hover:opacity-90 rounded-none tracking-[0.2em] uppercase text-xs py-5">
            Sign In
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-6 tracking-wide">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
        <p className="text-center text-[10px] text-muted-foreground mt-4 tracking-wider">
          Demo: jane@example.com / password123
        </p>
      </div>
    </div>
  );
};

export default Login;
