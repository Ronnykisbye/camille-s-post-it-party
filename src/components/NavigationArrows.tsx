import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export function NavigationArrows({ onPrev, onNext, canGoPrev, canGoNext }: NavigationArrowsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={onPrev}
        disabled={!canGoPrev}
        variant="ghost"
        size="icon"
        className={cn(
          "w-12 h-12 rounded-full transition-all duration-200",
          "bg-muted/50 hover:bg-muted",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          canGoPrev && "hover:scale-110 hover:shadow-neon hover:border-neon-cyan border-2 border-transparent"
        )}
        aria-label="Forrige besked"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        onClick={onNext}
        disabled={!canGoNext}
        variant="ghost"
        size="icon"
        className={cn(
          "w-12 h-12 rounded-full transition-all duration-200",
          "bg-muted/50 hover:bg-muted",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          canGoNext && "hover:scale-110 hover:shadow-neon hover:border-neon-pink border-2 border-transparent"
        )}
        aria-label="Næste besked"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
}
