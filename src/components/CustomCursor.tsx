import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ring follows with spring lag
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect interactive element hovers
    const handleElementHover = () => setIsHovered(true);
    const handleElementLeave = () => setIsHovered(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Attach hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .skill-tag, .project-card, .tech-tag, .social-link, .contact-link, .nav-link'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  // Re-attach hover listeners when DOM updates
  useEffect(() => {
    if (isTouchDevice) return;

    const handleElementHover = () => setIsHovered(true);
    const handleElementLeave = () => setIsHovered(false);

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], .skill-tag, .project-card, .tech-tag, .social-link, .contact-link, .nav-link'
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div ref={cursorRef} className="custom-cursor-wrapper">
      {/* Dot - follows instantly */}
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? 12 : 8,
          height: isHovered ? 12 : 8,
          backgroundColor: isHovered ? 'var(--accent)' : 'var(--text-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10001,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          mixBlendMode: 'difference',
        }}
        animate={{
          width: isHovered ? 12 : 8,
          height: isHovered ? 12 : 8,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring - follows with lag */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          border: `1.5px solid ${isHovered ? 'var(--accent)' : 'rgba(250, 248, 243, 0.4)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? (isHovered ? 0.8 : 0.5) : 0,
        }}
        animate={{
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default CustomCursor;
