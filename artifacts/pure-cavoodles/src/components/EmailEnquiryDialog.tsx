import { useSettings, Puppy } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

interface Props {
  puppy: Puppy;
  variant?: "default" | "outline" | "secondary";
  className?: string;
  buttonText?: string;
}

export function EmailEnquiryDialog({ puppy, variant = "default", className, buttonText = "Email Enquiry" }: Props) {
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `Hi, I'm interested in ${puppy.name}. Please contact me.`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    const subject = `Puppy Enquiry: ${puppy.name} - Pure Cavoodles`;
    const body = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    const mailtoLink = `mailto:${settings.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Create an anchor tag and click it to open email client
    const a = document.createElement('a');
    a.href = mailtoLink;
    a.target = '_blank';
    a.click();

    toast.success("Opening your email client...");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className} data-testid={`button-email-${puppy.id}`}>
          <Mail className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" data-testid="dialog-email-enquiry">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary">Enquire about {puppy.name}</DialogTitle>
          <DialogDescription>
            Fill out the form below to send us an email enquiry.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input 
              id="name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              data-testid="input-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Your Email *</Label>
            <Input 
              id="email" 
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              data-testid="input-email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              data-testid="input-phone"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea 
              id="message" 
              className="min-h-[100px]"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              data-testid="input-message"
            />
          </div>
          <Button type="submit" className="w-full text-white" data-testid="button-submit-enquiry">
            Send Enquiry via Email
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}