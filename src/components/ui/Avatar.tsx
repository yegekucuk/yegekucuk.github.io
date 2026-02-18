import Image from 'next/image';

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

  const pixelSizes = {
    sm: 48,
    md: 80,
    lg: 112,
  };

  return (
    <span className={`relative flex shrink-0 overflow-hidden rounded-full border ${sizes[size]} ${className}`}>
      <Image
        className="aspect-square h-full w-full object-cover"
        alt={alt}
        src={src}
        width={pixelSizes[size]}
        height={pixelSizes[size]}
      />
    </span>
  );
}
