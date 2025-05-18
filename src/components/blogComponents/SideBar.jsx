import { useEffect, useState } from "react";
import { clientAPI } from "../../api/api-axios";
import { FILTER_BLOGS } from "../../api/constants";
import useBlogStore from "../../store/zustandStore.js";

const SideBar = () => {
  const [showAuthors, setShowAuthors] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

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

  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const getId = localStorage.getItem("id");
  const { setBlogs } = useBlogStore();
  const { authors } = useBlogStore();

  const handleAuthorToggle = (author) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleAuthorClick = () => {
    setShowAuthors((prev) => !prev);
    setShowCategory(false);
  };

  const handleCategoryClick = () => {
    setShowCategory((prev) => !prev);
    setShowAuthors(false);
  };

  const handleClear = (filters) => {
    if (filters === "author") {
      setSelectedAuthors([]);
      setShowAuthors(false);
    } else if (filters === "category") {
      setSelectCategory([]);
      setShowCategory(false);
    }
  };

  const handleAllBlogs = (e) => {
    e.preventDefault();
    setSelectedAuthors([]);
    setSelectCategory([]);
    setShowAuthors(false);
    setShowCategory(false);
  };

  const filterBlogsAPI = async () => {
    try {
      const response = await clientAPI.get(
        FILTER_BLOGS(selectCategory, selectedAuthors),
        { withCredentials: true }
      );
      if (response.status === 200) {
        setBlogs(response.data.filteredBlogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filterBlogsAPI();
  }, [selectCategory, selectedAuthors]);

  return (
    <div className="lg:w-36">
      <div className="flex lg:flex-col gap-8 lg:mt-20 mt-5 text-justify ml-3">
        <div>
          <button
            className="hover:text-blue-400 lg:text-2xl text-sm font-thin text-white cursor-pointer"
            onClick={handleAllBlogs}
          >
            All Blogs
          </button>
        </div>

        <div className="lg:mt-2 mt-1">
          <div className="hover:text-blue-400 lg:text-2xl text-sm font-thin text-white cursor-pointer">
            <button onClick={handleAuthorClick}>Author</button>
          </div>

          {showAuthors && (
            <div>
              <div className="text-end">
                <button
                  className="text-xs text-yellow-300 underline"
                  onClick={() => handleClear("author")}
                >
                  clear
                </button>
              </div>

              {authors.map((author) => (
                <div key={author} className="flex items-center mt-1 ml-2">
                  <input
                    id={author}
                    type="checkbox"
                    checked={selectedAuthors.includes(author)}
                    onChange={() => handleAuthorToggle(author)}
                    className="md:w-4 md:h-4 w-3 h-3 text-white bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={author}
                    className="ms-2 md:text-sm md:font-medium text-xs text-blue-400"
                  >
                    {author}
                  </label>
                </div>
              ))}
            </div>
          )}

          <div className="hover:text-blue-400 lg:text-2xl text-sm font-thin text-white cursor-pointer mt-2">
            <button onClick={handleCategoryClick}>Category</button>
          </div>

          {showCategory && (
            <div>
              <div className="text-end">
                <button
                  className="text-xs text-yellow-300 underline"
                  onClick={() => handleClear("category")}
                >
                  clear
                </button>
              </div>
              {categoryToSelect.map((category) => (
                <div key={category} className="flex items-center mt-1 ml-2">
                  <input
                    id={category}
                    type="checkbox"
                    checked={selectCategory.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="md:w-4 md:h-4 w-3 h-3 text-white bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={category}
                    className="ms-2 md:text-sm md:font-medium text-xs text-blue-400"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <button className="hover:text-blue-400 lg:text-2xl text-sm font-thin text-white cursor-pointer">
            My Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
