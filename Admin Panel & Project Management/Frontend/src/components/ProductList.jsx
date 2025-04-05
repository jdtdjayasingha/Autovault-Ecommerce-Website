import React from "react";

export default function ProductList({ products, handleEdit, handleDelete }) {
  return (
    <div className="mt-8 w-full max-w-7xl">
      <h2 className="text-xl font-bold mb-4">Uploaded Products</h2>
      {products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center text-center"
            >
              <img
                src={`data:image/jpeg;base64,${product.imageData}`}
                alt={product.name}
                className="w-32 h-32 object-cover rounded mb-4"
              />
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600 mb-1">{product.description}</p>
              <p className="text-green-600 font-medium mb-2">RS {product.price}.00</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
