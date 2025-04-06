
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Slider 
} from '@/components/ui/slider';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Trophy, RefreshCcw, ArrowUpDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MazeControlsProps {
  complexity: number;
  onComplexityChange: (value: number) => void;
  onNewGame: () => void;
  isSuccess: boolean | null;
  isPlaying: boolean;
}

const MazeControls: React.FC<MazeControlsProps> = ({
  complexity,
  onComplexityChange,
  onNewGame,
  isSuccess,
  isPlaying
}) => {
  const isMobile = useIsMobile();
  
  const handleSliderChange = (value: number[]) => {
    onComplexityChange(value[0]);
  };

  // Calculate approximate move length based on complexity
  const estimatedMoves = Math.round(complexity * 5);
  
  // Calculate approximate maze size
  const minSize = 5;
  const maxSize = 50;
  const approxSize = Math.floor(minSize + (maxSize - minSize) * (complexity / 10));

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className={`bg-primary/10 pb-2 ${isMobile ? 'p-3' : ''}`}>
        <CardTitle className={`flex items-center ${isMobile ? 'text-base' : 'text-lg'}`}>
          <ArrowUpDown className="mr-2 h-5 w-5 text-primary" /> Maze Controls
        </CardTitle>
      </CardHeader>
      <CardContent className={`pt-4 ${isMobile ? 'p-3' : ''}`}>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Complexity: {complexity}/10</span>
              {isSuccess === true && (
                <div className="flex items-center text-green-600">
                  <Trophy className="h-4 w-4 mr-1 animate-bounce-slight" />
                  <span className="text-xs font-medium">Success!</span>
                </div>
              )}
            </div>
            <Slider
              defaultValue={[complexity]}
              min={0}
              max={10}
              step={1}
              onValueChange={handleSliderChange}
              disabled={isPlaying}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Easy (5x5)</span>
              <span>Medium (25x25)</span>
              <span>Hard (50x50)</span>
            </div>
            <div className="text-xs text-center text-muted-foreground mt-1">
              Current: ~{approxSize}x{approxSize} maze, ~{complexity * 5} moves to solve
            </div>
          </div>
          
          <Button 
            className="w-full"
            variant="outline"
            onClick={onNewGame}
            disabled={isPlaying}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            New Maze
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MazeControls;
