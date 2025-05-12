import _ from "lodash";
import { ItemInfos, ScoutItem } from "../shared/scoutTypes";
import { loadGatoSheet } from "./gatoApi";
import { ScoutInfo } from "./scoutApi";

export async function loadServerData(): Promise<ItemInfos> {

    const sheetData = await loadGatoSheet();
    const scoutItems: Array<ScoutItem> = sheetData.items.map(x => {
        const si: ScoutItem = {
            url: x["url"],
            comment: x["comment"] ?? "",
            tags: (x["tags"] as string).split(",").map(t => t.trim()),
            priority: 0
        };
        return si;
    });


    const scoutInfos: Array<ScoutInfo> = sheetData.items.map(x => {
        const si: ScoutInfo = x["scout"];
        si.url = x.url;
        si.fullUrl = x.url;
        if (!si.fullUrl.startsWith("http")) {
            si.fullUrl = "https://" + si.fullUrl;
        }
        return si;
    });
    console.log(`loadScoutItems: ${scoutInfos.length} items`);
    if (scoutInfos.length > 0) {
        console.log(JSON.stringify(scoutInfos[0]));
    }
    return {
        items: _.uniqBy(scoutItems, (x) => x.url),
        infos: _.uniqBy(scoutInfos, (x) => x.url)
    }
}