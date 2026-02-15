import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaReact, FaPython, FaDocker, FaAws, FaFigma, FaNodeJs,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiThreedotjs, SiLangchain, SiTypescript,
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { HiLightBulb, HiPaintBrush, HiCodeBracket, HiCloud } from 'react-icons/hi2';
import {
  staggerContainer, staggerContainerSlow, fadeInUp, skillTagVariant,
} from '../utils/animations';
import './About.css';

interface SkillCategory {
  icon: React.ReactNode;
  label: string;
  skills: { name: string; icon?: React.ReactNode }[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: <HiLightBulb />,
    label: 'Discovery & Strategy',
    skills: [
      { name: 'User Research' },
      { name: 'Wireframing' },
      { name: 'Product Strategy' },
    ],
  },
  {
    icon: <HiPaintBrush />,
    label: 'Design & UX',
    skills: [
      { name: 'Figma', icon: <FaFigma /> },
      { name: 'UI/UX Design' },
      { name: 'Design Systems' },
    ],
  },
  {
    icon: <HiCodeBracket />,
    label: 'Frontend Development',
    skills: [
      { name: 'React', icon: <FaReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind', icon: <SiTailwindcss /> },
      { name: 'GSAP' },
      { name: 'Three.js', icon: <SiThreedotjs /> },
      { name: 'Framer Motion', icon: <TbBrandFramerMotion /> },
    ],
  },
  {
    icon: <HiCodeBracket />,
    label: 'Backend & AI',
    skills: [
      { name: 'Python', icon: <FaPython /> },
      { name: 'LangChain', icon: <SiLangchain /> },
      { name: 'Node.js', icon: <FaNodeJs /> },
    ],
  },
  {
    icon: <HiCloud />,
    label: 'Infrastructure',
    skills: [
      { name: 'AWS', icon: <FaAws /> },
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'CI/CD' },
    ],
  },
];

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <motion.section
      id="about"
      className="about"
      ref={ref}
      variants={staggerContainerSlow}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="container">
        <div className="about-content">
          <motion.div className="about-text" variants={fadeInUp}>
            <motion.h2 className="section-title" variants={fadeInUp}>
              About Me
            </motion.h2>

            <motion.p className="about-description" variants={fadeInUp}>
              I started building applications at 13 with a temple pooja management
              system for a local temple in my community. That early experience of
              solving a real problem for real people sparked something — the
              joy of creating value through code.
            </motion.p>

            <motion.p className="about-description" variants={fadeInUp}>
              Today, I'm working on Lattice, a VSCode extension that accelerates
              LLM-based front-end development, and a SaaS platform connecting
              businesses and content creators in innovative ways. Each product I
              build teaches me something new, and that continuous learning fuels
              my passion.
            </motion.p>

            <motion.p className="about-description about-philosophy" variants={fadeInUp}>
              My approach is simple: talk to people, understand their problems,
              experiment with solutions, and iterate until it works beautifully. I
              believe in doing one thing and doing it well — whether that's
              crafting pixel-perfect interfaces or architecting scalable backends.
            </motion.p>
          </motion.div>

          <motion.div className="skills" variants={fadeInUp}>
            <motion.h3 variants={fadeInUp}>Skills & Expertise</motion.h3>

            <div className="skills-categories">
              {skillCategories.map((category) => (
                <motion.div
                  key={category.label}
                  className="skill-category"
                  variants={fadeInUp}
                >
                  <div className="skill-category-header">
                    <span className="skill-category-icon">{category.icon}</span>
                    <span className="skill-category-label">{category.label}</span>
                  </div>
                  <motion.div
                    className="skills-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                  >
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill.name}
                        className="skill-tag"
                        variants={skillTagVariant}
                        whileHover={{
                          scale: 1.05,
                          y: -3,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {skill.icon && (
                          <span className="skill-icon">{skill.icon}</span>
                        )}
                        {skill.name}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
