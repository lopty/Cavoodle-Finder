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
    imageUrl: "/client-puppy-white-tan.png",
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
    name: "Megan",
    breed: "F1b Cavoodle",
    gender: "Female",
    color: "Golden & White",
    price: 5000,
    age: "8 weeks",
    status: "Available",
    description: "Megan is an absolute sweetheart with the most beautiful golden and white coat. She's confident, curious, and loves meeting new people.",
    imageUrl: "/client-puppy-tricolor.png",
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
    imageUrl: "/client-puppy-red-couch.png",
  },
  {
    id: "6",
    name: "Sandy",
    breed: "F1 Cavoodle",
    gender: "Female",
    color: "Black",
    price: 4800,
    age: "7 weeks",
    status: "Available",
    description: "Sandy is a stunning jet-black Cavoodle with the most soulful eyes. She's calm, loving, and utterly unique — rare black coats like hers are highly sought after.",
    imageUrl: "/client-puppy-black-white.png",
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
    name: "Rosie",
    breed: "F1 Cavoodle",
    gender: "Female",
    color: "Chocolate",
    price: 4700,
    age: "9 weeks",
    status: "Available",
    description: "Rosie is a gorgeous chocolate Cavoodle who loves the outdoors. She's confident, playful, and brilliant with children of all ages.",
    imageUrl: "/client-puppy-chocolate.png",
  },
  {
    id: "9",
    name: "Charlie",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Golden & Cream",
    price: 4300,
    age: "10 weeks",
    status: "Available",
    description: "Charlie is the most laid-back boy in the litter — already perfectly settled and happy to snooze the day away. A dream puppy for any home.",
    imageUrl: "/client-puppy-white.png",
  },
  {
    id: "10",
    name: "Luna",
    breed: "F1b Cavoodle",
    gender: "Female",
    color: "Golden",
    price: 5400,
    age: "8 weeks",
    status: "Available",
    description: "Luna has a stunning golden fleece coat that's practically non-shedding. She's a quiet, gentle girl who loves laps and long cuddles.",
    imageUrl: "/client-puppy-apricot.png",
  },
  {
    id: "11",
    name: "Oscar",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Apricot",
    price: 4600,
    age: "9 weeks",
    status: "Available",
    description: "Oscar is a bold, adventurous boy with the most striking apricot coat. He loves to explore and will keep the whole family entertained.",
    imageUrl: "/client-puppy-apricot.png",
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
    name: "Cooper",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Red & White",
    price: 4400,
    age: "10 weeks",
    status: "Available",
    description: "Cooper is a social butterfly with a beautiful red and white parti coat. His warm personality and wagging tail will brighten up any household.",
    imageUrl: "/client-puppy-tricolor.png",
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
    name: "Finn",
    breed: "F1 Cavoodle",
    gender: "Male",
    color: "Chocolate",
    price: 4500,
    age: "9 weeks",
    status: "Available",
    description: "Finn is a chocolatey dreamboat with the kindest eyes. He's easy-going, adores children, and has already won the hearts of everyone he's met.",
    imageUrl: "/client-puppy-chocolate.png",
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

export function usePuppies() {
  const [puppies, setPuppies] = useState<Puppy[]>(() => {
    try {
      const stored = localStorage.getItem(PUPPIES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const refreshed = parsed.map((puppy: Puppy) => ({
            ...puppy,
            imageUrl: LEGACY_PUPPY_IMAGES[puppy.imageUrl] ?? puppy.imageUrl,
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
