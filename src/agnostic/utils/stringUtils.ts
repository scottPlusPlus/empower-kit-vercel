export function removePrefix(str: string, prefix: string): string {
    if (str.startsWith(prefix)) {
        return str.substring(prefix.length);
    }
    return str;
}

export function removeSuffix(str: string, suffix: string): string {
  if (str.endsWith(suffix)) {
      return str.substring(0, str.length-suffix.length);
  }
  return str;
}

export function stripPunctuation(str:string): string {
    const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    return str.replace(punctuationRegex, '');
  }

export function stripAllWhitespace(str:string): string {
    const regex = /\s/;
    return str.replace(regex, '');
}

export function isInteger(str:string):boolean {
    return Number.isInteger(Number(str));
}

export function countOccurrences(needle: string, haystack: string): number {
    let count = 0;
    let position = 0;
  
    while (true) {
      position = haystack.indexOf(needle, position);
      if (position === -1) break;
      count++;
      position += needle.length;
    }
  
    return count;
  }

 export function truncateString(input: string, maxLength: number, endWith: string=''): string {
    if (input.length > maxLength) {
      return input.substring(0, maxLength) + endWith;
    }
    return input;
  }