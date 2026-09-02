import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import data from "@/data/data.json";

const Footer = () => {
  const { salon } = data;

  return (
    <footer className="bg-espresso text-cream">
      {/* Deco top border */}
      <div className="flex items-center justify-center py-6">
        <div className="flex-1 max-w-xs h-px bg-cream/10" />
        <div className="mx-4 flex gap-2 items-center">
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/60" />
          <div className="w-2 h-2 rotate-45 border border-primary/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/60" />
        </div>
        <div className="flex-1 max-w-xs h-px bg-cream/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-2xl tracking-[0.2em] mb-2">ZENSHE</h3>
            <p className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-4">Spa · Tunisia</p>
            <p className="text-cream/60 text-sm leading-relaxed">{salon.tagline}</p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.4em] uppercase font-body font-semibold mb-5 text-cream/80">Navigate</h4>
            <div className="space-y-2.5">
              {["/", "/about", "/services", "/booking", "/contact"].map(path => (
                <Link key={path} to={path} className="block text-sm text-cream/50 hover:text-primary transition-colors tracking-wide">
                  {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.4em] uppercase font-body font-semibold mb-5 text-cream/80">Visit Us</h4>
            <p className="text-sm text-cream/50 mb-1">{salon.address}</p>
            <p className="text-sm text-cream/50 mb-1">{salon.phone}</p>
            <p className="text-sm text-cream/50 mb-5">{salon.email}</p>
            <div className="flex gap-4">
              <a href={salon.social.instagram} target="_blank" rel="noreferrer" className="text-cream/40 hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={salon.social.facebook} target="_blank" rel="noreferrer" className="text-cream/40 hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="deco-line mt-10 mb-6 opacity-20" />
        <p className="text-center text-[10px] tracking-[0.4em] uppercase text-cream/30">
          © {new Date().getFullYear()} {salon.name} · All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
