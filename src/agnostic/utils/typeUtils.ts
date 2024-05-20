export function parseToNumber(value: any | unknown): number | null {
    if (value === null || value === undefined){
        return null;
    }
    
    // Check if the value is a number
    if (typeof value === 'number') {
        return value;
    }
    
    // Check if the value is a string that can be parsed to a number
    if (typeof value === 'string') {
        const parsed = Number(value);
        if (!isNaN(parsed)) {
            return parsed;
        }
    }
    
    // If it's neither a number nor a parsable string, return null
    return null;
}