import React, { useEffect, useState } from 'react';
import '../styles/queueStyles.css';

function Queue() {
  const [queue, setQueue] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [completedOrders, setCompletedOrders] = useState([]);

  // Fetch queue and completed orders on mount
  useEffect(() => {
    fetchQueue();
    loadCompletedOrders();
  }, []);

  // Fetch pending and in-progress orders
  const fetchQueue = async () => {
    try {
      const response = await fetch('http://localhost:3001/orders/queue');
      if (!response.ok) {
        throw new Error('Failed to fetch queue');
      }
      const data = await response.json();
      setQueue(data);
    } catch (error) {
      console.error('Error fetching queue:', error.message);
    }
  };

  // Load completed orders from localStorage
  const loadCompletedOrders = () => {
    const savedCompletedOrders =
      JSON.parse(localStorage.getItem('completedOrders')) || [];
    setCompletedOrders(savedCompletedOrders);
  };

  // Save completed orders to localStorage
  const saveCompletedOrders = (orders) => {
    localStorage.setItem('completedOrders', JSON.stringify(orders));
  };

  // Take an order
  const takeOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/orders/${orderId}/take`,
        {
          method: 'PUT',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to take order');
      }
      const updatedOrder = await response.json();
      setCurrentOrder(updatedOrder);
      fetchQueue();
    } catch (error) {
      console.error('Error taking order:', error.message);
    }
  };

  // Complete an order and save it
  const completeOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/orders/${orderId}?status=COMPLETED`,
        {
          method: 'PUT',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      const updatedOrder = await response.json();

      // Add the order to completed orders
      const updatedCompletedOrders = [...completedOrders, updatedOrder];
      setCompletedOrders(updatedCompletedOrders);

      // Save completed orders in localStorage
      saveCompletedOrders(updatedCompletedOrders);

      setCurrentOrder(null);
      fetchQueue();
    } catch (error) {
      console.error('Error completing order:', error.message);
    }
  };

  return (
    <div className="queue-container">
      <h1>Order Queue</h1>

      {currentOrder ? (
        <div className="current-order">
          <h2>Current Order</h2>
          <div className="order-details">
            <p>
              <strong>Order ID:</strong> {currentOrder.id}
            </p>
            <p>
              <strong>Status:</strong> {currentOrder.status}
            </p>
          </div>
          <button
            className="btn-complete"
            onClick={() => completeOrder(currentOrder.id)}
          >
            Mark as Completed
          </button>
        </div>
      ) : (
        <div className="no-order">
          <p>No order in progress</p>
        </div>
      )}

      <div className="queue-section">
        <h2>Pending Orders</h2>
        <ul className="list-group">
          {queue.map((order) => (
            <li className="list-group-item" key={order.id}>
              <div className="order-info">
                <p>
                  <strong>Order Number:</strong> {order.id}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
              </div>
              <button className="btn-take" onClick={() => takeOrder(order.id)}>
                Take Order
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="completed-section">
        <h2>Orders Completed</h2>
        <ul className="list-group">
          {completedOrders.map((order) => (
            <li className="list-group-item completed-item" key={order.id}>
              <div className="order-info">
                <p>
                  <strong>Order Number:</strong> {order.id}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Queue;
