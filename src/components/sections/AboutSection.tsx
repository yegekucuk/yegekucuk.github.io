import { SectionTitle } from '@/components/ui/Section';

interface AboutSectionProps {
  description: string;
}

export function AboutSection({ description }: AboutSectionProps) {
  return (
    <section id="about">
      <SectionTitle>About</SectionTitle>
      <div className="mt-2 prose max-w-full text-pretty font-sans text-sm text-muted-foreground">
        <p>{description}</p>
      </div>
    </section>
  );
}
