import { SectionTitle } from '@/components/ui/Section';
import { ResumeCard } from '@/components/ResumeCard';
import type { Education } from '@/data/config';

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-3">
        <SectionTitle>Education</SectionTitle>
        {education.map((edu) => (
          <ResumeCard
            key={edu.institution}
            logoUrl={edu.logoUrl}
            altText={edu.institution}
            title={edu.institution}
            subtitle={edu.degree}
            period={edu.period}
            href={edu.href}
            badges={edu.badges}
          />
        ))}
      </div>
    </section>
  );
}
