
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Medal, Target, Zap, Timer, SkullIcon } from 'lucide-react';

interface GameStatsProps {
  attempts: number;
  successes: number;
  complexity: number;
  movesCount: number;
}

const GameStats: React.FC<GameStatsProps> = ({ 
  attempts, 
  successes, 
  complexity, 
  movesCount 
}) => {
  return (
    <Card className="overflow-hidden bg-white border-gray-200">
      <CardHeader className="bg-primary/10 pb-2">
        <CardTitle className="text-lg flex items-center">
          <Medal className="mr-2 h-5 w-5 text-primary" /> Game Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Target className="mr-1 h-4 w-4" /> Complexity
            </div>
            <Badge variant="outline" className="bg-secondary/20 text-secondary-foreground px-3 py-1">
              Level {complexity}
            </Badge>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Zap className="mr-1 h-4 w-4" /> Moves
            </div>
            <Badge variant="outline" className="bg-accent/20 text-accent-foreground px-3 py-1">
              {movesCount}
            </Badge>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Timer className="mr-1 h-4 w-4" /> Attempts
            </div>
            <Badge variant="outline" className="bg-primary/20 text-primary-foreground px-3 py-1">
              {attempts}
            </Badge>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <SkullIcon className="mr-1 h-4 w-4" /> Failures
            </div>
            <Badge variant="outline" className="bg-destructive/20 text-destructive-foreground px-3 py-1">
              {attempts - successes}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStats;
