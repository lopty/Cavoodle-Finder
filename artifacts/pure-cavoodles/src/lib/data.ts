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
    status: "Available",
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
  },
  {
    id: "7",
    name: "Teddy",
    breed: "F1b Cavoodle",
    gender: "Male",
    color: "Chocolate & White",
    price: 5200,
    age: "8 weeks",
    status: "Available",
    description: "Teddy is the fluffiest pup in the litter with his rich chocolate and white wavy coat. He's calm, loving, and already sleeping through the night.",
    imageUrl: "/puppy-brown.webp",
  },
  {
    id: "8",
    name: "Rosie",
    breed: "F1 Cavoodle",
    gender: "Female",
    color: "Apricot & White",
    price: 4700,
    age: "9 weeks",
    status: "Available",
    description: "Rosie is a confident little girl with a beautiful apricot and white coat. She thrives on affection and is brilliant with young children.",
    imageUrl: "/puppy-bow.webp",
  },
  {
    id: "9",
    name: "Charlie",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Golden",
    price: 4300,
    age: "10 weeks",
    status: "Available",
    description: "Charlie is a bright golden boy with a cheerful, outgoing personality. He's quick to learn new things and gets along with everyone he meets.",
    imageUrl: "/puppy-plants.webp",
  },
  {
    id: "10",
    name: "Luna",
    breed: "F1b Cavoodle",
    gender: "Female",
    color: "Cream",
    price: 5400,
    age: "8 weeks",
    status: "Available",
    description: "Luna has a stunning cream fleece coat that's practically non-shedding. She's a quiet, gentle girl who loves laps and long cuddles.",
    imageUrl: "/puppy-basket.webp",
  },
  {
    id: "11",
    name: "Oscar",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Ruby Red",
    price: 4600,
    age: "9 weeks",
    status: "Available",
    description: "Oscar is a bold, adventurous boy with the most striking ruby red coat. He loves to explore and will keep the whole family entertained.",
    imageUrl: "/puppy-tongue.webp",
  },
  {
    id: "12",
    name: "Bella",
    breed: "F1b Cavoodle",
    gender: "Female",
    color: "Red & White",
    price: 5300,
    age: "7 weeks",
    status: "Available",
    description: "Bella has the sweetest face with her red and white parti coat. She's playful in bursts but happy to snuggle up on the couch for hours.",
    imageUrl: "/puppy-redwhite.webp",
  },
  {
    id: "13",
    name: "Cooper",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Apricot",
    price: 4400,
    age: "10 weeks",
    status: "Available",
    description: "Cooper is a social butterfly who's never met a stranger. His warm apricot coat and wagging tail will brighten up any household.",
    imageUrl: "/puppy-plants.webp",
  },
  {
    id: "14",
    name: "Daisy",
    breed: "F1b Cavoodle",
    gender: "Female",
    color: "Golden & Cream",
    price: 5100,
    age: "8 weeks",
    status: "Available",
    description: "Daisy is a laid-back, gentle girl who loves being near her people. Her golden cream coat is soft as a cloud and practically non-shedding.",
    imageUrl: "/puppy-bow.webp",
  },
  {
    id: "15",
    name: "Finn",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Chocolate",
    price: 4500,
    age: "9 weeks",
    status: "Available",
    description: "Finn is a chocolatey dreamboat with the kindest eyes. He's easy-going, adores children, and has already won the hearts of everyone he's met.",
    imageUrl: "/puppy-brown.webp",
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

const PUPPIES_KEY = "purecavoodles_puppies_v3";

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
