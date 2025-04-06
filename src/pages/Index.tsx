
import React, { useEffect } from 'react';
import MazeGame from '@/components/MazeGame';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // This effect sets up keyboard event listeners
    const handleKeyDown = (event: KeyboardEvent) => {
      // Create a custom event to communicate with MazeGame component
      const direction = {
        'ArrowUp': 'up',
        'ArrowRight': 'right',
        'ArrowDown': 'down',
        'ArrowLeft': 'left'
      }[event.key];
      
      if (direction) {
        // Dispatch a custom event that MazeGame will listen for
        const customEvent = new CustomEvent('maze-keyboard-move', { 
          detail: { direction } 
        });
        document.dispatchEvent(customEvent);
      }
    };
    
    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);
    
    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-accent/20 py-4 px-2 sm:py-8 sm:px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Maze Runner Replay Arena</h1>
          <p className="text-gray-600 text-sm sm:text-base">Plan your moves, then watch them execute!</p>
        </header>
        
        <MazeGame />
        
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
          <p>
            Plan your path through the maze, then watch it execute!
            <br />
            If you hit a wall, you'll need to try again.
            <br />
            Use keyboard arrow keys to add moves or the on-screen controls.
          </p>
          
          <div className="mt-4 flex justify-center space-x-4">
            {isMobile && (
              <p className="text-xs text-primary/70">
                Tap the arrow buttons to record your moves!
              </p>
            )}
            {!isMobile && (
              <p className="text-xs text-primary/70">
                Use your keyboard arrow keys for quicker moves!
              </p>
            )}
          </div>
          
          <div className="mt-8 text-xs border-t pt-4 text-gray-400">
            <p>© {new Date().getFullYear()} Maze Runner Game</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
