import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { HiEnvelope } from 'react-icons/hi2';
import { staggerContainerSlow, fadeInUp } from '../utils/animations';
import './Contact.css';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/tarun-varier',
    icon: <FaGithub />,
    label: 'tarun-varier',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tarun-varier',
    icon: <FaLinkedin />,
    label: 'tarun-varier',
  },
  {
    name: 'X / Twitter',
    url: 'https://x.com/t03run',
    icon: <FaXTwitter />,
    label: '@t03run',
  },
];

const Contact: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <motion.section
      id="contact"
      className="contact"
      ref={ref}
      variants={staggerContainerSlow}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="container">
        <motion.h2 className="section-title" variants={fadeInUp}>
          Let's Build Something Together
        </motion.h2>

        <div className="contact-content">
          <motion.p className="contact-description" variants={fadeInUp}>
            I'm currently open to new opportunities and collaborations. Whether
            you're looking for a developer who can take products from idea to
            launch, or you want to collaborate on something interesting — let's talk.
          </motion.p>

          <motion.div className="contact-methods" variants={fadeInUp}>
            <motion.a
              href="mailto:t4runv4rier@gmail.com"
              className="contact-email"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Send email to t4runv4rier@gmail.com"
            >
              <HiEnvelope className="contact-email-icon" />
              <div className="contact-email-text">
                <span className="contact-email-label">Say hello</span>
                <span className="contact-email-address">t4runv4rier@gmail.com</span>
              </div>
            </motion.a>

            <motion.div className="social-links" variants={fadeInUp}>
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`${link.name}: ${link.label}`}
                >
                  <span className="social-link-icon">{link.icon}</span>
                  <span className="social-link-name">{link.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="contact-availability" variants={fadeInUp}>
            <span className="availability-indicator" />
            <span>Available for work & collaborations</span>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer className="footer" variants={fadeInUp}>
        <p>
          Built with React, TypeScript & Framer Motion
        </p>
      </motion.footer>
    </motion.section>
  );
};

export default Contact;
