import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiLangchain,
  SiCplusplus, SiPython, SiTensorflow,
} from 'react-icons/si';
import { HiCodeBracket } from 'react-icons/hi2';
import { staggerContainer, fadeInUp, projectCardVariant } from '../utils/animations';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  problem: string;
  technologies: { name: string; icon?: React.ReactNode }[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'active' | 'completed';
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Lattice',
    description:
      'VSCode extension that accelerates AI-based front-end development with intelligent scaffolding and context-aware code generation.',
    problem:
      'Developers waste time on boilerplate when using AI tools for front-end work. Lattice provides smart scaffolding that understands your project context.',
    technologies: [
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'VSCode API', icon: <HiCodeBracket /> },
      { name: 'LangChain', icon: <SiLangchain /> },
    ],
    githubUrl: 'https://github.com/tarun-varier/Lattice',
    status: 'active',
    featured: true,
  },
  {
    id: 2,
    title: 'SaaS Platform',
    description:
      'Platform connecting businesses and content creators through innovative collaboration and discovery tools.',
    problem:
      'Traditional creator-business partnerships lack efficient discovery and management systems. This platform reimagines how they connect.',
    technologies: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Tailwind', icon: <SiTailwindcss /> },
      { name: 'Python', icon: <SiPython /> },
    ],
    status: 'active',
  },
  {
    id: 3,
    title: 'CARDIA',
    description:
      'Parallelized ECG signal analysis pipeline using the Pan-Tompkins algorithm for real-time heart rate detection.',
    problem:
      'Medical signal processing demands high performance for real-time applications. CARDIA leverages parallel computing to meet that challenge.',
    technologies: [
      { name: 'C++', icon: <SiCplusplus /> },
      { name: 'Signal Processing' },
      { name: 'Parallel Computing' },
    ],
    githubUrl: 'https://github.com/tarun-varier/CARDIA',
    status: 'completed',
  },
  {
    id: 4,
    title: 'GENRAI',
    description:
      'Machine learning model for music genre classification using audio feature extraction and neural networks.',
    problem:
      'Automated music categorization for streaming platforms and music libraries using deep learning on raw audio data.',
    technologies: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'TensorFlow', icon: <SiTensorflow /> },
      { name: 'Audio ML' },
    ],
    githubUrl: 'https://github.com/tarun-varier/GENRAI',
    status: 'completed',
  },
  {
    id: 5,
    title: 'wa-botr',
    description:
      'Framework for creating WhatsApp bots using configurable triggers and automated responses.',
    problem:
      'Businesses need accessible automation tools for customer interactions on WhatsApp without complex infrastructure.',
    technologies: [
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'WhatsApp API' },
      { name: 'Node.js' },
    ],
    githubUrl: 'https://github.com/tarun-varier/wa-botr',
    status: 'completed',
  },
];

// 3D tilt effect hook
const useTilt = () => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (y - 0.5) * -8,
      rotateY: (x - 0.5) * 8,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return { tilt, handleMouseMove, handleMouseLeave };
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <motion.div
      className={`project-card ${project.featured ? 'project-card-featured' : ''}`}
      variants={projectCardVariant}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      {/* Image placeholder */}
      <div className="project-image-placeholder">
        <span className="project-image-text">Screenshot</span>
      </div>

      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <span className={`project-status ${project.status}`}>
            {project.status === 'active' ? 'In Development' : 'Completed'}
          </span>
        </div>

        <p className="project-description">{project.description}</p>

        {project.featured && (
          <p className="project-problem">{project.problem}</p>
        )}

        <div className="project-technologies">
          {project.technologies.map((tech) => (
            <span key={tech.name} className="tech-tag">
              {tech.icon && <span className="tech-icon">{tech.icon}</span>}
              {tech.name}
            </span>
          ))}
        </div>

        <div className="project-links">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              aria-label={`View ${project.title} on GitHub`}
            >
              <FaGithub />
              <span>Source Code</span>
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              className="project-link project-link-primary"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              aria-label={`View ${project.title} live demo`}
            >
              <FaExternalLinkAlt />
              <span>Live Demo</span>
            </motion.a>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <span className="project-link-private">Private Repository</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <motion.section
      id="projects"
      className="projects"
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="container">
        <motion.h2 className="section-title" variants={fadeInUp}>
          What I've Built
        </motion.h2>

        {/* Featured project */}
        {featuredProject && (
          <div className="projects-featured">
            <ProjectCard project={featuredProject} />
          </div>
        )}

        {/* Other projects grid */}
        <motion.div className="projects-grid" variants={staggerContainer}>
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
