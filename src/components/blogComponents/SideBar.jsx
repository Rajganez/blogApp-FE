import { useState } from "react";

const SideBar = () => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filters, setFilters] = useState({
    selectAll: false,
    author: false,
    category: false,
  });

  const handleCheckboxChange = (option) => {
    if (option === "selectAll") {
      const newValue = !filters.selectAll;
      setFilters({
        selectAll: newValue,
        author: newValue,
        category: newValue,
      });
    } else {
      setFilters({
        selectAll: false,
        author: option === "author" ? !filters.author : false,
        category: option === "category" ? !filters.category : false,
      });
    }
  };

  return (
    <div className="lg:w-36">
      <div className="flex lg:flex-col gap-8 lg:mt-20 mt-5 text-justify ml-3">
        <div>
          <button className="hover:text-blue-400 lg:text-2xl text-sm font-serif text-blue-600 cursor-pointer">
            All Blogs
          </button>
        </div>

        <div>
          <button
            className="hover:text-blue-400 lg:text-2xl text-sm font-serif text-blue-600 cursor-pointer"
            onClick={() => setShowFilterOptions(!showFilterOptions)}
          >
            Filter
          </button>

          {showFilterOptions && (
            <div className="lg:mt-2 mt-1">
              <div className="flex items-center">
                <input
                  id="selectAll"
                  type="checkbox"
                  checked={filters.selectAll}
                  onChange={() => handleCheckboxChange("selectAll")}
                  className="md:w-4 md:h-4 w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="selectAll"
                  className="ms-2 md:text-sm md:font-medium text-xs text-blue-400"
                >
                  Select All
                </label>
              </div>

              <div className="flex items-center mt-1 ml-2">
                <input
                  id="author"
                  type="checkbox"
                  checked={filters.author}
                  onChange={() => handleCheckboxChange("author")}
                  className="md:w-4 md:h-4 w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="author"
                  className="ms-2 md:text-sm md:font-medium text-xs text-blue-400"
                >
                  Author
                </label>
              </div>

              <div className="flex items-center mt-1 ml-2">
                <input
                  id="category"
                  type="checkbox"
                  checked={filters.category}
                  onChange={() => handleCheckboxChange("category")}
                  className="md:w-4 md:h-4 w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="category"
                  className="ms-2 md:text-sm md:font-medium text-xs text-blue-400"
                >
                  Category
                </label>
              </div>
            </div>
          )}
        </div>

        <div>
          <button className="hover:text-blue-400 lg:text-2xl text-sm font-serif text-blue-600 cursor-pointer">
            My Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
