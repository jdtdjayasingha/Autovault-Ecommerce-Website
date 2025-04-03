import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API Utility Functions
const API_URL = 'http://localhost:8080/admin'; // Your backend URL

// Product API Calls
const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products', error);
    return [];  // Return an empty array if there's an error
  }
};

const createProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error('Error creating product', error);
    return null;
  }
};

const updateProduct = async (product) => {
  try {
    const response = await axios.put(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product', error);
    return null;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/products`, { data: { id: productId } });
    return response.data;
  } catch (error) {
    console.error('Error deleting product', error);
  }
};

// Image API Calls
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await axios.post(`${API_URL}/images/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image', error);
  }
};

const getAllImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/images`);
    console.log('Fetched images:', response.data);  // Log the response to check the structure
    return Array.isArray(response.data) ? response.data : [];  // Ensure it's an array
  } catch (error) {
    console.error('Error fetching images', error);
    return [];  // Return an empty array if there's an error
  }
};

const deleteImage = async (imageId) => {
  try {
    const response = await axios.delete(`${API_URL}/images/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting image', error);
  }
};

function App() {
  // Product state
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState('');  // Add productId state
  const [productName, setProductName] = useState('');

  // Image state
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  // Fetch products and images
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };

    const fetchImages = async () => {
      const data = await getAllImages();
      setImages(data);  // Set images state only if it's an array
    };

    fetchProducts();
    fetchImages();
  }, []);

  // Product CRUD Operations
  const handleProductCreate = async (e) => {
    e.preventDefault();
    if (productName.trim() === '' || productId.trim() === '') {
      alert('Product name and ID cannot be empty!');
      return;
    }
    const newProduct = { id: productId, name: productName };  // Send productId here
    const product = await createProduct(newProduct);
    if (product) {
      setProducts([...products, product]);
      setProductId('');
      setProductName('');
    }
  };

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    if (productName.trim() === '' || !selectedProduct?.id) {
      alert('Product name and ID cannot be empty!');
      return;
    }
    const updatedProduct = { ...selectedProduct, name: productName };
    const product = await updateProduct(updatedProduct);
    if (product) {
      setProducts(
        products.map((prod) => (prod.id === product.id ? product : prod))
      );
      setSelectedProduct(null);
      setProductName('');
    }
  };

  const handleProductDelete = async (productId) => {
    await deleteProduct(productId);
    setProducts(products.filter((product) => product.id !== productId));
  };

  // Image CRUD Operations
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const response = await uploadImage(file);
    setImages([...images, response]);
    setFile(null);
  };

  const handleImageDelete = async (imageId) => {
    await deleteImage(imageId);
    setImages(images.filter((image) => image.id !== imageId));
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* Product CRUD */}
      <div>
        <h2>Products</h2>

        <form onSubmit={selectedProduct ? handleProductUpdate : handleProductCreate}>
          <input
            type="text"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}  // Handle product ID input
            required
          />
          <input
            type="text"
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <button type="submit">{selectedProduct ? 'Update' : 'Create'} Product</button>
        </form>

        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name}{' '}
              <button onClick={() => setSelectedProduct(product)}>Edit</button>
              <button onClick={() => handleProductDelete(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Image CRUD */}
      <div>
        <h2>Images</h2>

        <form onSubmit={handleImageUpload}>
          <input type="file" onChange={handleFileChange} required />
          <button type="submit">Upload Image</button>
        </form>

        <ul>
          {Array.isArray(images) && images.length > 0 ? (
            images.map((image) => (
              <li key={image.id}>
                <img
                  src={`data:image/jpeg;base64,${image.imageData}`}
                  alt={image.name}
                  width={100}
                />
                <button onClick={() => handleImageDelete(image.id)}>Delete</button>
              </li>
            ))
          ) : (
            <li>No images available</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
