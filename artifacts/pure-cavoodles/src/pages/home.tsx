import { usePuppies, useSettings } from "@/lib/data";
import { PuppyCard } from "@/components/PuppyCard";
import { Navbar, Footer } from "@/components/layout/Shared";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Heart, ShieldCheck, Star, PawPrint, 
  Syringe, Cpu, Dna, Award, MessageCircle, CheckCircle2 
} from "lucide-react";

export default function Home() {
  const { puppies } = usePuppies();
  const { settings } = useSettings();

  const locations = [
    "Sydney", "Melbourne", "Brisbane", "Perth", 
    "Adelaide", "Gold Coast", "Canberra", "Hobart", 
    "Darwin", "Newcastle", "Geelong"
  ];

  const handleWhatsApp = () => {
    const cleanNumber = settings.whatsappNumber.replace('+', '');
    const message = `Hi! I'm interested in joining the waitlist for a Cavoodle puppy.`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Cavoodle Puppies for Sale Australia | Pure Cavoodles</title>
      </Helmet>
      
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative overflow-hidden" style={{background: "linear-gradient(135deg, #4A2810 0%, #8B4A1A 30%, #C4782A 60%, #E8C170 100%)"}}>
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-10 py-16 md:py-20">
            {/* Left */}
            <div className="flex-1 space-y-7 z-20">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-bold px-4 py-2 rounded-full">
                <PawPrint className="w-4 h-4" />
                Australia's Premier Cavoodle Breeder
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                Australia's Most Loved <span className="text-[#FFD580]">Cavoodle Puppies</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-white/85 max-w-xl">
                Premium F1 & F1b Cavoodles raised with love in a family home. Find your forever companion.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="rounded-full h-13 px-8 text-base font-bold bg-white text-[#8B4A1A] hover:bg-white/90 shadow-xl border-0" asChild>
                  <a href="#puppies">View Available Puppies</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-13 px-8 text-base font-bold border-2 border-white/60 text-white hover:bg-white/15 shadow-lg backdrop-blur-sm" asChild>
                  <a href="#about">Learn About the Breed</a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { icon: CheckCircle2, label: "500+ Happy Families" },
                  { icon: ShieldCheck, label: "100% Health Guaranteed" },
                  { icon: MapPin, label: "Australia-Wide Delivery" },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className="bg-white text-[#7C4A1E] px-4 py-2 rounded-full text-sm font-bold shadow-md flex items-center gap-2 border border-white/80">
                    <Icon className="w-4 h-4 text-[#C4782A]" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right — circle puppy portrait */}
            <div className="flex-1 w-full relative z-10 flex items-center justify-center">
              <div className="relative w-72 h-72 md:w-[420px] md:h-[420px] mx-auto">
                <div className="absolute inset-0 rounded-full" style={{background: "radial-gradient(circle, #FFD58030 0%, #C4782A20 60%, transparent 80%)", transform: "scale(1.15)"}}></div>
                <div className="absolute inset-2 rounded-full border-4 border-white/40"></div>
                <img 
                  src="/puppy-basket.webp" 
                  alt="Golden Cavoodle puppy"
                  className="w-full h-full object-cover rounded-full border-8 border-white shadow-2xl"
                />
              </div>
            </div>
          </div>
          
          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 40H1440V20C1200 0 960 40 720 20C480 0 240 40 0 20V40Z" fill="hsl(36 40% 97%)"/>
            </svg>
          </div>
        </section>

        {/* Section 2: Trust Bar */}
        <div className="text-white py-4 overflow-hidden shadow-inner" style={{background: "linear-gradient(90deg, #8B4A1A, #C4782A, #8B4A1A)"}}>
          <div className="flex whitespace-nowrap animate-scroll items-center">
            {/* Double the list for seamless looping */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center">
                {[
                  { icon: ShieldCheck, text: "Vet Checked" },
                  { icon: Syringe, text: "Vaccinated" },
                  { icon: Cpu, text: "Microchipped" },
                  { icon: Heart, text: "Health Guarantee" },
                  { icon: Award, text: "ANKC Registered Parents" },
                  { icon: Star, text: "Desexing Available" },
                  { icon: Dna, text: "DNA Tested Parents" },
                  { icon: Heart, text: "Raised in Family Home" },
                ].map((item, j) => (
                  <div key={j} className="flex items-center mx-8">
                    <item.icon className="w-6 h-6 mr-3 text-secondary" />
                    <span className="text-lg font-bold tracking-wide">{item.text}</span>
                    <PawPrint className="w-5 h-5 mx-8 text-primary-foreground/30 opacity-50" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Available Puppies */}
        <section id="puppies" className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase">Litter 2025</span>
              <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground">Meet Our Available Puppies</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {puppies.map(puppy => (
                <PuppyCard key={puppy.id} puppy={puppy} />
              ))}
            </div>

            {puppies.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground font-medium">We currently don't have any puppies available.</p>
              </div>
            )}

            <div className="mt-16 max-w-3xl mx-auto bg-secondary/40 border border-secondary p-8 rounded-3xl text-center shadow-lg">
              <h3 className="font-serif text-2xl font-bold mb-3">No puppies match your preference?</h3>
              <p className="text-foreground/80 mb-6 font-medium">Join our waitlist to be notified when our next litter arrives.</p>
              <Button onClick={handleWhatsApp} size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full font-bold px-8 shadow-md">
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Waitlist on WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* Section 4: Breed Categories */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Find Your Perfect Cavoodle</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {/* Card 1 */}
              <div className="bg-[#FFEFEA] p-8 rounded-3xl text-center transform transition-transform hover:-translate-y-2 shadow-sm border border-[#FFD5C8]">
                <div className="w-16 h-16 mx-auto bg-[#FFB5A0] text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                  <PawPrint className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-[#7A3E2D]">Toy Cavoodle</h3>
                <p className="text-[#995945] font-medium leading-relaxed">Under 5kg &bull; Perfect for apartments</p>
              </div>
              {/* Card 2 */}
              <div className="bg-[#E5F7F3] p-8 rounded-3xl text-center transform transition-transform hover:-translate-y-2 shadow-sm border border-[#C2EBE1]">
                <div className="w-16 h-16 mx-auto bg-[#85D6C3] text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-[#296859]">Miniature Cavoodle</h3>
                <p className="text-[#3B8271] font-medium leading-relaxed">5-10kg &bull; Great for families</p>
              </div>
              {/* Card 3 */}
              <div className="bg-[#FFF9E6] p-8 rounded-3xl text-center transform transition-transform hover:-translate-y-2 shadow-sm border border-[#FBE6A4]">
                <div className="w-16 h-16 mx-auto bg-[#F4CA42] text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-[#7B6109]">F1 Cavoodle</h3>
                <p className="text-[#9A7D18] font-medium leading-relaxed">50% Cavalier 50% Poodle &bull; Gentle temperament</p>
              </div>
              {/* Card 4 */}
              <div className="bg-[#F3EEFA] p-8 rounded-3xl text-center transform transition-transform hover:-translate-y-2 shadow-sm border border-[#E0D4F3]">
                <div className="w-16 h-16 mx-auto bg-[#BFA3E8] text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-[#5A3B8A]">F1b Cavoodle</h3>
                <p className="text-[#7252A3] font-medium leading-relaxed">75% Poodle &bull; Most hypoallergenic</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 items-center bg-background rounded-3xl p-8 md:p-12 shadow-inner border">
              <div className="flex-1 space-y-6">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Australia's #1 Breed</h3>
                <p className="text-lg text-foreground/80 font-medium">
                  The Cavoodle (Cavalier King Charles Spaniel x Poodle) combines the best traits of both breeds.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">Affectionate Nature</h4>
                      <p className="text-muted-foreground font-medium">Incredibly loving and gentle temperament, perfect family pets.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">Low-Shedding</h4>
                      <p className="text-muted-foreground font-medium">Highly sought after hypoallergenic, low to non-shedding coats.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">Intelligent</h4>
                      <p className="text-muted-foreground font-medium">Quick learners and eager to please, inheriting Poodle smarts.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-8 border-white transform rotate-2">
                  <img src="/dogs-yard.webp" alt="Two Cavoodles enjoying the Australian outdoors" className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-2 gap-4 transform -rotate-1">
                  <div className="rounded-xl overflow-hidden shadow-md border-4 border-white">
                    <img src="/dogs-duo.webp" alt="Cavoodle parent dogs" className="w-full h-full object-cover aspect-[4/3]" />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-md border-4 border-white">
                    <img src="/parent-red.webp" alt="Ruby red Cavoodle parent" className="w-full h-full object-cover aspect-[4/3]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Health & Certifications */}
        <section id="certifications" className="py-24 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Health Promise & Certifications</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-medium">We take pride in breeding the healthiest puppies possible.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Vet Checked</h4>
                  <p className="text-muted-foreground text-sm font-medium">All puppies receive a full veterinary health check before going to their new home.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Syringe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Vaccinated</h4>
                  <p className="text-muted-foreground text-sm font-medium">Puppies are up to date with all age-appropriate vaccinations.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Microchipped</h4>
                  <p className="text-muted-foreground text-sm font-medium">Every puppy is microchipped and registered in your name.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Health Guarantee</h4>
                  <p className="text-muted-foreground text-sm font-medium">2-year genetic health guarantee on all our puppies.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Dna className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">DNA Tested Parents</h4>
                  <p className="text-muted-foreground text-sm font-medium">Parent dogs are DNA tested for hereditary conditions.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">ANKC Registered</h4>
                  <p className="text-muted-foreground text-sm font-medium">Both parent dogs are registered with the Australian National Kennel Council.</p>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-primary/20 mb-12">
              <h3 className="font-serif text-xl font-bold whitespace-nowrap">Every puppy includes:</h3>
              <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 font-medium">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-secondary" /> Health Certificate</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-secondary" /> Vaccinations</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-secondary" /> Microchip</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-secondary" /> Premium Puppy Pack</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-secondary" /> Lifetime Support</span>
              </div>
            </div>

            {/* Official Memberships & Certifications */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">Official Memberships &amp; Verified By</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <div className="flex flex-col items-center gap-3 group">
                  <img src="/badge-mdba.webp" alt="MDBA Member — Focusing On What's Best For Dogs" className="w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-bold text-foreground/80">MDBA Member</span>
                </div>
                <div className="hidden sm:block w-px h-20 bg-border"></div>
                <div className="flex flex-col items-center gap-3 group">
                  <img src="/badge-rightpaw.webp" alt="RightPaw Verified Breeder" className="w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-bold text-foreground/80">RightPaw Verified</span>
                </div>
                <div className="hidden sm:block w-px h-20 bg-border"></div>
                <div className="flex flex-col items-center gap-3 group">
                  <img src="/badge-tailored.webp" alt="Tailored to Thrive" className="w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-bold text-foreground/80">Tailored to Thrive</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Testimonials */}
        <section id="testimonials" className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">What Our Families Say</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { quote: "Biscuit has completely changed our lives. Pure Cavoodles were so helpful from first enquiry to pick-up day. The puppy pack was incredible!", author: "Jessica M.", loc: "Sydney NSW", init: "JM", color: "bg-blue-100 text-blue-700" },
                { quote: "We drove 3 hours to pick up our Honey and it was 100% worth it. She's the healthiest, most beautiful puppy. Couldn't recommend more highly.", author: "David & Emma K.", loc: "Melbourne VIC", init: "DE", color: "bg-purple-100 text-purple-700" },
                { quote: "The after-sale support from Pure Cavoodles has been amazing. Any question I had, they answered within hours. Milo is our world!", author: "Sarah L.", loc: "Brisbane QLD", init: "SL", color: "bg-amber-100 text-amber-700" }
              ].map((t, i) => (
                <div key={i} className="bg-background rounded-3xl p-8 shadow-sm border relative pt-12 mt-6">
                  <div className="absolute -top-6 left-8 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-serif text-4xl leading-none pt-2">"</span>
                  </div>
                  <p className="font-serif italic text-lg text-foreground/80 mb-8">"{t.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${t.color}`}>
                      {t.init}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{t.author}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{t.loc}</p>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Locations */}
        <section id="locations" className="py-24 text-white relative overflow-hidden" style={{background: "linear-gradient(135deg, #4A2810 0%, #7A3A14 40%, #B56020 100%)"}}>
          {/* Decorative paw prints */}
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none" aria-hidden="true">
            {[...Array(8)].map((_, i) => (
              <PawPrint key={i} className="absolute w-24 h-24" style={{top: `${10 + (i * 12)}%`, left: `${(i % 4) * 28}%`, transform: `rotate(${i * 23}deg)`}} />
            ))}
          </div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white/90 text-sm font-bold px-4 py-2 rounded-full mb-5">
                <MapPin className="w-4 h-4" />
                Australia-Wide Delivery
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5">Delivering Joy Across Australia</h2>
              <p className="text-lg text-white/75 max-w-2xl mx-auto font-medium">
                We partner with premium, trusted pet transport services to ensure your new puppy arrives safely and comfortably, no matter where you are.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-14">
              {locations.map(city => (
                <div key={city} className="flex items-center gap-2 bg-white/12 border border-white/25 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-white hover:text-[#7A3A14] transition-all cursor-default shadow-sm backdrop-blur-sm">
                  <MapPin className="w-4 h-4 opacity-80" />
                  {city}
                </div>
              ))}
            </div>

            <div className="bg-white text-foreground rounded-3xl p-8 max-w-2xl mx-auto text-center shadow-2xl">
              <h3 className="font-serif text-2xl font-bold mb-3">Not sure about transport?</h3>
              <p className="text-muted-foreground font-medium mb-6">We'll handle all the logistics and walk you through the entire process, step by step.</p>
              <Button asChild className="rounded-full font-bold bg-primary hover:bg-primary/90 text-white">
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 8: Contact CTA */}
        <section id="contact" className="py-24 bg-secondary">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-secondary flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Ready to Meet Your New Best Friend?</h2>
                <p className="text-xl text-foreground/80 font-medium">
                  We're here to answer any questions about our breeding program, available puppies, or the waitlist process.
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary"><ShieldCheck className="w-8 h-8" /></div>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Heart className="w-8 h-8" /></div>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Award className="w-8 h-8" /></div>
                </div>
              </div>
              
              <div className="flex-1 w-full max-w-md flex flex-col gap-4">
                <Button 
                  onClick={handleWhatsApp} 
                  className="w-full h-16 text-lg font-bold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-2xl shadow-md"
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Chat on WhatsApp
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full h-16 text-lg font-bold border-2 border-primary text-primary hover:bg-primary/5 rounded-2xl"
                >
                  <a href="#puppies">Browse Puppies</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
