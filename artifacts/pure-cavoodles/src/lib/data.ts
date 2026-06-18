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
}

const DEFAULT_SETTINGS: Settings = {
  whatsappNumber: "+61400000000",
  contactEmail: "info@purecavoodles.com.au",
  adminPassword: "purecavoodles2024",
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
    imageUrl: "/puppy-plants.webp",
  },
  {
    id: "2",
    name: "Honey",
    breed: "F1b Cavoodle",
    gender: "Female",
    color: "Red & White",
    price: 5500,
    age: "9 weeks",
    status: "Reserved",
    description: "Honey has the most gorgeous red and white curls. She's a gentle soul who enjoys quiet naps in the sun and gentle play with her siblings.",
    imageUrl: "/puppy-redwhite.webp",
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
    imageUrl: "/puppy-brown.webp",
  },
  {
    id: "4",
    name: "Megan",
    breed: "F1b Cavoodle",
    gender: "Female",
    color: "Golden & White",
    price: 5000,
    age: "8 weeks",
    status: "Available",
    description: "Megan is an absolute sweetheart with the most beautiful golden and white coat. She's confident, curious, and loves meeting new people.",
    imageUrl: "/puppy-bow.webp",
  },
  {
    id: "5",
    name: "Rusty",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Ruby Red",
    price: 4200,
    age: "9 weeks",
    status: "Available",
    description: "Rusty has a big personality packed into a tiny body. He's a cheeky little pup who loves exploring, cuddles, and showing off his adorable tongue.",
    imageUrl: "/puppy-tongue.webp",
  },
  {
    id: "6",
    name: "Sandy",
    breed: "F1 Cavoodle",
    gender: "Female",
    color: "Apricot",
    price: 4800,
    age: "7 weeks",
    status: "Available",
    description: "Sandy is a calm and gentle puppy who melts hearts with her soulful eyes. She settles beautifully and will thrive in any loving home.",
    imageUrl: "/puppy-basket.webp",
  }
];

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem("purecavoodles_settings");
      if (stored) return JSON.parse(stored);
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

const PUPPIES_KEY = "purecavoodles_puppies_v2";

export function usePuppies() {
  const [puppies, setPuppies] = useState<Puppy[]>(() => {
    try {
      const stored = localStorage.getItem(PUPPIES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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
