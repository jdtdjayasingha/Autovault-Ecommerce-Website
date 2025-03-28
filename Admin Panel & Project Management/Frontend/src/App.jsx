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
    <div style={{ alignItems: "center", textAlign: "center" }}>
      <h1>Autovault Admin Module</h1>

      {message && <p>{message}</p>}

      <div>
        <input
          style={{ padding: "10px" }}
          type="text"
          placeholder="Vehicle ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <br />
        <br />
        <input
          style={{ padding: "10px", width: "300px" }}
          type="text"
          placeholder="Vehicle Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <br />
        <br />
        <button
          style={{ padding: "10px", width: "100px" }}
          onClick={saveProduct}
        >
          {productId ? "Save" : "Save"}
        </button>
      </div>

      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.id}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {product.name}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                style={{ padding: "5px", width: "50px" }}
                onClick={() => {
                  setProductId(product.id);
                  setProductName(product.name);
                }}
              >
                Edit
              </button>{" "}
              &nbsp;
              <button
                style={{ padding: "5px", width: "50px" }}
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
