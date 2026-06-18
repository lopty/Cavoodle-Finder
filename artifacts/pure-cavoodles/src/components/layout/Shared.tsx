import { Link } from "wouter";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold text-primary tracking-tight" data-testid="link-logo">
          Pure Cavoodles
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/#puppies" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Available Puppies
          </Link>
          <Link href="/#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            About the Breed
          </Link>
          <Link href="/#locations" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Locations
          </Link>
          <Link href="/#contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-primary">Pure Cavoodles</h3>
            <p className="text-primary-foreground/80 max-w-xs">
              Premium F1 & F1b Cavoodle puppies bred with love, care, and attention in a warm family environment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link href="/#puppies" className="hover:text-primary transition-colors">Available Puppies</Link></li>
              <li><Link href="/#about" className="hover:text-primary transition-colors">About the Breed</Link></li>
              <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Locations Served</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Sydney, NSW</li>
              <li>Melbourne, VIC</li>
              <li>Brisbane & Gold Coast, QLD</li>
              <li>Perth, WA</li>
              <li>Adelaide, SA</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Pure Cavoodles Australia. All rights reserved.</p>
          <div className="mt-2">
            <Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}