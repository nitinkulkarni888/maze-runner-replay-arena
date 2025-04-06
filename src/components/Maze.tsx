
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
  // For larger mazes (up to 50x50), we use smaller cells
  const cellSize = useMemo(() => {
    const baseSize = 40;
    const maxMazeSize = 50;
    
    // Scale down for larger mazes
    if (maze.width > 15 || maze.height > 15) {
      // Progressive scaling: larger mazes get smaller cells
      const scaleFactor = Math.max(maze.width, maze.height) / maxMazeSize;
      return Math.max(8, Math.floor(baseSize * (1 - scaleFactor * 0.8)));
    }
    
    return baseSize;
  }, [maze.width, maze.height]);
  
  const wallThickness = Math.max(1, Math.floor(cellSize / 10));
  
  const getCellColor = (x: number, y: number) => {
    if (x === maze.start.x && y === maze.start.y) {
      return 'bg-secondary/30';
    }
    if (x === maze.end.x && y === maze.end.y) {
      return 'bg-accent/30';
    }
    return 'bg-white';
  };
  
  const getPlayerColor = () => {
    if (isSuccess === true) return 'bg-green-400 animate-pulse-success';
    if (isSuccess === false) return 'bg-red-400 animate-pulse-error';
    return 'bg-primary shadow-lg';
  };
  
  // For large mazes, don't render text labels as they won't fit
  const showLabels = cellSize >= 20;
  
  return (
    <div className="relative overflow-auto rounded-lg border-2 border-gray-200 shadow-md max-w-full max-h-[70vh]">
      <div
        className="relative"
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
              className={`absolute ${getCellColor(x, y)}`}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                left: `${x * cellSize}px`,
                top: `${y * cellSize}px`,
              }}
            >
              {/* Walls */}
              {cell.walls.top && (
                <div
                  className="absolute bg-gray-800"
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
                  className="absolute bg-gray-800"
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
                  className="absolute bg-gray-800"
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
                  className="absolute bg-gray-800"
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
            className="absolute flex items-center justify-center text-xs font-bold text-secondary-foreground"
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              left: `${maze.start.x * cellSize}px`,
              top: `${maze.start.y * cellSize}px`,
              zIndex: 10,
            }}
          >
            START
          </div>
        )}
        
        {/* End point marker */}
        {showLabels && (
          <div
            className="absolute flex items-center justify-center text-xs font-bold text-accent-foreground"
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              left: `${maze.end.x * cellSize}px`,
              top: `${maze.end.y * cellSize}px`,
              zIndex: 10,
            }}
          >
            GOAL
          </div>
        )}
        
        {/* Player */}
        <div
          className={`absolute rounded-full ${getPlayerColor()} player-transition transform shadow-lg`}
          style={{
            width: `${cellSize * 0.6}px`,
            height: `${cellSize * 0.6}px`,
            left: `${playerPosition.x * cellSize + cellSize * 0.2}px`,
            top: `${playerPosition.y * cellSize + cellSize * 0.2}px`,
            zIndex: 20,
            transition: isPlaying ? 'all 0.3s ease-in-out' : 'none',
          }}
        />
      </div>
    </div>
  );
};

export default Maze;
