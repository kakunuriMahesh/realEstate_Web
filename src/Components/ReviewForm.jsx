import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star, StarOff, X } from "lucide-react";
import { addReview, setSortOption } from "../store/reviews";

const ReviewForm = ({ houseId }) => {
  const dispatch = useDispatch();
  const { reviewsByHouse, sortOption } = useSelector((state) => state.reviews);
  const reviews = reviewsByHouse[houseId] || [];

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    rating: 0,
    review: "",
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle rating selection
  const handleRating = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
    setErrors((prev) => ({ ...prev, rating: "" }));
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be 1–5";
    }
    if (!formData.review.trim()) {
      newErrors.review = "Review is required";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate database save (replace with API call)
    // Example: fetch(`/api/reviews/${houseId}`, { method: "POST", body: JSON.stringify(formData) })
    dispatch(
      addReview({
        houseId,
        review: {
          ...formData,
          timestamp: new Date().toISOString(),
        },
      })
    );

    // Reset form and close modal
    setFormData({ email: "", title: "", rating: 0, review: "" });
    setErrors({});
    setIsModalOpen(false);
    alert("Review submitted successfully!"); // Replace with toast notification
  };

  // Handle sort change
  const handleSortChange = (e) => {
    dispatch(setSortOption(e.target.value));
  };

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortOption) {
      case "high-to-low":
        return b.rating - a.rating;
      case "low-to-high":
        return a.rating - b.rating;
      case "newest":
        return new Date(b.timestamp) - new Date(a.timestamp);
      case "medium":
        // Prioritize 3-star, then 2/4, then 1/5
        const aDiff = Math.abs(a.rating - 3);
        const bDiff = Math.abs(b.rating - 3);
        if (aDiff === bDiff) return a.rating - b.rating; // Tiebreaker: lower rating first
        return aDiff - bDiff;
      default:
        return 0;
    }
  });

  // Star rating input component
  const StarRatingInput = ({ rating, onChange }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            {star <= rating ? (
              <Star className="h-5 w-5 text-yellow-400" />
            ) : (
              <StarOff className="h-5 w-5 text-gray-300" />
            )}
          </button>
        ))}
      </div>
    );
  };

  // Star rating display component
  const StarRatingDisplay = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= rating ? (
              <Star className="h-4 w-4 text-yellow-400 inline" />
            ) : (
              <StarOff className="h-4 w-4 text-gray-300 inline" />
            )}
          </span>
        ))}
      </div>
    );
  };

  // Close modal on outside click or Esc key
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };

    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div className="bg-teal-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Reviews Header */}
        <div className="mb-8 flex justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold text-white">
            {reviews.length} Review{reviews.length !== 1 ? "s" : ""}
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Leave a Review
          </button>
        </div>

        {/* Sort Dropdown */}
        {reviews.length > 0 && (
          <div className="mb-6">
            <label htmlFor="sort" className="text-teal-200 mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="bg-teal-800 text-white rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="high-to-low">High to Low</option>
              <option value="low-to-high">Low to High</option>
              <option value="newest">Newest</option>
              <option value="medium">Medium</option>
            </select>
          </div>
        )}

        {/* Reviews List */}
        {sortedReviews.length > 0 && (
          <div className="space-y-4">
            {sortedReviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-md p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {review.title}
                    </h4>
                    <p style={{color:"gray"}} className="text-sm text-gray-600">
                      {review.email.split("@")[0]} •{" "}
                      {new Date(review.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <StarRatingDisplay rating={review.rating} />
                </div>
                <p style={{color:"gray"}}  className="text-gray-700">{review.review}</p>
              </div>
            ))}
          </div>
        )}

        {/* Review Form Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
              ref={modalRef}
              className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-lg mx-auto relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Leave a Review
              </h3>
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Title */}
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a title"
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <StarRatingInput
                    rating={formData.rating}
                    onChange={handleRating}
                  />
                  {errors.rating && (
                    <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                  )}
                </div>

                {/* Review */}
                <div className="mb-4">
                  <label
                    htmlFor="review"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Review
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    placeholder="Write a review"
                    rows={4}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  />
                  {errors.review && (
                    <p className="mt-1 text-sm text-red-600">{errors.review}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-teal-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;