import React from "react";

const SearchBar = ({ search, setSearch, category, setCategory }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 sm:mt-0">
      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search Notes..."
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
      />
      {/* Category Filter */}
      <select
        value={category}
        onChange={handleCategoryChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
      >
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
};

export default SearchBar;
