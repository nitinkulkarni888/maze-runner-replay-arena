
import React, { useState, useEffect, useCallback } from 'react';
import { generateMaze, Direction, isValidMove, getNextPosition } from '@/utils/mazeGenerator';
import Maze from './Maze';
import MoveRecorder from './MoveRecorder';
import MazeControls from './MazeControls';
import GameStats from './GameStats';
import { useToast } from "@/components/ui/use-toast";

const MazeGame: React.FC = () => {
  const [maze, setMaze] = useState(generateMaze(50, 50, 5));
  const [playerPosition, setPlayerPosition] = useState({ ...maze.start });
  const [recordedMoves, setRecordedMoves] = useState<Direction[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [moveIndex, setMoveIndex] = useState(0);
  const [complexity, setComplexity] = useState(5);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [gameStats, setGameStats] = useState({
    attempts: 0,
    successes: 0,
  });
  
  const { toast } = useToast();
  
  // Generate a new maze with adjusted complexity scaling for larger mazes
  const generateNewMaze = useCallback(() => {
    // For complexity 10, we want a 50x50 maze
    // For complexity 0, we start with 5x5
    const maxSize = 50;
    const minSize = 5;
    
    // Calculate maze size based on complexity (0-10 scale)
    const sizeScale = complexity / 10;
    const mazeSize = Math.floor(minSize + (maxSize - minSize) * sizeScale);
    
    // Internal complexity parameter scales from 1 to 10
    const internalComplexity = Math.max(1, complexity);
    
    console.log(`Creating maze with size ${mazeSize}x${mazeSize} and complexity ${internalComplexity}`);
    
    const newMaze = generateMaze(mazeSize, mazeSize, internalComplexity);
    setMaze(newMaze);
    setPlayerPosition({ ...newMaze.start });
    setRecordedMoves([]);
    setIsPlaying(false);
    setMoveIndex(0);
    setIsSuccess(null);
  }, [complexity]);
  
  // Initialize the game
  useEffect(() => {
    generateNewMaze();
  }, [complexity, generateNewMaze]);
  
  // Add a move to the recorder
  const handleAddMove = (direction: Direction) => {
    if (!isPlaying && isSuccess !== false) {
      setRecordedMoves(prev => [...prev, direction]);
    }
  };
  
  // Clear all recorded moves
  const handleClearMoves = () => {
    setRecordedMoves([]);
  };
  
  // Start playback of recorded moves
  const handlePlayMoves = () => {
    if (recordedMoves.length === 0) return;
    
    setGameStats(prev => ({
      ...prev,
      attempts: prev.attempts + 1
    }));
    
    setPlayerPosition({ ...maze.start });
    setIsPlaying(true);
    setMoveIndex(0);
    setIsSuccess(null);
  };
  
  // Stop playback
  const handleStopPlayback = () => {
    setIsPlaying(false);
  };
  
  // Reset the game state
  const handleReset = () => {
    setPlayerPosition({ ...maze.start });
    setIsPlaying(false);
    setMoveIndex(0);
    setIsSuccess(null);
  };
  
  // Change complexity
  const handleComplexityChange = (value: number) => {
    setComplexity(value);
  };
  
  // Create a new game
  const handleNewGame = () => {
    generateNewMaze();
  };
  
  // Handle keyboard events
  useEffect(() => {
    const handleKeyboardMove = (event: CustomEvent) => {
      if (!isPlaying && isSuccess !== false) {
        const { direction } = event.detail;
        handleAddMove(direction as Direction);
      }
    };
    
    // Add the event listener for our custom event
    document.addEventListener('maze-keyboard-move', handleKeyboardMove as EventListener);
    
    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('maze-keyboard-move', handleKeyboardMove as EventListener);
    };
  }, [isPlaying, isSuccess]);
  
  // Effect for move playback
  useEffect(() => {
    if (!isPlaying || moveIndex >= recordedMoves.length) return;
    
    const moveTimer = setTimeout(() => {
      const direction = recordedMoves[moveIndex];
      const isValid = isValidMove(maze, playerPosition, direction);
      
      if (isValid) {
        const nextPosition = getNextPosition(playerPosition, direction);
        setPlayerPosition(nextPosition);
        
        // Check if reached the end
        if (nextPosition.x === maze.end.x && nextPosition.y === maze.end.y) {
          setIsPlaying(false);
          setIsSuccess(true);
          setGameStats(prev => ({
            ...prev,
            successes: prev.successes + 1
          }));
          toast({
            title: "Success!",
            description: "You've completed the maze!",
            variant: "default",
          });
        } else {
          setMoveIndex(prevIndex => prevIndex + 1);
        }
      } else {
        // Hit a wall, game over
        setIsPlaying(false);
        setIsSuccess(false);
        toast({
          title: "Game Over",
          description: "You hit a wall! Try again.",
          variant: "destructive",
        });
      }
    }, 500); // 500ms delay between moves
    
    return () => clearTimeout(moveTimer);
  }, [isPlaying, moveIndex, recordedMoves, playerPosition, maze, toast]);
  
  // Effect to check if all moves are played
  useEffect(() => {
    if (isPlaying && moveIndex >= recordedMoves.length) {
      setIsPlaying(false);
      
      // If we got here and didn't win, it means we didn't reach the end
      if (playerPosition.x !== maze.end.x || playerPosition.y !== maze.end.y) {
        setIsSuccess(false);
        toast({
          title: "Almost there!",
          description: "You ran out of moves before reaching the goal.",
          variant: "default",
        });
      }
    }
  }, [isPlaying, moveIndex, recordedMoves.length, playerPosition, maze, toast]);
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">Maze Runner Replay Arena</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex justify-center mb-6 overflow-auto">
            <Maze 
              maze={maze} 
              playerPosition={playerPosition} 
              isPlaying={isPlaying}
              isSuccess={isSuccess}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GameStats 
              attempts={gameStats.attempts}
              successes={gameStats.successes}
              complexity={complexity}
              movesCount={recordedMoves.length}
            />
            
            <MazeControls 
              complexity={complexity}
              onComplexityChange={handleComplexityChange}
              onNewGame={handleNewGame}
              isSuccess={isSuccess}
              isPlaying={isPlaying}
            />
          </div>
        </div>
        
        <div>
          <MoveRecorder 
            recordedMoves={recordedMoves}
            onAddMove={handleAddMove}
            onClearMoves={handleClearMoves}
            onPlayMoves={handlePlayMoves}
            onStopPlayback={handleStopPlayback}
            onReset={handleReset}
            isPlaying={isPlaying}
            isGameOver={isSuccess === false}
          />
        </div>
      </div>
    </div>
  );
};

export default MazeGame;
