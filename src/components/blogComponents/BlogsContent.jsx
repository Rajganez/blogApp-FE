import NewBlogCreation from "./NewBlogCreation";
import DisplayBlogs from "./DisplayBlogs";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { useState } from "react";

const BlogsContent = () => {
  const [openCLoseNewBlog, setOpenClose] = useState(true);
  // Divide the component into two section
  // One for the create blogs and another one for displaying the exsiting blogs
  return (
    <div className="px-3">
      {openCLoseNewBlog && (
        <div className="lg:flex lg:flex-col pt-5 lg:px-2 sticky">
          <NewBlogCreation />
        </div>
      )}
      <div>
        {openCLoseNewBlog ? (
          <button
            onClick={() => setOpenClose(false)}
            className="text-3xl text-gray-700 cursor-pointer"
          >
            <FaArrowCircleUp />
          </button>
        ) : (
          <button
            onClick={() => setOpenClose(true)}
            className="text-3xl text-gray-700 cursor-pointer"
          >
            <FaArrowCircleDown />
          </button>
        )}
      </div>
      <div>
        <DisplayBlogs />
      </div>
    </div>
  );
};

export default BlogsContent;
