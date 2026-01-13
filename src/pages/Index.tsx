import { useState, useEffect, useCallback } from 'react';
import { messages } from '@/data/messages';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useSwipe } from '@/hooks/useSwipe';
import { useTheme } from '@/hooks/useTheme';
import { Header } from '@/components/Header';
import { PostItCard } from '@/components/PostItCard';
import { NavigationArrows } from '@/components/NavigationArrows';
import { MessageCounter } from '@/components/MessageCounter';
import { SpeechAvatar } from '@/components/SpeechAvatar';
import { ShareButton } from '@/components/ShareButton';
import { MessageList } from '@/components/MessageList';
import { SettingsPanel } from '@/components/SettingsPanel';
import { Confetti } from '@/components/Confetti';

const Index = () => {
  // State
  const [currentIndex, setCurrentIndex] = useLocalStorage('camille-position', 0);
  const [favorites, setFavorites] = useLocalStorage<number[]>('camille-favorites', []);
  const [hasSeenConfetti, setHasSeenConfetti] = useLocalStorage('camille-confetti', false);
  const [autoRead, setAutoRead] = useLocalStorage('camille-auto-read', false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  // Hooks
  const { theme, toggleTheme } = useTheme();
  const speech = useSpeechSynthesis();

  // Show confetti on first visit
  useEffect(() => {
    if (!hasSeenConfetti) {
      setShowConfetti(true);
    }
  }, [hasSeenConfetti]);

  const handleConfettiComplete = useCallback(() => {
    setShowConfetti(false);
    setHasSeenConfetti(true);
  }, [setHasSeenConfetti]);

  // Navigation
  const goToNext = useCallback(() => {
    if (currentIndex < messages.length - 1) {
      speech.stop();
      setCurrentIndex(currentIndex + 1);
      setCardKey(prev => prev + 1);
    }
  }, [currentIndex, speech, setCurrentIndex]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      speech.stop();
      setCurrentIndex(currentIndex - 1);
      setCardKey(prev => prev + 1);
    }
  }, [currentIndex, speech, setCurrentIndex]);

  // Auto-read when changing cards
  useEffect(() => {
    if (autoRead && speech.isSupported) {
      const message = messages[currentIndex];
      const text = message.author 
        ? `${message.text}. Fra ${message.author}`
        : message.text;
      speech.speak(text);
    }
  }, [currentIndex, autoRead]);

  // Swipe handlers
  const { handlers, deltaX, isSwiping } = useSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showList || showSettings) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, showList, showSettings]);

  // Current message
  const currentMessage = messages[currentIndex];
  const isFavorite = favorites.includes(currentMessage.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter(id => id !== currentMessage.id));
    } else {
      setFavorites([...favorites, currentMessage.id]);
    }
  };

  const handleSpeak = () => {
    const text = currentMessage.author 
      ? `${currentMessage.text}. Fra ${currentMessage.author}`
      : currentMessage.text;
    speech.speak(text);
  };

  const handleReset = () => {
    localStorage.removeItem('camille-position');
    localStorage.removeItem('camille-favorites');
    localStorage.removeItem('camille-confetti');
    localStorage.removeItem('camille-auto-read');
    localStorage.removeItem('camille-theme');
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Confetti */}
      {showConfetti && <Confetti onComplete={handleConfettiComplete} />}

      {/* Header */}
      <Header 
        onOpenList={() => setShowList(true)} 
        onOpenSettings={() => setShowSettings(true)} 
      />

      {/* Main content */}
      <main 
        className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-6"
        {...handlers}
      >
        {/* Counter */}
        <MessageCounter current={currentIndex + 1} total={messages.length} />

        {/* Card */}
        <div className="w-full max-w-sm">
          <PostItCard
            key={cardKey}
            message={currentMessage}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            deltaX={isSwiping ? deltaX : 0}
            className="animate-pop"
          />
        </div>

        {/* Navigation */}
        <NavigationArrows
          onPrev={goToPrev}
          onNext={goToNext}
          canGoPrev={currentIndex > 0}
          canGoNext={currentIndex < messages.length - 1}
        />

        {/* Share */}
        <ShareButton message={currentMessage} />
      </main>

      {/* Speech Avatar */}
      <footer className="p-4 flex justify-center">
        <SpeechAvatar
          isSpeaking={speech.isSpeaking}
          isSupported={speech.isSupported}
          onSpeak={handleSpeak}
          onStop={speech.stop}
        />
      </footer>

      {/* Overlays */}
      {showList && (
        <MessageList
          messages={messages}
          favorites={favorites}
          onSelectMessage={(index) => {
            setCurrentIndex(index);
            setCardKey(prev => prev + 1);
          }}
          onClose={() => setShowList(false)}
        />
      )}

      {showSettings && (
        <SettingsPanel
          theme={theme}
          onToggleTheme={toggleTheme}
          autoRead={autoRead}
          onToggleAutoRead={() => setAutoRead(!autoRead)}
          voices={speech.voices}
          selectedVoice={speech.selectedVoice}
          onSelectVoice={speech.setSelectedVoice}
          onReset={handleReset}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Swipe hint for mobile */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/50 pointer-events-none md:hidden">
        ← swipe →
      </div>
    </div>
  );
};

export default Index;
