// components/ui/Button.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // optional, kalau pakai react-router

type ButtonVariant = 'red' | 'transparent-red' | 'outline-red' | 'orange' | 
'transparent-orange' | 'outline-orange' | 'yellow' | 'transparent-yellow' |
'outline-yellow' | 'blue' | 'transparent-blue' | 'outline-blue' | 'gray' | 'transparent-gray' | 'outline-gray';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

type ButtonProps =
  | (BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' })
  | (BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string })
  | (BaseButtonProps & { as: 'link'; href: string } & Omit<React.ComponentProps<typeof Link>, 'to'>);

const baseStyles = 'inline-flex items-center justify-center rounded-sm transition-all disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed';

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-3',
};

const variantStyles: Record<ButtonVariant, string> = {
  'red': 'bg-red-600 text-white hover:bg-red-700 border border-red-700',
  'transparent-red': 'bg-red-600/10 text-red-500 border border-red-500 hover:bg-red-600/20',
  'outline-red': 'text-red-500 border border-red-500 hover:bg-red-600/20',
  'orange': 'bg-orange-600 text-white hover:bg-orange-700 border border-orange-700',
  'transparent-orange': 'bg-orange-600/10 text-orange-500 border border-orange-500 hover:bg-orange-600/20',
  'outline-orange': 'text-orange-500 border border-orange-500 hover:bg-orange-600/20',
  'yellow': 'bg-yellow-500 text-yellow-100 hover:bg-yellow-600 border border-yellow-600',
  'transparent-yellow': 'text-yellow-500 border border-yellow-500 hover:bg-yellow-500/20',
  'outline-yellow': 'text-yellow-500 border border-yellow-500 hover:bg-yellow-500/20',
  'blue': 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-700',
  'transparent-blue': 'bg-blue-600/10 text-blue-500 border border-blue-500 hover:bg-blue-600/20',
  'outline-blue': 'text-blue-500 border border-blue-500 hover:bg-blue-600/20',
  'gray': 'bg-gray-600 text-white hover:bg-gray-700 border border-gray-700',
  'transparent-gray': 'bg-gray-900/10 text-gray-500 border border-gray-500 hover:bg-gray-600/20',
  'outline-gray': 'text-gray-900 dark:text-gray-200 border border-gray-500 hover:bg-gray-600/20',
};

export const Button: React.FC<ButtonProps> = ({
  as = 'button',
  variant = 'red',
  size = 'md',
  loading,
  icon,
  children,
  className = '',
  ...rest
}) => {
  const { href } = rest as { href?: string }; // Extract href conditionally
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant as ButtonVariant]} ${className}`;

  if (as === 'a') {
    const { href } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={combinedClassName} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </a>
    );
  }

  if (as === 'link') {
    const linkProps = rest as Omit<React.ComponentProps<typeof Link>, 'to'>;
    return (
      <Link to={href || ''} className={combinedClassName} {...linkProps}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }

  const { disabled, type, onClick, ...buttonProps } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      {...buttonProps}
    >
      {loading && <span className="animate-spin mr-2">🔄</span>}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
