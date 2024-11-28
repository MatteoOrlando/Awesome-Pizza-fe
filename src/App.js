import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import OrderForm from './pages/orderForm';
import Queue from './pages/queue';

function App() {
  const [orders, setOrders] = useState([]);

  const addToOrder = (pizza) => {
    setOrders((prevOrders) => [...prevOrders, pizza]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home addToOrder={addToOrder} />} />
        <Route
          path="/order"
          element={<OrderForm orders={orders} setOrders={setOrders} />}
        />
        <Route path="/queue" element={<Queue />} />
      </Routes>
    </Router>
  );
}

export default App;
