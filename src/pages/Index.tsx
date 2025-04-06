
import React, { useEffect } from 'react';
import MazeGame from '@/components/MazeGame';

const Index = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-accent/20 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <MazeGame />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Plan your path through the maze, then watch it execute!
            <br />
            If you hit a wall, you'll need to try again.
            <br />
            Use keyboard arrow keys to add moves.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
