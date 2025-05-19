import { lazy, Suspense } from "react";

const BlogsContent = lazy(() =>
  import("../components/blogComponents/BlogsContent")
);
const Navbar = lazy(() => import("../components/blogComponents/Navbar"));
const SideBar = lazy(() => import("../components/blogComponents/SideBar"));

const BlogPage = () => {
  // In the below component design three sections
  // One Navbar section, second side bar with All Feeds, Filter, myBlogs
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center bg-blue-950 text-white text-xl">
          Loading Blog Page...
        </div>
      }
    >
      <div className="w-screen bg-blue-950">
        <Navbar />
        <div className="lg:flex">
          <div className="">
            <SideBar />
          </div>
          <div className="flex-1  bg-slate-100">
            <BlogsContent />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default BlogPage;
