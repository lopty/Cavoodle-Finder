import { useState, useRef } from "react";
import { useSettings, usePuppies, Puppy, PuppyStatus } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { Link } from "wouter";
import { Upload, Loader2, ImagePlus, ExternalLink } from "lucide-react";

export default function Admin() {
  const { settings, saveSettings } = useSettings();
  const { puppies, addPuppy, updatePuppy, deletePuppy } = usePuppies();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("purecavoodles_auth") === "true";
  });
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === settings.adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("purecavoodles_auth", "true");
      toast.success("Logged in successfully");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("purecavoodles_auth");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-secondary/30 px-4">
        <Helmet>
          <title>Admin Login | Pure Cavoodles</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Card className="w-full max-w-md shadow-xl border-border">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-serif text-3xl text-primary">Admin Access</CardTitle>
            <CardDescription>Enter password to manage website.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full text-white">Login</Button>
            </form>
            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                &larr; Back to website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <Helmet>
        <title>Admin Dashboard | Pure Cavoodles</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="bg-card border-b border-border py-4 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="font-serif text-2xl font-bold text-primary">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">View Site</Link>
            </Button>
            <Button variant="secondary" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="puppies" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger value="puppies" className="text-base">Manage Puppies</TabsTrigger>
            <TabsTrigger value="settings" className="text-base">Settings</TabsTrigger>
          </TabsList>

          {/* ── PUPPIES TAB ── */}
          <TabsContent value="puppies" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Puppies List</h2>
              <p className="text-muted-foreground text-sm">Add, edit or delete puppy listings.</p>
            </div>

            <PuppyForm onSubmit={addPuppy} title="Add New Puppy" />

            <div>
              <h3 className="text-xl font-bold border-b pb-3 mb-4">Existing Puppies ({puppies.length})</h3>
              <div className="grid gap-5">
                {puppies.map(puppy => (
                  <Card key={puppy.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-56 h-44 bg-muted shrink-0">
                        {puppy.imageUrl
                          ? <img src={puppy.imageUrl} alt={puppy.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
                        }
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold flex items-center gap-2 flex-wrap">
                              {puppy.name}
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                puppy.status === "Available" ? "bg-green-100 text-green-700" :
                                puppy.status === "Reserved" ? "bg-amber-100 text-amber-700" :
                                "bg-gray-100 text-gray-500"
                              }`}>{puppy.status}</span>
                            </h4>
                            <p className="text-muted-foreground text-sm">{puppy.breed} · {puppy.color} · ${puppy.price.toLocaleString()}</p>
                          </div>
                          <Button variant="destructive" size="sm" onClick={() => {
                            if (confirm(`Delete ${puppy.name}?`)) {
                              deletePuppy(puppy.id);
                              toast.success(`${puppy.name} deleted`);
                            }
                          }}>Delete</Button>
                        </div>
                        <details className="mt-auto">
                          <summary className="cursor-pointer text-sm font-semibold text-primary hover:underline">Edit this puppy ›</summary>
                          <div className="pt-4 border-t mt-3">
                            <PuppyForm
                              initialData={puppy}
                              onSubmit={(data) => {
                                updatePuppy(puppy.id, data);
                                toast.success(`${puppy.name} updated`);
                              }}
                              isEdit
                            />
                          </div>
                        </details>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ── SETTINGS TAB ── */}
          <TabsContent value="settings" className="space-y-6">
            <SettingsForm settings={settings} onSave={(newSettings) => {
              saveSettings(newSettings);
              toast.success("Settings saved");
            }} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ─────────────────────── PuppyForm ─────────────────────── */
function PuppyForm({ initialData, onSubmit, title, isEdit = false }: {
  initialData?: Puppy;
  onSubmit: (data: Omit<Puppy, "id">) => void;
  title?: string;
  isEdit?: boolean;
}) {
  const { settings } = useSettings();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Omit<Puppy, "id">>(() => initialData || {
    name: "", breed: "F1 Cavoodle", gender: "Male", color: "",
    price: 4500, age: "8 weeks", status: "Available", description: "", imageUrl: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!settings.cloudinaryCloudName || !settings.cloudinaryUploadPreset) {
      toast.error("Set up Cloudinary in Settings tab first.");
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", settings.cloudinaryUploadPreset!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${settings.cloudinaryCloudName}/image/upload`,
        { method: "POST", body: fd }
      );
      const data = await res.json();
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, imageUrl: data.secure_url }));
        toast.success("Photo uploaded ✓");
      } else {
        toast.error("Upload failed — check your Cloudinary settings.");
      }
    } catch {
      toast.error("Upload failed — network error.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEdit) {
      setFormData({ name: "", breed: "F1 Cavoodle", gender: "Male", color: "", price: 4500, age: "8 weeks", status: "Available", description: "", imageUrl: "" });
    }
  };

  const cloudinaryReady = !!(settings.cloudinaryCloudName && settings.cloudinaryUploadPreset);

  return (
    <Card className={isEdit ? "border-none shadow-none" : ""}>
      {!isEdit && <CardHeader><CardTitle>{title}</CardTitle></CardHeader>}
      <CardContent className={isEdit ? "p-0" : ""}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Breed</Label>
              <Input required value={formData.breed} onChange={e => setFormData(p => ({ ...p, breed: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Gender</Label>
              <Select value={formData.gender} onValueChange={(v: any) => setFormData(p => ({ ...p, gender: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Color</Label>
              <Input required value={formData.color} onChange={e => setFormData(p => ({ ...p, color: e.target.value }))} placeholder="e.g. Apricot, Ruby Red" />
            </div>
            <div className="space-y-1.5">
              <Label>Price (AUD $)</Label>
              <Input type="number" required value={formData.price} onChange={e => setFormData(p => ({ ...p, price: Number(e.target.value) }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Age</Label>
              <Input required value={formData.age} onChange={e => setFormData(p => ({ ...p, age: e.target.value }))} placeholder="e.g. 8 weeks" />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v: PuppyStatus) => setFormData(p => ({ ...p, status: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Reserved">Reserved</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Photo upload field */}
            <div className="space-y-1.5">
              <Label>Photo</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.imageUrl}
                  onChange={e => setFormData(p => ({ ...p, imageUrl: e.target.value }))}
                  placeholder="https://… or upload →"
                  className="flex-1 text-sm"
                />
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploading || !cloudinaryReady}
                  title={cloudinaryReady ? "Upload photo to Cloudinary" : "Configure Cloudinary in Settings first"}
                  onClick={() => fileRef.current?.click()}
                  className="shrink-0 gap-1.5"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                  {uploading ? "Uploading…" : "Upload"}
                </Button>
              </div>
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Preview" className="mt-2 h-24 w-24 rounded-lg object-cover border" />
              )}
              {!cloudinaryReady && (
                <p className="text-xs text-amber-600">⚠ Add Cloudinary details in Settings to enable direct upload.</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea required className="min-h-[90px]" value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} />
          </div>

          <Button type="submit" className="text-white">
            {isEdit ? "Save Changes" : "Add Puppy"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

/* ─────────────────────── SettingsForm ─────────────────────── */
function SettingsForm({ settings, onSave }: { settings: any; onSave: (s: any) => void }) {
  const [formData, setFormData] = useState(settings);

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(formData); }} className="space-y-8 max-w-xl">

      {/* Contact */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg border-b pb-2">Contact Details</h3>
        <div className="space-y-1.5">
          <Label>Your Email (receives enquiries)</Label>
          <Input type="email" required value={formData.contactEmail} onChange={e => setFormData((p: any) => ({ ...p, contactEmail: e.target.value }))} />
        </div>
        <div className="space-y-1.5">
          <Label>WhatsApp Number (with country code)</Label>
          <Input required value={formData.whatsappNumber} onChange={e => setFormData((p: any) => ({ ...p, whatsappNumber: e.target.value }))} placeholder="+61400000000" />
        </div>
        <div className="space-y-1.5">
          <Label>Admin Password</Label>
          <Input required value={formData.adminPassword} onChange={e => setFormData((p: any) => ({ ...p, adminPassword: e.target.value }))} />
        </div>
      </div>

      {/* Formspree */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-bold text-lg">Formspree — Email Forms</h3>
          <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">
            Get free account <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm space-y-1">
          <p className="font-semibold text-amber-800">Setup (2 minutes, free):</p>
          <ol className="list-decimal list-inside text-amber-700 space-y-0.5">
            <li>Go to <strong>formspree.io</strong> → Sign up free</li>
            <li>Create a new form → copy the Form ID (e.g. <code className="bg-amber-100 px-1 rounded">xdknplrz</code>)</li>
            <li>Paste it below and save</li>
          </ol>
        </div>
        <div className="space-y-1.5">
          <Label>Formspree Form ID</Label>
          <Input
            value={formData.formspreeId || ""}
            onChange={e => setFormData((p: any) => ({ ...p, formspreeId: e.target.value.trim() }))}
            placeholder="e.g. xdknplrz"
          />
          {formData.formspreeId
            ? <p className="text-xs text-green-600 font-medium">✓ Enquiry form will send emails directly to your inbox</p>
            : <p className="text-xs text-muted-foreground">Without this, enquiries open the visitor's email app instead</p>
          }
        </div>
      </div>

      {/* Cloudinary */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-bold text-lg">Cloudinary — Photo Upload</h3>
          <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">
            Get free account <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm space-y-1">
          <p className="font-semibold text-blue-800">Setup (5 minutes, free — 25GB storage):</p>
          <ol className="list-decimal list-inside text-blue-700 space-y-0.5">
            <li>Go to <strong>cloudinary.com</strong> → Sign up free</li>
            <li>Dashboard → copy your <strong>Cloud name</strong></li>
            <li>Settings → Upload → Add upload preset → set to <strong>Unsigned</strong> → save</li>
            <li>Copy the preset name and paste both below</li>
          </ol>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Cloud Name</Label>
            <Input
              value={formData.cloudinaryCloudName || ""}
              onChange={e => setFormData((p: any) => ({ ...p, cloudinaryCloudName: e.target.value.trim() }))}
              placeholder="e.g. dpqhzxzqz"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Upload Preset (Unsigned)</Label>
            <Input
              value={formData.cloudinaryUploadPreset || ""}
              onChange={e => setFormData((p: any) => ({ ...p, cloudinaryUploadPreset: e.target.value.trim() }))}
              placeholder="e.g. purecavoodles"
            />
          </div>
        </div>
        {formData.cloudinaryCloudName && formData.cloudinaryUploadPreset
          ? <p className="text-xs text-green-600 font-medium">✓ Photo upload button is active in the puppy form</p>
          : <p className="text-xs text-muted-foreground">Without this, paste image URLs manually in the puppy form</p>
        }
      </div>

      <Button type="submit" className="text-white w-full sm:w-auto">Save All Settings</Button>
    </form>
  );
}
