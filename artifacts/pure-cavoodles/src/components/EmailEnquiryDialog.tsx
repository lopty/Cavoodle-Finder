import { useSettings, Puppy } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
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
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `Hi, I'm interested in ${puppy.name}. Please contact me with more details.`
  });

  const reset = () => {
    setFormData({ name: "", phone: "", email: "", message: `Hi, I'm interested in ${puppy.name}. Please contact me with more details.` });
    setSent(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    if (settings.formspreeId) {
      setSubmitting(true);
      try {
        const res = await fetch(`https://formspree.io/f/${settings.formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `Puppy Enquiry: ${puppy.name} — Pure Cavoodles`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone || "Not provided",
            puppy: `${puppy.name} (${puppy.breed} · ${puppy.color} · $${puppy.price.toLocaleString()})`,
            message: formData.message,
          }),
        });
        const json = await res.json();
        if (res.ok) {
          setSent(true);
          toast.success("Enquiry sent! We'll be in touch soon. 🐾");
        } else {
          toast.error(json.error || "Could not send. Please try WhatsApp instead.");
        }
      } catch {
        toast.error("Network error. Please try WhatsApp instead.");
      } finally {
        setSubmitting(false);
      }
    } else {
      const subject = `Puppy Enquiry: ${puppy.name} — Pure Cavoodles`;
      const body = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const a = document.createElement("a");
      a.href = `mailto:${settings.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      a.target = "_blank";
      a.click();
      toast.success("Opening your email client…");
      setOpen(false);
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
      <DialogContent className="sm:max-w-[425px]" data-testid="dialog-email-enquiry">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary">Enquire about {puppy.name}</DialogTitle>
          <DialogDescription>
            {settings.formspreeId
              ? "Fill in the form and it goes straight to our inbox."
              : "This will open your email app pre-filled."}
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
            <h3 className="font-serif text-xl text-foreground">Enquiry Received!</h3>
            <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
            <Button variant="outline" className="mt-2" onClick={() => setOpen(false)}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input id="name" required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} data-testid="input-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Your Email *</Label>
              <Input id="email" type="email" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} data-testid="input-email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} data-testid="input-phone" />
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
