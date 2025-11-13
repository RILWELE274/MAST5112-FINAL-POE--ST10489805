// FilterScreen.tsx
import React, { useState } from 'react';
import { MenuItem } from '../types';

// 🧩 Interface: Expected props for this screen
interface FilterProps {
  menu: MenuItem[];
}

// 🎯 Filter Screen — allows users to filter menu items and see averages
const FilterScreen: React.FC<FilterProps> = ({ menu }) => {
  const [filter, setFilter] = useState<'All' | 'Starter' | 'Main' | 'Dessert'>('All');
  const [search, setSearch] = useState('');

  // 🧠 Function: Filter menu based on course and search term
  const getFilteredMenu = (): MenuItem[] => {
    let filtered: MenuItem[] = [];

    // for loop example
    for (let i = 0; i < menu.length; i++) {
      const item = menu[i];

      // Apply filters
      if ((filter === 'All' || item.course === filter) &&
          item.name.toLowerCase().includes(search.toLowerCase())) {
        filtered.push(item);
      }
    }

    return filtered;
  };

  const filteredMenu = getFilteredMenu();

  // 🧮 Function: Calculate average price of displayed items
  const getAveragePrice = (): string => {
    if (filteredMenu.length === 0) return '0.00';
    let total = 0;
    let index = 0;

    // while loop example
    while (index < filteredMenu.length) {
      total += filteredMenu[index].price;
      index++;
    }

    return (total / filteredMenu.length).toFixed(2);
  };

  // 🧩 Function: Count number of items per category
  const getCourseCount = () => {
    const counts: { [key: string]: number } = { Starter: 0, Main: 0, Dessert: 0 };

    // forEach loop example
    menu.forEach(item => {
      if (counts[item.course] !== undefined) {
        counts[item.course]++;
      }
    });

    return counts;
  };

  const counts = getCourseCount();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽️ Filter Menu Items</h1>

      {/* 🧭 Filter Controls */}
      <div style={styles.controls}>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as any)}
          style={styles.select}
        >
          <option value="All">All</option>
          <option value="Starter">Starters</option>
          <option value="Main">Mains</option>
          <option value="Dessert">Desserts</option>
        </select>

        <input
          type="text"
          placeholder="🔍 Search menu item..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* 📊 Summary Section */}
      <div style={styles.summary}>
        <p>Showing: <strong>{filteredMenu.length}</strong> items</p>
        <p>Average Price: <strong>R{getAveragePrice()}</strong></p>
        <p>Starters: {counts.Starter} | Mains: {counts.Main} | Desserts: {counts.Dessert}</p>
      </div>

      {/* 📋 Menu List */}
      <ul style={styles.list}>
        {filteredMenu.length > 0 ? (
          filteredMenu.map(item => (
            <li key={item.id} style={styles.listItem}>
              <span>{item.name} - R{item.price}</span>
              <span style={styles.tag}>{item.course}</span>
            </li>
          ))
        ) : (
          <p style={styles.noResults}>No items found.</p>
        )}
      </ul>
    </div>
  );
};

// 🎨 Styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
    background: 'linear-gradient(to bottom right, #fff8f0, #ffe0e0)',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#e52e71',
    marginBottom: '1.5rem',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  select: {
    padding: '0.6rem',
    borderRadius: '8px',
    fontSize: '1rem',
    border: '1px solid #ccc',
  },
  input: {
    padding: '0.6rem',
    borderRadius: '8px',
    fontSize: '1rem',
    width: '200px',
    border: '1px solid #ccc',
  },
  summary: {
    textAlign: 'center',
    background: '#fff',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: '1rem',
  },
  listItem: {
    background: '#fff',
    padding: '0.8rem 1rem',
    borderRadius: '10px',
    margin: '0.5rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  tag: {
    background: '#e52e71',
    color: 'white',
    padding: '0.3rem 0.8rem',
    borderRadius: '8px',
    fontSize: '0.8rem',
  },
  noResults: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#555',
  },
};

export default FilterScreen;
