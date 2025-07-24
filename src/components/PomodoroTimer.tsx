import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PomodoroTimerProps {
  onSessionComplete: (type: 'focus' | 'break') => void;
}

export const PomodoroTimer = ({ onSessionComplete }: PomodoroTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus');
  const [totalTime, setTotalTime] = useState(25 * 60);
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

  return (
    <Card className="bg-gradient-cozy border-cat-orange/20 shadow-soft">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-cat-brown flex items-center justify-center gap-2">
          {sessionType === 'focus' ? '🐱 Focus Time' : '☕ Break Time'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-6xl font-mono font-bold text-primary mb-4">
            {formatTime(timeLeft)}
          </div>
          <Progress 
            value={progress} 
            className="h-3 bg-secondary"
          />
        </div>

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