import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PomodoroTimerProps {
  onSessionComplete: (type: 'focus' | 'break') => void;
  treats: number;
  toys: number;
  onSpendTreats: (amount: number) => void;
  onSpendToys: (amount: number) => void;
}

export const PomodoroTimer = ({ onSessionComplete, treats, toys, onSpendTreats, onSpendToys }: PomodoroTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus');
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [catState, setCatState] = useState({
    happiness: 50,
    energy: 50,
    mood: 'happy' as 'sleeping' | 'happy' | 'playful' | 'hungry'
  });
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const resetTimer = useCallback(() => {
    const newTime = sessionType === 'focus' ? 25 * 60 : 5 * 60;
    setTimeLeft(newTime);
    setTotalTime(newTime);
    setIsRunning(false);
  }, [sessionType]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const switchSession = () => {
    const newType = sessionType === 'focus' ? 'break' : 'focus';
    setSessionType(newType);
    const newTime = newType === 'focus' ? 25 * 60 : 5 * 60;
    setTimeLeft(newTime);
    setTotalTime(newTime);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      onSessionComplete(sessionType);
      
      toast({
        title: sessionType === 'focus' ? '🎉 Focus session complete!' : '☕ Break time over!',
        description: sessionType === 'focus' 
          ? 'Great job! Your cat earned some treats!' 
          : 'Time to get back to work!',
      });

      // Auto-switch to the other session type
      const nextType = sessionType === 'focus' ? 'break' : 'focus';
      setSessionType(nextType);
      const nextTime = nextType === 'focus' ? 25 * 60 : 5 * 60;
      setTimeLeft(nextTime);
      setTotalTime(nextTime);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionType, onSessionComplete, toast]);

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  // Cat behavior logic
  useEffect(() => {
    const { happiness, energy } = catState;
    let mood: typeof catState.mood = 'happy';

    if (energy < 30) mood = 'sleeping';
    else if (happiness < 30) mood = 'hungry';
    else if (happiness > 80 && energy > 70) mood = 'playful';

    setCatState(prev => ({ ...prev, mood }));
  }, [catState.happiness, catState.energy]);

  // Cat stat decay
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteraction;
      const decayRate = timeSinceInteraction > 30000 ? 2 : 1;

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
    if (isRunning && sessionType === 'focus') return 'animate-bounce-gentle';
    if (catState.mood === 'playful') return 'animate-purr';
    return '';
  };

  return (
    <Card className="bg-gradient-cozy border-cat-orange/20 shadow-soft">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-cat-brown flex items-center justify-center gap-2">
          {sessionType === 'focus' ? '🐱 Focus Time' : '☕ Break Time'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Circular Timer with Cat in Center */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-80 h-80">
            {/* Progress Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-cat-cream opacity-30"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="text-cat-orange transition-all duration-1000 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Cat and Timer in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Cat Display */}
              <div className="relative mb-4">
                <div className={`text-6xl ${getCatAnimation()} cursor-pointer hover:scale-110 transition-transform`}>
                  🐱
                </div>
                <div className="absolute -top-2 -right-2 text-2xl">
                  {getCatEmoji()}
                </div>
              </div>
              
              {/* Timer Display */}
              <div className="text-3xl font-mono font-bold text-primary mb-2">
                {formatTime(timeLeft)}
              </div>
              
              {/* Cat Actions */}
              <div className="flex gap-2">
                <Button 
                  onClick={feedCat}
                  disabled={treats === 0}
                  variant="outline"
                  size="sm"
                  className="text-xs px-2 py-1 bg-cat-cream hover:bg-cat-orange/20"
                >
                  🍖 {treats}
                </Button>
                <Button 
                  onClick={playWithCat}
                  disabled={toys === 0 || isPlaying}
                  variant="outline"
                  size="sm"
                  className="text-xs px-2 py-1 bg-cat-cream hover:bg-cat-orange/20"
                >
                  🧸 {toys}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={toggleTimer}
            size="lg"
            className="bg-gradient-warm hover:shadow-glow transition-all duration-300"
          >
            {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>

          <Button 
            onClick={resetTimer}
            variant="outline"
            size="lg"
            className="border-cat-orange text-cat-brown hover:bg-cat-cream"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>

          <Button 
            onClick={switchSession}
            variant="secondary"
            size="lg"
            className="bg-accent hover:bg-accent/80"
          >
            {sessionType === 'focus' ? <Coffee className="w-5 h-5 mr-2" /> : '🎯'}
            {sessionType === 'focus' ? 'Break' : 'Focus'}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {sessionType === 'focus' 
            ? 'Stay focused to earn treats for your cat!' 
            : 'Take a break and let your cat play!'}
        </div>
      </CardContent>
    </Card>
  );
};