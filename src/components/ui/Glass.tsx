import React from 'react';

// Reusable GlassCard Component
export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}> = ({ children, className = '', onClick, id }) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`glass-card rounded-2xl p-4 sm:p-6 transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Reusable GlassPanel Component
export const GlassPanel: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = '', id }) => {
  return (
    <div id={id} className={`glass-panel rounded-2xl p-5 sm:p-7 ${className}`}>
      {children}
    </div>
  );
};

// Reusable GlassButton Component
export const GlassButton: React.FC<{
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}> = ({
  children,
  onClick,
  variant = 'secondary',
  size = 'md',
  className = '',
  disabled = false,
  id,
  type = 'button',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-xl font-medium',
    md: 'px-4 py-2 text-sm rounded-xl font-medium',
    lg: 'px-6 py-3 text-base rounded-2xl font-semibold',
  };

  const variantClasses = {
    primary:
      'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm',
    secondary:
      'glass-button text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60',
    accent:
      'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm border border-emerald-500/30',
    danger:
      'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20',
    ghost:
      'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 border-transparent',
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Reusable GlassInput Component
export const GlassInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: React.ReactNode;
  }
> = ({ icon, className = '', ...props }) => {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <div className="absolute left-3.5 text-zinc-400 pointer-events-none flex items-center">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`glass-input w-full ${
          icon ? 'pl-10 pr-4' : 'px-4'
        } py-2.5 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all ${className}`}
      />
    </div>
  );
};

// Reusable GlassFlashcard Container Component (Supports 3D Card Flip)
export const GlassFlashcard: React.FC<{
  isFlipped: boolean;
  onFlip: () => void;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ isFlipped, onFlip, frontContent, backContent, className = '', id }) => {
  return (
    <div
      id={id}
      className={`perspective-1000 w-full max-w-xl mx-auto cursor-pointer select-none ${className}`}
      onClick={onFlip}
    >
      <div
        className={`relative w-full h-[400px] sm:h-[440px] transform-style-3d transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Face */}
        <div className="glass-flashcard absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 backface-hidden flex flex-col justify-between overflow-hidden">
          {frontContent}
        </div>

        {/* Back Face */}
        <div className="glass-flashcard absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 backface-hidden rotate-y-180 flex flex-col justify-between overflow-hidden">
          {backContent}
        </div>
      </div>
    </div>
  );
};

// Reusable GlassNavigation Tabs
export const GlassNavigation: React.FC<{
  tabs: { id: string; label: string; subLabel?: string; icon?: React.ReactNode }[];
  activeTab: string;
  onSelect: (id: string) => void;
  className?: string;
}> = ({ tabs, activeTab, onSelect, className = '' }) => {
  return (
    <div
      className={`glass-panel p-1.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer select-none ${
              isActive
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40'
            }`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.subLabel && (
              <span
                className={`text-xs opacity-70 ${
                  isActive ? 'text-zinc-200 dark:text-zinc-700' : 'text-zinc-400'
                }`}
              >
                ({tab.subLabel})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
