import React, { useEffect, useState } from 'react';
import {
  FaPizzaSlice,
  FaPepperHot,
  FaLeaf,
  FaCheese,
  FaDrumstickBite,
} from 'react-icons/fa';
import { GiMushroom, GiChiliPepper } from 'react-icons/gi';
import Swal from 'sweetalert2';
import '../styles/homeStyle.css';

function Home({ addToOrder }) {
  const [pizzas, setPizzas] = useState([]);
  const [modalImage, setModalImage] = useState(null); // State for modal image

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('http://localhost:3001/pizzas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error('Error fetching pizzas:', error.message);
      }
    };

    fetchPizzas();
  }, []);

  const getIcon = (name) => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes('pepperoni'))
      return <FaPepperHot className="icon" />;
    if (lowerName.includes('hawaiian')) return <FaLeaf className="icon" />;
    if (lowerName.includes('quattro')) return <FaCheese className="icon" />;
    if (lowerName.includes('capricciosa'))
      return <GiMushroom className="icon" />;
    if (lowerName.includes('meat')) return <FaDrumstickBite className="icon" />;
    if (lowerName.includes('diavola'))
      return <GiChiliPepper className="icon" />;
    if (lowerName.includes('bbq')) return <FaDrumstickBite className="icon" />;
    return <FaPizzaSlice className="icon" />;
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl); // Open modal with image
  };

  const closeModal = () => {
    setModalImage(null); // Close modal
  };

  const handleAddToOrder = (pizza) => {
    addToOrder(pizza);

    Swal.fire({
      title: 'Success!',
      text: 'The pizza is added to the order cart!',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 5000, // Auto-close after 5 seconds
      timerProgressBar: true,
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-button',
      },
    });
  };

  return (
    <div className="home-container">
      {pizzas.map((pizza) => (
        <div className="pizza-card" key={pizza.id}>
          <img
            src={pizza.imageUrl}
            alt={pizza.name}
            className="pizza-img"
            onClick={() => handleImageClick(pizza.imageUrl)} // Click handler on img for modal
            style={{ cursor: 'pointer' }}
          />
          <div className="card-body">
            <div className="title-with-icon">
              <h5 className="card-title">{pizza.name}</h5>
              {getIcon(pizza.name)}
            </div>
            <p className="card-text">{pizza.description}</p>
          </div>
          <div className="card-footer">
            <span className="card-price">€ {pizza.price.toFixed(2)}</span>
            <button
              className="order-now"
              onClick={() => handleAddToOrder(pizza)} // Swal alert only triggered here, when order btn is clicked
            >
              Order Now
            </button>
          </div>
        </div>
      ))}

      {modalImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={modalImage} alt="Pizza" className="modal-img" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
