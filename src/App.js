import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import OrderForm from './pages/orderForm';
import Queue from './pages/queue';
import Footer from './components/footer';
import './App.css';

function App() {
  // Retrieve the data saved in sessionStorage
  const [orders, setOrders] = useState(() => {
    const savedOrders = sessionStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save the data in sessionStorage every time the orders change
  useEffect(() => {
    sessionStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToOrder = (pizza) => {
    setOrders((prevOrders) => [...prevOrders, pizza]);
  };

  return (
    <div className="app-container">
      <Router>
        <Navbar orderCount={orders.length} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home addToOrder={addToOrder} />} />
            <Route
              path="/order"
              element={<OrderForm orders={orders} setOrders={setOrders} />}
            />
            <Route path="/queue" element={<Queue />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
