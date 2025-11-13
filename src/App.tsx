// App.tsx
import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import AddMenuScreen from './components/AddMenuScreen';
import FilterScreen from './components/FilterScreen';
import MenuItemCardScreen from './components/MenuItemCardScreen';
import { MenuItem } from './types';

// Main application component
function App() {
  // State to control whether the splash screen is visible
  const [showSplash, setShowSplash] = useState(true);

  // State to store the full list of menu items
  const [menu, setMenu] = useState<MenuItem[]>([]);

  // State to manage navigation between pages (home, add, or filter)
  const [page, setPage] = useState<'home' | 'add' | 'filter'>('home');

  // Display splash screen for a few seconds before loading main content
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div>
      {/* Navigation bar section */}
      <nav style={styles.nav}>
        {/* Button to navigate to the Home screen */}
        <button onClick={() => setPage('home')} style={styles.navButton}>
          Home
        </button>

        {/* Button to navigate to Add Menu screen */}
        <button onClick={() => setPage('add')} style={styles.navButton}>
          Add Menu
        </button>

        {/* Button to navigate to Filter screen */}
        <button onClick={() => setPage('filter')} style={styles.navButton}>
          Filter
        </button>
      </nav>

      {/* Conditional rendering of pages based on selected navigation */}
      {page === 'home' && <HomeScreen menu={menu} />}
      {page === 'add' && <AddMenuScreen menu={menu} setMenu={setMenu} />}
      {page === 'filter' && <FilterScreen menu={menu} />}
    </div>
  );
}

// Inline styling for navigation and buttons
const styles: Record<string, React.CSSProperties> = {
  // Navigation bar style
  nav: {
    display: 'flex',
    justifyContent: 'center',
    background: '#e52e71',
    padding: '1rem',
    gap: '1rem',
  },
  // Style for each navigation button
  navButton: {
    color: 'white',
    background: 'transparent',
    border: '2px solid white',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
};

// Export the App component for rendering
export default App;
