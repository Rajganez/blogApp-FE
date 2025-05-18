import { useState } from "react";
import { clientAPI } from "../../api/api-axios.js";
import { GET_ALL_BLOGS } from "../../api/constants.js";
import useBlogStore from "../../store/zustandStore.js";

const NewBlogCreation = () => {
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

  const [error, setError] = useState("");

  const initialValue = {
    topic: "",
    content: "",
    category: "",
  };

  const [content, setContent] = useState(initialValue);
  const getId = localStorage.getItem("id");
  const getName = localStorage.getItem("name");

  // Store the blogs in zustand store
  const { flipToggle } = useBlogStore();

  // Form Onchange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addBlogAPI = async (formData) => {
    try {
      const response = await clientAPI.post(GET_ALL_BLOGS, formData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        alert("Published");
        flipToggle();
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          alert("Blog not Published");
        } else {
          alert(data?.msg || "Unexpected Error Occured");
        }
      }
    }
  };

  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      content.topic === "" ||
      content.content === "" ||
      content.category === ""
    ) {
      setError("All fields are required");
    } else {
      // Temp data created to add the id and name of the logged user in the payload
      const tempData = {
        ...content,
        userId: getId,
        author: getName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      // Pass the formData with the additional values and sent it to API payload
      addBlogAPI(tempData);
      setError("");
      setContent(initialValue);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-1">
      <h2 className="text-center text-blue-900 font-bold font-mono">
        Create Your Blog
      </h2>
      {/* Category Section */}
      <div className="lg:text-lg text-sm flex lg:flex-row">
        <div className="flex lg:flex-none">
          <span>Category</span> <span className="text-red-500">*</span>
        </div>
        <div className="lg:ml-20 ml-10">
          <select
            name="category"
            value={content.category}
            onChange={handleChange}
            className="border rounded-md px-1 lg:w-2xl w-10/12"
          >
            <option value="">Select</option>
            {categoryToSelect.map((category, ind) => (
              <option key={ind} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Topic Section */}
      <div className="lg:text-lg text-sm flex flex-row">
        <div className="flex lg:flex-none">
          <span>Topic</span> <span className="text-red-500">*</span>
        </div>
        <div className="lg:ml-28 ml-14">
          <input
            type="text"
            name="topic"
            value={content.topic}
            onChange={handleChange}
            placeholder="Title for your Content"
            className="px-2 py-0.5 lg:w-2xl w-10/12 border rounded"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="lg:text-lg text-sm flex flex-row">
        <div className="flex lg:flex-none">
          <span>Content</span> <span className="text-red-500">*</span>
        </div>
        <div className="lg:ml-24 ml-12">
          <textarea
            name="content"
            value={content.content}
            onChange={handleChange}
            placeholder="Your Content"
            className="px-2 py-1 lg:w-2xl w-48 lg:h-20 h-18 border rounded resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-end">
        <button
          className="border lg:px-2 lg:py-2 p-1 rounded-2xl cursor-pointer bg-green-200 hover:bg-green-400"
          onClick={handleSubmit}
        >
          Publish your Blog
        </button>
      </div>
      {error && <div className="text-xs text-red-800">{error}</div>}
    </div>
  );
};

export default NewBlogCreation;
