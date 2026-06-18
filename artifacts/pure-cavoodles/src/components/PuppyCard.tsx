import { Puppy, useSettings } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { EmailEnquiryDialog } from "./EmailEnquiryDialog";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

export function PuppyCard({ puppy }: { puppy: Puppy }) {
  const { settings } = useSettings();

  const getStatusStyle = (status: Puppy["status"]) => {
    switch (status) {
      case "Available": return "bg-green-500 text-white";
      case "Reserved": return "bg-amber-500 text-white";
      case "Sold": return "bg-red-500 text-white";
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault(); 
    const cleanNumber = settings.whatsappNumber.replace('+', '');
    const message = `Hi! I'm interested in ${puppy.name} the ${puppy.breed} (${puppy.color}, ${puppy.age}, $${puppy.price}). Is this puppy still available?`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Link href={`/puppy/${puppy.id}`} data-testid={`link-puppy-${puppy.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-border/50 flex flex-col h-full">
        {/* Image Area */}
        <div className="relative aspect-[3/2] overflow-hidden bg-muted">
          <img 
            src={puppy.imageUrl} 
            alt={puppy.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            data-testid={`img-puppy-${puppy.id}`}
          />
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`font-bold px-4 py-1.5 rounded-full text-sm shadow-md tracking-wide uppercase ${getStatusStyle(puppy.status)}`}>
              {puppy.status}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-3xl font-bold text-foreground leading-none">{puppy.name}</h3>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${puppy.gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'}`}>
                {puppy.gender === 'Male' ? '♂' : '♀'}
              </div>
            </div>
            <span className="font-bold text-2xl text-primary leading-none">${puppy.price.toLocaleString()}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-secondary/60 text-foreground px-3 py-1 rounded-full text-xs font-bold tracking-wide">{puppy.breed}</span>
            <span className="bg-secondary/60 text-foreground px-3 py-1 rounded-full text-xs font-bold tracking-wide">{puppy.color}</span>
            <span className="bg-secondary/60 text-foreground px-3 py-1 rounded-full text-xs font-bold tracking-wide">{puppy.age}</span>
          </div>

          <p className="text-foreground/70 font-medium text-sm line-clamp-2 mb-6 flex-1">
            {puppy.description}
          </p>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-auto" onClick={(e) => e.preventDefault()}>
            <Button 
              className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl h-12 shadow-sm" 
              onClick={handleWhatsApp}
              data-testid={`button-wa-${puppy.id}`}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
            <EmailEnquiryDialog 
              puppy={puppy} 
              variant="outline" 
              className="w-full border-2 border-primary text-primary hover:bg-primary/5 font-bold rounded-xl h-12" 
              buttonText="Email" 
            />
          </div>

          <div className="text-center mt-4 pt-4 border-t border-border/50">
            <span className="text-primary font-bold text-sm tracking-wide group-hover:underline">View Full Profile &rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
