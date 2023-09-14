export function pointsArrayToPathString(points: [number, number][]): string {
    let pathString = 'M';
  
    points.forEach(([x, y], index) => {
      if (index !== 0) {
        pathString += ' L';
      }
      pathString += `${x},${y}`;
    });
  
    pathString += ' Z';
    return pathString;
  }