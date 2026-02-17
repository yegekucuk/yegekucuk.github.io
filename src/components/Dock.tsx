import { type ReactNode } from 'react';
import { HomeIcon, GithubIcon, LinkedInIcon, XIcon } from './Icons';
import type { SocialLink } from '../data/config';

interface DockProps {
  socials: SocialLink[];
}

interface DockIconProps {
  href: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
}

function DockIcon({ href, icon, label, external = true }: DockIconProps) {
  return (
    <div className="flex aspect-square cursor-pointer items-center justify-center rounded-full" style={{ width: 40 }}>
      <a
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full size-12"
        href={href}
        title={label}
      >
        {icon}
      </a>
    </div>
  );
}

function Separator() {
  return (
    <div
      data-orientation="vertical"
      role="none"
      className="shrink-0 bg-border w-px h-full"
    />
  );
}

export function Dock({ socials }: DockProps) {
  const iconMap: Record<string, ReactNode> = {
    github: <GithubIcon className="size-4" />,
    linkedin: <LinkedInIcon className="size-4" />,
    x: <XIcon className="size-4" />,
    twitter: <XIcon className="size-4" />,
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background" />
      <div className="w-max p-2 rounded-full border z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
        <DockIcon href="#" icon={<HomeIcon className="size-4" />} label="Home" external={false} />
        
        <Separator />
        
        {socials.map((social) => (
          <DockIcon
            key={social.name}
            href={social.url}
            icon={iconMap[social.name.toLowerCase()] || <HomeIcon className="size-4" />}
            label={social.name}
          />
        ))}
      </div>
    </div>
  );
}
