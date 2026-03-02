import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import ExperienceCard from "./ExperienceCard";
import DesignCard from "./DesignCard";

const projects = [
  {
    title: "Lattice",
    tags: "TypeScript • VSCode API • LangChain",
    description:
      "A VSCode extension that brings LLM-powered frontend development directly into your editor. Features intelligent code generation, component scaffolding, and AI-assisted debugging for React and Next.js projects.",
    href: "https://github.com/tarun-varier/Lattice",
  },
  {
    title: "Entropy",
    tags: " Mastra • Agentic AI • MCP • TypeScript ",
    description:
      "Autonomous multi-agent drug-repurposing research platform. Orchestrates a pipeline of 7 specialised AI agents to produce a fully cited Latex/PDF research dossier",
    href: "https://github.com/BrownBeast-spec/entropy-v2",
  },
  {
    title: "STUDIUS",
    tags: "Python • RAG • LLMs • OCR • PDF Processing",
    description: "An AI-Based Exam Preparation System that ingests PDF/images and automatically extracts structured questions. A retrieval-augmented generation (GraphRAG) pipeline that generates LaTeX-formatted answers with source grounding.",
    href: "https://github.com/tarun-varier/STUDIUS",
  },
  {
    title: "Quintessence Pens",
    tags: "Next.js • React 19 • Three.js • React Three Fiber • GSAP • Supabase",
    description:
      "A premium e-commerce experience for luxury writing instruments. Built with Next.js and Three.js for immersive 3D product visualization, with Supabase powering the backend and real-time inventory management.",
    href: "https://github.com/Madhav-000-s/quintessence-pens",
  },
  {
    title: "wa-botr",
    tags: "TypeScript • WhatsApp API • Node.js",
    description:
      "A WhatsApp automation bot built with TypeScript and the WhatsApp Business API. Supports custom command handlers, scheduled messaging, and integration with external services.",
    href: "https://github.com/tarun-varier/wa-botr",
  },
  {
    title: "CARDIA",
    tags: "C++ • Signal Processing • Parallel Computing",
    description:
      "High-performance cardiac signal processing system built in C++ with parallel computing optimizations. Processes ECG data in real-time for anomaly detection and heart rhythm classification.",
    href: "https://github.com/tarun-varier/CARDIA",
  },
  {
    title: "GENRAI",
    tags: "Python • TensorFlow • Audio ML",
    description:
      "An audio machine learning pipeline for generative music and sound design. Uses TensorFlow for training custom models on audio datasets, enabling AI-driven sound synthesis and transformation.",
    href: "https://github.com/tarun-varier/GENRAI",
  },
];

const experiences = [
  {
    role: "Freelance Developer",
    company: "Tabeeb Medical Solutions",
    period: "Mar 2025 - Dec 2025",
    description:
      " Developed production features including the landing page, patient dashboard, and clinic portal using Next.js. Built systems for managing staff, revenue analytics, and health records, while implementing backend-integrated services for appointment booking and authentication. ",
  },
];

const designWork = [
  {
    title: "Doctor Consultation App Design",
    category: "UI/UX  Mobile",
    description:
      "A mobile app design for doctor consultations. Features include booking online and offline appointments, patient dashboard, etc.",
    href:
      "https://www.figma.com/design/vs7BrgJFD82gD1JlvEQiPU/Doctor-Consultation-App-Design?m=auto&t=pYTP0AWkJzzms5W9-1"
  },
];

export default function MainContent() {
  return (
    <main className="mx-auto min-h-screen py-16 px-12 lg:ml-[400px] min-[1600px]:ml-auto max-lg:px-6 max-lg:py-10">
      <div className="max-w-3xl mx-auto">
        {/* Projects */}
        <section className="mb-20">
          <SectionHeader title="Projects" />
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </section>

        {/* Experience */}
        <section className="mb-20">
          <SectionHeader title="Experience" />
          {experiences.map((exp) => (
            <ExperienceCard key={exp.role} {...exp} />
          ))}
        </section>

        {/* Design Work */}
        <section className="mb-20">
          <SectionHeader title="Design Work" />
          {designWork.map((work) => (
            <DesignCard key={work.title} {...work} />
          ))}
        </section>
      </div>
    </main>
  );
}
