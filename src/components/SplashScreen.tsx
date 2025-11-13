// Import necessary React functions
import React, { useEffect } from 'react';

// Define the expected props for this component
// `onFinish` will be called when the splash screen timer ends
interface SplashProps {
  onFinish: () => void;
}

// Functional component for displaying the splash screen
const SplashScreen: React.FC<SplashProps> = ({ onFinish }) => {
  // useEffect hook runs once when the component mounts
  // Sets a 10-second timer before navigating to the next screen
  useEffect(() => {
    const timer = setTimeout(onFinish, 10000); // Wait 10 seconds before running onFinish
    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, [onFinish]);

  return (
    // Main container that holds all splash screen content
    <div style={styles.container}>
      {/* Display app logo image */}
      <img
        src="/chefsmenu.png" // Path to the image file
        alt="Chef Hat" // Accessibility alt text
        style={styles.image}
      />

      {/* App title displayed under the logo */}
      <h1 style={styles.title}>Chef Menu App</h1>

      {/* Subtitle for welcoming message */}
      <p style={styles.subtitle}>Preparing your delicious experience...</p>

      {/* Animated spinner to simulate loading */}
      <div style={styles.spinner}></div>

      {/* Keyframe animations for the fade-in effect and spinning loader */}
      <style>
        {`
          /* Animation for rotating the spinner */
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          /* Animation for smooth fade-in appearance */
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

// Inline styles for the SplashScreen component
const styles: Record<string, React.CSSProperties> = {
  // Main screen layout: full height, centered content, gradient background
  container: {
    height: '100vh', // Full viewport height
    display: 'flex', // Flexbox layout
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    background: 'linear-gradient(135deg, #ff8a00, #e52e71)', // Gradient background
    color: 'white', // White text
    fontFamily: 'Poppins, sans-serif', // Font style
    animation: 'fadeIn 2s ease-in-out', // Apply fade-in effect
  },

  // Logo image styling: rounded and centered with soft glow
  image: {
    width: '180px',
    height: '180px',
    borderRadius: '50%', // Makes the image circular
    objectFit: 'cover',
    marginBottom: '1rem',
    boxShadow: '0 0 20px rgba(255,255,255,0.3)', // Adds soft glow
  },

  // App title styling
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },

  // Subtitle text styling (smaller, lighter)
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    marginBottom: '2rem',
  },

  // Spinning circle loader styling
  spinner: {
    border: '5px solid rgba(255,255,255,0.3)', // Outer border
    borderTop: '5px solid white', // White top border (creates spinner illusion)
    borderRadius: '50%', // Circular shape
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite', // Apply continuous rotation
  },
};

// Export SplashScreen component for use in App.tsx or navigation
export default SplashScreen;
