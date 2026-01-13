import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Message } from '@/data/messages';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  message: Message;
}

export function ShareButton({ message }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const getText = () => {
    let text = message.text;
    if (message.author) {
      text += `\n\n– ${message.author}`;
    }
    return text;
  };

  const handleShare = async () => {
    const text = getText();
    
    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Fødselsdagshilsen til Camille',
          text: text,
        });
        return;
      } catch (e) {
        // User cancelled or error - fall through to copy
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Could not copy text');
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="ghost"
      size="sm"
      className={cn(
        "gap-2 transition-all",
        copied && "text-neon-cyan"
      )}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Kopieret!
        </>
      ) : (
        <>
          {navigator.share ? (
            <Share2 className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {navigator.share ? 'Del' : 'Kopiér'}
        </>
      )}
    </Button>
  );
}
