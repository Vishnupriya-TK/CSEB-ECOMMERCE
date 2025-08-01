import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
// Import images from assets
import headphonesImg from './assets/wireless-headphones.jpeg';
import smartwatchImg from './assets/smartwatch.jpeg';
import laptopImg from './assets/laptop.jpeg';
import Navbar from './components/Navbar';
import AdminNavbar from './components/Admin/AdminNavbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProductDetails from './components/ProductDetails';
import About from './components/About';
import Contact from './components/Contact';
import Orders from './components/Orders';

function App() {
  // Function to save cart items to localStorage
  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Function to load from localStorage with fallback
  const loadFromLocalStorage = (key, fallback) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  };

  // Load initial products and cart items from localStorage
  const initialProducts = loadFromLocalStorage('products', [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'Premium wireless headphones with noise cancellation',
      price: 199.99,
      image: headphonesImg
    },  
    {
      id: 2,
      name: 'Smartwatch',
      description: 'Latest smartwatch with health tracking features',
      price: 299.99,
      image: smartwatchImg
    },
    {
      id: 3,
      name: 'Laptop',
      description: 'High-performance laptop for professionals',
      price: 999.99,
      image: laptopImg
    }
  ]);

  const initialCartItems = loadFromLocalStorage('cartItems', []);

  // Initialize products and cart items
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Save products to localStorage whenever they change
  React.useEffect(() => {
    saveToLocalStorage('products', products);
  }, [products]);

  // Order state
  const [orders, setOrders] = useState(loadFromLocalStorage('orders', []));

  // Save cart items to localStorage whenever they change
  React.useEffect(() => {
    saveToLocalStorage('cartItems', cartItems);
  }, [cartItems]);

  // Save orders to localStorage whenever they change
  React.useEffect(() => {
    saveToLocalStorage('orders', orders);
  }, [orders]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const createOrder = (items) => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...items],
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    
    // Clear the cart after creating order
    setCartItems([]);
    
    return newOrder;
  };

  const PrivateRoute = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return currentUser ? children : <Navigate to="/login" />;
  };

  const AdminRoute = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return currentUser?.role === 'admin' ? children : <Navigate to="/" />;
  };

  // Get current location using React Router
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100">
      {/* Only show Navbar for non-admin routes */}
      {!isAdminRoute && <Navbar />}
      <div className={`mx-auto ${isAdminRoute ? 'w-full' : 'container px-4 py-8'}`}>
        {/* AdminNavbar is rendered within each admin component */}
        <Routes>
          <Route path="/" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-20">
                <h1 className="text-6xl font-bold text-purple-800 mb-4">Welcome to ShopEase</h1>
                <p className="text-2xl text-gray-600 mb-8">Your One-Stop Shop for Amazing Products</p>
                <div className="space-y-4">
                  <Link to="/products" className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:opacity-90 transition-opacity">
                    Shop Now
                  </Link>
                  <div className="text-gray-500">
                    New products added daily! Join our community of happy shoppers.
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/products" element={<ProductList products={products} addToCart={addToCart} />} />
          <Route path="/products/:id" element={
            <PrivateRoute>
              <ProductDetails 
                products={products}
                addToCart={addToCart}
              />
            </PrivateRoute>
          } />
          <Route path="/cart" element={
            <PrivateRoute>
              <Cart 
                cartItems={cartItems} 
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                createOrder={createOrder}
              />
            </PrivateRoute>
          } />
          <Route path="/orders" element={
            <PrivateRoute>
              <Orders orders={orders} />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;