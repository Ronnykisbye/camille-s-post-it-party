import { List, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onOpenList: () => void;
  onOpenSettings: () => void;
}

export function Header({ onOpenList, onOpenSettings }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 md:p-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl" role="img" aria-label="cake">🎂</span>
        <h1 className="text-xl md:text-2xl font-display font-bold neon-glow">
          Camille 30år
        </h1>
      </div>
      
      <div className="flex gap-2">
        <Button
          onClick={onOpenList}
          variant="ghost"
          size="icon"
          className="hover:bg-muted hover:text-neon-cyan transition-colors"
          aria-label="Se alle beskeder"
        >
          <List className="w-5 h-5" />
        </Button>
        <Button
          onClick={onOpenSettings}
          variant="ghost"
          size="icon"
          className="hover:bg-muted hover:text-neon-purple transition-colors"
          aria-label="Indstillinger"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
