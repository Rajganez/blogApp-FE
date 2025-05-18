import { create } from "zustand";

const useBlogStore = create((set) => ({
  toggleMyBlog: false,
  flipMyBlogToggleToTrue: () => set({ toggleMyBlog: true }),
  flipMyBlogToggleToFalse: () => set({ toggleMyBlog: false }),
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
