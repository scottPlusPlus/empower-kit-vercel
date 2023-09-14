export function getIpAddress(request: Request): string {
    const ipAddress =
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        request.headers.get("cf-connecting-ip") ||
        "??";
    return ipAddress;
}

export function getIpAddressFromHeadersDict(headeres:NodeJS.Dict<string|string[]>):string {
    var ipAddress =
    headeres["x-forwarded-for"] ||
    headeres["x-real-ip"] ||
    headeres["cf-connecting-ip"] ||
    "";
    if (Array.isArray(ipAddress)){
        ipAddress = ipAddress[0];
    }
    return ipAddress;
}