import { removePrefix } from "./stringUtils";

/**
 * Removes query.  Ensures https:// prefix.  Trims.
 * ejects any non-urls
 */
export function normalizeUrl(input: string): string | null {
    if (!input || !input.length || input.length < 2 || !input.includes(".")) {
        return null;
    }
    let str = input.trim();
    if (str.endsWith("/")) {
        str = str.slice(0, -1);
    }
    if (!str.startsWith("http")) {
        str = "https://" + str;
    }
    return str;
}

export function stripProtocolAndWww(input:string):string {
    input = removePrefix(input, "https://");
    input = removePrefix(input, "http://");
    input = removePrefix(input, "www.");
    return input;
}