import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export function Card({ children, className = '', href }: CardProps) {
  const cardContent = (
    <div className={`rounded-lg bg-card text-card-foreground flex ${className}`}>
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
