import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/product/getProduct"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const saveProduct = async () => {
    if (!productName) {
      setMessage("Product name cannot be empty");
      return;
    }

    try {
      let response;
      if (productId) {
        response = await axios.put(
          "http://localhost:8080/api/v1/product/updateProduct",
          {
            id: productId,
            name: productName,
          }
        );
        setMessage("Product updated successfully");
      } else {
        response = await axios.post(
          "http://localhost:8080/api/v1/product/saveProduct",
          {
            id: productId,
            name: productName,
          }
        );
        setMessage("Product saved successfully");
      }

      setProductName("");
      setProductId("");
      getProducts();
    } catch (error) {
      console.error("Error saving or updating product:", error);
      setMessage("Error occurred while saving/updating product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete("http://localhost:8080/api/v1/product/deleteProduct", {
        data: { id },
      });
      setMessage("Product deleted successfully");
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error occurred while deleting product");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Autovault Admin Module
      </h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <input
          className="w-full p-2 border border-gray-300 rounded mb-4"
          type="text"
          placeholder="Vehicle ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded mb-4"
          type="text"
          placeholder="Vehicle Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={saveProduct}
        >
          {productId ? "Save" : "Save"}
        </button>
      </div>

      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Product List
        </h2>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center border-b border-gray-200 p-2 last:border-none"
            >
              <span className="text-gray-700">{product.id}</span>
              <span className="text-gray-700">{product.name}</span>
              <div>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition"
                  onClick={() => {
                    setProductId(product.id);
                    setProductName(product.name);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
