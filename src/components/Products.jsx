import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Pain Relief", "Antibiotics", "Vitamins", "Skin Care", "Digestive Health"];

  // ✅ Fetch products
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Filtered Products
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" || p.category === category)
  );

  const handleAddToCart = (product) => {
    alert(`🛒 Added ${product.name} to cart!`);
  };

  const handleWishlist = (product) => {
    alert(`❤️ ${product.name} added to wishlist!`);
  };

  return (
    <motion.div
      className="products"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Our Products</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : filtered.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="products-grid">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={product.imageUrl || "https://via.placeholder.com/200"}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p className="category">{product.category}</p>
              <div className="actions">
                <button onClick={() => handleAddToCart(product)}>
                  <FaShoppingCart /> Add
                </button>
                <button onClick={() => handleWishlist(product)}>
                  <FaHeart /> Wishlist
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Products;
