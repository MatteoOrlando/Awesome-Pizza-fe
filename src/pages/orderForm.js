import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../styles/orderFromStyles.css';

function OrderForm({ orders, setOrders }) {
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [completedOrders, setCompletedOrders] = useState([]);

  // Function to confirm the order
  const handleSubmitOrder = async () => {
    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pizzas: orders }),
      });
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      const result = await response.json();

      Swal.fire({
        icon: 'success',
        title: 'Order Confirmed!',
        text: `Your order has been placed successfully. Order Number: ${result.id}`,
        confirmButtonText: 'OK',
      });

      setOrderId(result.id);
      setOrderStatus(
        'Your order is in queue! i will receive a notification when your order is ready!.'
      );
      setOrders([]);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: error.message,
        confirmButtonText: 'Try Again',
      });
    }
  };

  // Fetch completed orders from localStorage on mount
  useEffect(() => {
    const savedCompletedOrders =
      JSON.parse(localStorage.getItem('completedOrders')) || [];
    setCompletedOrders(savedCompletedOrders);
  }, []);

  // Remove order from completedOrders and localStorage
  const handlePickup = async (orderId) => {
    try {
      const updatedCompletedOrders = completedOrders.filter(
        (order) => order.id !== orderId
      );

      // Update state and localStorage
      setCompletedOrders(updatedCompletedOrders);
      localStorage.setItem(
        'completedOrders',
        JSON.stringify(updatedCompletedOrders)
      );

      Swal.fire({
        icon: 'Success',
        title: 'Order Picked Up!',
        text: `Order Number ${orderId} has been successfully picked up.`,
        confirmButtonText: 'OK',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
        confirmButtonText: 'Try Again',
      });
    }
  };

  // Remove product function
  const removeFromCart = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
  };

  // Total price function
  const totalPrice = orders.reduce((total, pizza) => total + pizza.price, 0);

  return (
    <div className="form-container">
      <div className="title-section">
        <div className="title-background"></div>
        <h1>Your Order</h1>
      </div>

      {orders.length === 0 ? (
        <p className="no-pizza-cart">No pizzas in your order</p>
      ) : (
        <div className="order-list">
          {orders.map((pizza, index) => (
            <div className="order-card" key={index}>
              <img src={pizza.imageUrl} alt={pizza.name} />
              <div className="order-details">
                <p className="pizza-name">{pizza.name}</p>
                <p className="pizza-price">${pizza.price.toFixed(2)}</p>
              </div>
              <button
                className="btn-remove"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {orders.length > 0 && (
        <div className="total">
          <div className="total-background"></div>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}

      <button
        className="btn-primary"
        onClick={handleSubmitOrder}
        disabled={orders.length === 0}
      >
        Confirm Order
      </button>

      {orderId && (
        <div className="order-status">
          <h3>Order Status</h3>
          <p>
            Order Number: {orderId} - <strong>{orderStatus}</strong>
          </p>
        </div>
      )}

      {completedOrders.length > 0 && (
        <div className="completed-orders">
          <h3>Completed Orders</h3>
          {completedOrders.map((order) => (
            <div className="pick-order-card" key={`completed-${order.id}`}>
              <p>Order Number: {order.id}</p>
              <p>Status: {order.status}</p>
              <button
                className="btn-pickup"
                onClick={() => handlePickup(order.id)}
              >
                Picked Up!
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderForm;
