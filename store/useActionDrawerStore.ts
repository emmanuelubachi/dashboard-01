import { create } from "zustand";

type FilterState = {
  isDrawerOpen: boolean;
  actionDrawerContent: React.ReactNode; // New state for dynamic content

  toggleDrawer: () => void;
  setDrawerContent: (content: React.ReactNode) => void;

  openDrawer: () => void;
  closeDrawer: () => void;
};

const useActionDrawerStore = create<FilterState>((set) => ({
  isDrawerOpen: false,
  actionDrawerContent: null,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setDrawerContent: (content) => set({ actionDrawerContent: content }),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false, actionDrawerContent: null }),
}));

export default useActionDrawerStore;
