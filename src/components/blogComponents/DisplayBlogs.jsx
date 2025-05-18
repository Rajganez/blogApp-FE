import { useEffect, useState } from "react";
import { clientAPI } from "../../api/api-axios.js";
import { GET_ALL_BLOGS } from "../../api/constants.js";
import useBlogStore from "../../store/zustandStore.js";

const DisplayBlogs = () => {
  const [displayAllBlogs, setDisplayAllBlogs] = useState([]);

  const toggle = useBlogStore((state) => state.toggle);

  // Function to get all the Blogs
  const getBlogsAPI = async () => {
    try {
      const response = await clientAPI.get(GET_ALL_BLOGS, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setDisplayAllBlogs(response.data.getBlogs);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          alert("No Blogs Found");
        } else {
          alert(data?.msg || "Unexpected Error Occured");
        }
      }
    }
  };

  // Add the dependencies in case if the user created a error to render realtime
  useEffect(() => {
    getBlogsAPI();
  }, [toggle]);

  return (
    <div className="p-1">
      <h2 className="text-center text-blue-900 font-bold font-mono text-2xl mb-6">
        Blog Feeds
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayAllBlogs &&
          displayAllBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {blog.topic}
              </h3>
              <p className="text-sm text-indigo-600 mb-1 font-medium">
                Category: {blog.category}
              </p>
              <p className="text-gray-700 text-sm mb-3">{blog.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <p>Author: {blog.author}</p>
                <p>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayBlogs;
