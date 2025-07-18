import { loadEnv } from "./server-utils";

export async function loadGatoSheet(): Promise<{ items: Record<string, any>[] }> {
    try {
        const sheetId = loadEnv("NEXT_PUBLIC_GOOGLE_SHEET_ID")!
        const gatoUrl = new URL(loadEnv("NEXT_PUBLIC_GATO_ENDPOINT")!);
        const gatoAuth = loadEnv("NEXT_PUBLIC_GATO_AUTH")!
        gatoUrl.searchParams.set('id', sheetId);
        gatoUrl.searchParams.set('title', "Sheet1");

        const res = await fetch(gatoUrl, { next: { revalidate: 3600 }, headers: { authorization: `Bearer ${gatoAuth}` } });
        console.log("gato resp: " + res.status);
        if (res.status != 200){
            console.log(gatoUrl);
            const txt = await res.text();
            console.log(txt);            
            throw new Error("gato resp: " + res.status);
        }
        const json = await res.json();
        return json;
    } catch (err) {
        console.error('Could not load gato sheet', err);
        return { items: [] };
    }
};
