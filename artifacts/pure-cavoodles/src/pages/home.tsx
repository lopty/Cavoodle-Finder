import { usePuppies } from "@/lib/data";
import { PuppyCard } from "@/components/PuppyCard";
import { Navbar, Footer } from "@/components/layout/Shared";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, ShieldCheck, Star } from "lucide-react";

export default function Home() {
  const { puppies } = usePuppies();

  const locations = [
    "Sydney", "Melbourne", "Brisbane", "Perth", 
    "Adelaide", "Gold Coast", "Canberra", "Hobart", 
    "Darwin", "Newcastle", "Geelong"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Cavoodle Puppies for Sale Australia | Pure Cavoodles</title>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Pure Cavoodles",
              "description": "Premium F1 & F1b Cavoodle puppies for sale across Australia.",
              "areaServed": "Australia"
            }
          `}
        </script>
      </Helmet>
      
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero-puppy.png" 
              alt="Golden Cavoodle puppy" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-foreground/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-2xl">
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                Your perfect companion awaits.
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md">
                Find your perfect Cavoodle puppy from one of the most trusted Cavoodle breeders Australia has to offer. Premium F1 & F1b Cavoodle puppies for sale across Australia. Raised with love in a family home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg bg-primary hover:bg-primary/90 text-primary-foreground border-none px-8" asChild>
                  <a href="#puppies">View Available Puppies</a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm px-8" asChild>
                  <a href="#about">Learn About the Breed</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Available Puppies Section */}
        <section id="puppies" className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Available Puppies</h2>
              <p className="text-lg text-muted-foreground">
                Meet our current litter of beautiful, healthy Cavoodle puppies. Each one comes vet-checked, microchipped, and deeply loved.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {puppies.map(puppy => (
                <PuppyCard key={puppy.id} puppy={puppy} />
              ))}
            </div>
            {puppies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">We currently don't have any puppies available. Please check back later or contact us to join the waitlist.</p>
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 space-y-6">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Why Choose a Cavoodle?</h2>
                <p className="text-lg text-muted-foreground">
                  The Cavoodle (a cross between a Cavalier King Charles Spaniel and a Poodle) is Australia's most popular designer breed for good reason.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="mt-1 bg-primary/20 p-2 rounded-full text-primary shrink-0"><Heart className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">Affectionate Nature</h4>
                      <p className="text-muted-foreground">Known for their incredibly loving and gentle temperament, making them perfect family pets.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 bg-primary/20 p-2 rounded-full text-primary shrink-0"><Star className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">Low-Shedding Coats</h4>
                      <p className="text-muted-foreground">Our F1 and F1b Cavoodle puppies are highly sought after for their hypoallergenic, low to non-shedding coats.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 bg-primary/20 p-2 rounded-full text-primary shrink-0"><ShieldCheck className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">Intelligent & Trainable</h4>
                      <p className="text-muted-foreground">Inheriting the Poodle's intelligence, our toy Cavoodle puppies and miniature Cavoodle puppies are quick learners and eager to please.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img src="/about-puppy.png" alt="Playful toy Cavoodle puppy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs">
                  <p className="font-serif italic text-foreground">"The perfect addition to our family. We couldn't be happier!"</p>
                  <p className="text-sm text-muted-foreground mt-2">— Sarah, Sydney NSW</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section id="locations" className="py-20 md:py-32 bg-background border-t">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Delivering Joy Across Australia</h2>
              <p className="text-lg text-muted-foreground">
                While we are based locally, our beautiful Cavoodle puppies have found loving homes in every major Australian city. We partner with premium pet transport to ensure safe, comfortable travel.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {locations.map(city => (
                <div key={city} className="flex items-center gap-2 bg-secondary/50 px-6 py-3 rounded-full text-foreground font-medium hover:bg-primary hover:text-white transition-colors cursor-default">
                  <MapPin className="w-4 h-4 opacity-70" />
                  Cavoodle puppies for sale {city}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Contact */}
        <section id="contact" className="py-20 bg-foreground text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <img src="/sleeping-puppy.png" alt="Background" className="w-full h-full object-cover blur-sm" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">Ready to meet your new best friend?</h2>
            <p className="text-xl mb-10 text-white/80">
              Browse our available puppies or contact us to join our waitlist for upcoming litters of miniature and toy Cavoodle puppies.
            </p>
            <Button size="lg" className="text-lg bg-primary hover:bg-primary/90 text-white border-none px-8" asChild>
              <a href="#puppies">See Available Puppies</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}