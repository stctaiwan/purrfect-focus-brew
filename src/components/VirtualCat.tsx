import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Smile } from 'lucide-react';

interface VirtualCatProps {
  treats: number;
  toys: number;
  onSpendTreats: (amount: number) => void;
  onSpendToys: (amount: number) => void;
}

interface CatState {
  happiness: number;
  energy: number;
  mood: 'sleeping' | 'happy' | 'playful' | 'hungry';
}

export const VirtualCat = ({ treats, toys, onSpendTreats, onSpendToys }: VirtualCatProps) => {
  const [catState, setCatState] = useState<CatState>({
    happiness: 50,
    energy: 50,
    mood: 'happy'
  });

  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [isPlaying, setIsPlaying] = useState(false);

  // Determine cat mood based on stats
  useEffect(() => {
    const { happiness, energy } = catState;
    let mood: CatState['mood'] = 'happy';

    if (energy < 30) mood = 'sleeping';
    else if (happiness < 30) mood = 'hungry';
    else if (happiness > 80 && energy > 70) mood = 'playful';

    setCatState(prev => ({ ...prev, mood }));
  }, [catState.happiness, catState.energy]);

  // Gradual stat decay over time
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteraction;
      const decayRate = timeSinceInteraction > 30000 ? 2 : 1; // Faster decay if no interaction

      setCatState(prev => ({
        ...prev,
        happiness: Math.max(0, prev.happiness - decayRate),
        energy: Math.max(0, prev.energy - decayRate)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [lastInteraction]);

  const feedCat = () => {
    if (treats > 0) {
      onSpendTreats(1);
      setCatState(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 20),
        energy: Math.min(100, prev.energy + 10)
      }));
      setLastInteraction(Date.now());
    }
  };

  const playWithCat = () => {
    if (toys > 0 && !isPlaying) {
      onSpendToys(1);
      setIsPlaying(true);
      setCatState(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 30),
        energy: Math.max(0, prev.energy - 10)
      }));
      setLastInteraction(Date.now());

      // Playing animation duration
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  const getCatEmoji = () => {
    switch (catState.mood) {
      case 'sleeping': return '😴';
      case 'hungry': return '😿';
      case 'playful': return '😸';
      default: return '😊';
    }
  };

  const getCatAnimation = () => {
    if (isPlaying) return 'animate-wiggle';
    if (catState.mood === 'playful') return 'animate-bounce-gentle';
    if (catState.mood === 'happy') return 'animate-purr';
    return '';
  };

  const getMoodMessage = () => {
    switch (catState.mood) {
      case 'sleeping': return 'Zzz... Your cat is taking a nap';
      case 'hungry': return 'Your cat is hungry for treats!';
      case 'playful': return 'Your cat wants to play!';
      default: return 'Your cat is content and happy';
    }
  };

  return (
    <Card className="bg-gradient-cozy border-cat-pink/30 shadow-soft">
      <CardContent className="p-6 text-center space-y-6">
        {/* Cat Display */}
        <div className="relative">
          <div className={`text-8xl ${getCatAnimation()} cursor-pointer hover:scale-110 transition-transform`}>
            🐱
          </div>
          <div className="absolute -top-2 -right-2 text-2xl">
            {getCatEmoji()}
          </div>
        </div>

        {/* Cat Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Happiness</span>
            </div>
            <Badge variant={catState.happiness > 60 ? 'default' : 'destructive'}>
              {catState.happiness}%
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Energy</span>
            </div>
            <Badge variant={catState.energy > 60 ? 'default' : 'secondary'}>
              {catState.energy}%
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-cat-orange" />
              <span className="text-sm font-medium">Mood</span>
            </div>
            <Badge variant="outline" className="capitalize">
              {catState.mood}
            </Badge>
          </div>
        </div>

        {/* Mood Message */}
        <p className="text-sm text-muted-foreground italic">
          {getMoodMessage()}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button 
            onClick={feedCat}
            disabled={treats === 0}
            variant="default"
            size="sm"
            className="bg-gradient-warm hover:shadow-glow"
          >
            🍖 Feed ({treats})
          </Button>

          <Button 
            onClick={playWithCat}
            disabled={toys === 0 || isPlaying}
            variant="secondary"
            size="sm"
            className="bg-accent hover:bg-accent/80"
          >
            🧸 Play ({toys})
          </Button>
        </div>

        {/* Resources Display */}
        <div className="flex justify-center gap-4 pt-2">
          <Badge variant="outline" className="bg-cat-cream">
            🍖 {treats} treats
          </Badge>
          <Badge variant="outline" className="bg-cat-cream">
            🧸 {toys} toys
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};