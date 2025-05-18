import BlogsContent from "../components/blogComponents/BlogsContent";
import Navbar from "../components/blogComponents/Navbar";
import SideBar from "../components/blogComponents/SideBar";

const BlogPage = () => {
  // In the below component design three sections
  // One Navbar section, second side bar with All Feeds, Filter, myBlogs
  return (
    <div className="w-screen bg-blue-950">
      <Navbar />
      <div className="lg:flex">
        <div className="lg:h-[90vh]">
          <SideBar />
        </div>
        <div className="flex-1  bg-slate-100">
          <BlogsContent />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
