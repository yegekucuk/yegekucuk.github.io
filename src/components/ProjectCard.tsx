import type { ReactNode } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { GlobeIcon, GithubIcon, ExternalLinkIcon, StarIcon } from '@/components/Icons';
import type { Project, ProjectLink } from '@/data/config';

interface ProjectCardProps {
  project: Project;
}

function LinkButton({ link }: { link: ProjectLink }) {
  const icons: Record<ProjectLink['type'], ReactNode> = {
    website: <GlobeIcon className="size-3" />,
    source: <GithubIcon className="size-3" />,
    demo: <ExternalLinkIcon className="size-3" />,
    gitops: <ExternalLinkIcon className="size-3" />,
    stars: <StarIcon className="size-3" />,
  };

  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer">
      <div className="rounded-md border border-transparent font-semibold transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/80 flex items-center gap-1 px-2 py-1 text-[10px]">
        {icons[link.type]}
        {link.label}
        {link.count && <span className="inline-flex items-center">{link.count}</span>}
      </div>
    </a>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-lg bg-card text-card-foreground flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full hover:scale-[1.02]">
      {project.href && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-pointer"
          href={project.href}
        >
          <div className="h-full w-full overflow-hidden">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="pointer-events-none mx-auto h-full w-full object-cover object-top"
              />
            ) : project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={160}
                className="h-40 w-full overflow-hidden object-cover object-top"
              />
            ) : null}
          </div>
        </a>
      )}

      <div className="flex flex-col px-2">
        <div className="space-y-1">
          <h3 className="font-semibold tracking-tight mt-1 text-base">{project.title}</h3>
          <time className="font-sans text-xs">{project.period}</time>
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground">
            <p>{project.description}</p>
          </div>
        </div>
      </div>

      <div className="text-pretty font-sans text-sm text-muted-foreground mt-auto flex flex-col px-2">
        <div className="mt-2 flex flex-wrap gap-1">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="px-1 py-0 text-[10px]">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {project.links && project.links.length > 0 && (
        <div className="flex items-center pt-2 px-2 pb-2">
          <div className="flex flex-row flex-wrap items-start gap-1">
            {project.links.map((link, index) => (
              <LinkButton key={index} link={link} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
