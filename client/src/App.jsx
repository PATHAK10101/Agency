import React, { useState } from 'react';
import './App.css';

// Import components
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import ServicesPreview from './components/ServicesPreview';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      
      {!isLoading && (
        <>
          <Navigation />
          <Hero />
          <Introduction />
          <ServicesPreview />
          <About />
          <Portfolio />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;

