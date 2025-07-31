import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CatCard, CatCardData } from '@/components/CatCard';
import { Search, Filter, SortAsc } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CatCollectionProps {
  collection: CatCardData[];
}

export const CatCollection = ({ collection }: CatCollectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('obtained');

  const filteredAndSortedCards = collection
    .filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.celebrity.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = rarityFilter === 'all' || card.rarity === rarityFilter;
      return matchesSearch && matchesRarity;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rarity':
          const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'obtained':
        default:
          if (!a.obtained || !b.obtained) return 0;
          return b.obtained.getTime() - a.obtained.getTime();
      }
    });

  const rarityStats = collection.reduce((acc, card) => {
    acc[card.rarity] = (acc[card.rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Collection Stats */}
      <Card className="bg-gradient-cozy border-cat-orange/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cat-brown">
            🏆 Collection Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{collection.length}</div>
              <div className="text-sm text-muted-foreground">Total Cards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{rarityStats.legendary || 0}</div>
              <div className="text-sm text-muted-foreground">Legendary</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{rarityStats.epic || 0}</div>
              <div className="text-sm text-muted-foreground">Epic</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{rarityStats.rare || 0}</div>
              <div className="text-sm text-muted-foreground">Rare</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card className="bg-cat-cream border-cat-orange/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or celebrity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={rarityFilter} onValueChange={setRarityFilter}>
              <SelectTrigger className="w-full md:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rarities</SelectItem>
                <SelectItem value="legendary">Legendary</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="common">Common</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-40">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="obtained">Recently Obtained</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rarity">Rarity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Collection Grid */}
      {filteredAndSortedCards.length === 0 ? (
        <Card className="bg-cat-cream border-cat-orange/20">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">😸</div>
            <h3 className="text-xl font-bold text-cat-brown mb-2">
              {collection.length === 0 ? 'No cards yet!' : 'No cards match your search'}
            </h3>
            <p className="text-muted-foreground">
              {collection.length === 0 
                ? 'Complete focus sessions to earn your first cat cards!'
                : 'Try adjusting your search or filters.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedCards.map((card) => (
            <CatCard key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
};