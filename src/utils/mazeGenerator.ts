
export type Cell = {
  x: number;
  y: number;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  visited: boolean;
};

export type Maze = {
  grid: Cell[][];
  start: { x: number; y: number };
  end: { x: number; y: number };
  width: number;
  height: number;
};

export type Direction = 'up' | 'right' | 'down' | 'left';

// Helper to get random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Create initial grid with all walls
const createGrid = (width: number, height: number): Cell[][] => {
  const grid: Cell[][] = [];
  
  for (let y = 0; y < height; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < width; x++) {
      row.push({
        x,
        y,
        walls: {
          top: true,
          right: true,
          bottom: true,
          left: true
        },
        visited: false
      });
    }
    grid.push(row);
  }
  
  return grid;
};

// Get valid neighbors for a cell
const getNeighbors = (grid: Cell[][], cell: Cell): Cell[] => {
  const { x, y } = cell;
  const height = grid.length;
  const width = grid[0].length;
  const neighbors: Cell[] = [];
  
  // Top
  if (y > 0 && !grid[y - 1][x].visited) {
    neighbors.push(grid[y - 1][x]);
  }
  
  // Right
  if (x < width - 1 && !grid[y][x + 1].visited) {
    neighbors.push(grid[y][x + 1]);
  }
  
  // Bottom
  if (y < height - 1 && !grid[y + 1][x].visited) {
    neighbors.push(grid[y + 1][x]);
  }
  
  // Left
  if (x > 0 && !grid[y][x - 1].visited) {
    neighbors.push(grid[y][x - 1]);
  }
  
  return neighbors;
};

// Remove walls between two cells
const removeWalls = (current: Cell, next: Cell): void => {
  const xDiff = current.x - next.x;
  const yDiff = current.y - next.y;
  
  if (xDiff === 1) {
    // Current is to the right of next
    current.walls.left = false;
    next.walls.right = false;
  } else if (xDiff === -1) {
    // Current is to the left of next
    current.walls.right = false;
    next.walls.left = false;
  }
  
  if (yDiff === 1) {
    // Current is below next
    current.walls.top = false;
    next.walls.bottom = false;
  } else if (yDiff === -1) {
    // Current is above next
    current.walls.bottom = false;
    next.walls.top = false;
  }
};

// Generate maze using recursive backtracking algorithm
export const generateMaze = (width: number, height: number, complexity: number): Maze => {
  // Adjust size based on complexity
  const adjustedWidth = Math.max(5, Math.min(15, Math.floor(width * (complexity / 10))));
  const adjustedHeight = Math.max(5, Math.min(15, Math.floor(height * (complexity / 10))));
  
  const grid = createGrid(adjustedWidth, adjustedHeight);
  const stack: Cell[] = [];
  
  // Start from a random cell
  const startX = getRandomInt(0, adjustedWidth - 1);
  const startY = getRandomInt(0, adjustedHeight - 1);
  let current = grid[startY][startX];
  current.visited = true;
  stack.push(current);
  
  // Recursive backtracker algorithm
  while (stack.length > 0) {
    current = stack[stack.length - 1];
    const neighbors = getNeighbors(grid, current);
    
    if (neighbors.length === 0) {
      stack.pop();
    } else {
      const randomIndex = Math.floor(Math.random() * neighbors.length);
      const next = neighbors[randomIndex];
      
      next.visited = true;
      removeWalls(current, next);
      stack.push(next);
    }
  }
  
  // Reset visited flags
  for (let y = 0; y < adjustedHeight; y++) {
    for (let x = 0; x < adjustedWidth; x++) {
      grid[y][x].visited = false;
    }
  }
  
  // Set start position at top-left area
  const start = {
    x: getRandomInt(0, Math.min(2, adjustedWidth - 1)),
    y: getRandomInt(0, Math.min(2, adjustedHeight - 1))
  };
  
  // Set end position at bottom-right area
  const end = {
    x: getRandomInt(Math.max(0, adjustedWidth - 3), adjustedWidth - 1),
    y: getRandomInt(Math.max(0, adjustedHeight - 3), adjustedHeight - 1)
  };
  
  // Make sure start and end aren't the same
  if (start.x === end.x && start.y === end.y) {
    end.x = Math.max(0, end.x - 1);
    end.y = Math.max(0, end.y - 1);
  }
  
  return {
    grid,
    start,
    end,
    width: adjustedWidth,
    height: adjustedHeight
  };
};

// Check if a move is valid (no wall in the way)
export const isValidMove = (maze: Maze, current: { x: number; y: number }, direction: Direction): boolean => {
  if (current.x < 0 || current.x >= maze.width || current.y < 0 || current.y >= maze.height) {
    return false;
  }
  
  const cell = maze.grid[current.y][current.x];
  
  switch (direction) {
    case 'up':
      return !cell.walls.top;
    case 'right':
      return !cell.walls.right;
    case 'down':
      return !cell.walls.bottom;
    case 'left':
      return !cell.walls.left;
    default:
      return false;
  }
};

// Get next position based on current position and direction
export const getNextPosition = (current: { x: number; y: number }, direction: Direction): { x: number; y: number } => {
  const next = { ...current };
  
  switch (direction) {
    case 'up':
      next.y -= 1;
      break;
    case 'right':
      next.x += 1;
      break;
    case 'down':
      next.y += 1;
      break;
    case 'left':
      next.x -= 1;
      break;
  }
  
  return next;
};
