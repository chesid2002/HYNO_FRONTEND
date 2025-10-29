import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./Admin.css";

const Admin = () => {
  const [tab, setTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  
  // 🧾 Dummy Orders
  const [orders, setOrders] = useState([
    { id: 101, userName: "Ravi Kumar", totalAmount: 1499, status: "Pending" },
    { id: 102, userName: "Sneha Patel", totalAmount: 2399, status: "Processing" },
    { id: 103, userName: "Amit Shah", totalAmount: 499, status: "Sending" },
    { id: 104, userName: "Priya Verma", totalAmount: 3499, status: "Delivered" },
    { id: 105, userName: "Arjun Singh", totalAmount: 999, status: "Cancelled" },
  ]);

  // 💊 Dummy Prescriptions
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      userName: "Rahul Mehta",
      fileUrl: "https://via.placeholder.com/150",
      uploadedAt: "2025-10-15T12:00:00Z",
    },
    {
      id: 2,
      userName: "Sneha Sharma",
      fileUrl: "https://via.placeholder.com/150",
      uploadedAt: "2025-10-20T10:30:00Z",
    },
    {
      id: 3,
      userName: "Anjali Gupta",
      fileUrl: "https://via.placeholder.com/150",
      uploadedAt: "2025-10-24T09:00:00Z",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    imageUrl: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // 🧠 Fetch products only (orders & prescriptions are dummy)
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🟩 Add / Update / Delete product handlers
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/products", newProduct);
      alert("✅ Product added successfully!");
      setNewProduct({ name: "", category: "", price: "", stock: "", imageUrl: "" });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Failed to add product");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`http://localhost:8080/api/products/${editingProduct.id}`, editingProduct);
      alert("✅ Product updated!");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      alert("🗑️ Product deleted!");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // 🟨 Order Status Update (Local Update)
  const updateOrderStatus = (id, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
    alert(`✅ Order marked as ${status}`);
  };

  // 📊 Dashboard Summary
  const dashboardData = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalPrescriptions: prescriptions.length,
    pendingOrders: orders.filter((o) => o.status === "Pending").length,
    activeUsers: 1520,
    weeklySales: 48500,
    monthlySales: 214000,
  };

  const salesData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weekly Sales (₹)",
        data: [12500, 15800, 9800, 10400],
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgba(99, 102, 241, 1)",
        tension: 0.4,
      },
    ],
  };

  const orderData = {
    labels: ["Pending", "Processing", "Sending", "Delivered", "Cancelled"],
    datasets: [
      {
        label: "Orders",
        data: [
          orders.filter((o) => o.status === "Pending").length,
          orders.filter((o) => o.status === "Processing").length,
          orders.filter((o) => o.status === "Sending").length,
          orders.filter((o) => o.status === "Delivered").length,
          orders.filter((o) => o.status === "Cancelled").length,
        ],
        backgroundColor: ["#facc15", "#60a5fa", "#f59e0b", "#34d399", "#f87171"],
      },
    ],
  };

  return (
    <div className="admin-page">
      <h1 className="admin-header">Admin Dashboard</h1>

      {/* ===== Tabs ===== */}
      <div className="admin-tabs">
        <button className={tab === "dashboard" ? "active" : ""} onClick={() => setTab("dashboard")}>Dashboard</button>
        <button className={tab === "products" ? "active" : ""} onClick={() => setTab("products")}>Products</button>
        <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>Orders</button>
        <button className={tab === "prescriptions" ? "active" : ""} onClick={() => setTab("prescriptions")}>Prescriptions</button>
      </div>

      {/* ===== Dashboard ===== */}
      {tab === "dashboard" && (
        <div className="dashboard-grid">
          <div className="stat-card"><h3>Total Products</h3><p>{dashboardData.totalProducts}</p></div>
          <div className="stat-card"><h3>Total Orders</h3><p>{dashboardData.totalOrders}</p></div>
          <div className="stat-card"><h3>Pending Orders</h3><p>{dashboardData.pendingOrders}</p></div>
          <div className="stat-card"><h3>Prescriptions</h3><p>{dashboardData.totalPrescriptions}</p></div>
          <div className="stat-card highlight"><h3>Active Users</h3><p>{dashboardData.activeUsers}</p></div>
          <div className="stat-card highlight"><h3>Weekly Sales</h3><p>₹{dashboardData.weeklySales.toLocaleString()}</p></div>
          <div className="stat-card highlight"><h3>Monthly Sales</h3><p>₹{dashboardData.monthlySales.toLocaleString()}</p></div>

          <div className="chart-card"><h3>Sales Overview</h3><Line data={salesData} /></div>
          <div className="chart-card"><h3>Order Status Breakdown</h3><Bar data={orderData} /></div>
        </div>
      )}

      {/* ===== Products ===== */}
      {tab === "products" && (
        <div className="admin-section">
          <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
          <div className="form">
            {["name", "category", "price", "stock", "imageUrl"].map((field) => (
              <input
                key={field}
                type={field === "price" || field === "stock" ? "number" : "text"}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                value={editingProduct ? editingProduct[field] : newProduct[field]}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, [field]: e.target.value })
                    : setNewProduct({ ...newProduct, [field]: e.target.value })
                }
              />
            ))}
            <button onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </div>

          <table className="admin-table">
            <thead>
              <tr><th>Image</th><th>Name</th><th>Category</th><th>Price (₹)</th><th>Stock</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td><img src={p.imageUrl || "https://via.placeholder.com/60"} alt={p.name} /></td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button onClick={() => setEditingProduct(p)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== Orders ===== */}
      {tab === "orders" && (
        <div className="admin-section">
          <h2>Manage Orders</h2>
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>User</th><th>Total (₹)</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.userName}</td>
                  <td>{o.totalAmount}</td>
                  <td>{o.status}</td>
                  <td className="order-actions">
                    <button className="pending" onClick={() => updateOrderStatus(o.id, "Pending")}>Pending</button>
                    <button className="processing" onClick={() => updateOrderStatus(o.id, "Processing")}>Processing</button>
                    <button className="sending" onClick={() => updateOrderStatus(o.id, "Sending")}>Sending</button>
                    <button className="delivered" onClick={() => updateOrderStatus(o.id, "Delivered")}>Delivered</button>
                    <button className="cancel" onClick={() => updateOrderStatus(o.id, "Cancelled")}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== Prescriptions ===== */}
      {tab === "prescriptions" && (
        <div className="admin-section">
          <h2>Uploaded Prescriptions</h2>
          <table className="admin-table">
            <thead><tr><th>ID</th><th>User</th><th>File</th><th>Date</th></tr></thead>
            <tbody>
              {prescriptions.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.userName}</td>
                  <td><a href={p.fileUrl} target="_blank" rel="noreferrer">View</a></td>
                  <td>{new Date(p.uploadedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
