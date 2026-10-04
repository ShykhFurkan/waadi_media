import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'wide' | 'narrow';
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export function Container({
  size = 'default',
  as: Component = 'div',
  children,
  className = '',
  ...props
}: ContainerProps) {
  const sizeClasses = {
    default: 'max-w-[1280px]',
    wide: 'max-w-[1440px]',
    narrow: 'max-w-[840px]',
  };

  return (
    <Component
      className={`mx-auto w-full container-padding ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
