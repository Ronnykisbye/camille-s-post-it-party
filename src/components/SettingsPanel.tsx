import { X, Moon, Sun, Volume2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SettingsPanelProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  autoRead: boolean;
  onToggleAutoRead: () => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: string;
  onSelectVoice: (voice: string) => void;
  onReset: () => void;
  onClose: () => void;
}

export function SettingsPanel({
  theme,
  onToggleTheme,
  autoRead,
  onToggleAutoRead,
  voices,
  selectedVoice,
  onSelectVoice,
  onReset,
  onClose,
}: SettingsPanelProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md animate-slide-up">
      <div className="container mx-auto px-4 py-6 h-full flex flex-col max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold neon-glow">
            Indstillinger
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="hover:bg-muted"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="space-y-8">
          {/* Theme toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-neon-purple" />
              ) : (
                <Sun className="w-5 h-5 text-neon-yellow" />
              )}
              <Label htmlFor="theme-toggle" className="text-base cursor-pointer">
                {theme === 'dark' ? 'Mørkt tema' : 'Lyst tema'}
              </Label>
            </div>
            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onCheckedChange={onToggleTheme}
            />
          </div>

          {/* Auto-read toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-neon-cyan" />
              <Label htmlFor="auto-read" className="text-base cursor-pointer">
                Læs op automatisk
              </Label>
            </div>
            <Switch
              id="auto-read"
              checked={autoRead}
              onCheckedChange={onToggleAutoRead}
            />
          </div>

          {/* Voice selection */}
          {voices.length > 0 && (
            <div className="space-y-3 p-4 rounded-lg bg-muted/50">
              <Label className="text-base">Stemme til oplæsning</Label>
              <Select value={selectedVoice} onValueChange={onSelectVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Vælg stemme" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Reset */}
          <Button
            onClick={() => {
              if (confirm('Er du sikker på du vil nulstille alle indstillinger?')) {
                onReset();
              }
            }}
            variant="outline"
            className="w-full gap-2 border-destructive text-destructive hover:bg-destructive/10"
          >
            <RotateCcw className="w-4 h-4" />
            Nulstil alt
          </Button>
        </div>
      </div>
    </div>
  );
}
