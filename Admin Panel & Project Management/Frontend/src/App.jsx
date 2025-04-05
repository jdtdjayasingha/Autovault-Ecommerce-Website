import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./components/ProductForm";
import Header from "./components/Header";
import Login from "./components/Login";

export default function App() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  // Handle Create and Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !file || !price || !description) {
      setMessage(
        "Please enter all fields: name, price, description, and select an image."
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("file", file);

    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:8080/admin/products/${editingProduct.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setMessage("Product updated successfully!");
      } else {
        await axios.post("http://localhost:8080/admin/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Product uploaded successfully!");
      }

      resetForm();
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
    setShowForm(true);
  };

  const handleOpenForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleCloseForm = () => {
    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setProductName("");
    setPrice("");
    setDescription("");
    setFile(null);
    setEditingProduct(null);
    setMessage("");
  };

  const handleLogout = () => {
    // Set isLoggedIn to false to show the login page again
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div className="bg-gray-100 ">
          <Header onLogout={handleLogout} />
          <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 mx-12">
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
            <div className="mt-8 mx-auto w-full">
              <button
                onClick={handleOpenForm}
                className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add New Vehicle
              </button>
              {products.length === 0 ? (
                <p>No products uploaded yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center text-center"
                    >
                      <img
                        src={`data:image/jpeg;base64,${product.imageData}`}
                        alt={product.name}
                        className="w-auto h-38 object-cover rounded mb-auto"
                      />
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-700">
                        RS {product.price}.00
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.description}
                      </p>
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-yellow-500 text-white px-6 py-1 rounded hover:bg-yellow-600"
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
          </div>

          <footer className="text-gray-400 py-4 text-center bg-white shadow-inner">
            <p>
              &copy; {new Date().getFullYear()} Autovault. All rights reserved.
            </p>
          </footer>
        </div>
      )}
    </>
  );
}
