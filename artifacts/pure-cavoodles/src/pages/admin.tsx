import { useState } from "react";
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
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Dashboard | Pure Cavoodles</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <header className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="font-serif text-2xl font-bold text-primary">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/">View Site</Link>
            </Button>
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="puppies" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger value="puppies" className="text-base">Manage Puppies</TabsTrigger>
            <TabsTrigger value="settings" className="text-base">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="puppies" className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold mb-2">Puppies List</h2>
                <p className="text-muted-foreground">Manage your currently listed puppies.</p>
              </div>
            </div>

            <div className="grid gap-6">
              <PuppyForm onSubmit={addPuppy} title="Add New Puppy" />
              
              <h3 className="text-xl font-bold mt-8 border-b pb-4">Existing Puppies</h3>
              {puppies.map(puppy => (
                <Card key={puppy.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-64 h-48 bg-muted shrink-0">
                      <img src={puppy.imageUrl} alt={puppy.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold flex items-center gap-2">
                            {puppy.name} 
                            <span className="text-sm font-normal bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">{puppy.status}</span>
                          </h4>
                          <p className="text-muted-foreground">{puppy.breed} &bull; {puppy.color} &bull; ${puppy.price}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => {
                          if (confirm(`Are you sure you want to delete ${puppy.name}?`)) {
                            deletePuppy(puppy.id);
                            toast.success("Puppy deleted");
                          }
                        }}>Delete</Button>
                      </div>
                      
                      <div className="mt-auto">
                        <details>
                          <summary className="cursor-pointer text-sm font-medium text-primary mb-4">Edit this puppy</summary>
                          <div className="pt-4 border-t mt-2">
                            <PuppyForm 
                              initialData={puppy} 
                              onSubmit={(data) => {
                                updatePuppy(puppy.id, data);
                                toast.success("Puppy updated");
                              }} 
                              isEdit 
                            />
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Global Settings</CardTitle>
                <CardDescription>Update your contact details and admin password.</CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsForm settings={settings} onSave={(newSettings) => {
                  saveSettings(newSettings);
                  toast.success("Settings saved successfully");
                }} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Sub-components for forms
function PuppyForm({ initialData, onSubmit, title, isEdit = false }: { 
  initialData?: Puppy, 
  onSubmit: (data: Omit<Puppy, "id">) => void,
  title?: string,
  isEdit?: boolean
}) {
  const [formData, setFormData] = useState<Omit<Puppy, "id">>(() => initialData || {
    name: "",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "",
    price: 4500,
    age: "8 weeks",
    status: "Available",
    description: "",
    imageUrl: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEdit) {
      setFormData({
        name: "", breed: "F1 Cavoodle", gender: "Male", color: "", price: 4500, age: "8 weeks", status: "Available", description: "", imageUrl: ""
      });
      toast.success("New puppy added!");
    }
  };

  return (
    <Card className={isEdit ? "border-none shadow-none" : ""}>
      {!isEdit && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={isEdit ? "p-0" : ""}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Breed (e.g. F1 Cavoodle)</Label>
              <Input required value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={formData.gender} onValueChange={(v: any) => setFormData({...formData, gender: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Color (e.g. Ruby Red, Apricot)</Label>
              <Input required value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Price (AUD)</Label>
              <Input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
            </div>
            <div className="space-y-2">
              <Label>Age (e.g. 8 weeks)</Label>
              <Input required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v: PuppyStatus) => setFormData({...formData, status: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Reserved">Reserved</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input required value={formData.imageUrl} placeholder="https://..." onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea required className="min-h-[100px]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <Button type="submit" className="text-white">{isEdit ? 'Save Changes' : 'Add Puppy'}</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function SettingsForm({ settings, onSave }: { settings: any, onSave: (s: any) => void }) {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <div className="space-y-2">
        <Label>Contact Email (Receives enquiries)</Label>
        <Input type="email" required value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} />
      </div>
      <div className="space-y-2">
        <Label>WhatsApp Number (include country code, e.g. +61400000000)</Label>
        <Input required value={formData.whatsappNumber} onChange={e => setFormData({...formData, whatsappNumber: e.target.value})} />
      </div>
      <div className="space-y-2">
        <Label>Admin Password</Label>
        <Input required value={formData.adminPassword} onChange={e => setFormData({...formData, adminPassword: e.target.value})} />
      </div>
      <Button type="submit" className="text-white">Save Settings</Button>
    </form>
  );
}