interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex justify-center mb-10">
      <h2 className="font-pixel text-sm uppercase tracking-[0.25em] text-secondary">
        {title}
      </h2>
    </div>
  );
}
