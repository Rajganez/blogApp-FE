import { useEffect, useState } from "react";
import { clientAPI } from "../../api/api-axios.js";
import {
  DELETE_BLOG_ROUTE,
  EDIT_BLOG_ROUTE,
  GET_ALL_BLOGS,
} from "../../api/constants.js";
import useBlogStore from "../../store/zustandStore.js";

const DisplayBlogs = () => {
  // State to display all the blogs stored from the API
  const [displayAllBlogs, setDisplayAllBlogs] = useState([]);
  // State to store the data from API for the logged user
  const [myBlog, setMyBlogs] = useState([]);
  // Render the component when user edit or delete the blogs
  const [renderOnEdit, setRenderOnEdit] = useState(false);
  const [renderOnDelete, setRenderOnDelete] = useState(false);

  // Predefined array for category
  const categoryToSelect = [
    "Personal Development",
    "Health & Fitness",
    "Food & Recipes",
    "Travel",
    "Finance & Money Management",
    "Technology",
    "Parenting & Family",
    "Education / Study Tips",
    "Fashion & Beauty",
    "Lifestyle",
    "Career & Job Search",
    "Entrepreneurship / Startups",
    "Digital Marketing",
    "Photography",
    "DIY & Crafts",
    "Gaming",
    "Book Reviews",
    "Movies & TV Shows",
    "Pet Care",
    "Sustainability / Eco-Living",
  ];
  // Open/close Modal state to edit the blogs
  const [editModalOpen, setEditModalOpen] = useState(false);
  // Form data for the editted blogs
  const [editData, setEditData] = useState({
    topic: "",
    content: "",
    category: "",
  });

  // State management store to update the state variables
  const toggleWhenAdded = useBlogStore((state) => state.toggleWhenAdded);
  const { blogs, setAuthors, toggleMyBlog, flipMyBlogToggleToTrue } =
    useBlogStore();
  // Get the id to render the myBlogs
  const getId = localStorage.getItem("id");

  // API to get All the blogs
  const getBlogsAPI = async () => {
    try {
      const response = await clientAPI.get(GET_ALL_BLOGS, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setDisplayAllBlogs(response.data.getBlogs);
        // set the array with the authors
        const getAllAuthors = response.data.getBlogs.map((val) => val.author);
        const uniqueAuthors = [...new Set(getAllAuthors)];
        setAuthors(uniqueAuthors);
        // Filter the blogs to display the myBlogs of logged user
        setMyBlogs(
          response.data.getBlogs.filter((val) => val.userId === getId)
        );
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          alert("No Blogs Found");
        } else {
          alert(data?.msg || "Unexpected Error Occurred");
        }
      }
    }
  };

  useEffect(() => {
    getBlogsAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleWhenAdded, renderOnEdit, renderOnDelete]);

  const handleEdit = (blog) => {
    setEditData(blog);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Edit API
  const handleSaveEditAPI = async () => {
    try {
      const response = await clientAPI.put(
        `${EDIT_BLOG_ROUTE}/${editData._id}`,
        editData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setEditModalOpen(false);
        setMyBlogs((prevBlog) =>
          prevBlog.map((val) =>
            val._id === response.data._id ? response.data.blog : val
          )
        );
        setRenderOnEdit(!renderOnEdit);
        flipMyBlogToggleToTrue();
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) alert("Blog not found. Something went wrong");
        else {
          alert(data?.msg || "Unexpected Error");
        }
      }
    }
  };

  // Delete API
  const handleDelete = async (id) => {
    try {
      const response = await clientAPI.delete(`${DELETE_BLOG_ROUTE}/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setRenderOnDelete(!renderOnDelete);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-1">
      <h2 className="text-center text-blue-900 font-bold font-mono text-2xl mb-6">
        Blog Feeds
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(toggleMyBlog
          ? myBlog
          : blogs.length > 0
          ? blogs
          : displayAllBlogs
        ).map((blog) => (
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

            {toggleMyBlog && (
              <div className="mt-4 flex justify-end gap-3">
                <button
                  className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Edit Blog</h2>
            <input
              type="text"
              name="topic"
              placeholder="Topic"
              value={editData.topic}
              onChange={handleEditChange}
              className="w-full p-2 border mb-3 rounded"
            />
            <select
              name="category"
              value={editData.category}
              onChange={handleEditChange}
              className="w-full p-2 border mb-3 rounded"
            >
              <option value="">Select Category</option>
              {categoryToSelect.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <textarea
              name="content"
              placeholder="Content"
              value={editData.content}
              onChange={handleEditChange}
              rows={4}
              className="w-full p-2 border mb-3 rounded"
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditAPI}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayBlogs;
