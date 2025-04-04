
import React from 'react';
import { Button } from '@/components/ui/button';
import { Direction } from '@/utils/mazeGenerator';
import { ArrowUp, ArrowRight, ArrowDown, ArrowLeft, Trash2, Play, Square, RotateCcw } from 'lucide-react';

interface MoveRecorderProps {
  recordedMoves: Direction[];
  onAddMove: (direction: Direction) => void;
  onClearMoves: () => void;
  onPlayMoves: () => void;
  onStopPlayback: () => void;
  onReset: () => void;
  isPlaying: boolean;
  isGameOver: boolean;
}

const MoveRecorder: React.FC<MoveRecorderProps> = ({
  recordedMoves,
  onAddMove,
  onClearMoves,
  onPlayMoves,
  onStopPlayback,
  onReset,
  isPlaying,
  isGameOver
}) => {
  const directionButtons = [
    { direction: 'up' as Direction, icon: <ArrowUp size={20} />, label: 'Up' },
    { direction: 'right' as Direction, icon: <ArrowRight size={20} />, label: 'Right' },
    { direction: 'down' as Direction, icon: <ArrowDown size={20} />, label: 'Down' },
    { direction: 'left' as Direction, icon: <ArrowLeft size={20} />, label: 'Left' }
  ];

  const renderMoveButtons = () => (
    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className="col-start-2">
        <Button
          variant="outline"
          className="w-full h-12 bg-secondary/20 hover:bg-secondary/40 border-secondary"
          onClick={() => onAddMove('up')}
          disabled={isPlaying || isGameOver}
        >
          <ArrowUp size={20} />
        </Button>
      </div>
      <div className="col-start-1 row-start-2">
        <Button
          variant="outline"
          className="w-full h-12 bg-secondary/20 hover:bg-secondary/40 border-secondary"
          onClick={() => onAddMove('left')}
          disabled={isPlaying || isGameOver}
        >
          <ArrowLeft size={20} />
        </Button>
      </div>
      <div className="col-start-2 row-start-2">
        <Button
          variant="outline"
          className="w-full h-12 bg-secondary/20 hover:bg-secondary/40 border-secondary"
          onClick={() => onAddMove('down')}
          disabled={isPlaying || isGameOver}
        >
          <ArrowDown size={20} />
        </Button>
      </div>
      <div className="col-start-3 row-start-2">
        <Button
          variant="outline"
          className="w-full h-12 bg-secondary/20 hover:bg-secondary/40 border-secondary"
          onClick={() => onAddMove('right')}
          disabled={isPlaying || isGameOver}
        >
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );

  const renderRecordedMoves = () => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Recorded Moves</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearMoves}
          disabled={isPlaying || recordedMoves.length === 0 || isGameOver}
          className="bg-destructive/10 hover:bg-destructive/20 border-destructive/50"
        >
          <Trash2 size={16} className="mr-1" /> Clear
        </Button>
      </div>
      
      <div className="p-3 border rounded-md bg-gray-50 min-h-[50px] max-h-[120px] overflow-y-auto">
        {recordedMoves.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {recordedMoves.map((move, index) => {
              const button = directionButtons.find(btn => btn.direction === move);
              return (
                <div
                  key={`move-${index}`}
                  className="w-8 h-8 rounded-md flex items-center justify-center bg-secondary/30 border border-secondary/50"
                  title={button?.label}
                >
                  {button?.icon}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-400 text-center">No moves recorded yet</div>
        )}
      </div>
    </div>
  );

  const renderPlayControls = () => (
    <div className="flex gap-2">
      {!isPlaying ? (
        <Button
          className="flex-1 bg-primary hover:bg-primary/90"
          onClick={onPlayMoves}
          disabled={recordedMoves.length === 0 || isGameOver}
        >
          <Play size={20} className="mr-2" /> Play Moves
        </Button>
      ) : (
        <Button
          className="flex-1 bg-destructive hover:bg-destructive/90"
          onClick={onStopPlayback}
        >
          <Square size={20} className="mr-2" /> Stop
        </Button>
      )}
      
      <Button
        variant="outline"
        onClick={onReset}
        className="border-accent text-accent hover:bg-accent/20"
      >
        <RotateCcw size={20} className="mr-2" /> Reset
      </Button>
    </div>
  );

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-center mb-4">Plan Your Moves</h2>
      
      {renderMoveButtons()}
      {renderRecordedMoves()}
      {renderPlayControls()}
    </div>
  );
};

export default MoveRecorder;
