import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

export default function App() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState("");

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
        await axios.put(`http://localhost:8080/admin/products/${editingProduct.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Product updated successfully!");
      } else {
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

  const handleEdit = (product) => {
    setProductName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setEditingProduct(product);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Product Management App</h1>

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
      />

      <ProductList
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
