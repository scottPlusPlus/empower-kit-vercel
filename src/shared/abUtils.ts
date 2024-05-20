import { ipAsNumber } from "@/agnostic/utils/ipUtils";

export enum AB_FLAGS {
    COLOR = 1 << 0, // 0001 in binary
    HERO_1 = 1 << 1, // 0010 in binary
    HERO_2 = 1 << 2, // 0100 in binary
    GRAD_OR_ALT = 1 << 3
};

export const AB_MOD = 16;

export function getAbFlag(ipab:number, flag:AB_FLAGS):boolean {
    return !! (ipab & flag);
}

export function combineFlags(a:boolean, b:boolean):number {
    return (a ? 1 : 0) | (b ? 2 : 0);
}

export function numStringAsIpab(str:string|null|undefined):number {
    if (str && str.length>0){
        const num = parseInt(str);
        if (num){
            return num % AB_MOD;
        }
    }
    return Math.floor(Math.random() * 1000) % AB_MOD;
}

export function numAsIpabOrRand(num:number|null|undefined):number {
    if (num){
        return num % AB_MOD;
    }
    return Math.floor(Math.random() * 1000) % AB_MOD;
}

export function ipAsMask(ip:string):number {
    const val = ipAsNumber(ip);
    return val % AB_MOD;
}