import React from 'react';
import cinematicEquipment from '../assets/images/cinematic-equipment.jpg';
import marketingTeam from '../assets/images/images.png';
import cameraSetup from '../assets/images/professional-camera-setup.jpg';

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <h2 className="section-title">Transforming Visions Into Reality</h2>
        <div className="portfolio-grid">
          <div className="portfolio-item">
            <div className="portfolio-image">
              <img src={cinematicEquipment} alt="Cinematic Equipment Setup" />
              <div className="portfolio-overlay">
                <h3>Tech Startup Launch</h3>
                <p>Complete brand identity and video campaign</p>
                <a href="#" className="portfolio-link">View Project</a>
              </div>
            </div>
          </div>
          <div className="portfolio-item">
            <div className="portfolio-image">
              <img src={marketingTeam} alt="Digital Marketing Team" />
              <div className="portfolio-overlay">
                <h3>Real Estate Development</h3>
                <p>Promotional video series and digital strategy</p>
                <a href="#" className="portfolio-link">View Project</a>
              </div>
            </div>
          </div>
          <div className="portfolio-item">
            <div className="portfolio-image">
              <img src={cameraSetup} alt="Professional Camera Setup" />
              <div className="portfolio-overlay">
                <h3>Restaurant Chain Rebrand</h3>
                <p>Visual identity and digital marketing campaign</p>
                <a href="#" className="portfolio-link">View Project</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

