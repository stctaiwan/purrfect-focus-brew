import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Star, Crown, Heart } from 'lucide-react';

export interface CatCardData {
  id: string;
  name: string;
  celebrity: string;
  description: string;
  quote: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  attributes: {
    wisdom: number;
    cuteness: number;
    charm: number;
    fluffiness: number;
  };
  catEmoji: string;
  backgroundColor: string;
  obtained?: Date;
}

interface CatCardProps {
  card: CatCardData;
  isNew?: boolean;
  showCollectButton?: boolean;
  onCollect?: () => void;
}

export const CatCard = ({ card, isNew = false, showCollectButton = false, onCollect }: CatCardProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-yellow-600 border-yellow-500';
      case 'epic': return 'from-purple-400 to-purple-600 border-purple-500';
      case 'rare': return 'from-blue-400 to-blue-600 border-blue-500';
      default: return 'from-gray-400 to-gray-600 border-gray-500';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Crown className="w-4 h-4" />;
      case 'epic': return <Sparkles className="w-4 h-4" />;
      case 'rare': return <Star className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`
      relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl
      ${isNew ? 'animate-pulse shadow-2xl ring-4 ring-yellow-400' : 'shadow-lg'}
      bg-gradient-to-br ${getRarityColor(card.rarity)}
    `}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      
      <CardContent className="relative p-6 text-center space-y-4">
        {/* Rarity Badge */}
        <div className="flex justify-between items-start">
          <Badge 
            variant="secondary" 
            className={`
              capitalize text-white font-bold shadow-md
              ${card.rarity === 'legendary' ? 'bg-yellow-600' : ''}
              ${card.rarity === 'epic' ? 'bg-purple-600' : ''}
              ${card.rarity === 'rare' ? 'bg-blue-600' : ''}
              ${card.rarity === 'common' ? 'bg-gray-600' : ''}
            `}
          >
            {getRarityIcon(card.rarity)}
            <span className="ml-1">{card.rarity}</span>
          </Badge>
          {isNew && (
            <Badge className="bg-yellow-500 text-black font-bold animate-bounce">
              NEW!
            </Badge>
          )}
        </div>

        {/* Cat Display */}
        <div className="space-y-2">
          <div className="text-6xl animate-bounce-gentle">
            {card.catEmoji}
          </div>
          <h3 className="text-xl font-bold text-white drop-shadow-lg">
            {card.name}
          </h3>
          <p className="text-sm text-white/90 font-medium">
            Inspired by {card.celebrity}
          </p>
        </div>

        {/* Quote */}
        <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
          <p className="text-sm italic text-white/95 leading-relaxed">
            "{card.quote}"
          </p>
        </div>

        {/* Attributes */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/20 rounded p-2 backdrop-blur-sm">
            <div className="font-bold text-white">Wisdom</div>
            <div className="text-white/90">{card.attributes.wisdom}/10</div>
          </div>
          <div className="bg-white/20 rounded p-2 backdrop-blur-sm">
            <div className="font-bold text-white">Cuteness</div>
            <div className="text-white/90">{card.attributes.cuteness}/10</div>
          </div>
          <div className="bg-white/20 rounded p-2 backdrop-blur-sm">
            <div className="font-bold text-white">Charm</div>
            <div className="text-white/90">{card.attributes.charm}/10</div>
          </div>
          <div className="bg-white/20 rounded p-2 backdrop-blur-sm">
            <div className="font-bold text-white">Fluffiness</div>
            <div className="text-white/90">{card.attributes.fluffiness}/10</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-white/80 leading-relaxed">
          {card.description}
        </p>

        {/* Collect Button */}
        {showCollectButton && onCollect && (
          <Button 
            onClick={onCollect}
            className="w-full bg-white/20 hover:bg-white/30 text-white font-bold border border-white/30 backdrop-blur-sm"
          >
            Add to Collection
          </Button>
        )}

        {/* Obtained Date */}
        {card.obtained && (
          <p className="text-xs text-white/60">
            Obtained: {card.obtained.toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};