import { Cog } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, textClassName }: { className?: string, textClassName?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="p-1.5 bg-primary rounded-lg">
        <Cog className="h-5 w-5 text-primary-foreground" />
      </div>
      <h1 className={cn("font-headline text-2xl font-bold hidden sm:block", textClassName)}>StartUpOps</h1>
    </div>
  );
}
