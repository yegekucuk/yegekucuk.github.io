import { SectionTitle } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';

interface SkillsSectionProps {
  skills: string[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-3">
        <SectionTitle>Skills</SectionTitle>
        <div className="flex flex-wrap gap-1">
          {skills.map((skill) => (
            <Badge key={skill} variant="primary">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
