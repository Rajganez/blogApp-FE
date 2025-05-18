import { create } from "zustand";

const useBlogStore = create((set) => ({
  myBlogs: [],
  setMyBlogs: (myblog) => set({ myBlogs: myblog }),
  authors: [],
  setAuthors: (author) => set({ authors: author }),
  blogs: [],
  setBlogs: (newBlogs) => set({ blogs: newBlogs }),
  toggleWhenAdded: false,
  flipToggle: () =>
    set((state) => ({
      toggleWhenAdded: !state.toggleWhenAdded,
    })),
}));

export default useBlogStore;
