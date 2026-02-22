import React from 'react';
import { motion } from 'framer-motion';
import { heroStagger, heroItem, letterAnimation, scrollIndicator } from '../utils/animations';
import { HiArrowDown } from 'react-icons/hi2';
import './Hero.css';
import Dither from './Dither'

const Hero: React.FC = () => {
  const nameLetters = 'Tarun Varier'.split('');

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      {/* Animated background gradient */}
<div className="hero-bg-gradient">
  <Dither
    waveColor={[1.0, 0.47, 0.0]}
    disableAnimation={false}
    enableMouseInteraction
    mouseRadius={0.1}
    colorNum={4}
    waveAmplitude={0.3}
    waveFrequency={3}
    waveSpeed={0.05}
  />

</div>
      <motion.div
        className="hero-content"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="hero-greeting" variants={heroItem}>
          Hi, I'm
        </motion.span>

        <motion.h1 className="hero-name" variants={heroItem}>
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              className={`hero-letter ${letter === ' ' ? 'hero-space' : ''}`}
              variants={letterAnimation}
              style={{ display: 'inline-block' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p className="hero-subtitle" variants={heroItem}>
          [MAKER] [DEVELOPER]
        </motion.p>

        <motion.p className="hero-description" variants={heroItem}>
          I talk to people, find problems worth solving, and build the software
          to fix them. From idea to shipped product — I own the whole process.
        </motion.p>

        <motion.div className="hero-cta-group" variants={heroItem}>
          <motion.button
            onClick={scrollToProjects}
            className="hero-cta hero-cta-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            See What I've Built
            <HiArrowDown className="hero-cta-icon" />
          </motion.button>

          <motion.button
            onClick={scrollToContact}
            className="hero-cta hero-cta-secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="availability-dot" />
            Open to Work
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        variants={scrollIndicator}
        animate="animate"
      >
        <HiArrowDown />
      </motion.div>
    </section>
  );
};

export default Hero;
