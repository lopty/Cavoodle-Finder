import { Puppy, useSettings } from "@/lib/data";
import { Link } from "wouter";
import { EmailEnquiryDialog } from "./EmailEnquiryDialog";
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
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-border/40 flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img 
            src={puppy.imageUrl} 
            alt={puppy.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            data-testid={`img-puppy-${puppy.id}`}
          />
          <div className="absolute top-3 left-3">
            <span className={`font-semibold px-3 py-1 rounded-full text-xs shadow-md tracking-wide ${getStatusStyle(puppy.status)}`}>
              {puppy.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif text-2xl text-foreground leading-none">{puppy.name}</h3>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${puppy.gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'}`}>
                {puppy.gender === 'Male' ? '♂' : '♀'}
              </span>
            </div>
            <span className="font-semibold text-xl text-primary leading-none">${puppy.price.toLocaleString()}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="bg-muted text-foreground/70 px-2.5 py-0.5 rounded-full text-xs font-medium">{puppy.breed}</span>
            <span className="bg-muted text-foreground/70 px-2.5 py-0.5 rounded-full text-xs font-medium">{puppy.color}</span>
            <span className="bg-muted text-foreground/70 px-2.5 py-0.5 rounded-full text-xs font-medium">{puppy.age}</span>
          </div>

          <p className="text-foreground/60 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
            {puppy.description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto" onClick={(e) => e.preventDefault()}>
            <button 
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl py-2.5 text-sm transition-colors shadow-sm" 
              onClick={handleWhatsApp}
              data-testid={`button-wa-${puppy.id}`}
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </button>
            <EmailEnquiryDialog 
              puppy={puppy} 
              variant="outline" 
              className="flex-1 border border-primary text-primary hover:bg-primary/5 font-semibold rounded-xl py-2.5 text-sm h-auto" 
              buttonText="Email" 
            />
          </div>

          <div className="text-center mt-3 pt-3 border-t border-border/40">
            <span className="text-primary/80 font-medium text-xs tracking-wide group-hover:text-primary transition-colors">View Full Profile →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
