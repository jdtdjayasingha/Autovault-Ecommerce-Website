import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./components/ProductForm";

export default function App() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

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
    formData.append("price", price);
    formData.append("description", description);
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
      setShowForm(false);
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
    setShowForm(true);
  };

  const handleOpenForm = () => {
    setEditingProduct(null);
    setProductName("");
    setPrice("");
    setDescription("");
    setFile(null);
    setMessage("");
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setProductName("");
    setPrice("");
    setDescription("");
    setFile(null);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Product Management App</h1>

      <button
        onClick={handleOpenForm}
        className="mb-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add New Product
      </button>

      {/* Modal Form */}
      {showForm && (
        <ProductForm
          productName={productName}
          setProductName={setProductName}
          price={price}
          setPrice={setPrice}
          description={description}
          setDescription={setDescription}
          file={file}
          setFile={setFile}
          handleSubmit={handleSubmit}
          editingProduct={editingProduct}
          message={message}
          onClose={handleCloseForm}
        />
      )}

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
                  className="w-16 h-16 rounded mr-4 object-cover"
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
