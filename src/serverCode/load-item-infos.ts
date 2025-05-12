import _ from "lodash";
import { ItemInfos, ScoutItem } from "../shared/scoutTypes";
import { loadGatoSheet } from "./gatoApi";
import { ScoutInfo } from "./scoutApi";
import { removeSuffix } from "../agnostic/utils/stringUtils";

export async function loadServerData(): Promise<ItemInfos> {
    const sheetData = await loadGatoSheet();
    const sheetItems = sheetData?.items ?? [];
    console.log(`loaded ${sheetItems.length} sheet items`);
    
    function cleanUrl(str:string):string {
        return removeSuffix(str.trim(), "/");
    }
    const scoutItems: Array<ScoutItem> = sheetItems.map(x => {
        const si: ScoutItem = {
            url: cleanUrl(x["url"]),
            comment: x["comment"] ?? "",
            tags: ((x["tags"] ?? "") as string).split(",").map(t => t.trim()),
            priority: 0
        };
        return si;
    });

    const scoutInfos: Array<ScoutInfo> = sheetItems.map(x => {
        const si: ScoutInfo = x["scout"];
        si.url = cleanUrl(x.url);
        si.fullUrl = si.url;
        if (!si.fullUrl.startsWith("http")) {
            si.fullUrl = "https://" + si.fullUrl;
        }
        return si;
    });
    return {
        items: _.uniqBy(scoutItems, (x) => x.url),
        infos: _.uniqBy(scoutInfos, (x) => x.url)
    }
}