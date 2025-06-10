
import React, { useMemo } from 'react';
import { Maze as MazeType, Direction } from '@/utils/mazeGenerator';

interface MazeProps {
  maze: MazeType;
  playerPosition: { x: number; y: number };
  isPlaying: boolean;
  isSuccess: boolean | null;
}

const Maze: React.FC<MazeProps> = ({ maze, playerPosition, isPlaying, isSuccess }) => {
  // Dynamically calculate cell size based on maze dimensions
  const cellSize = useMemo(() => {
    const baseSize = 40;
    const maxMazeSize = 50;
    
    // Scale down for larger mazes
    if (maze.width > 15 || maze.height > 15) {
      const scaleFactor = Math.max(maze.width, maze.height) / maxMazeSize;
      return Math.max(8, Math.floor(baseSize * (1 - scaleFactor * 0.8)));
    }
    
    return baseSize;
  }, [maze.width, maze.height]);
  
  const wallThickness = Math.max(1, Math.floor(cellSize / 10));
  
  const getCellColor = (x: number, y: number) => {
    if (x === maze.start.x && y === maze.start.y) {
      return 'bg-gradient-to-br from-secondary/40 to-secondary/60 maze-cell animate-glow';
    }
    if (x === maze.end.x && y === maze.end.y) {
      return 'bg-gradient-to-br from-accent/40 to-accent/60 maze-cell animate-rainbow';
    }
    return 'bg-gradient-to-br from-card to-muted/20 maze-cell hover:from-primary/10 hover:to-accent/10';
  };
  
  const getPlayerColor = () => {
    if (isSuccess === true) return 'bg-gradient-to-br from-success to-success/80 animate-pulse-success celebration shadow-lg';
    if (isSuccess === false) return 'bg-gradient-to-br from-destructive to-destructive/80 animate-pulse-error shadow-lg';
    return 'bg-gradient-to-br from-primary via-accent to-primary animate-glow shadow-xl';
  };
  
  const getWallColor = () => {
    return 'bg-gradient-to-br from-foreground/80 to-foreground shadow-sm';
  };
  
  // For large mazes, don't render text labels as they won't fit
  const showLabels = cellSize >= 20;
  
  return (
    <div className="relative overflow-auto rounded-xl border-4 border-primary/30 shadow-2xl max-w-full max-h-[70vh] card-vibrant animate-slide-in-up">
      <div
        className="relative bg-gradient-to-br from-card via-secondary/5 to-accent/5"
        style={{
          width: `${maze.width * cellSize}px`,
          height: `${maze.height * cellSize}px`,
        }}
      >
        {/* Grid cells */}
        {maze.grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`cell-${x}-${y}`}
              className={`absolute ${getCellColor(x, y)} transition-all duration-300`}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                left: `${x * cellSize}px`,
                top: `${y * cellSize}px`,
              }}
            >
              {/* Walls with vibrant styling */}
              {cell.walls.top && (
                <div
                  className={`absolute ${getWallColor()}`}
                  style={{
                    width: `${cellSize}px`,
                    height: `${wallThickness}px`,
                    left: '0',
                    top: '0',
                  }}
                />
              )}
              {cell.walls.right && (
                <div
                  className={`absolute ${getWallColor()}`}
                  style={{
                    width: `${wallThickness}px`,
                    height: `${cellSize}px`,
                    right: '0',
                    top: '0',
                  }}
                />
              )}
              {cell.walls.bottom && (
                <div
                  className={`absolute ${getWallColor()}`}
                  style={{
                    width: `${cellSize}px`,
                    height: `${wallThickness}px`,
                    left: '0',
                    bottom: '0',
                  }}
                />
              )}
              {cell.walls.left && (
                <div
                  className={`absolute ${getWallColor()}`}
                  style={{
                    width: `${wallThickness}px`,
                    height: `${cellSize}px`,
                    left: '0',
                    top: '0',
                  }}
                />
              )}
            </div>
          ))
        )}
        
        {/* Start point marker */}
        {showLabels && (
          <div
            className="absolute flex items-center justify-center text-xs font-bold text-secondary-foreground animate-bounce-gentle"
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              left: `${maze.start.x * cellSize}px`,
              top: `${maze.start.y * cellSize}px`,
              zIndex: 10,
            }}
          >
            🏁
          </div>
        )}
        
        {/* End point marker */}
        {showLabels && (
          <div
            className="absolute flex items-center justify-center text-xs font-bold text-accent-foreground animate-float"
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              left: `${maze.end.x * cellSize}px`,
              top: `${maze.end.y * cellSize}px`,
              zIndex: 10,
            }}
          >
            🎯
          </div>
        )}
        
        {/* Player with enhanced vibrant styling */}
        <div
          className={`absolute rounded-full ${getPlayerColor()} player-transition transform border-2 border-white/50`}
          style={{
            width: `${cellSize * 0.7}px`,
            height: `${cellSize * 0.7}px`,
            left: `${playerPosition.x * cellSize + cellSize * 0.15}px`,
            top: `${playerPosition.y * cellSize + cellSize * 0.15}px`,
            zIndex: 20,
            transition: isPlaying ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {/* Player inner glow */}
          <div className="absolute inset-1 rounded-full bg-white/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Maze;
