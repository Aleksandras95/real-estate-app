import { create } from "zustand";
import type { FilterState, FilterActions } from "../types/index";

type FilterStore = FilterState & FilterActions;

export const useFilterStore = create<FilterStore>((set) => ({
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
