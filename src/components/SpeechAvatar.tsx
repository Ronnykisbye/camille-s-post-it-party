import { Volume2, VolumeX, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SpeechAvatarProps {
  isSpeaking: boolean;
  isSupported: boolean;
  onSpeak: () => void;
  onStop: () => void;
}

export function SpeechAvatar({ isSpeaking, isSupported, onSpeak, onStop }: SpeechAvatarProps) {
  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm">
        <VolumeX className="w-4 h-4" />
        <span>Oplæsning ikke understøttet</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div 
        className={cn(
          "relative w-12 h-12 rounded-full flex items-center justify-center",
          "bg-gradient-neon shadow-neon transition-all duration-300",
          isSpeaking && "animate-pulse"
        )}
      >
        <Mic className="w-6 h-6 text-primary-foreground" />
        
        {/* Speaking animation rings */}
        {isSpeaking && (
          <>
            <div className="absolute inset-0 rounded-full bg-neon-cyan/30 animate-ping" />
            <div className="absolute inset-[-4px] rounded-full border-2 border-neon-pink/50 animate-pulse" />
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <Button
          onClick={onSpeak}
          disabled={isSpeaking}
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 transition-all",
            !isSpeaking && "hover:border-neon-cyan hover:text-neon-cyan"
          )}
        >
          <Volume2 className="w-4 h-4" />
          Læs op
        </Button>
        
        <Button
          onClick={onStop}
          disabled={!isSpeaking}
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 transition-all",
            isSpeaking && "border-neon-pink text-neon-pink hover:bg-neon-pink/10"
          )}
        >
          <VolumeX className="w-4 h-4" />
          Stop
        </Button>
      </div>
    </div>
  );
}
