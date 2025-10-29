import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaInfoCircle, FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";
import "./Medicine.css";

const Medicine = ({ medicine, onAddToCart, onToggleWishlist }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!medicine) {
    return <div className="medicine-card">Medicine data not available</div>;
  }

  // 🧠 Handle Add to Cart
  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(medicine);
  };

  // 🧠 Handle Wishlist
  const handleToggleWishlist = () => {
    if (onToggleWishlist) onToggleWishlist(medicine.id);
  };

  // ⭐ Render rating stars dynamically
  const renderStars = (rating = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < rating ? "star filled" : "star"} />
    ));
  };

  return (
    <motion.div
      className="medicine-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {/* Medicine Image */}
      <div className="medicine-image">
        <img
          src={
            medicine.imageUrl ||
            medicine.image ||
            "https://via.placeholder.com/300x300?text=No+Image"
          }
          alt={medicine.name}
        />
        {medicine.prescriptionRequired && (
          <div className="prescription-badge">Rx Required</div>
        )}
        {medicine.discount > 0 && (
          <div className="discount-badge">-{medicine.discount}%</div>
        )}
      </div>

      {/* Medicine Info */}
      <div className="medicine-info">
        <h3 className="medicine-name">{medicine.name}</h3>
        {medicine.brand && <p className="medicine-brand">{medicine.brand}</p>}

        {/* Rating */}
        {medicine.rating && (
          <div className="medicine-rating">
            <div className="stars">{renderStars(medicine.rating)}</div>
            {medicine.reviews && (
              <span className="rating-text">({medicine.reviews} reviews)</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="medicine-price">
          <span className="current-price">
            ₹{medicine.price?.toFixed(2) || "0.00"}
          </span>
          {medicine.originalPrice && (
            <span className="original-price">
              ₹{medicine.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Description */}
        {medicine.description && (
          <p className="medicine-description">
            {isExpanded
              ? medicine.description
              : `${medicine.description.substring(0, 100)}...`}
            {medicine.description.length > 100 && (
              <button
                className="read-more-btn"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
        )}

        {/* Extra Details */}
        <div className="medicine-details">
          {medicine.dosage && (
            <div className="detail-item">
              <strong>Dosage:</strong> {medicine.dosage}
            </div>
          )}
          {medicine.form && (
            <div className="detail-item">
              <strong>Form:</strong> {medicine.form}
            </div>
          )}
          {medicine.quantity && (
            <div className="detail-item">
              <strong>Quantity:</strong> {medicine.quantity}
            </div>
          )}
        </div>

        {/* Stock */}
        <div className="medicine-stock">
          {medicine.stock > 0 || medicine.inStock ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="medicine-actions">
        <motion.button
          className="btn btn-secondary wishlist-btn"
          onClick={handleToggleWishlist}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaHeart />{" "}
          {medicine.isWishlisted ? "Wishlisted" : "Add to Wishlist"}
        </motion.button>

        <motion.button
          className={`btn btn-primary add-to-cart-btn ${
            medicine.stock === 0 ? "disabled" : ""
          }`}
          onClick={handleAddToCart}
          disabled={medicine.stock === 0}
          whileHover={{ scale: medicine.stock > 0 ? 1.05 : 1 }}
          whileTap={{ scale: medicine.stock > 0 ? 0.95 : 1 }}
        >
          <FaShoppingCart />{" "}
          {medicine.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </motion.button>
      </div>

      {/* Overlay */}
      <motion.div
        className="medicine-overlay"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <button className="quick-view-btn">
          <FaInfoCircle /> Quick View
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Medicine;
