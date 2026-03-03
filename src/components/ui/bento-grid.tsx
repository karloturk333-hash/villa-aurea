import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid auto-rows-[18rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5',
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  header?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function BentoGridItem({ header, className, children }: BentoGridItemProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden cursor-pointer transition-all duration-500 bg-charcoal',
        'border border-transparent hover:border-gold/30',
        className
      )}
    >
      {header}
      {children && (
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
          {children}
        </div>
      )}
    </div>
  );
}
