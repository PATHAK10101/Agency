import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import React from 'react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>PIARA AGENCY</h3>
            <p>Turning Market Potential Into Market Presence</p>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><a href="#services" onClick={() => scrollToSection('services')}>Video Production</a></li>
                <li><a href="#services" onClick={() => scrollToSection('services')}>Digital Advertising</a></li>
                <li><a href="#services" onClick={() => scrollToSection('services')}>Brand Development</a></li>
                <li><a href="#services" onClick={() => scrollToSection('services')}>Web Design</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about" onClick={() => scrollToSection('about')}>About Us</a></li>
                <li><a href="#portfolio" onClick={() => scrollToSection('portfolio')}>Portfolio</a></li>
                <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                {/* <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a> */}
                <a href="https://www.linkedin.com/company/piara-agency/" target="_blank" rel="noopener noreferrer"><Linkedin className="social-icon" /></a>
                <a href="https://www.instagram.com/piara_agency?igsh=ZDlld3pobWMxZGRz" target="_blank" rel="noopener noreferrer"><Instagram className="social-icon" /></a>
                <a href="https://www.facebook.com/share/1BPgZJjs93/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><Facebook className="social-icon" /></a>
                <a href="https://twitter.com/piraagency" target="_blank" rel="noopener noreferrer"><Twitter className="social-icon" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 PIARA AGENCY. All rights reserved. | IFZA Free Zone, Dubai, UAE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

