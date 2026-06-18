import { Puppy, useSettings } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { EmailEnquiryDialog } from "./EmailEnquiryDialog";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

export function PuppyCard({ puppy }: { puppy: Puppy }) {
  const { settings } = useSettings();

  const getStatusColor = (status: Puppy["status"]) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100";
      case "Reserved": return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100";
      case "Sold": return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100";
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to puppy page
    const cleanNumber = settings.whatsappNumber.replace('+', '');
    const message = `Hi! I'm interested in ${puppy.name} the ${puppy.breed} (${puppy.color}, ${puppy.age}, $${puppy.price}). Is this puppy still available?`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Link href={`/puppy/${puppy.id}`} data-testid={`link-puppy-${puppy.id}`}>
      <Card className="overflow-hidden group cursor-pointer border-transparent shadow-sm hover:shadow-md transition-all duration-300 bg-white hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img 
            src={puppy.imageUrl} 
            alt={puppy.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            data-testid={`img-puppy-${puppy.id}`}
          />
          <div className="absolute top-4 left-4">
            <Badge variant="outline" className={`font-medium px-3 py-1 ${getStatusColor(puppy.status)}`}>
              {puppy.status}
            </Badge>
          </div>
          {puppy.status !== "Available" && (
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center">
              <span className="text-white font-serif text-2xl font-bold tracking-widest uppercase drop-shadow-md">
                {puppy.status}
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-2xl font-semibold text-foreground">{puppy.name}</h3>
            <span className="font-medium text-lg text-primary">${puppy.price.toLocaleString()}</span>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
            <span>{puppy.breed}</span>
            <span>&bull;</span>
            <span>{puppy.gender}</span>
            <span>&bull;</span>
            <span>{puppy.age}</span>
          </div>
          <p className="text-sm text-foreground/80 line-clamp-2 mb-6">
            {puppy.description}
          </p>
          
          <div className="grid grid-cols-2 gap-2" onClick={(e) => e.preventDefault()}>
            <Button 
              variant="outline" 
              className="w-full bg-green-50 hover:bg-green-100 text-green-700 border-green-200" 
              onClick={handleWhatsApp}
              data-testid={`button-wa-${puppy.id}`}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <EmailEnquiryDialog puppy={puppy} variant="outline" className="w-full" buttonText="Email" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}