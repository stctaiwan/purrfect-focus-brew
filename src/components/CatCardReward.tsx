import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CatCard, CatCardData } from '@/components/CatCard';
import { Sparkles, Gift } from 'lucide-react';

interface CatCardRewardProps {
  isOpen: boolean;
  onClose: () => void;
  rewardCard: CatCardData | null;
  onCollect: () => void;
}

export const CatCardReward = ({ isOpen, onClose, rewardCard, onCollect }: CatCardRewardProps) => {
  const [isCollected, setIsCollected] = useState(false);

  const handleCollect = () => {
    setIsCollected(true);
    onCollect();
    setTimeout(() => {
      setIsCollected(false);
      onClose();
    }, 1500);
  };

  if (!rewardCard) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-yellow-400 text-white">
        <DialogHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold">
            <Gift className="w-8 h-8 text-yellow-400 animate-bounce" />
            <DialogTitle className="text-2xl font-bold text-yellow-400">
              Session Reward!
            </DialogTitle>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
          <p className="text-lg">
            You've earned a new cat card!
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="transform scale-95">
            <CatCard 
              card={rewardCard} 
              isNew={true} 
              showCollectButton={!isCollected}
              onCollect={handleCollect}
            />
          </div>

          {isCollected && (
            <div className="text-center space-y-2">
              <div className="text-2xl animate-bounce">🎉</div>
              <p className="text-lg font-bold text-yellow-400">
                Added to your collection!
              </p>
            </div>
          )}

          {!isCollected && (
            <div className="flex gap-2">
              <Button 
                onClick={handleCollect}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
              >
                Collect Card
              </Button>
              <Button 
                onClick={onClose}
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                Later
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};