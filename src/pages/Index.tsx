import { useState } from 'react';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { VirtualCat } from '@/components/VirtualCat';
import { StatsPanel } from '@/components/StatsPanel';
import { EventTable, SessionEvent } from '@/components/EventTable';
import { CatCardReward } from '@/components/CatCardReward';
import { CatCollection } from '@/components/CatCollection';
import { CatCardData } from '@/components/CatCard';
import { getRandomCatCard } from '@/data/catCards';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gift } from 'lucide-react';

const Index = () => {
  const [treats, setTreats] = useState(5);
  const [toys, setToys] = useState(3);
  const [events, setEvents] = useState<SessionEvent[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalFocusTime: 0,
    streakDays: 1,
    todaySessions: 0,
    weeklyGoal: 8,
    level: 1,
    experience: 0,
    experienceToNext: 100
  });

  // Cat collection state
  const [catCollection, setCatCollection] = useState<CatCardData[]>([]);
  const [showCardReward, setShowCardReward] = useState(false);
  const [rewardCard, setRewardCard] = useState<CatCardData | null>(null);
  const [showCollection, setShowCollection] = useState(false);

  const handleSessionComplete = (type: 'focus' | 'break', taskName?: string) => {
    // Add event to history
    const newEvent: SessionEvent = {
      id: Date.now().toString(),
      timestamp: new Date(),
      eventName: taskName || (type === 'focus' ? 'Focus Session' : 'Break Session'),
      tag: type === 'focus' ? 'focus' : 'break',
      type: type
    };
    setEvents(prev => [newEvent, ...prev]);

    if (type === 'focus') {
      // Reward treats and toys for completing focus session
      setTreats(prev => prev + 2);
      setToys(prev => prev + 1);
      
      // Cat card reward (30% chance)
      if (Math.random() < 0.3) {
        const newCard = getRandomCatCard();
        // Check if we already have this card
        const hasCard = catCollection.some(card => card.id === newCard.id);
        if (!hasCard) {
          const cardWithObtained = { ...newCard, obtained: new Date() };
          setRewardCard(cardWithObtained);
          setShowCardReward(true);
        }
      }
      
      // Update stats
      setStats(prev => {
        const newExperience = prev.experience + 25;
        const newLevel = newExperience >= prev.experienceToNext ? prev.level + 1 : prev.level;
        
        return {
          ...prev,
          totalSessions: prev.totalSessions + 1,
          totalFocusTime: prev.totalFocusTime + 25,
          todaySessions: prev.todaySessions + 1,
          experience: newLevel > prev.level ? newExperience - prev.experienceToNext : newExperience,
          level: newLevel,
          experienceToNext: newLevel > prev.level ? prev.experienceToNext + 50 : prev.experienceToNext
        };
      });
    }
  };

  const handleCollectCard = () => {
    if (rewardCard) {
      setCatCollection(prev => [rewardCard, ...prev]);
    }
  };

  const handleSpendTreats = (amount: number) => {
    setTreats(prev => Math.max(0, prev - amount));
  };

  const handleSpendToys = (amount: number) => {
    setToys(prev => Math.max(0, prev - amount));
  };

  const handleAddEvent = (event: Omit<SessionEvent, 'id'>) => {
    const newEvent: SessionEvent = {
      ...event,
      id: Date.now().toString()
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  if (showCollection) {
    return (
      <div className="min-h-screen bg-gradient-cozy p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-cat-brown mb-2">
                🎴 Cat Collection
              </h1>
              <p className="text-xl text-muted-foreground">
                Your legendary cat cards
              </p>
            </div>
            <Button 
              onClick={() => setShowCollection(false)}
              variant="outline"
              className="border-cat-orange text-cat-brown hover:bg-cat-cream"
            >
              Back to Timer
            </Button>
          </div>
          <CatCollection collection={catCollection} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cozy p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cat-brown mb-2">
            🐾 CatFocus
          </h1>
          <p className="text-xl text-muted-foreground">
            Focus with your virtual cat companion
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer Section */}
          <div className="lg:col-span-2 space-y-6">
            <PomodoroTimer 
              onSessionComplete={handleSessionComplete}
              treats={treats}
              toys={toys}
              onSpendTreats={handleSpendTreats}
              onSpendToys={handleSpendToys}
            />
            <EventTable 
              events={events}
              onAddEvent={handleAddEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </div>

          {/* Cat and Stats Sidebar */}
          <div className="space-y-6">
            <VirtualCat 
              treats={treats}
              toys={toys}
              onSpendTreats={handleSpendTreats}
              onSpendToys={handleSpendToys}
            />
            <StatsPanel stats={stats} />
            
            {/* Cat Collection Card */}
            <Card className="bg-gradient-cozy border-cat-pink/30 shadow-soft">
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-4xl mb-2">🎴</div>
                <h3 className="text-lg font-bold text-cat-brown">Cat Collection</h3>
                <p className="text-sm text-muted-foreground">
                  You have {catCollection.length} legendary cat cards
                </p>
                <Button 
                  onClick={() => setShowCollection(true)}
                  className="w-full bg-gradient-warm hover:shadow-glow"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  View Collection
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cat Card Reward Modal */}
        <CatCardReward
          isOpen={showCardReward}
          onClose={() => setShowCardReward(false)}
          rewardCard={rewardCard}
          onCollect={handleCollectCard}
        />
      </div>
    </div>
  );
};

export default Index;
