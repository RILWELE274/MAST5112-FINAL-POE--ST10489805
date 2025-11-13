// AddMenuScreen.tsx
import React, { useState } from 'react';
import { MenuItem } from '../types';

interface AddMenuProps {
  menu: MenuItem[];
  setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const AddMenuScreen: React.FC<AddMenuProps> = ({ menu, setMenu }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');
  const [message, setMessage] = useState('');

  // 🧠 Function: Add a new menu item
  const addItem = () => {
    if (!name.trim() || !price.trim()) {
      setMessage('⚠️ Please fill in all fields.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      course,
    };

    setMenu([...menu, newItem]);
    setName('');
    setPrice('');
    setMessage(`✅ "${newItem.name}" added successfully!`);
  };

  // 🧠 Function: Remove menu item by ID
  const removeItem = (id: number) => {
    setMenu(menu.filter(item => item.id !== id));
  };

  // 🧮 Function: Calculate total number of menu items per course (using loops)
  const countItemsByCourse = () => {
    const courseCount: { [key: string]: number } = { Starter: 0, Main: 0, Dessert: 0 };

    // for-in loop
    for (const course in courseCount) {
      let count = 0;
      let i = 0;
      // while loop to count
      while (i < menu.length) {
        if (menu[i].course === course) count++;
        i++;
      }
      courseCount[course] = count;
    }

    return courseCount;
  };

  const counts = countItemsByCourse();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👨‍🍳 Add or Remove Menu Items</h1>

      {/* Add form */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Price (R)"
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={styles.input}
        />
        <select
          value={course}
          onChange={e => setCourse(e.target.value as any)}
          style={styles.select}
        >
          <option>Starter</option>
          <option>Main</option>
          <option>Dessert</option>
        </select>
        <button onClick={addItem} style={styles.button}>
          ➕ Add Item
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </div>

      {/* Display count summary */}
      <div style={styles.summary}>
        <h3>📊 Course Summary</h3>
        <p>Starters: {counts.Starter}</p>
        <p>Mains: {counts.Main}</p>
        <p>Desserts: {counts.Dessert}</p>
      </div>

      {/* List of items */}
      <ul style={styles.list}>
        {menu.map(item => (
          <li key={item.id} style={styles.listItem}>
            <span>
              {item.name} - R{item.price} ({item.course})
            </span>
            <button
              onClick={() => removeItem(item.id)}
              style={styles.removeButton}
            >
              ❌ Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 🎨 Styling
const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #ffe0f0, #fff3e0)',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    color: '#e52e71',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '2rem',
  },
  input: {
    padding: '0.5rem',
    width: '250px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '0.5rem',
    width: '250px',
    borderRadius: '8px',
  },
  button: {
    background: 'linear-gradient(to right, #ff8a00, #e52e71)',
    color: 'white',
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 600,
  },
  message: {
    marginTop: '0.5rem',
    color: '#333',
  },
  summary: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginBottom: '1.5rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    background: '#fff',
    margin: '0.5rem 0',
    padding: '0.8rem',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  removeButton: {
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default AddMenuScreen;
