
import React from 'react';
import MazeGame from '@/components/MazeGame';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-accent/20 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <MazeGame />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Plan your path through the maze, then watch it execute!
            <br />
            If you hit a wall, you'll need to try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
