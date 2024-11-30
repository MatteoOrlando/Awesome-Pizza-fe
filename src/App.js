import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import OrderForm from './pages/orderForm';
import Queue from './pages/queue';
import Footer from './components/footer';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);

  const addToOrder = (pizza) => {
    setOrders((prevOrders) => [...prevOrders, pizza]);
  };

  return (
    <div className="app-container">
      <Router>
        <Navbar />
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
