import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/booking", label: "Booking" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      {/* Thin deco line at very top */}
      <div className="deco-line-thick" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-22 py-4">
          <Link to="/" className="flex flex-col items-center leading-none">
            <span className="font-display text-2xl md:text-3xl tracking-[0.2em] text-foreground">ZENSHE</span>
            <span className="text-[9px] tracking-[0.5em] uppercase text-primary font-body">Spa · Tunisia</span>
          </Link>


          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-body font-medium tracking-[0.25em] uppercase transition-colors duration-200 hover:text-primary ${
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-5 bg-border" />
            <Link
              to={user ? "/profile" : "/login"}
              className="flex items-center gap-1.5 text-xs font-body font-medium tracking-[0.2em] uppercase transition-colors duration-200 hover:text-primary text-muted-foreground"
            >
              <User className="w-3.5 h-3.5" />
              {user ? user.name.split(" ")[0] : "Login"}
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setOpen(!open)} className="text-foreground" aria-label="Toggle menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block text-xs font-body font-medium tracking-[0.3em] uppercase ${
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="deco-line" />
            <Link
              to={user ? "/profile" : "/login"}
              onClick={() => setOpen(false)}
              className="block text-xs font-body font-medium tracking-[0.3em] uppercase text-muted-foreground"
            >
              {user ? "Profile" : "Login"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
