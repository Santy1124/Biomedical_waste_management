import { create } from "zustand";
import {
  createBagInDb,
  getBags,
  updateBagStatusInDb,
} from "../services/bagService";
import type { Bag, BagStatus } from "../types/bmw";

type NewBagInput = {
  category: Bag["category"];
  department: string;
  weight: string;
};

type BagStore = {
  bags: Bag[];
  loading: boolean;
  error: string;
  loadBags: () => Promise<void>;
  addBag: (bag: NewBagInput) => Promise<Bag>;
  updateBagStatus: (bagId: string, status: BagStatus) => Promise<void>;
  findBag: (bagId: string) => Bag | undefined;
};

const categoryPrefix: Record<Bag["category"], string> = {
  Yellow: "YEL",
  Red: "RED",
  White: "WHT",
  Blue: "BLU",
};

function getLocationForStatus(status: BagStatus, bag: Bag) {
  if (status === "Collected") return "Trolley";
  if (status === "In Storage") return `${bag.category} Zone`;
  if (status === "Ready for Pickup") return "Pickup Bay";
  if (status === "In Transit") return "CBWTF Vehicle";
  if (status === "Treated") return "Treatment Complete";
  if (status === "Disputed") return "Hold Zone";
  return bag.currentLocation;
}

export const useBagStore = create<BagStore>((set, get) => ({
  bags: [],
  loading: false,
  error: "",

  loadBags: async () => {
    try {
      set({ loading: true, error: "" });
      const bags = await getBags();
      set({ bags, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to load bags", loading: false });
    }
  },

  addBag: async (input) => {
    const randomId = Math.floor(100 + Math.random() * 900);

    const newBag: Bag = {
      id: `BMW-${categoryPrefix[input.category]}-${randomId}`,
      category: input.category,
      department: input.department,
      status: "Created",
      age: "0h",
      risk: "Normal",
      weight: input.weight || "Pending",
      currentLocation: input.department,
    };

    const savedBag = await createBagInDb(newBag);

    set((state) => ({
      bags: [savedBag, ...state.bags],
    }));

    return savedBag;
  },

  updateBagStatus: async (bagId, status) => {
    const existingBag = get().bags.find((bag) => bag.id === bagId);
    if (!existingBag) return;

    const currentLocation = getLocationForStatus(status, existingBag);
    const updatedBag = await updateBagStatusInDb(bagId, status, currentLocation);

    set((state) => ({
      bags: state.bags.map((bag) =>
        bag.id === bagId ? updatedBag : bag
      ),
    }));
  },

  findBag: (bagId) =>
    get().bags.find(
      (bag) => bag.id.toLowerCase() === bagId.trim().toLowerCase()
    ),
}));