import { cn } from '@/lib/utils';

interface MessageCounterProps {
  current: number;
  total: number;
  className?: string;
}

export function MessageCounter({ current, total, className }: MessageCounterProps) {
  return (
    <div className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-full",
      "bg-muted/50 backdrop-blur-sm",
      className
    )}>
      <span className="text-2xl font-display font-bold text-primary">
        {current}
      </span>
      <span className="text-muted-foreground">/</span>
      <span className="text-lg text-muted-foreground">
        {total}
      </span>
    </div>
  );
}
