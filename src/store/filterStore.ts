import { create } from "zustand";

type FilterState = {
  location: string;
  priceRange: [number, number];
  price: string;
  type: string;
  bedrooms: number | null;
  deal_type: string;
  bathrooms: number | null;
  setLocation: (value: string) => void;
  setPrice: (value: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setDealType: (value: string) => void;
  setType: (value: string) => void;
  setBedrooms: (value: number | null) => void;
  setBathrooms: (value: number | null) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  location: "",
  price: "",
  priceRange: [0, 0],
  type: "",
  deal_type: "",
  bedrooms: null,
  bathrooms: null,

  setLocation: (value) => set({ location: value }),
  setPrice: (value) => set({ price: value }),
  setPriceRange: (range) => set({ priceRange: range }),
  setDealType: (value) => set({ deal_type: value }),
  setType: (value) => set({ type: value }),
  setBedrooms: (value) => set({ bedrooms: value }),
  setBathrooms: (value) => set({ bathrooms: value }),
  resetFilters: () =>
    set({
      location: "",
      price: "",
      priceRange: [0, 0],
      type: "",
      deal_type: "",
      bedrooms: null,
      bathrooms: null,
    }),
}));
