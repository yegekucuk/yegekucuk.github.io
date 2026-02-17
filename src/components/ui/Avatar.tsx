interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'size-12',
    md: 'size-20',
    lg: 'size-28',
  };

  return (
    <span className={`relative flex shrink-0 overflow-hidden rounded-full border ${sizes[size]} ${className}`}>
      <img
        className="aspect-square h-full w-full object-cover"
        alt={alt}
        src={src}
      />
    </span>
  );
}
