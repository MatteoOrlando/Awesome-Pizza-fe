import React from 'react';
import '../styles/orderFromStyles.css';

function OrderForm({ orders, setOrders }) {
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
      alert(`Order confirmed! Order ID: ${result.id}`);
      setOrders([]); // Svuota l'ordine dopo la conferma
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Your Order</h1>
      {orders.length === 0 ? (
        <p>No pizzas in the cart.</p>
      ) : (
        <ul>
          {orders.map((pizza, index) => (
            <li key={index}>
              {pizza.name} - ${pizza.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      <button
        className="btn btn-primary mt-3"
        onClick={handleSubmitOrder}
        disabled={orders.length === 0}
      >
        Confirm Order
      </button>
    </div>
  );
}

export default OrderForm;
