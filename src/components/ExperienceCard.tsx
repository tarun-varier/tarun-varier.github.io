interface ExperienceCardProps {
  role: string;
  company: string;
  period: string;
  description: string;
  href?: string;
}

export default function ExperienceCard({
  role,
  company,
  period,
  description,
  href,
}: ExperienceCardProps) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative block overflow-hidden mb-6 ${href ? "cursor-pointer" : ""}`}
    >
      {/* Background fill layer */}
      <div className="absolute inset-0 bg-card-hover/55 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />

      {/* Content */}
      <div className="relative px-6 py-5">
        <h3 className="font-serif text-3xl text-text mb-2 inline">
          <span className="bg-[linear-gradient(to_top,var(--color-primary-55)_40%,transparent_20%)] group-hover:bg-none transition-all duration-300">
            {role}
          </span>
        </h3>

        <div className="flex items-center gap-3 mt-2 mb-3">
          <p className="font-pixel font-bold text-base tracking-[0.1em] uppercase text-primary group-hover:text-secondary transition-colors duration-500">
            {company}
          </p>
          <span className="text-text text-xs">
            {period}
          </span>
        </div>

        <p className="text-text text-sm leading-relaxed transition-colors duration-500">
          {description}
        </p>
      </div>
    </Wrapper>
  );
}
