import { useState } from 'react';
import { Search, Star, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Message } from '@/data/messages';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
  favorites: number[];
  onSelectMessage: (index: number) => void;
  onClose: () => void;
}

export function MessageList({ messages, favorites, onSelectMessage, onClose }: MessageListProps) {
  const [search, setSearch] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredMessages = messages.filter((message, index) => {
    const matchesSearch = 
      message.text.toLowerCase().includes(search.toLowerCase()) ||
      message.author?.toLowerCase().includes(search.toLowerCase());
    const matchesFavorites = !showFavoritesOnly || favorites.includes(message.id);
    return matchesSearch && matchesFavorites;
  });

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md animate-slide-up">
      <div className="container mx-auto px-4 py-6 h-full flex flex-col max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold neon-glow">
            Alle beskeder
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

        {/* Search and filters */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Søg i beskeder..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            variant={showFavoritesOnly ? "default" : "outline"}
            className={cn(
              "gap-2 transition-all",
              showFavoritesOnly && "bg-neon-pink hover:bg-neon-pink/90"
            )}
          >
            <Star className={cn("w-4 h-4", showFavoritesOnly && "fill-current")} />
            Favoritter
          </Button>
        </div>

        {/* Message grid */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMessages.map((message) => {
              const originalIndex = messages.findIndex(m => m.id === message.id);
              const isFavorite = favorites.includes(message.id);
              
              return (
                <button
                  key={message.id}
                  onClick={() => {
                    onSelectMessage(originalIndex);
                    onClose();
                  }}
                  className={cn(
                    "p-4 rounded-lg text-left transition-all duration-200",
                    "bg-postit-bg shadow-postit hover:shadow-lifted",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    "border-2 border-transparent",
                    isFavorite && "border-neon-pink/50"
                  )}
                >
                  <div className="flex items-start gap-2">
                    {isFavorite && (
                      <Star className="w-4 h-4 text-neon-pink fill-current flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-handwritten text-lg text-foreground/90 line-clamp-3">
                        {message.text}
                      </p>
                      {message.author && (
                        <p className="mt-2 text-sm text-foreground/60">
                          – {message.author}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Ingen beskeder fundet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
