import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Clock, Star } from 'lucide-react';

interface StatsData {
  totalSessions: number;
  totalFocusTime: number; // in minutes
  streakDays: number;
  todaySessions: number;
  weeklyGoal: number;
  level: number;
  experience: number;
  experienceToNext: number;
}

interface StatsPanelProps {
  stats: StatsData;
}

export const StatsPanel = ({ stats }: StatsPanelProps) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  const experienceProgress = (stats.experience / stats.experienceToNext) * 100;
  const weeklyProgress = (stats.todaySessions / stats.weeklyGoal) * 100;

  return (
    <Card className="bg-gradient-cozy border-cat-brown/20 shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-cat-brown flex items-center gap-2">
          <Trophy className="w-5 h-5 text-cat-orange" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level and Experience */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-cat-orange" />
              <span className="font-medium">Level {stats.level}</span>
            </div>
            <Badge variant="outline" className="bg-cat-cream">
              {stats.experience}/{stats.experienceToNext} XP
            </Badge>
          </div>
          <Progress 
            value={experienceProgress} 
            className="h-2 bg-secondary"
          />
          <p className="text-xs text-muted-foreground">
            {stats.experienceToNext - stats.experience} XP to next level
          </p>
        </div>

        {/* Daily Goal Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-success" />
              <span className="font-medium">Daily Goal</span>
            </div>
            <Badge variant={stats.todaySessions >= stats.weeklyGoal ? 'default' : 'secondary'}>
              {stats.todaySessions}/{stats.weeklyGoal}
            </Badge>
          </div>
          <Progress 
            value={Math.min(weeklyProgress, 100)} 
            className="h-2 bg-secondary"
          />
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/dashboard" className="block group">
            <div className="text-center p-3 bg-muted rounded-lg hover:bg-cat-orange/20 transition-colors cursor-pointer group-hover:scale-105 transform duration-200">
              <div className="text-2xl font-bold text-primary">{stats.totalSessions}</div>
              <div className="text-xs text-muted-foreground">Total Sessions</div>
            </div>
          </Link>

          <Link to="/dashboard" className="block group">
            <div className="text-center p-3 bg-muted rounded-lg hover:bg-cat-orange/20 transition-colors cursor-pointer group-hover:scale-105 transform duration-200">
              <div className="text-2xl font-bold text-primary">{formatTime(stats.totalFocusTime)}</div>
              <div className="text-xs text-muted-foreground">Focus Time</div>
            </div>
          </Link>

          <Link to="/dashboard" className="block group">
            <div className="text-center p-3 bg-muted rounded-lg hover:bg-cat-orange/20 transition-colors cursor-pointer group-hover:scale-105 transform duration-200">
              <div className="text-2xl font-bold text-primary">{stats.streakDays}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </Link>

          <Link to="/dashboard" className="block group">
            <div className="text-center p-3 bg-muted rounded-lg hover:bg-cat-orange/20 transition-colors cursor-pointer group-hover:scale-105 transform duration-200">
              <div className="text-2xl font-bold text-primary">{stats.todaySessions}</div>
              <div className="text-xs text-muted-foreground">Today</div>
            </div>
          </Link>
        </div>

        {/* Achievements Section */}
        <div className="space-y-2">
          <h4 className="font-medium text-cat-brown flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent Achievements
          </h4>
          <div className="flex flex-wrap gap-2">
            {stats.streakDays >= 7 && (
              <Badge variant="default" className="bg-cat-orange">
                🔥 Week Streak
              </Badge>
            )}
            {stats.totalSessions >= 10 && (
              <Badge variant="secondary" className="bg-accent">
                🎯 Focus Master
              </Badge>
            )}
            {stats.todaySessions >= stats.weeklyGoal && (
              <Badge variant="default" className="bg-success text-white">
                ✅ Daily Goal
              </Badge>
            )}
            {stats.level >= 5 && (
              <Badge variant="outline" className="bg-cat-pink border-cat-brown">
                ⭐ Level 5+
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};