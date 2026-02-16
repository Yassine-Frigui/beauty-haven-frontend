import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import data from "@/data/data.json";

const Footer = () => {
  const { salon } = data;

  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-heading text-2xl font-bold gold-text mb-4">{salon.name}</h3>
            <p className="text-cream/70 text-sm leading-relaxed">{salon.tagline}</p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["/", "/about", "/services", "/booking", "/contact"].map(path => (
                <Link key={path} to={path} className="block text-sm text-cream/70 hover:text-primary transition-colors">
                  {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
            <p className="text-sm text-cream/70 mb-1">{salon.address}</p>
            <p className="text-sm text-cream/70 mb-1">{salon.phone}</p>
            <p className="text-sm text-cream/70 mb-4">{salon.email}</p>
            <div className="flex gap-4">
              <a href={salon.social.instagram} target="_blank" rel="noreferrer" className="text-cream/70 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={salon.social.facebook} target="_blank" rel="noreferrer" className="text-cream/70 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-10 pt-6 text-center text-xs text-cream/50">
          © {new Date().getFullYear()} {salon.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
