import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useActiveSection } from '../hooks/useScrollPosition';
import './Header.css';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`header ${scrolled ? 'header-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav className="nav" aria-label="Main navigation">
        <motion.div
          className="nav-brand"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="nav-brand-link"
            aria-label="Scroll to top"
          >
            TV
          </button>
        </motion.div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? 'nav-link-active' : ''}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    className="nav-indicator"
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
