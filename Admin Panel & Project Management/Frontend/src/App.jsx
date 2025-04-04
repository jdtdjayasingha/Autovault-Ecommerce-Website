import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Create and Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !file || !price || !description) {
      setMessage("Please enter all fields: name, price, description, and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);  // Add price to FormData
    formData.append("description", description);  // Add description to FormData
    formData.append("file", file);

    try {
      if (editingProduct) {
        // Update existing product
        await axios.put(`http://localhost:8080/admin/products/${editingProduct.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Product updated successfully!");
      } else {
        // Create new product
        await axios.post("http://localhost:8080/admin/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Product uploaded successfully!");
      }

      setProductName("");
      setPrice("");
      setDescription("");
      setFile(null);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      setMessage("Error uploading/updating product.");
      console.error("Error:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/products/${id}`);
      setMessage("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      setMessage("Error deleting product.");
      console.error("Error:", error);
    }
  };

  // Set product for editing
  const handleEdit = (product) => {
    setProductName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setEditingProduct(product);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Product Management App</h1>

      {/* Upload/Update Form */}
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

      {/* Display Products */}
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Uploaded Products</h2>
        {products.length === 0 ? (
          <p>No products uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center bg-white p-4 shadow-md rounded-lg">
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
    </div>
  );
}
