export const getGridChildClassNameByIndex =
  (index: number, gridSize: number = 4) => 
    `image-grid_${(index % gridSize || gridSize)}`
