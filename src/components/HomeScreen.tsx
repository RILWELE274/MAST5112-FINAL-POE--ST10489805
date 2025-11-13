// HomeScreen.tsx
import React from 'react';
import { MenuItem } from '../types';

// 🧩 Props for this screen
interface HomeProps {
  menu: MenuItem[];
}

// 🌟 Global variables (example of global state usage)
const courses = ['Starter', 'Main', 'Dessert'] as const;

// 🧮 Function to calculate average price using loops
const calculateAveragePrice = (items: MenuItem[], course: string): string => {
  const filtered: MenuItem[] = [];

  // for loop example — filter items by course
  for (let i = 0; i < items.length; i++) {
    if (items[i].course === course) {
      filtered.push(items[i]);
    }
  }

  if (filtered.length === 0) return '0.00';

  let total = 0;
  let index = 0;

  // while loop example — calculate total
  while (index < filtered.length) {
    total += filtered[index].price;
    index++;
  }

  const average = total / filtered.length;
  return average.toFixed(2);
};

// 🧩 Function to count number of items per course using for-in loop
const countItemsPerCourse = (menu: MenuItem[]) => {
  const counts: Record<string, number> = { Starter: 0, Main: 0, Dessert: 0 };

  // for-in loop example
  for (const key in counts) {
    counts[key] = menu.filter(item => item.course === key).length;
  }

  return counts;
};

// 🎨 Functional Component
const HomeScreen: React.FC<HomeProps> = ({ menu }) => {
  const counts = countItemsPerCourse(menu);

  return (
    <div style={styles.container}>
      {/* 🏠 Page Title */}
      <h1 style={styles.title}>🍴 Complete Menu Overview</h1>
      <p style={styles.subtitle}>
        Below is a categorized list of all menu items with average prices.
      </p>

      {/* Display each course and its items */}
      {courses.map(course => (
        <div key={course} style={styles.courseSection}>
          <h2 style={styles.courseTitle}>
            {course}s ({counts[course]} items)
          </h2>
          <p style={styles.average}>
            💰 Average Price: R{calculateAveragePrice(menu, course)}
          </p>

          {/* List of menu items for this course */}
          <ul style={styles.list}>
            {menu
              .filter(item => item.course === course)
              .map(item => (
                <li key={item.id} style={styles.listItem}>
                  <span>{item.name}</span>
                  <span>R{item.price}</span>
                </li>
              ))}
          </ul>
        </div>
      ))}

      {/* Total Menu Summary */}
      <div style={styles.summaryBox}>
        <h3>Total Menu Items: {menu.length}</h3>
        <p>Updated automatically when you add or remove items.</p>
      </div>
    </div>
  );
};

// 🎨 Inline Styles (UI Consistency)
const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
    background: 'linear-gradient(to bottom right, #fff7ed, #ffe0b2)',
    minHeight: '100vh',
    color: '#333',
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    color: '#e52e71',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '1rem',
    marginBottom: '2rem',
  },
  courseSection: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
  },
  courseTitle: {
    fontSize: '1.5rem',
    color: '#ff7b54',
    marginBottom: '0.5rem',
  },
  average: {
    fontStyle: 'italic',
    marginBottom: '1rem',
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#fff8f2',
    borderRadius: '8px',
    padding: '0.7rem 1rem',
    margin: '0.3rem 0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  summaryBox: {
    marginTop: '2rem',
    background: '#ffe6cc',
    textAlign: 'center',
    padding: '1rem',
    borderRadius: '10px',
  },
};

export default HomeScreen;
