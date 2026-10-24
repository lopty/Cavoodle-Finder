import { Puppy } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const WEB3FORMS_KEY = "8949595a-de98-4a4d-84b3-da521ea561e1";

interface Props {
  puppy: Puppy;
  variant?: "default" | "outline" | "secondary";
  className?: string;
  buttonText?: string;
}

export function EmailEnquiryDialog({ puppy, variant = "default", className, buttonText = "Email Enquiry" }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Puppy Enquiry: ${puppy.name} (${puppy.breed}) — Pure Cavoodles`,
          from_name: formData.name,
          puppy: `${puppy.name} — ${puppy.breed} · ${puppy.color} · $${puppy.price.toLocaleString()} AUD`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          address: formData.address || "Not provided",
          suburb: formData.suburb || "Not provided",
          state: formData.state || "Not provided",
          message: formData.message,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSent(true);
        toast.success("Enquiry sent! We'll be in touch soon. 🐾");
      } else {
        toast.error("Could not send. Please try WhatsApp instead.");
      }
    } catch {
      toast.error("Network error. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
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
            Fill in the form and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
            <h3 className="font-serif text-xl text-foreground">Enquiry Sent!</h3>
            <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours. 🐾</p>
            <Button variant="outline" className="mt-2" onClick={() => setOpen(false)}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">

            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input id="name" required placeholder="John Smith" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} data-testid="input-name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your Email *</Label>
              <Input id="email" type="email" required placeholder="john@example.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} data-testid="input-email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+61 400 000 000" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} data-testid="input-phone" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" placeholder="123 Main Street" value={formData.address} onChange={e => setFormData(p => ({ ...p, address: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="suburb">Suburb</Label>
                <Input id="suburb" placeholder="Bondi" value={formData.suburb} onChange={e => setFormData(p => ({ ...p, suburb: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="TX" value={formData.state} onChange={e => setFormData(p => ({ ...p, state: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" className="min-h-[90px]" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} data-testid="input-message" />
            </div>

            <Button type="submit" className="w-full text-white" disabled={submitting} data-testid="button-submit-enquiry">
              {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…</> : "Send Enquiry"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
