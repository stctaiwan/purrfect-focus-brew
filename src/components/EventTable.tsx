import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, Plus, X } from 'lucide-react';

export interface SessionEvent {
  id: string;
  timestamp: Date;
  eventName: string;
  tag: string;
  type: 'focus' | 'break';
}

interface EventTableProps {
  events: SessionEvent[];
  onAddEvent: (event: Omit<SessionEvent, 'id'>) => void;
  onDeleteEvent: (id: string) => void;
}

export const EventTable = ({ events, onAddEvent, onDeleteEvent }: EventTableProps) => {
  const [sortField, setSortField] = useState<keyof SessionEvent>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [newEventName, setNewEventName] = useState('');
  const [newEventTag, setNewEventTag] = useState('');

  const handleSort = (field: keyof SessionEvent) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortField === 'timestamp') {
      const aTime = (aValue as Date).getTime();
      const bTime = (bValue as Date).getTime();
      return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
    }
    
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    
    if (sortDirection === 'asc') {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleAddEvent = () => {
    if (newEventName.trim()) {
      onAddEvent({
        timestamp: new Date(),
        eventName: newEventName.trim(),
        tag: newEventTag.trim() || 'general',
        type: 'focus'
      });
      setNewEventName('');
      setNewEventTag('');
    }
  };

  const getTagColor = (tag: string) => {
    const colors = [
      'bg-cat-orange/20 text-cat-brown',
      'bg-accent/20 text-accent-foreground',
      'bg-secondary/20 text-secondary-foreground',
      'bg-muted/20 text-muted-foreground'
    ];
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <Card className="bg-gradient-cozy border-cat-orange/20 shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-cat-brown flex items-center gap-2">
          📋 Session History
        </CardTitle>
        
        {/* Add Event Form */}
        <div className="flex gap-2 mt-4">
          <Input
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            placeholder="Event name..."
            className="bg-cat-cream border-cat-orange/30 focus:border-cat-orange"
          />
          <Input
            value={newEventTag}
            onChange={(e) => setNewEventTag(e.target.value)}
            placeholder="Tag..."
            className="bg-cat-cream border-cat-orange/30 focus:border-cat-orange max-w-32"
          />
          <Button
            onClick={handleAddEvent}
            size="sm"
            className="bg-gradient-warm hover:shadow-glow transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border border-cat-orange/20">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-cat-cream/30">
                <TableHead 
                  className="cursor-pointer select-none"
                  onClick={() => handleSort('timestamp')}
                >
                  <div className="flex items-center gap-1">
                    Time Period
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none"
                  onClick={() => handleSort('eventName')}
                >
                  <div className="flex items-center gap-1">
                    Event Name
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none"
                  onClick={() => handleSort('tag')}
                >
                  <div className="flex items-center gap-1">
                    Tag
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No events recorded yet. Complete a focus session or add one manually!
                  </TableCell>
                </TableRow>
              ) : (
                sortedEvents.map((event) => (
                  <TableRow key={event.id} className="hover:bg-cat-cream/30">
                    <TableCell className="font-mono text-sm">
                      {formatTimestamp(event.timestamp)}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {event.type === 'focus' ? '🎯' : '☕'}
                        {event.eventName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getTagColor(event.tag)}>
                        {event.tag}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteEvent(event.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};