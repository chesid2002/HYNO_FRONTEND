import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  // 🔵 Advertisement Carousel
  const ads = [
    { img: "/banners/offer1.jpg", text: "💊 Flat 25% Off on All Medicines!" },
    { img: "/banners/offer2.jpg", text: "⚡ Buy 1 Get 1 Free on Vitamins!" },
    { img: "/banners/offer3.jpg", text: "👶 Up to 50% Off on Baby Care Products!" },
    { img: "/banners/offer4.jpg", text: "🚚 Free Delivery on Orders Above ₹499!" },
    { img: "/banners/offer5.jpg", text: "🎁 Get Extra 10% Cashback with Hyno Wallet!" },
  ];

  const [currentAd, setCurrentAd] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [ads.length]);

  // 💬 Floating Comments
  const [floatingComments, setFloatingComments] = useState([
    { name: "Amit Sharma", text: "Got my medicines in 2 hours! 🚚" },
    { name: "Priya Verma", text: "Loved the cashback offer 💰 Highly recommended!" },
    { name: "Rahul Joshi", text: "Smooth checkout and genuine medicines 💊" },
    { name: "Sneha Patil", text: "Customer support was super helpful 👍" },
  ]);

  const [currentFloating, setCurrentFloating] = useState(0);

  // 🔁 Randomly change comments every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFloating(Math.floor(Math.random() * floatingComments.length));
    }, 5000);
    return () => clearInterval(interval);
  }, [floatingComments.length]);

  // 🟢 Recommended Products
  const recommendedProducts = [
    { name: "Paracetamol 500mg", price: "₹49", img: "/products/paracetamol.jpg" },
    { name: "Dabur Honey 250g", price: "₹99", img: "/products/honey.jpg" },
    { name: "Revital H Capsules", price: "₹199", img: "/products/revital.jpg" },
    { name: "Himalaya Baby Lotion", price: "₹149", img: "/products/babylotion.jpg" },
    { name: "Dettol Antiseptic Liquid 250ml", price: "₹85", img: "/products/dettol.jpg" },
    { name: "Vicks Vaporub 50ml", price: "₹95", img: "/products/vicks.jpg" },
    { name: "Horlicks Health Drink 500g", price: "₹220", img: "/products/horlicks.jpg" },
    { name: "Moov Pain Relief Spray 80g", price: "₹130", img: "/products/moov.jpg" },
  ];

  // ✍️ User Comment Form
  const [userName, setUserName] = useState("");
  const [userComment, setUserComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName && userComment) {
      setFloatingComments([
        ...floatingComments,
        { name: userName, text: userComment },
      ]);
      setUserName("");
      setUserComment("");
      alert("✅ Thank you! Your comment has been added.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="landing-page"
    >
      {/* 🟢 NAVBAR */}
      <header className="navbar">
        <nav>
          <h2>HynoPharma</h2>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/products">Medicines</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </nav>
      </header>

      {/* 🟢 HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Trusted Online Pharmacy at Your Fingertips</h1>
          <p>
            Order medicines, book health tests, and consult doctors — all from
            the comfort of your home.
          </p>
          <div className="search-bar">
            <input type="text" placeholder="Search for medicines, health products..." />
            <button>🔍</button>
          </div>
          <Link to="/products">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="shop-now-btn">
              Shop Now
            </motion.button>
          </Link>
        </div>
      </section>

      {/* 🟣 REAL-TIME ADVERTISEMENT CAROUSEL */}
      <section className="advertisement-section">
        <motion.div
          key={currentAd}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="advertisement-card"
        >
          <img src={ads[currentAd].img} alt="Ad" />
          <p>{ads[currentAd].text}</p>
        </motion.div>
      </section>

      {/* 🟢 SERVICES */}
      <section className="services-section">
        <h2>Why Choose HynoPharma?</h2>
        <div className="services-grid">
          {[
            { icon: "🚚", title: "Super Fast Delivery", text: "Get medicines delivered within 2 hours." },
            { icon: "💊", title: "Genuine Medicines", text: "100% verified and quality-checked products." },
            { icon: "🧾", title: "Easy Prescription Upload", text: "Upload and we’ll assist you instantly." },
            { icon: "💬", title: "Doctor Consultation", text: "Chat with certified doctors anytime." },
          ].map((card, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="service-card">
              <div className="icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔵 RECOMMENDED PRODUCTS */}
      <section className="recommended-section">
        <h2>Recommended for You</h2>
        <div className="recommended-grid">
          {recommendedProducts.map((product, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="product-card">
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <button className="add-to-cart">Add to Cart</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🟢 COMMENT FORM SECTION */}
      <section className="comment-section">
        <h2>💬 Leave Your Feedback</h2>
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your comment..."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>

      {/* 💬 FLOATING RANDOM COMMENTS */}
      {floatingComments.length > 0 && (
        <motion.div
          key={floatingComments[currentFloating].text}
          className="floating-comment"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>💬 {floatingComments[currentFloating].text}</p>
          <span>- {floatingComments[currentFloating].name}</span>
        </motion.div>
      )}

      {/* 🟢 FOOTER */}
      <footer className="footer">
        <h3>HynoPharma</h3>
        <p>Your trusted partner for quality healthcare products.</p>
        <p className="copyright">© 2025 HynoPharma. All Rights Reserved.</p>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
