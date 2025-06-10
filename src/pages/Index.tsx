
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
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20 py-4 px-2 sm:py-8 sm:px-4 animate-slide-in-up">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-6 text-center animate-float">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4 animate-glow">
            🎮 Maze Runner Replay Arena ✨
          </h1>
          <p className="text-muted-foreground text-sm sm:text-lg animate-slide-in-left">
            Plan your moves, then watch them execute in this vibrant puzzle adventure!
          </p>
        </header>
        
        <div className="animate-slide-in-right">
          <MazeGame />
        </div>
        
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-muted-foreground animate-slide-in-up">
          <div className="card-vibrant rounded-xl p-6 mb-4">
            <p className="mb-3 text-primary font-medium">
              🌟 Plan your path through the colorful maze, then watch it execute! 🌟
            </p>
            <p className="mb-3">
              💥 If you hit a wall, you'll need to try again with a new strategy! 💥
            </p>
            <p>
              🎯 Use keyboard arrow keys to add moves or the vibrant on-screen controls! 🎯
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-6">
            {isMobile && (
              <div className="card-vibrant rounded-lg p-4 animate-bounce-gentle">
                <p className="text-xs text-primary font-medium">
                  📱 Tap the colorful arrow buttons to record your moves! 🎨
                </p>
              </div>
            )}
            {!isMobile && (
              <div className="card-vibrant rounded-lg p-4 animate-float">
                <p className="text-xs text-primary font-medium">
                  ⌨️ Use your keyboard arrow keys for lightning-fast moves! ⚡
                </p>
              </div>
            )}
          </div>
          
          <div className="text-xs border-t border-primary/20 pt-4 text-muted-foreground">
            <p className="animate-shimmer">
              🎨 © {new Date().getFullYear()} Vibrant Maze Runner Game - Where Colors Meet Adventure! 🎨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
