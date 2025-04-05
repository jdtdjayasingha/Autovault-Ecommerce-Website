import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);  // To track the selected review for editing

  // Fetch Products
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/product/getProduct");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  
// Fetch Reviews for Selected Product
const getReviews = async (productId) => {
  if (productId == null || productId === 0) {
    setMessage("Please select a valid product.");
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/v1/reviews/getReviewsByProductId/${productId}`);
    setReviews(response.data);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    setMessage("Error occurred while fetching reviews.");
  }
};



  // Save Product
  const saveProduct = async () => {
    if (!productName) {
      setMessage("Product name cannot be empty");
      return;
    }

    try {
      let response;
      if (productId) {
        response = await axios.put("http://localhost:8080/api/v1/product/updateProduct", {
          id: productId,
          name: productName,
        });
        setMessage("Product updated successfully");
      } else {
        response = await axios.post("http://localhost:8080/api/v1/product/saveProduct", {
          name: productName,
        });
        setMessage("Product saved successfully");
      }

      setProductName("");
      setProductId("");
      getProducts();
    } catch (error) {
      console.error("Error saving/updating product:", error);
      setMessage("Error occurred while saving/updating product");
    }
  };

  // Delete Product
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

  // Submit Review
  const submitReview = async () => {
    if (!selectedProduct || rating === 0 || !reviewText) {
      setMessage("Please select a product, provide a rating, and write a review.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/reviews/saveReview", {
        comment: reviewText, 
        rating,    
        productId: selectedProduct.id,
      });

      setReviewText("");
      setRating(0);
      getReviews(selectedProduct.id);
      setMessage("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("Error occurred while submitting review.");
    }
  };

  
  // Update Review
  const updateReview = async () => {
    if (!selectedReview || rating === 0 || !reviewText) {
      setMessage("Please provide a rating and write a review.");
      return;
    }
  
    try {
      // Log the selected review's id (corrected)
  
      await axios.put(`http://localhost:8080/api/v1/reviews/updateReview`, {
        id: selectedProduct.id,
        comment: reviewText,
        rating,
        productId: selectedProduct.id,
      });
  
      setMessage("Review updated successfully!");
      setReviewText("");
      setRating(0);
      setSelectedReview(null);
      getReviews(selectedReview.id);
    } catch (error) {
      console.error("Error updating review:", error);
      setMessage("Error occurred while updating review.");
    }
  };

  // Delete Review
const deleteReview = async (reviewId) => {
  try {
    await axios.delete("http://localhost:8080/api/v1/reviews/deleteReview", {
      data: { id: reviewId },
    });
    setMessage("Review deleted successfully");
    if (selectedProduct) {
      getReviews(selectedProduct.id);  // Refresh the reviews list after deletion
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    setMessage("Error occurred while deleting review");
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

      {/* Product Form */}
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
          {productId ? "Update" : "Save"}
        </button>
      </div>

      {/* Product List */}
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
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded ml-2 hover:bg-green-600 transition"
                  onClick={() => {
                    setSelectedProduct(product);
                    getReviews(product.id);
                  }}
                >
                  Review
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Review Section */}
      {selectedProduct && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Review {selectedProduct.name}
          </h3>

          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Write a review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>

          {/* Star Rating */}
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`text-2xl cursor-pointer ${num <= rating ? "text-yellow-500" : "text-gray-300"}`}
                onClick={() => setRating(num)}
              >
                ★
              </span>
            ))}
          </div>

          <button
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
            onClick={selectedReview ? updateReview : submitReview}
          >
            {selectedReview ? "Update Review" : "Submit Review"}
          </button>

{/* Reviews Display */}
<h3 className="text-lg font-semibold text-gray-700 mt-4">Reviews</h3>
<ul className="bg-gray-50 p-4 rounded-lg shadow-md">
  {reviews.length > 0 ? (
    reviews.map((review) => (
      <li key={review.id} className="border-b border-gray-200 p-2 last:border-none">
        <p className="text-gray-800">{review.comment}</p>
        <div className="text-yellow-500">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-600 transition"
          onClick={() => {
            setSelectedReview(review);
            setReviewText(review.comment);
            setRating(review.rating);
          }}
        >
          Edit Review
        </button>

        {/* Delete Review Button */}
        <button
          className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600 transition"
          onClick={() => deleteReview(review.id)} // Call deleteReview when clicked
        >
          Delete Review
        </button>
      </li>
    ))
  ) : (
    <p>No reviews yet.</p>
  )}
</ul>

        </div>
      )}
    </div>
  );
};

export default Admin;
