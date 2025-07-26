import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  ArrowLeft, 
  Trophy, 
  Target, 
  Clock, 
  Calendar,
  TrendingUp,
  Award,
  Flame
} from 'lucide-react';

interface DashboardProps {
  stats: {
    totalSessions: number;
    totalFocusTime: number;
    streakDays: number;
    todaySessions: number;
    weeklyGoal: number;
    level: number;
    experience: number;
    experienceToNext: number;
  };
  events: Array<{
    id: string;
    timestamp: Date;
    eventName: string;
    tag: string;
    type: 'focus' | 'break';
  }>;
}

// Mock data for charts (in real app, this would come from props or API)
const weeklyData = [
  { day: 'Mon', sessions: 3, focusTime: 75 },
  { day: 'Tue', sessions: 5, focusTime: 125 },
  { day: 'Wed', sessions: 2, focusTime: 50 },
  { day: 'Thu', sessions: 4, focusTime: 100 },
  { day: 'Fri', sessions: 6, focusTime: 150 },
  { day: 'Sat', sessions: 1, focusTime: 25 },
  { day: 'Sun', sessions: 3, focusTime: 75 },
];

const monthlyData = [
  { week: 'Week 1', sessions: 15, focusTime: 375 },
  { week: 'Week 2', sessions: 22, focusTime: 550 },
  { week: 'Week 3', sessions: 18, focusTime: 450 },
  { week: 'Week 4', sessions: 25, focusTime: 625 },
];

const tagData = [
  { name: 'Work', value: 60, color: '#ff8a4c' },
  { name: 'Study', value: 25, color: '#ff6b9d' },
  { name: 'Personal', value: 10, color: '#c084fc' },
  { name: 'Exercise', value: 5, color: '#60a5fa' },
];

const achievements = [
  { icon: '🔥', title: 'First Streak', description: 'Complete 3 sessions in a row', unlocked: true },
  { icon: '⚡', title: 'Speed Demon', description: 'Complete 10 sessions in one day', unlocked: false },
  { icon: '🎯', title: 'Focus Master', description: 'Reach 100 total sessions', unlocked: false },
  { icon: '👑', title: 'Cat Whisperer', description: 'Reach level 10', unlocked: false },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock stats (in real app, these would come from props)
  const stats = {
    totalSessions: 24,
    totalFocusTime: 600, // in minutes
    streakDays: 5,
    todaySessions: 3,
    weeklyGoal: 25,
    level: 3,
    experience: 150,
    experienceToNext: 200
  };

  const progressToGoal = (stats.totalSessions / stats.weeklyGoal) * 100;
  const levelProgress = (stats.experience / stats.experienceToNext) * 100;

  return (
    <div className="min-h-screen bg-gradient-cozy p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="border-cat-orange text-cat-brown hover:bg-cat-cream">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Timer
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-cat-brown mb-2">
              📊 CatFocus Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Your productivity insights and achievements
            </p>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-warm border-cat-orange/20 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                  <p className="text-3xl font-bold text-cat-brown">{stats.totalSessions}</p>
                </div>
                <Trophy className="w-8 h-8 text-cat-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-warm border-cat-orange/20 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Focus Time</p>
                  <p className="text-3xl font-bold text-cat-brown">{Math.floor(stats.totalFocusTime / 60)}h {stats.totalFocusTime % 60}m</p>
                </div>
                <Clock className="w-8 h-8 text-cat-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-warm border-cat-orange/20 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Streak Days</p>
                  <p className="text-3xl font-bold text-cat-brown">{stats.streakDays}</p>
                </div>
                <Flame className="w-8 h-8 text-cat-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-warm border-cat-orange/20 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today</p>
                  <p className="text-3xl font-bold text-cat-brown">{stats.todaySessions}</p>
                </div>
                <Calendar className="w-8 h-8 text-cat-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-cozy border-cat-orange/20 shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-cat-brown flex items-center gap-2">
                <Target className="w-5 h-5" />
                Weekly Goal Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Sessions this week</span>
                  <span className="font-medium">{stats.totalSessions}/{stats.weeklyGoal}</span>
                </div>
                <Progress value={progressToGoal} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {stats.weeklyGoal - stats.totalSessions > 0 
                    ? `${stats.weeklyGoal - stats.totalSessions} more sessions to reach your goal!`
                    : 'Goal achieved! 🎉'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-cozy border-cat-orange/20 shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-cat-brown flex items-center gap-2">
                <Award className="w-5 h-5" />
                Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Level {stats.level}</span>
                  <span className="font-medium">{stats.experience}/{stats.experienceToNext} XP</span>
                </div>
                <Progress value={levelProgress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {stats.experienceToNext - stats.experience} XP to level {stats.level + 1}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-cat-cream border border-cat-orange/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cat-orange/20">Overview</TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-cat-orange/20">Trends</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-cat-orange/20">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Sessions Chart */}
              <Card className="bg-gradient-cozy border-cat-orange/20 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-cat-brown">Weekly Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1c27d" opacity={0.3} />
                      <XAxis dataKey="day" stroke="#8b4513" />
                      <YAxis stroke="#8b4513" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fef7ed', 
                          border: '1px solid #f1c27d',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="sessions" fill="#ff8a4c" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Focus Time Distribution */}
              <Card className="bg-gradient-cozy border-cat-orange/20 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-cat-brown">Focus Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={tagData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {tagData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {tagData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Monthly Trend */}
              <Card className="bg-gradient-cozy border-cat-orange/20 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-cat-brown flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Monthly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1c27d" opacity={0.3} />
                      <XAxis dataKey="week" stroke="#8b4513" />
                      <YAxis stroke="#8b4513" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fef7ed', 
                          border: '1px solid #f1c27d',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sessions" 
                        stroke="#ff8a4c" 
                        fill="#ff8a4c" 
                        fillOpacity={0.3}
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Focus Time Trend */}
              <Card className="bg-gradient-cozy border-cat-orange/20 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-cat-brown">Focus Time Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1c27d" opacity={0.3} />
                      <XAxis dataKey="day" stroke="#8b4513" />
                      <YAxis stroke="#8b4513" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fef7ed', 
                          border: '1px solid #f1c27d',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="focusTime" 
                        stroke="#ff6b9d" 
                        strokeWidth={3}
                        dot={{ fill: '#ff6b9d', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card 
                  key={index} 
                  className={`border-cat-orange/20 shadow-soft transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'bg-gradient-warm' 
                      : 'bg-muted/30 opacity-75'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${
                          achievement.unlocked ? 'text-cat-brown' : 'text-muted-foreground'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && (
                          <p className="text-xs text-cat-orange font-medium mt-1">
                            ✓ Unlocked!
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;