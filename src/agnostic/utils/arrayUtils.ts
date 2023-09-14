export function deepCopyArray<T>(array: T[]): T[] {
  return array.map((obj) => ({ ...obj }));
}

/*
* returns a new array with duplicates removed.
* does NOT modify input array
*/
export function removeDuplicates<T>(arr: T[]): T[] {
  const uniqueSet = new Set<T>();
  const result: T[] = [];

  for (const item of arr) {
      if (!uniqueSet.has(item)) {
          uniqueSet.add(item);
          result.push(item);
      }
  }

  return result;
}

export function filterNulls<T>(arr: Array<T | null>): Array<T> {
  const r = new Array<T>();
  arr.forEach((x) => {
      if (x !== null) {
          r.push(x);
      }
  });
  return r;
}

export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
