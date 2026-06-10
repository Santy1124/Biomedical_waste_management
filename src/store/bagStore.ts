import { create } from "zustand";
import { persist } from "zustand/middleware";
import { bags as initialBags } from "../data/mockData";
import type { Bag, BagStatus } from "../types/bmw";

type NewBagInput = {
  category: Bag["category"];
  department: string;
  weight: string;
};

type BagStore = {
  bags: Bag[];
  addBag: (bag: NewBagInput) => Bag;
  updateBagStatus: (bagId: string, status: BagStatus) => void;
  findBag: (bagId: string) => Bag | undefined;
  resetBags: () => void;
};

const categoryPrefix: Record<Bag["category"], string> = {
  Yellow: "YEL",
  Red: "RED",
  White: "WHT",
  Blue: "BLU",
};

export const useBagStore = create<BagStore>()(
  persist(
    (set, get) => ({
      bags: initialBags,

      addBag: (input) => {
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

        set((state) => ({
          bags: [newBag, ...state.bags],
        }));

        return newBag;
      },

      updateBagStatus: (bagId, status) => {
        set((state) => ({
          bags: state.bags.map((bag) =>
            bag.id === bagId
              ? {
                  ...bag,
                  status,
                  currentLocation:
                    status === "Collected"
                      ? "Trolley"
                      : status === "In Storage"
                      ? `${bag.category} Zone`
                      : status === "Ready for Pickup"
                      ? "Pickup Bay"
                      : status === "In Transit"
                      ? "CBWTF Vehicle"
                      : status === "Treated"
                      ? "Treatment Complete"
                      : status === "Disputed"
                      ? "Hold Zone"
                      : bag.currentLocation,
                }
              : bag
          ),
        }));
      },

      findBag: (bagId) =>
        get().bags.find(
          (bag) => bag.id.toLowerCase() === bagId.trim().toLowerCase()
        ),

      resetBags: () => {
        set({ bags: initialBags });
      },
    }),
    {
      name: "bmw-bag-store",
    }
  )
);