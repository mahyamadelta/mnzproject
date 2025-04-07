import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center my-5">
      <input
        type="text"
        className="w-3/5 p-2 border border-gray-300 rounded-l-md text-base"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 bg-blue-600 text-white rounded-r-md text-base hover:bg-blue-800"
      >
        🔍
      </button>
    </form>
  );
}