import { usePuppies, useSettings } from "@/lib/data";
import { useParams, Link } from "wouter";
import { Navbar, Footer } from "@/components/layout/Shared";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { EmailEnquiryDialog } from "@/components/EmailEnquiryDialog";
import { PuppyCard } from "@/components/PuppyCard";
import NotFound from "./not-found";

export default function PuppyPage() {
  const params = useParams();
  const { puppies } = usePuppies();
  const { settings } = useSettings();
  
  const puppyId = params.id;
  const puppy = puppies.find(p => p.id === puppyId);

  if (!puppy) {
    return <NotFound />;
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-500 text-white";
      case "Reserved": return "bg-amber-500 text-white";
      case "Sold": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const handleWhatsApp = () => {
    const cleanNumber = settings.whatsappNumber.replace('+', '');
    const message = `Hi! I'm interested in ${puppy.name} the ${puppy.breed} (${puppy.color}, ${puppy.age}, $${puppy.price}). Is this puppy still available?`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const otherPuppies = puppies.filter(p => p.id !== puppyId && p.status === "Available").slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{`${puppy.name} — ${puppy.breed} Cavoodle Puppy For Sale | Pure Cavoodles`}</title>
        <meta name="description" content={`${puppy.name} is a beautiful ${puppy.color} ${puppy.breed} Cavoodle puppy looking for a forever home. $${puppy.price.toLocaleString()}.`} />
      </Helmet>
      
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#puppies" className="hover:text-primary transition-colors">Available Puppies</Link>
            <span>/</span>
            <span className="text-foreground">{puppy.name}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Image & Health Card */}
            <div className="lg:col-span-7 space-y-6">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-muted relative shadow-xl border-4 border-white">
                <img 
                  src={puppy.imageUrl} 
                  alt={`${puppy.name} the ${puppy.breed}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className={`font-bold px-6 py-2 rounded-full text-sm shadow-lg tracking-wider uppercase ${getStatusStyle(puppy.status)}`}>
                    {puppy.status}
                  </span>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border/50">
                <h3 className="font-serif text-2xl font-bold mb-6">Health & Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Vet Checked", 
                    "Vaccinated", 
                    "Microchipped", 
                    "Health Certificate", 
                    "Puppy Pack", 
                    "Lifetime Support"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                      <span className="font-bold text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-border/50 mb-8 sticky top-28">
                <div className="flex justify-between items-start mb-6">
                  <h1 className="font-serif text-5xl font-bold text-foreground">{puppy.name}</h1>
                </div>
                
                <div className="text-4xl font-bold text-primary mb-8 tracking-tight">
                  ${puppy.price.toLocaleString()} <span className="text-xl text-muted-foreground font-medium">AUD</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-secondary/40 rounded-2xl p-4 text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Breed</p>
                    <p className="font-bold text-foreground">{puppy.breed}</p>
                  </div>
                  <div className="bg-secondary/40 rounded-2xl p-4 text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Gender</p>
                    <p className="font-bold text-foreground flex items-center justify-center gap-2">
                      {puppy.gender} 
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${puppy.gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'}`}>
                        {puppy.gender === 'Male' ? '♂' : '♀'}
                      </span>
                    </p>
                  </div>
                  <div className="bg-secondary/40 rounded-2xl p-4 text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Color</p>
                    <p className="font-bold text-foreground">{puppy.color}</p>
                  </div>
                  <div className="bg-secondary/40 rounded-2xl p-4 text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Age</p>
                    <p className="font-bold text-foreground">{puppy.age}</p>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="font-serif text-2xl font-bold mb-4">About {puppy.name}</h3>
                  <p className="text-lg text-foreground/70 font-medium leading-relaxed whitespace-pre-wrap">
                    {puppy.description}
                  </p>
                </div>

                {puppy.status === "Available" ? (
                  <div className="space-y-3 pt-5 border-t border-border/50">
                    <Button 
                      className="w-full h-11 text-sm font-semibold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl shadow-sm"
                      onClick={handleWhatsApp}
                      data-testid="button-wa-enquire"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Enquire via WhatsApp
                    </Button>
                    <EmailEnquiryDialog 
                      puppy={puppy} 
                      className="w-full h-11 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm" 
                    />
                  </div>
                ) : (
                  <div className="bg-muted p-5 rounded-xl text-center">
                    <h3 className="font-serif text-xl text-foreground mb-1">This puppy is {puppy.status.toLowerCase()}</h3>
                    <p className="text-foreground/70 text-sm mb-4">Check our home page for other available puppies or contact us to join the waitlist.</p>
                    <Button variant="outline" className="border border-primary text-primary text-sm font-semibold rounded-xl h-9" asChild>
                      <Link href="/">View Available Puppies</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* You Might Also Love */}
          {otherPuppies.length > 0 && (
            <div className="mt-24">
              <h2 className="font-serif text-4xl font-bold mb-8 text-center">You Might Also Love</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {otherPuppies.map(p => (
                  <PuppyCard key={p.id} puppy={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
