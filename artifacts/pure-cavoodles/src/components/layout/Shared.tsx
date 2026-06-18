import { Link } from "wouter";
import { PawPrint, Menu, X, Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo">
          <PawPrint className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-serif text-2xl font-bold text-primary tracking-tight">
            Pure Cavoodles
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="/#puppies" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
            Available Puppies
          </a>
          <a href="/#about" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
            About the Breed
          </a>
          <a href="/#certifications" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
            Health & Certifications
          </a>
          <a href="/#locations" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
            Locations
          </a>
          <a href="/#contact" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
            Contact
          </a>
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-6">
            <a href="/#puppies">Enquire Now</a>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-6 flex flex-col gap-4 shadow-lg absolute w-full left-0">
          <a href="/#puppies" onClick={toggleMenu} className="block py-2 text-lg font-bold text-foreground hover:text-primary">Available Puppies</a>
          <a href="/#about" onClick={toggleMenu} className="block py-2 text-lg font-bold text-foreground hover:text-primary">About the Breed</a>
          <a href="/#certifications" onClick={toggleMenu} className="block py-2 text-lg font-bold text-foreground hover:text-primary">Health & Certifications</a>
          <a href="/#locations" onClick={toggleMenu} className="block py-2 text-lg font-bold text-foreground hover:text-primary">Locations</a>
          <a href="/#contact" onClick={toggleMenu} className="block py-2 text-lg font-bold text-foreground hover:text-primary">Contact</a>
          <Button asChild className="rounded-full bg-primary text-white w-full mt-2" onClick={toggleMenu}>
            <a href="/#puppies">Enquire Now</a>
          </Button>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-white relative mt-20 pt-16 pb-8">
      {/* Decorative wavy/paw top divider could be an SVG here, or we keep it clean */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 transform -translate-y-[99%]">
        <svg className="relative block w-full h-[40px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-foreground"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2" data-testid="link-footer-logo">
              <PawPrint className="w-8 h-8 text-primary" />
              <span className="font-serif text-3xl font-bold tracking-tight">Pure Cavoodles</span>
            </Link>
            <p className="text-white/80 max-w-sm text-lg leading-relaxed">
              Premium F1 & F1b Cavoodle puppies bred with love, care, and attention in a warm family environment.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links Col */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-4 text-white/80">
              <li><a href="/#puppies" className="hover:text-primary transition-colors font-medium">Available Puppies</a></li>
              <li><a href="/#about" className="hover:text-primary transition-colors font-medium">About the Breed</a></li>
              <li><a href="/#certifications" className="hover:text-primary transition-colors font-medium">Health & Certifications</a></li>
              <li><a href="/#testimonials" className="hover:text-primary transition-colors font-medium">Testimonials</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors font-medium">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Locations Col */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-secondary">Locations Served</h4>
            <ul className="space-y-4 text-white/80">
              <li className="font-medium">Sydney, NSW</li>
              <li className="font-medium">Melbourne, VIC</li>
              <li className="font-medium">Brisbane & Gold Coast, QLD</li>
              <li className="font-medium">Perth, WA</li>
              <li className="font-medium">Adelaide, SA</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Pure Cavoodles Australia. All rights reserved.</p>
          <Link href="/admin" className="hover:text-primary transition-colors font-bold uppercase tracking-wider text-xs">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
