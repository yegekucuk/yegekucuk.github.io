import { ChevronRightIcon } from './Icons';

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle: string;
  period: string;
  href?: string;
  badges?: string[];
  description?: string;
}

export function ResumeCard({
  logoUrl,
  altText,
  title,
  subtitle,
  period,
  href = '#',
  badges = [],
  description,
}: ResumeCardProps) {
  return (
    <a className="block cursor-pointer" href={href} target="_blank" rel="noopener noreferrer">
      <div className="rounded-lg bg-card text-card-foreground flex">
        <div className="flex-none">
          <span className="relative flex shrink-0 overflow-hidden rounded-full border size-12 m-auto bg-white">
            <img
              className="aspect-square h-full w-full object-contain"
              alt={altText}
              src={logoUrl}
            />
          </span>
        </div>
        <div className="grow ml-4 items-center flex-col group">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                {title}
                {badges.length > 0 && (
                  <span className="inline-flex gap-x-1">
                    {badges.map((badge) => (
                      <span key={badge} className="ml-1 text-xs text-muted-foreground">
                        {badge}
                      </span>
                    ))}
                  </span>
                )}
                <ChevronRightIcon className="size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {period}
              </div>
            </div>
            <div className="font-sans text-xs">{subtitle}</div>
            {description && (
              <div className="mt-2 text-xs text-muted-foreground">{description}</div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
