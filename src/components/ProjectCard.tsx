interface ProjectCardProps {
  title: string;
  tags: string;
  description: string;
  href: string;
}

export default function ProjectCard({
  title,
  tags,
  description,
  href,
}: ProjectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden cursor-pointer mb-8"
    >
      {/* Background fill layer - expands on hover */}
      <div className="absolute inset-0 bg-card-hover/55 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />

      {/* Content */}
      <div className="relative px-6 py-5">
        {/* Title with underline highlight */}
        <h3 className="font-serif text-3xl text-text mb-2 inline">
          <span className="bg-[linear-gradient(to_top,var(--color-primary-55)_40%,transparent_20%)] group-hover:bg-none transition-all duration-300">
            {title}
          </span>
        </h3>

        {/* Tags */}
        <p className="font-pixel font-bold text-base tracking-[0.1em] uppercase text-primary group-hover:text-secondary mt-3 mb-3 transition-colors duration-500">
          {tags}
        </p>

        {/* Description */}
        <p className="text-text text-sm leading-relaxed transition-colors duration-500">
          {description}
        </p>
      </div>
    </a>
  );
}
