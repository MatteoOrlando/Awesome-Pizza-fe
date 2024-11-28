import React, { useEffect, useState } from 'react';
import '../styles/queueStyles.css';

function Queue() {
  const [queue, setQueue] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    fetchQueue();
  }, []);

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
      fetchQueue(); // Aggiorna la coda dopo aver preso l'ordine
    } catch (error) {
      console.error('Error taking order:', error.message);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      const updatedOrder = await response.json();
      setCurrentOrder(null); // Resetta l'ordine corrente
      fetchQueue(); // Aggiorna la coda dopo l'aggiornamento dello stato
    } catch (error) {
      console.error('Error updating order status:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Order Queue</h1>

      {currentOrder ? (
        <div className="current-order">
          <h2>Current Order</h2>
          <p>Order ID: {currentOrder.id}</p>
          <p>Status: {currentOrder.status}</p>
          <button
            className="btn btn-success"
            onClick={() => updateOrderStatus(currentOrder.id, 'COMPLETED')}
          >
            Mark as Completed
          </button>
        </div>
      ) : (
        <p>No order in progress</p>
      )}

      <h2>Queue</h2>
      <ul className="list-group">
        {queue.map((order) => (
          <li className="list-group-item" key={order.id}>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                Order ID: {order.id}, Status: {order.status}
              </span>
              {order.status === 'NEW' && (
                <button
                  className="btn btn-primary"
                  onClick={() => takeOrder(order.id)}
                >
                  Take Order
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Queue;
