import { useState } from "react";
import axios from "axios";

export default function App() {
  const [productName, setProductName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !file) {
      setMessage("Please enter a product name and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(response.data);
      setProductName("");
      setFile(null);
    } catch (error) {
      setMessage("Error uploading product.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Product Upload App</h1>
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Upload Product</h2>
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
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
