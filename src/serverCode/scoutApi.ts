import { wait } from "@/agnostic/utils/asyncUtils";

const SERVER_ADDR = "http://165.227.250.231";

export type ScoutInfo = {
    url: string;
    fullUrl: string;
    hash: string;
    title: string;
    summary: string;
    image: string;
    contentType: string | null;
    duration: number | null;
    likes: number | null;
    authorName: string | null;
    authorLink: string | null;
    created: Date;
    updated: Date;
    checked: Date;
    twitterHandle?: string;
    fullHtml?: string;
    bodyMarkdown?: string;
};

export async function fetchSiteFromScout(
    url: string,
    fullHtml: boolean
): Promise<ScoutInfo> {
    try {
        const res = await fetchSitesFromScout([url], fullHtml);
        if (res.length == 0 || !res[0].bodyMarkdown) {
            throw new Error("invalid from scout");
        }
        return res[0];
    } catch (err) {
        //first failure we'll retry
    }
    await wait(30 * 1000);
    try {
        const res = await fetchSitesFromScout([url], fullHtml);
        return res[0];
    } catch (err: any) {
        console.log("error from Scout. failed twice: " + err.message);
        throw err;
    }
}

export async function fetchSitesFromScout(
    urls: Array<string>,
    fullHtml: boolean
): Promise<Array<ScoutInfo>> {
    console.log(`requesting urls from scout: ${urls.join(" - ")}`);
    try {
        const endpoint = new URL("/api/scout", SERVER_ADDR);
        const bodyData = {
            urls: urls,
            fullHtml: fullHtml,
            bodyMarkdown: true,
            apiKey: process.env.NEXT_PUBLIC_EMPOWERKIT_API_KEY,
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
        };
        const response = await fetch(endpoint, options);
        if (response.status == 200) {
            const responseData = await response.json();
            // console.log("Empower response data:");
            // console.log(JSON.stringify(responseData));
            return responseData;
        } else {
            const rt = await response.text();
            console.log(`Scout err with status ${response.status}: ${rt}`);
            throw new Error(rt);
        }
    } catch (err: any) {
        console.log("err from Scout: " + err.message);
        return [];
    }
}
