import React, { useState } from "react";
import { Search } from "lucide-react";

export default function Header({ onLogout }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/products/search?keyword=${encodeURIComponent(
          searchTerm
        )}`
      );
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between mx-[44px]">
          <div className="text-2xl font-bold text-blue-600">Autovault</div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                onClick={handleSearch}
                className="absolute left-3 top-2.5 text-gray-500 w-5 h-5 cursor-pointer hover:text-blue-600"
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Product Results */}
      <div className="px-[70px] py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden p-4 flex flex-col"
            >
              {/* {product.image ? (
                <img
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt={product.name}
                  className="w-64 h-auto object-contain mb-4"
                />
              ) : (
                <div className="w-64 h- bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )} */}
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {product.description}
              </p>
              <p className="text-blue-600 font-bold mt-2">
                Rs. {product.price}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-gray-500 text-center">
            {searchTerm
              ? `No products found for "${searchTerm}"`
              : "Search for a product"}
          </div>
        )}
      </div>
    </>
  );
}
