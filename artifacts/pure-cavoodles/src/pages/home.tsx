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
        {/* Section 1: Hero — full-bleed photo */}
        <section className="relative overflow-hidden" style={{height: "clamp(440px, 58vh, 560px)"}}>
          {/* Background photo */}
          <img
            src="/hero-bg.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-[60%_40%]"
          />
          {/* Overlay: dark on left, fades right */}
          <div className="absolute inset-0" style={{background: "linear-gradient(105deg, rgba(38,16,4,0.88) 0%, rgba(38,16,4,0.65) 45%, rgba(38,16,4,0.18) 100%)"}} />

          {/* Text content — left aligned, constrained container */}
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
              <div className="max-w-md">
                <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-4 tracking-wide">
                  <PawPrint className="w-3 h-3" />
                  Australia's Premier Cavoodle Breeder
                </div>
                <h1 className="font-serif text-[2.6rem] md:text-5xl lg:text-[3.2rem] text-white leading-[1.1] mb-3">
                  Find Your Perfect<br />
                  <em className="text-[#FFD580] not-italic">Cavoodle Puppy</em>
                </h1>
                <p className="text-white/70 text-sm md:text-[15px] mb-6 leading-relaxed max-w-xs">
                  Premium F1 & F1b Cavoodles raised in a family home, delivered Australia-wide.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a href="#puppies" className="bg-white text-[#8B4A1A] hover:bg-white/90 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-colors">
                    View Puppies
                  </a>
                  <a href="#contact" className="border border-white/35 text-white hover:bg-white/10 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors backdrop-blur-sm">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip — frosted bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-3 flex justify-center md:justify-start gap-6 md:gap-10">
              {[
                { icon: CheckCircle2, label: "500+ Happy Families" },
                { icon: ShieldCheck, label: "Health Guaranteed" },
                { icon: MapPin, label: "Australia-Wide Delivery" },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-1.5 text-white text-xs font-medium">
                  <Icon className="w-3.5 h-3.5 text-[#FFD580] shrink-0" />
                  <span className="whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Trust Bar */}
        <div className="text-white py-2.5 overflow-hidden" style={{background: "linear-gradient(90deg, #7A3D14, #B86A22, #7A3D14)"}}>
          <div className="flex whitespace-nowrap animate-scroll items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center">
                {[
                  { icon: ShieldCheck, text: "Vet Checked" },
                  { icon: Syringe, text: "Vaccinated" },
                  { icon: Cpu, text: "Microchipped" },
                  { icon: Heart, text: "Health Guarantee" },
                  { icon: Award, text: "ANKC Registered" },
                  { icon: Dna, text: "DNA Tested Parents" },
                  { icon: Heart, text: "Family Raised" },
                ].map((item, j) => (
                  <div key={j} className="flex items-center mx-6">
                    <item.icon className="w-3.5 h-3.5 mr-2 text-[#FFD580]" />
                    <span className="text-xs font-medium tracking-wide">{item.text}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30 mx-6" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Available Puppies */}
        <section id="puppies" className="py-14 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10 space-y-2">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">Litter 2025</span>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground">Meet Our Available Puppies</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {puppies.map(puppy => (
                <PuppyCard key={puppy.id} puppy={puppy} />
              ))}
            </div>

            {puppies.length === 0 && (
              <div className="text-center py-16">
                <p className="text-base text-muted-foreground">We currently have no puppies listed.</p>
              </div>
            )}

            <div className="mt-10 max-w-2xl mx-auto bg-secondary/30 border border-secondary/60 p-6 rounded-2xl text-center">
              <h3 className="font-serif text-xl mb-1.5">Don't see what you're looking for?</h3>
              <p className="text-foreground/70 text-sm mb-4">Join our waitlist to be notified when our next litter arrives.</p>
              <Button onClick={handleWhatsApp} className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full font-semibold px-6 h-10 text-sm shadow-sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Waitlist on WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* Section 4: About the Breed */}
        <section id="about" className="py-14 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">About the Cavoodle</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-[#FFEFEA] p-5 rounded-2xl text-center border border-[#FFD5C8]">
                <div className="w-10 h-10 mx-auto bg-[#FFB5A0] text-white rounded-full flex items-center justify-center mb-3">
                  <PawPrint className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm mb-1 text-[#7A3E2D]">Toy Cavoodle</h3>
                <p className="text-[#995945] text-xs leading-relaxed">Under 5kg · Apartments</p>
              </div>
              <div className="bg-[#E5F7F3] p-5 rounded-2xl text-center border border-[#C2EBE1]">
                <div className="w-10 h-10 mx-auto bg-[#85D6C3] text-white rounded-full flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm mb-1 text-[#296859]">Miniature</h3>
                <p className="text-[#3B8271] text-xs leading-relaxed">5–10kg · Families</p>
              </div>
              <div className="bg-[#FFF9E6] p-5 rounded-2xl text-center border border-[#FBE6A4]">
                <div className="w-10 h-10 mx-auto bg-[#F4CA42] text-white rounded-full flex items-center justify-center mb-3">
                  <Star className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm mb-1 text-[#7B6109]">F1 Cavoodle</h3>
                <p className="text-[#9A7D18] text-xs leading-relaxed">50/50 · Gentle</p>
              </div>
              <div className="bg-[#F3EEFA] p-5 rounded-2xl text-center border border-[#E0D4F3]">
                <div className="w-10 h-10 mx-auto bg-[#BFA3E8] text-white rounded-full flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm mb-1 text-[#5A3B8A]">F1b Cavoodle</h3>
                <p className="text-[#7252A3] text-xs leading-relaxed">75% Poodle · Hypo</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-center bg-background rounded-2xl p-7 md:p-10 border">
              <div className="flex-1 space-y-4">
                <h3 className="font-serif text-2xl md:text-3xl text-foreground">Australia's #1 Breed</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  The Cavoodle (Cavalier King Charles Spaniel × Poodle) is the perfect blend — gentle, smart, and low-shedding.
                </p>
                <ul className="space-y-3">
                  {[
                    { title: "Affectionate", desc: "Loving and gentle — perfect for families and individuals alike." },
                    { title: "Low-Shedding", desc: "Hypoallergenic coats suited to allergy sufferers." },
                    { title: "Intelligent", desc: "Quick learners, inheriting the Poodle's natural intelligence." },
                  ].map(({ title, desc }, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-sm">{title} — </span>
                        <span className="text-muted-foreground text-sm">{desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full grid grid-cols-2 gap-3">
                <div className="col-span-2 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                  <img src="/dogs-yard.webp" alt="Cavoodles outdoors" className="w-full h-48 object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md border-4 border-white">
                  <img src="/puppies-grass.webp" alt="Cavoodle puppies" className="w-full h-32 object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md border-4 border-white">
                  <img src="/puppy-redwhite.webp" alt="Red and white Cavoodle puppy" className="w-full h-32 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Health & Certifications */}
        <section id="certifications" className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">Health Promise & Certifications</h2>
              <p className="text-sm text-foreground/65 max-w-xl mx-auto">We take pride in breeding the healthiest puppies possible.</p>
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

            <div className="bg-primary/90 text-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <p className="font-serif text-base font-semibold">Every puppy includes:</p>
              <div className="flex flex-wrap justify-center sm:justify-end gap-x-5 gap-y-1.5 text-sm">
                {["Health Certificate","Vaccinations","Microchip","Puppy Pack","Lifetime Support"].map(item => (
                  <span key={item} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" /> {item}</span>
                ))}
              </div>
            </div>

            {/* Official Memberships */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Official Memberships &amp; Verified By</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                {[
                  { src: "/badge-mdba.webp", label: "MDBA Member" },
                  { src: "/badge-rightpaw.webp", label: "RightPaw Verified" },
                  { src: "/badge-tailored.webp", label: "Tailored to Thrive" },
                ].map(({ src, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <img src={src} alt={label} className="w-20 h-20 object-contain" />
                    <span className="text-xs font-semibold text-foreground/70">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Testimonials */}
        <section id="testimonials" className="py-14 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">What Our Families Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "Biscuit has completely changed our lives. Pure Cavoodles were so helpful from first enquiry to pick-up day. The puppy pack was incredible!", author: "Jessica M.", loc: "Sydney NSW", init: "JM", color: "bg-blue-100 text-blue-700" },
                { quote: "We drove 3 hours to pick up our Honey and it was 100% worth it. She's the healthiest, most beautiful puppy. Couldn't recommend more highly.", author: "David & Emma K.", loc: "Melbourne VIC", init: "DE", color: "bg-purple-100 text-purple-700" },
                { quote: "The after-sale support from Pure Cavoodles has been amazing. Any question I had, they answered within hours. Milo is our world!", author: "Sarah L.", loc: "Brisbane QLD", init: "SL", color: "bg-amber-100 text-amber-700" }
              ].map((t, i) => (
                <div key={i} className="bg-background rounded-2xl p-6 shadow-sm border relative pt-10 mt-5">
                  <div className="absolute -top-5 left-6 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                    <span className="font-serif text-3xl leading-none pt-1">"</span>
                  </div>
                  <p className="font-serif italic text-sm text-foreground/75 mb-5 leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm ${t.color}`}>{t.init}</div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.loc}</p>
                      <div className="flex text-yellow-400 mt-0.5">{[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Locations */}
        <section id="locations" className="py-14 text-white relative overflow-hidden" style={{background: "linear-gradient(135deg, #4A2810 0%, #7A3A14 40%, #B56020 100%)"}}>
          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 text-white/85 text-xs font-medium px-3 py-1 rounded-full mb-4">
                <MapPin className="w-3 h-3" />
                Australia-Wide Delivery
              </div>
              <h2 className="font-serif text-3xl md:text-4xl mb-2">Delivering Joy Across Australia</h2>
              <p className="text-sm text-white/70 max-w-xl mx-auto">
                We partner with trusted pet transport services — your puppy arrives safely, wherever you are.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto mb-10">
              {locations.map(city => (
                <div key={city} className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-xs font-medium hover:bg-white/20 transition-colors cursor-default">
                  <MapPin className="w-3 h-3 opacity-70" />
                  {city}
                </div>
              ))}
            </div>
            <div className="bg-white text-foreground rounded-2xl p-6 max-w-lg mx-auto text-center shadow-xl">
              <h3 className="font-serif text-xl mb-1.5">Not sure about transport?</h3>
              <p className="text-muted-foreground text-sm mb-4">We'll walk you through the entire process, step by step.</p>
              <Button asChild className="rounded-full font-semibold bg-primary hover:bg-primary/90 text-white h-9 text-sm px-6">
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 8: Contact CTA */}
        <section id="contact" className="py-14 bg-secondary/40">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white rounded-2xl p-7 md:p-12 shadow-sm border flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-3">
                <h2 className="font-serif text-2xl md:text-4xl text-foreground">Ready to Meet Your New Best Friend?</h2>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  We're here to answer any questions about our puppies, breeding program, or the waitlist.
                </p>
                <div className="flex gap-3 pt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><ShieldCheck className="w-5 h-5" /></div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Heart className="w-5 h-5" /></div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Award className="w-5 h-5" /></div>
                </div>
              </div>
              <div className="flex-1 w-full max-w-sm flex flex-col gap-3">
                <Button onClick={handleWhatsApp} className="w-full h-11 text-sm font-semibold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl shadow-sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </Button>
                <Button asChild variant="outline" className="w-full h-11 text-sm font-semibold border border-primary text-primary hover:bg-primary/5 rounded-xl">
                  <a href="#puppies">Browse Available Puppies</a>
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
