
export function isString(x:any):boolean {
    if (!x){
        return false;
    }
    return typeof x === 'string';
}