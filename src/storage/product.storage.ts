import { create } from "zustand";

interface ProductsPageState {
  scrollY: number;
  setScrollY: (y: number) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export const useProductsPageStore = create<ProductsPageState>((set) => ({
  scrollY: 0,
  setScrollY: (y) => set({ scrollY: y }),
  activeCategory: "all",
  setActiveCategory: (cat) => set({ activeCategory: cat }),
}));
