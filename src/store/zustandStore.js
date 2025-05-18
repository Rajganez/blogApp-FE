import { create } from "zustand";

const useBlogStore = create((set) => ({
  toggle: false,
  flipToggle: () =>
    set((state) => ({
      toggle: !state.toggle,
    })),
}));

export default useBlogStore;
