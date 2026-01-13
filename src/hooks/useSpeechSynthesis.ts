import { useState, useEffect, useCallback, useRef } from 'react';

// Voice quality ranking - prefer higher quality voices
const PREFERRED_VOICE_KEYWORDS = [
  'premium', 'enhanced', 'neural', 'natural', 'wavenet', 'studio'
];

const AVOID_VOICE_KEYWORDS = [
  'compact', 'legacy', 'espeak'
];

function scoreVoice(voice: SpeechSynthesisVoice, preferDanish: boolean): number {
  let score = 0;
  const nameLower = voice.name.toLowerCase();
  
  // Strong preference for Danish voices
  if (voice.lang.startsWith('da')) {
    score += 100;
  } else if (preferDanish) {
    score -= 50;
  }
  
  // Prefer local/offline voices (usually higher quality)
  if (voice.localService) {
    score += 20;
  }
  
  // Prefer premium/neural voices
  for (const keyword of PREFERRED_VOICE_KEYWORDS) {
    if (nameLower.includes(keyword)) {
      score += 30;
    }
  }
  
  // Avoid low-quality voices
  for (const keyword of AVOID_VOICE_KEYWORDS) {
    if (nameLower.includes(keyword)) {
      score -= 40;
    }
  }
  
  // Prefer female voices (often clearer for TTS)
  if (nameLower.includes('female') || nameLower.includes('woman') || 
      nameLower.includes('sara') || nameLower.includes('naja')) {
    score += 10;
  }
  
  // Google and Microsoft voices are usually good quality
  if (nameLower.includes('google') || nameLower.includes('microsoft')) {
    score += 15;
  }
  
  return score;
}

export function useSpeechSynthesis() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        
        // Sort voices by quality score
        const sortedVoices = [...availableVoices].sort((a, b) => {
          return scoreVoice(b, true) - scoreVoice(a, true);
        });
        
        setVoices(sortedVoices);
        
        // Auto-select best voice
        if (sortedVoices.length > 0 && !selectedVoice) {
          setSelectedVoice(sortedVoices[0].name);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, [selectedVoice]);

  const speak = useCallback((text: string) => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    
    // Optimized settings for natural speech
    utterance.rate = 0.92;      // Slightly slower for clarity
    utterance.pitch = 1.0;      // Natural pitch
    utterance.volume = 1.0;     // Full volume

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, voices, selectedVoice]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return {
    isSupported,
    isSpeaking,
    speak,
    stop,
    voices,
    selectedVoice,
    setSelectedVoice,
  };
}
