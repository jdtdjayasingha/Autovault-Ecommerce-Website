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
}) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">{editingProduct ? "Update Product" : "Upload Product"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {editingProduct ? "Update" : "Upload"}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
