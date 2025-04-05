import React, { useState, useEffect } from "react";
import axios from "axios";

const Review = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

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
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/reviews/getReviewsByProductId/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Submit Review
  const submitReview = async () => {
    if (!reviewText.trim()) return alert("Please enter a review");
    try {
      // Submit the review to the backend
      await axios.post("http://localhost:8080/api/v1/reviews/saveReview", {
        id: selectedProduct.id,
        comment: reviewText,  
        rating,    
        productId: selectedProduct.id,  
      });
      setReviewText("");
      setRating(5);
      getReviews(selectedProduct.id); 
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Autovault Admin Module</h1>

      {/* Product List */}
      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Product List</h2>
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-gray-800 text-lg font-semibold">{product.name}</h3>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => {
                  setSelectedProduct(product);
                  getReviews(product.id);
                }}
              >
                View Reviews
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Review Section */}
      {selectedProduct && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Reviews for {selectedProduct.name}</h3>
          <ul className="bg-gray-50 p-4 rounded-lg shadow-md">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <li key={index} className="border-b border-gray-200 p-2 last:border-none">
                  <p className="text-gray-800">{review.comment}</p>  
                  <div className="text-yellow-500">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                </li>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </ul>
          {/* Submit Review */}
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Write a review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <select
              className="w-full mt-2 p-2 border rounded"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num} Star{num > 1 && "s"}</option>
              ))}
            </select>
            <button
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={submitReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
