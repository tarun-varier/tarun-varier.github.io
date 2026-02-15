import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, fadeInUp } from '../utils/animations';
import type { Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variants?: Variants;
  childVariants?: Variants;
  stagger?: boolean;
  delay?: number;
  once?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  id,
  variants = staggerContainer,
  stagger = true,
  delay = 0,
  once = true,
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: '-100px 0px',
  });

  const sectionVariants = stagger
    ? {
        ...variants,
        visible: {
          ...((variants as Record<string, unknown>).visible as Record<string, unknown>),
          transition: {
            ...(((variants as Record<string, unknown>).visible as Record<string, unknown>)?.transition as Record<string, unknown>),
            delayChildren: delay,
          },
        },
      }
    : variants;

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.section>
  );
};

// Wrapper for individual animated children within a section
interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: keyof React.JSX.IntrinsicElements;
}

export const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  className = '',
  variants = fadeInUp,
  as = 'div',
}) => {
  const Component = motion[as as keyof typeof motion] as React.ComponentType<
    React.ComponentProps<typeof motion.div>
  >;

  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
};

export default AnimatedSection;
