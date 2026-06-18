import { usePuppies, useSettings } from "@/lib/data";
import { useParams, Link } from "wouter";
import { Navbar, Footer } from "@/components/layout/Shared";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ArrowLeft, Check, Shield } from "lucide-react";
import { EmailEnquiryDialog } from "@/components/EmailEnquiryDialog";
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800 border-green-200";
      case "Reserved": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Sold": return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const handleWhatsApp = () => {
    const cleanNumber = settings.whatsappNumber.replace('+', '');
    const message = `Hi! I'm interested in ${puppy.name} the ${puppy.breed} (${puppy.color}, ${puppy.age}, $${puppy.price}). Is this puppy still available?`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{`${puppy.name} — ${puppy.breed} Cavoodle Puppy For Sale | Pure Cavoodles`}</title>
        <meta name="description" content={`${puppy.name} is a beautiful ${puppy.color} ${puppy.breed} Cavoodle puppy looking for a forever home. $${puppy.price.toLocaleString()}.`} />
      </Helmet>
      
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Available Puppies
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Column */}
            <div className="space-y-6">
              <div className="aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-muted relative shadow-lg">
                <img 
                  src={puppy.imageUrl} 
                  alt={`${puppy.name} the ${puppy.breed}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`font-medium px-4 py-1.5 text-base ${getStatusColor(puppy.status)}`}>
                    {puppy.status}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-4 rounded-xl flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Vet Checked</h4>
                    <p className="text-xs text-muted-foreground">Comprehensive health check</p>
                  </div>
                </div>
                <div className="bg-secondary/50 p-4 rounded-xl flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Vaccinated</h4>
                    <p className="text-xs text-muted-foreground">Up to date vaccinations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="flex flex-col">
              <h1 className="font-serif text-5xl font-bold text-foreground mb-4">{puppy.name}</h1>
              <div className="text-3xl font-medium text-primary mb-8">${puppy.price.toLocaleString()} AUD</div>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-12 py-6 border-y border-border mb-8">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Breed</h4>
                  <p className="text-lg font-medium text-foreground">{puppy.breed}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Gender</h4>
                  <p className="text-lg font-medium text-foreground">{puppy.gender}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Color</h4>
                  <p className="text-lg font-medium text-foreground">{puppy.color}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Age</h4>
                  <p className="text-lg font-medium text-foreground">{puppy.age}</p>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="font-serif text-2xl font-bold mb-4">About {puppy.name}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {puppy.description}
                </p>
              </div>

              {puppy.status === "Available" ? (
                <div className="mt-auto bg-card border border-border p-6 rounded-2xl shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 text-center">Interested in {puppy.name}?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      size="lg" 
                      className="bg-[#25D366] hover:bg-[#20BD5A] text-white border-none h-14 text-base"
                      onClick={handleWhatsApp}
                      data-testid="button-wa-enquire"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>
                    <EmailEnquiryDialog 
                      puppy={puppy} 
                      className="h-14 text-base bg-primary hover:bg-primary/90 text-white" 
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-auto bg-secondary/50 p-6 rounded-2xl text-center">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">This puppy is {puppy.status.toLowerCase()}</h3>
                  <p className="text-muted-foreground">Please check our home page for other available puppies or contact us to join the waitlist.</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link href="/">View Available Puppies</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}