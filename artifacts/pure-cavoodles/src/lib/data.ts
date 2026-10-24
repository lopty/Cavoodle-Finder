import { useState, useEffect } from "react";

export type PuppyStatus = "Available" | "Reserved" | "Sold";

export interface Puppy {
  id: string;
  name: string;
  breed: string;
  gender: "Male" | "Female";
  color: string;
  price: number;
  age: string;
  status: PuppyStatus;
  description: string;
  imageUrl: string;
}

export interface Settings {
  whatsappNumber: string;
  contactEmail: string;
  adminPassword?: string;
  formspreeId?: string;
  cloudinaryCloudName?: string;
  cloudinaryUploadPreset?: string;
}

const DEFAULT_SETTINGS: Settings = {
  whatsappNumber: "+61468201853",
  contactEmail: "info@purecavoodles.com.au",
  adminPassword: "purecavoodles2024",
  formspreeId: "",
  cloudinaryCloudName: "dewwocdrp",
  cloudinaryUploadPreset: "bawfashion",
};

const DEFAULT_PUPPIES: Puppy[] = [
  {
    id: "1",
    name: "Biscuit",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Apricot",
    price: 4500,
    age: "8 weeks",
    status: "Available",
    description: "Biscuit is a sweet and playful F1 Cavoodle with a gorgeous apricot coat. He loves to cuddle and is already well-socialized with children and other pets.",
    imageUrl: "/client-puppy-apricot.png",
  },
  {
    id: "2",
    name: "Honey",
    breed: "F1b Cavoodle",
    gender: "Female",
    color: "Red & White",
    price: 5500,
    age: "9 weeks",
    status: "Available",
    description: "Honey has the most gorgeous red and white curls. She's a gentle soul who enjoys quiet naps in the sun and gentle play with her siblings.",
    imageUrl: "/client-puppy-honey.png",
  },
  {
    id: "3",
    name: "Milo",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Ruby Red",
    price: 4500,
    age: "10 weeks",
    status: "Available",
    description: "Milo is full of energy and ready for his forever home. His rich ruby red coat and playful personality make him an irresistible companion.",
    imageUrl: "/client-puppy-red-couch.png",
  },
  {
    id: "4",
    name: "Jerry",
    breed: "F1b Cavoodle",
    gender: "Male",
    color: "Apricot & White",
    price: 5000,
    age: "8 weeks",
    status: "Available",
    description: "Jerry is an adorable apricot and white puppy with a soft, fluffy coat. He is a lovely little companion ready to meet his new family.",
    imageUrl: "/client-puppy-jerry.png",
  },
  {
    id: "6",
    name: "Jules",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Black & White",
    price: 4800,
    age: "8 weeks",
    status: "Available",
    description: "Jules is an adorable black and white puppy with a soft, fluffy coat. He is a lovely little companion ready to meet his new family.",
    imageUrl: "/client-puppy-jules.png",
  },
  {
    id: "7",
    name: "Teddy",
    breed: "F1b Cavoodle",
    gender: "Male",
    color: "Silver & Grey",
    price: 5200,
    age: "8 weeks",
    status: "Available",
    description: "Teddy is a rare silver-grey Cavoodle with the most beautiful curly coat. He's calm, affectionate, and loves nothing more than lounging at your feet.",
    imageUrl: "/client-puppy-merle.png",
  },
  {
    id: "8",
    name: "Mary",
    breed: "F1 Cavoodle",
    gender: "Female",
    color: "Chocolate",
    price: 4700,
    age: "6 weeks",
    status: "Available",
    description: "Mary is an adorable chocolate puppy with a soft, fluffy coat and beautiful eyes. She is a lovely little companion ready to meet her new family.",
    imageUrl: "/client-puppy-mary.png",
  },
  {
    id: "9",
    name: "Brandon",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Golden & Cream",
    price: 4300,
    age: "7 weeks",
    status: "Available",
    description: "Brandon is an adorable golden and cream puppy with a soft, fluffy coat. He's a lovely little companion ready to meet his new family.",
    imageUrl: "/client-puppy-brandon.png",
  },
  {
    id: "12",
    name: "Bella",
    breed: "F1b Cavoodle",
    gender: "Female",
    color: "Ruby Red",
    price: 5300,
    age: "7 weeks",
    status: "Available",
    description: "Bella has the most gorgeous deep ruby red curls. She's playful in bursts but happy to snuggle up on the couch for hours.",
    imageUrl: "/client-puppy-sable.png",
  },
  {
    id: "13",
    name: "Tom",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Chocolate & White",
    price: 4400,
    age: "8 weeks",
    status: "Available",
    description: "Tom is a sweet chocolate and white puppy with a beautiful fluffy coat. He's a lovely little companion ready to meet his new family.",
    imageUrl: "/client-puppy-tom.png",
  },
  {
    id: "14",
    name: "Daisy",
    breed: "F1b Cavoodle",
    gender: "Female",
    color: "White & Tan",
    price: 5100,
    age: "8 weeks",
    status: "Available",
    description: "Daisy is a laid-back, gentle girl with a striking white and tan parti coat. Her golden cream coat is soft as a cloud and practically non-shedding.",
    imageUrl: "/client-puppy-white-tan.png",
  },
  {
    id: "15",
    name: "James",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Black & White",
    price: 4500,
    age: "9 weeks",
    status: "Available",
    description: "James is a lovely black and white puppy with a soft, fluffy coat. He is a sweet little companion ready to meet his new family.",
    imageUrl: "/client-puppy-james.png",
  },
];

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem("purecavoodles_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load settings", e);
    }
    return DEFAULT_SETTINGS;
  });

  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem("purecavoodles_settings", JSON.stringify(newSettings));
  };

  return { settings, saveSettings };
}

// Refresh bundled prototype photos while preserving saved listing edits and uploads.
const LEGACY_PUPPY_IMAGES: Record<string, string> = {
  "/puppy-plants.webp": "/client-puppy-apricot.png",
  "/puppy-redwhite.webp": "/client-puppy-white-tan.png",
  "/real-puppy-6.png": "/client-puppy-red-couch.png",
  "/puppy-bow.webp": "/client-puppy-tricolor.png",
  "/puppy-tongue.webp": "/client-puppy-red-couch.png",
  "/real-puppy-7.png": "/client-puppy-black-white.png",
  "/real-puppy-8.png": "/client-puppy-merle.png",
  "/real-puppy-10.png": "/client-puppy-chocolate.png",
  "/real-puppy-9.png": "/client-puppy-white.png",
  "/real-puppy-1.png": "/client-puppy-apricot.png",
  "/real-puppy-2.png": "/client-puppy-apricot.png",
  "/real-puppy-3.png": "/client-puppy-sable.png",
  "/real-puppy-4.png": "/client-puppy-tricolor.png",
  "/real-puppy-5.png": "/client-puppy-white-tan.png",
  "/puppy-brown.webp": "/client-puppy-chocolate.png"
};

const PUPPIES_KEY = "purecavoodles_puppies_v7";

function validUniquePuppies(puppies: Puppy[]): Puppy[] {
  const seen = new Set<string>();
  return puppies.filter((puppy) => {
    if (!puppy.name?.trim() || !puppy.age?.trim() || !Number.isFinite(puppy.price) || puppy.price <= 0) return false;
    if (seen.has(puppy.imageUrl)) return false;
    seen.add(puppy.imageUrl);
    return true;
  });
}

export function usePuppies() {
  const [puppies, setPuppies] = useState<Puppy[]>(() => {
    try {
      const stored = localStorage.getItem(PUPPIES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const refreshed = validUniquePuppies(parsed.map((puppy: Puppy) => {
            const updatedListing = DEFAULT_PUPPIES.find((listing) => listing.id === puppy.id);
            if (updatedListing && (
              (puppy.id === "13" && puppy.name === "Cooper") ||
              (puppy.id === "9" && puppy.name === "Charlie") ||
              (puppy.id === "6" && puppy.name === "Sandy") ||
              (puppy.id === "4" && puppy.name === "Megan") ||
              (puppy.id === "8" && puppy.name === "Rosie") ||
              (puppy.id === "15" && puppy.name === "Finn")
            )) {
              return { ...puppy, name: updatedListing.name, gender: updatedListing.gender,
                age: updatedListing.age, color: updatedListing.color,
                description: updatedListing.description, imageUrl: updatedListing.imageUrl };
            }
            return ({
            ...puppy,
            imageUrl: puppy.id === "2" && ["/puppy-redwhite.webp", "/client-puppy-white-tan.png"].includes(puppy.imageUrl)
              ? "/client-puppy-honey.png"
              : LEGACY_PUPPY_IMAGES[puppy.imageUrl] ?? puppy.imageUrl,
            });
          }));
          localStorage.setItem(PUPPIES_KEY, JSON.stringify(refreshed));
          return refreshed;
        }
      }
    } catch (e) {
      console.error("Failed to load puppies", e);
    }
    localStorage.setItem(PUPPIES_KEY, JSON.stringify(DEFAULT_PUPPIES));
    return DEFAULT_PUPPIES;
  });

  const savePuppies = (newPuppies: Puppy[]) => {
    setPuppies(newPuppies);
    localStorage.setItem(PUPPIES_KEY, JSON.stringify(newPuppies));
  };

  const addPuppy = (puppy: Omit<Puppy, "id">) => {
    const newPuppy = { ...puppy, id: Math.random().toString(36).substring(2, 9) };
    savePuppies([...puppies, newPuppy]);
  };

  const updatePuppy = (id: string, updates: Partial<Puppy>) => {
    savePuppies(puppies.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deletePuppy = (id: string) => {
    savePuppies(puppies.filter((p) => p.id !== id));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(PUPPIES_KEY);
    savePuppies(DEFAULT_PUPPIES);
  };

  return { puppies, savePuppies, addPuppy, updatePuppy, deletePuppy, resetToDefaults };
}
