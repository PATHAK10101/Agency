// import React, { useState, useEffect } from 'react';
// // IMPORT YOUR NEW LOGO HERE
// import piaraLogo from '../assets/images/piara_logo_transparent.png'; // Make sure this path is correct

// const Navigation = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//     setIsMobileMenuOpen(false);
//   };

//   const navLinks = [
//     { href: '#home', label: 'Home' },
//     { href: '#about', label: 'About' },
//     { href: '#services', label: 'Services' },
//     { href: '#portfolio', label: 'Portfolio' },
//     { href: '#contact', label: 'Contact' },
//   ];

//   return (
//     <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
//       <div className="nav-container">
//         {/* === Logo === */}
//         <a href="#home" onClick={() => scrollToSection('home')} className="nav-logo-link">
//           <img
//             src="" // Use the imported logo variable here
//             alt="PIARA AGENCY Logo"
//             className="h-full w-full"
//           />
//         </a>

//         {/* === Desktop Navigation === */}
//         <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`} id="nav-menu">
//           {navLinks.map((link) => (
//             <li key={link.href}>
//               <a href={link.href} className="nav-link" onClick={() => scrollToSection(link.href)}>
//                 {link.label}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* === Hamburger Button === */}
//         <div
//           className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
//           id="hamburger"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;


import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          {/* Add your logo image here */}
          {/* <img src="/logo.png" alt="PIARA Logo" style={{ height: '40px', marginRight: '10px' }} /> */}
          <h1>PIARA</h1>
          <span>AGENCY</span>
        </div>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`} id="nav-menu">
          <li><a href="#home" className="nav-link" onClick={() => scrollToSection('home')}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={() => scrollToSection('about')}>About</a></li>
          <li><a href="#services" className="nav-link" onClick={() => scrollToSection('services')}>Services</a></li>
          <li><a href="#portfolio" className="nav-link" onClick={() => scrollToSection('portfolio')}>Portfolio</a></li>
          <li><a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a></li>
        </ul>
        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
          id="hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
