import { Star } from 'lucide-react';
import { Message } from '@/data/messages';
import { cn } from '@/lib/utils';

interface PostItCardProps {
  message: Message;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  deltaX?: number;
  className?: string;
}

export function PostItCard({ 
  message, 
  isFavorite, 
  onToggleFavorite,
  deltaX = 0,
  className 
}: PostItCardProps) {
  const rotation = Math.min(Math.max(deltaX / 15, -15), 15);
  
  return (
    <div 
      className={cn(
        "relative w-full max-w-sm aspect-square transition-transform duration-100",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg) translateX(${deltaX * 0.3}px)`,
      }}
    >
      {/* Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-tape opacity-70 rotate-[-2deg] z-10 rounded-sm shadow-sm" />
      
      {/* Post-it note */}
      <div 
        className={cn(
          "relative w-full h-full rounded-sm p-6 flex flex-col",
          "bg-postit-bg shadow-postit",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-sm",
          "after:absolute after:inset-0 after:opacity-10 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmZmZmMDAiPjwvcmVjdD4KPHBhdGggZD0iTTAgMEw0IDRaTTQgMEwwIDRaIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlPSIjMDAwMDAwMTAiPjwvcGF0aD4KPC9zdmc+')]",
          "hover:shadow-lifted transition-shadow duration-300"
        )}
      >
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={cn(
            "absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-200",
            "hover:scale-110 active:scale-95",
            isFavorite 
              ? "text-neon-pink" 
              : "text-foreground/30 hover:text-foreground/50"
          )}
          aria-label={isFavorite ? "Fjern fra favoritter" : "Tilføj til favoritter"}
        >
          <Star 
            className={cn("w-6 h-6", isFavorite && "fill-current")} 
          />
        </button>

        {/* Message content */}
        <div className="flex-1 flex items-center justify-center overflow-auto">
          <p className={cn(
            "font-handwritten text-foreground/90 text-center leading-relaxed",
            message.text.length > 150 ? "text-xl" : 
            message.text.length > 80 ? "text-2xl" : "text-3xl"
          )}>
            {message.text}
          </p>
        </div>

        {/* Author */}
        {message.author && (
          <div className="mt-4 text-right">
            <span className="font-handwritten text-lg text-foreground/60">
              – {message.author}
            </span>
          </div>
        )}
      </div>

      {/* Corner fold effect */}
      <div className="absolute bottom-0 right-0 w-8 h-8 overflow-hidden">
        <div 
          className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-postit-shadow/30 to-transparent"
          style={{ 
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          }} 
        />
      </div>
    </div>
  );
}
