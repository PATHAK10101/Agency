import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap'; 

// IMPORTANT: Ensure these image files exist in your '../assets/images/' directory
import dubaiCityscape from '../assets/images/dubai1.jpg'; // Card 1
import dubaiTeam from '../assets/images/3.png';   // Card 3
import dubaiSunset from '../assets/images/2.png'; // Card 4
import dubaiOffice from '../assets/images/i.png'; // Card 2


// Array of all images in the sequence
const allCards = [
  { src: dubaiCityscape, alt: "Dubai Cityscape" },
  { src: dubaiTeam, alt: "PIARA Team Meeting" },
  { src: dubaiSunset, alt: "Dubai Sunset View" },
   { src: dubaiOffice, alt: "Dubai Office Interior" },
  
];

const About = () => {
  // State to track the index of the image currently in the CENTER position
  const [centerIndex, setCenterIndex] = useState(0);
  
  // Ref array to hold all card DOM elements
  const cardRefs = useRef([]); 

  // --- Animation Logic ---

  // Function to apply the CSS transforms for each position (Left, Center, Right)
  const setCardPositionStyles = () => {
    // 1. Calculate the indices for the three visible positions and the entering card
    const leftIndex = (centerIndex - 1 + allCards.length) % allCards.length;
    const rightIndex = (centerIndex + 1) % allCards.length;
    
    // 2. Loop through ALL cards to set their correct initial or standby state
    allCards.forEach((_, index) => {
      const card = cardRefs.current[index];
      if (!card) return;

      // Base non-visible state for all cards
      gsap.set(card, { 
        x: 0, 
        y: 0,
        rotationY: 0,
        scale: 0.5, 
        opacity: 0, 
        zIndex: 1,
        // CRITICAL FIX: Sets the rotation point for smooth 3D flip
        transformOrigin: '50% 50% -150px' 
      });

      // Card is in the LEFT slot
      if (index === leftIndex) {
        gsap.set(card, {
          x: '-140%', 
          rotationY: 45, 
          scale: 0.8,
          opacity: 1,
          zIndex: 5
        });
      } 
      // Card is in the CENTER slot
      else if (index === centerIndex) {
        gsap.set(card, {
          x: '-50%', // Centering offset (from the CSS translate(-50%, -50%))
          rotationY: 0, 
          scale: 1,
          opacity: 1,
          zIndex: 10
        });
      } 
      // Card is in the RIGHT slot
      else if (index === rightIndex) {
        gsap.set(card, {
          x: '40%', 
          rotationY: -45, 
          scale: 0.8,
          opacity: 1,
          zIndex: 5
        });
      }
    });
  };

  // Function to perform the right-to-left transition
  const animateTransition = () => {
    // Calculate the indices before and after the transition
    const prevCenterIndex = centerIndex;
    const prevLeftIndex = (prevCenterIndex - 1 + allCards.length) % allCards.length;
    const prevRightIndex = (prevCenterIndex + 1) % allCards.length;
    const nextIndex = (prevCenterIndex + 2) % allCards.length;
    
    // New center card will be the previous right card
    const newCenterIndex = prevRightIndex;
    
    // Get the DOM elements
    const centerCard = cardRefs.current[prevCenterIndex];
    const leftCard = cardRefs.current[prevLeftIndex];
    const rightCard = cardRefs.current[prevRightIndex];
    const nextCard = cardRefs.current[nextIndex];

    // UPDATED FOR SMOOTHNESS: Increased duration and set a smoother ease (power4)
    const tl = gsap.timeline({ defaults: { duration: 1.5, ease: "power4.inOut" } });

    // 1. Move the old CENTER card to the LEFT slot
    tl.to(centerCard, { x: '-140%', rotationY: 45, scale: 0.8, zIndex: 5 }, 0); 

    // 2. Move the old LEFT card out of view (EXIT)
    tl.to(leftCard, { x: '-240%', rotationY: 90, opacity: 0, scale: 0.5, zIndex: 1 }, 0); 

    // 3. Move the old RIGHT card to the CENTER slot (becomes the new main card)
    tl.to(rightCard, { x: '-50%', rotationY: 0, scale: 1, zIndex: 10 }, 0); 
    
    // 4. Move the hidden NEXT card into the RIGHT slot
    // Initialize its off-screen state before the transition
    gsap.set(nextCard, { x: '240%', rotationY: -90, scale: 0.5, opacity: 0, zIndex: 1, transformOrigin: '50% 50% -150px' });
    tl.to(nextCard, { x: '40%', rotationY: -45, scale: 0.8, opacity: 1, zIndex: 5 }, 0); 

    // 5. Update state AFTER the transition is complete
    tl.call(() => {
      setCenterIndex(newCenterIndex); 
    });
  };

  // Lifecycle hook
  useEffect(() => {
    // 1. Initialize the positions on mount
    setCardPositionStyles();

    // 2. Start the continuous animation loop
    const interval = setInterval(animateTransition, 3000); // Change card every 3 seconds

    // 3. Cleanup
    return () => {
      clearInterval(interval);
      cardRefs.current.forEach(card => gsap.killTweensOf(card));
    };
  }, [centerIndex]);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About PIARA AGENCY</h2>
            <div className="mission-vision">
              <div className="mission">
                <h3>Our Mission</h3>
                <p>
                  To empower startups and growing companies with innovative advertising, media, and marketing solutions by combining data-driven strategies with cinematic storytelling and hyper-targeted campaigns.
                </p>
              </div>
              <div className="vision">
                <h3>Our Vision</h3>
                <p>
                  To become the leading catalyst for transformative business success in Dubai and beyond, setting new standards for creative excellence and strategic impact in the digital marketing landscape.
                </p>
              </div>
            </div>
            <div className="founders">
              <h3>Meet Our Founders</h3>
              <div className="founders-grid">
                <div className="founder">
                  <h4>Arnav Gupta</h4>
                  <span>Founder & Creative Director</span>
                  <p>
                    With a passion for visual storytelling and strategic marketing, Arnav brings years of experience in creating compelling brand narratives that resonate with diverse audiences.
                  </p>
                </div>
                <div className="founder">
                  <h4>Pinar Tukta</h4>
                  <span>Co-Founder & Strategy Director</span>
                  <p>
                    Pinar combines analytical thinking with creative vision to develop data-driven marketing strategies that deliver measurable results.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-image">
            <div className="gsap-card-carousel">
              {allCards.map((card, index) => (
                <img
                  key={index}
                  src={card.src}
                  alt={card.alt}
                  className="card-image"
                  ref={el => cardRefs.current[index] = el}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;