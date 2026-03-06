import { cn } from '@/lib/utils';

export function Logo({ className, textClassName }: { className?: string, textClassName?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="p-1.5 bg-primary rounded-lg">
        <svg
          className="h-5 w-5 text-primary-foreground"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Big Gear Circle */}
          <circle cx="9" cy="10" r="4"></circle>
          {/* Big Gear Teeth */}
          <path d="M9 6 V5"></path>
          <path d="M9 14 V15"></path>
          <path d="M12.12 7.88 L13 7"></path>
          <path d="M5.88 12.12 L5 13"></path>
          <path d="M13 10 H14"></path>
          <path d="M5 10 H4"></path>
          <path d="M12.12 12.12 L13 13"></path>
          <path d="M5.88 7.88 L5 7"></path>
          {/* Cross */}
          <path d="M9 14 V 20"></path>
          <path d="M6 18 H 12"></path>
          {/* Small Gear Circle */}
          <circle cx="16" cy="7" r="2"></circle>
          {/* Small Gear Teeth */}
          <path d="M16 5 V4.5"></path>
          <path d="M16 9 V9.5"></path>
          <path d="M17.41 5.59 L18 5"></path>
          <path d="M14.59 8.41 L14 9"></path>
          <path d="M18 7 H18.5"></path>
          <path d="M14 7 H13.5"></path>
        </svg>
      </div>
      <h1 className={cn("font-headline text-2xl font-bold hidden sm:block", textClassName)}>StartUpOps</h1>
    </div>
  );
}
