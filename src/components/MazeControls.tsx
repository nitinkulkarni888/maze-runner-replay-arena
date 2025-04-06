
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
  const handleSliderChange = (value: number[]) => {
    onComplexityChange(value[0]);
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="bg-primary/10 pb-2">
        <CardTitle className="text-lg flex items-center">
          <ArrowUpDown className="mr-2 h-5 w-5 text-primary" /> Maze Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Complexity Level: {complexity}</span>
              {isSuccess === true && (
                <div className="flex items-center text-green-600">
                  <Trophy className="h-4 w-4 mr-1 animate-bounce-slight" />
                  <span className="text-xs font-medium">Success!</span>
                </div>
              )}
            </div>
            <Slider
              defaultValue={[complexity]}
              min={1}
              max={20}
              step={1}
              onValueChange={handleSliderChange}
              disabled={isPlaying}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Easy</span>
              <span>Medium</span>
              <span>Hard</span>
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
