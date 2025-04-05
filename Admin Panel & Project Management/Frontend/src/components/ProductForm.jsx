// src/components/ProductForm.jsx
import React from "react";

export default function ProductForm({
  productName,
  setProductName,
  price,
  setPrice,
  description,
  setDescription,
  file,
  setFile,
  handleSubmit,
  editingProduct,
  message,
  onClose, // Add a close function
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          {editingProduct ? "Update Vehicle" : "Upload Vehicle"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Vehicle Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Sale Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Vehicle Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <div className="flex justify-center">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L4 7m3-3l3 3m4 1h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h3"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editingProduct ? "Update" : "Upload"}
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
