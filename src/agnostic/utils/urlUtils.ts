import { removePrefix } from "./stringUtils";

export function removePreDomain(url: string): string {
    url = removePrefix(url, "https://");
    url = removePrefix(url, "http://");
    url = removePrefix(url, "www.");
    return url;
}