import { Avatar } from '@/components/ui/Avatar';

interface HeroSectionProps {
  greeting: string;
  tagline: string;
  avatarUrl: string;
}

export function HeroSection({ greeting, tagline, avatarUrl }: HeroSectionProps) {
  return (
    <section id="hero">
      <div className="mx-auto w-full space-y-8">
        <div className="gap-2 flex justify-between">
          <div className="flex-col flex flex-1 space-y-1.5">
            <span className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              {greeting}
            </span>
            <span className="max-w-150 md:text-xl">{tagline}</span>
          </div>
          <Avatar src={avatarUrl} alt="Avatar" size="lg" />
        </div>
      </div>
    </section>
  );
}
