import React from 'react';

const ServicesPreview = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services-preview" className="services-preview">
      <div className="container">
        <h2 className="section-title">Comprehensive Solutions for Modern Businesses</h2>
        <div className="services-grid">
          <div className="service-card featured">
            <div className="service-icon">
              <i className="fas fa-video"></i>
            </div>
            <h3>Cinematic Video Production</h3>
            <p>Bringing your brand story to life through high-end video content that captivates and converts.</p>
            <a href="#services" className="service-link" onClick={() => scrollToSection('services')}>
              Learn More <i className="fas fa-arrow-right"></i>
            </a>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-bullhorn"></i>
            </div>
            <h3>Digital Advertising</h3>
            <p>Strategic Google and Meta Ads campaigns designed for maximum ROI and market penetration.</p>
            <a href="#services" className="service-link" onClick={() => scrollToSection('services')}>
              Learn More <i className="fas fa-arrow-right"></i>
            </a>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-palette"></i>
            </div>
            <h3>Brand Development</h3>
            <p>Complete visual identity solutions from logo design to comprehensive brand guidelines.</p>
            <a href="#services" className="service-link" onClick={() => scrollToSection('services')}>
              Learn More <i className="fas fa-arrow-right"></i>
            </a>
          </div>
          {/* <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-globe"></i>
            </div>
            <h3>Web Solutions</h3>
            <p>Modern, responsive websites and innovative QR menu systems for the digital age.</p>
            <a href="#services" className="service-link" onClick={() => scrollToSection('services')}>
              Learn More <i className="fas fa-arrow-right"></i>
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;

