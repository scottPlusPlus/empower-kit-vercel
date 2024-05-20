
export function isString(x:any):boolean {
    if (!x){
        return false;
    }
    return typeof x === 'string';
}

export function asInt(str:string|null|undefined, fallback:number = 0):number {
    if (!str){
        return fallback;
    }
    const result = parseInt(str, 10);
    return isNaN(result) ? fallback : result;
  }