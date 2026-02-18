import { SectionTitle } from '@/components/ui/Section';
import { ResumeCard } from '@/components/ResumeCard';
import type { WorkExperience } from '@/data/config';

interface WorkSectionProps {
  experiences: WorkExperience[];
}

export function WorkSection({ experiences }: WorkSectionProps) {
  return (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-3">
        <SectionTitle>Work Experience</SectionTitle>
        {experiences.map((exp) => (
          <ResumeCard
            key={exp.company}
            logoUrl={exp.logoUrl}
            altText={exp.company}
            title={exp.company}
            subtitle={exp.role}
            period={exp.period}
            href={exp.href}
            badges={exp.badges}
            description={exp.description}
          />
        ))}
      </div>
    </section>
  );
}
