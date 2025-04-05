import React from "react";

export default function ProductList({ products, handleEdit, handleDelete }) {
  return (
    <div className="mt-8 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Uploaded Products</h2>
      {products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center bg-white p-4 shadow-md rounded-lg"
            >
              <img
                src={`data:image/jpeg;base64,${product.imageData}`}
                alt={product.name}
                className="w-16 h-16 rounded mr-4"
              />
              <div className="flex-grow">
                <p className="font-semibold">{product.name}</p>
                <p>RS {product.price} .00</p>
                <p>{product.description}</p>
              </div>
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
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
          ))}
        </div>
      )}
    </div>
  );
}
