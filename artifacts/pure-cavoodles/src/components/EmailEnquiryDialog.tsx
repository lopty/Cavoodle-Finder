import { Puppy } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const ENQUIRY_EMAIL = "contact@cavoodlepets.com";

interface Props {
  puppy: Puppy;
  variant?: "default" | "outline" | "secondary";
  className?: string;
  buttonText?: string;
}

export function EmailEnquiryDialog({ puppy, variant = "default", className, buttonText = "Email Enquiry" }: Props) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    suburb: "",
    state: "",
    message: `Hi, I'm interested in ${puppy.name}. Please contact me with more details.`,
  });

  const reset = () => {
    setFormData({
      name: "", email: "", phone: "", address: "", suburb: "", state: "",
      message: `Hi, I'm interested in ${puppy.name}. Please contact me with more details.`,
    });
    setSent(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    const subject = `Puppy Enquiry: ${puppy.name} (${puppy.breed}) — Pure Cavoodles`;
    const body = [
      `=== PUPPY ENQUIRY ===`,
      ``,
      `Puppy:    ${puppy.name} — ${puppy.breed} · ${puppy.color} · $${puppy.price.toLocaleString()} AUD`,
      ``,
      `=== CUSTOMER DETAILS ===`,
      `Name:     ${formData.name}`,
      `Email:    ${formData.email}`,
      `Phone:    ${formData.phone || "Not provided"}`,
      `Address:  ${formData.address || "Not provided"}`,
      `Suburb:   ${formData.suburb || "Not provided"}`,
      `State:    ${formData.state || "Not provided"}`,
      ``,
      `=== MESSAGE ===`,
      formData.message,
    ].join("\n");

    const mailtoUrl = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Must append to DOM so browsers allow the click
    const a = document.createElement("a");
    a.href = mailtoUrl;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setSent(true);
    toast.success("Opening your email client… 🐾");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className} data-testid={`button-email-${puppy.id}`}>
          <Mail className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto" data-testid="dialog-email-enquiry">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary">Enquire about {puppy.name}</DialogTitle>
          <DialogDescription>
            Fill in the form below — your email app will open pre-filled and ready to send.
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
            <h3 className="font-serif text-xl text-foreground">Almost there!</h3>
            <p className="text-muted-foreground text-sm">Your email client has opened with everything pre-filled. Just hit <strong>Send</strong>!</p>
            <Button variant="outline" className="mt-2" onClick={() => setOpen(false)}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input id="name" required placeholder="John Smith" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} data-testid="input-name" />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Your Email *</Label>
              <Input id="email" type="email" required placeholder="john@example.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} data-testid="input-email" />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+61 400 000 000" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} data-testid="input-phone" />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" placeholder="123 Main Street" value={formData.address} onChange={e => setFormData(p => ({ ...p, address: e.target.value }))} />
            </div>

            {/* Suburb + State side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="suburb">Suburb</Label>
                <Input id="suburb" placeholder="Bondi" value={formData.suburb} onChange={e => setFormData(p => ({ ...p, suburb: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="NSW" value={formData.state} onChange={e => setFormData(p => ({ ...p, state: e.target.value }))} />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" className="min-h-[90px]" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} data-testid="input-message" />
            </div>

            <Button type="submit" className="w-full text-white" data-testid="button-submit-enquiry">
              Send Enquiry
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
