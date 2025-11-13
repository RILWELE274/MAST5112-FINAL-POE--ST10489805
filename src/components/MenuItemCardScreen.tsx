// MenuItemCard.tsx
import React from 'react';
import { MenuItem } from '../types';

// Define props that this component will receive
interface MenuItemCardProps {
  item: MenuItem; // Single menu item data (name, price, course)
  onRemove: (id: number) => void; // Function to remove item using its ID
}

// Functional component to display an individual menu item card
const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onRemove }) => {
  // Function demonstrating TypeScript function usage
  // Formats the price to show two decimal places with an "R" currency symbol
  const formatPrice = (price: number): string => {
    return `R${price.toFixed(2)}`;
  };

  return (
    // Card container for each menu item
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        padding: '20px',
        margin: '10px',
        width: '260px',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* Display menu item name */}
      <h3 style={{ color: '#ff8a00', marginBottom: '10px' }}>{item.name}</h3>

      {/* Display course type (Starter, Main, or Dessert) */}
      <p style={{ fontSize: '14px', color: '#777' }}>{item.course}</p>

      {/* Display formatted price */}
      <p style={{ fontWeight: 'bold', color: '#333' }}>{formatPrice(item.price)}</p>

      {/* Remove button triggers onRemove function when clicked */}
      <button
        onClick={() => onRemove(item.id)}
        style={{
          background: 'linear-gradient(to right, #ff8a00, #e52e71)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '8px 15px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        Remove
      </button>
    </div>
  );
};

// Export component for use in other parts of the app
export default MenuItemCard;
