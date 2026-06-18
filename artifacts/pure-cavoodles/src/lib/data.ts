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
    description: "Biscuit is a sweet and playful F1 Cavoodle with a gorgeous apricot coat. He loves to cuddle and is already well-socialized with children.",
    imageUrl: "/hero-puppy.png",
  },
  {
    id: "2",
    name: "Honey",
    breed: "F1b Cavoodle",
    gender: "Female",
    color: "Cream & White",
    price: 5500,
    age: "9 weeks",
    status: "Reserved",
    description: "Honey has the softest cream and white curls. She's a gentle soul who enjoys quiet naps in the sun and gentle play.",
    imageUrl: "/sleeping-puppy.png",
  },
  {
    id: "3",
    name: "Milo",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Ruby Red",
    price: 4000,
    age: "10 weeks",
    status: "Available",
    description: "Milo is full of energy and ready for his forever home. His rich ruby red coat makes him a stunning little companion.",
    imageUrl: "/about-puppy.png",
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

export function usePuppies() {
  const [puppies, setPuppies] = useState<Puppy[]>(() => {
    try {
      const stored = localStorage.getItem("purecavoodles_puppies");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load puppies", e);
    }
    localStorage.setItem("purecavoodles_puppies", JSON.stringify(DEFAULT_PUPPIES));
    return DEFAULT_PUPPIES;
  });

  const savePuppies = (newPuppies: Puppy[]) => {
    setPuppies(newPuppies);
    localStorage.setItem("purecavoodles_puppies", JSON.stringify(newPuppies));
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

  return { puppies, savePuppies, addPuppy, updatePuppy, deletePuppy };
}
