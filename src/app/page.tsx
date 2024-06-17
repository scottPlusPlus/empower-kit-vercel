import { nowHHMMSS, nowUnixTimestamp } from '../agnostic/utils/timeUtils';
import { fetchBlob } from '../serverCode/jarvisApi';
import { mainMetadata } from '../frontCode/metadata';
import _, { shuffle } from "lodash-es";
import ActivistPageClient from './act/ActivistPageClient';

import items from '@/data/items.json';
import pageData from '@/data/pageData.json';
import { ScoutInfo, fetchSitesFromScout } from '../serverCode/scoutApi';
import { ItemInfos } from '../shared/scoutTypes';
import { wait } from '../agnostic/utils/asyncUtils';

export const metadata = mainMetadata;

// export const dynamic = 'force-dynamic';
export const revalidate = 25200; //7 hours

async function getServerData() {
    let now = nowHHMMSS();
    console.log(`${now} Empower-Kit: getServerData`);

    const pageDataObj = pageData;
    let itemUrls = items.map(itm => itm.url);
    itemUrls = shuffle(itemUrls);
    const scoutData = await graduallyLoadScoutItems(itemUrls);

    const itemInfos: ItemInfos = {
        items: items,
        infos: scoutData
    };
    now = nowHHMMSS();
    console.log(`${now} Empower-Kit: returning server data`);
    return { pageData: pageDataObj, itemInfos, time: now };
}

async function graduallyLoadScoutItems(itemUrls: Array<string>): Promise<Array<ScoutInfo>> {
    const itemChunks = _.chunk(itemUrls, 32);
    let res: Array<ScoutInfo> = [];
    const totalStartTime = nowUnixTimestamp();
    for (const chunk of itemChunks) {
        const startTime = nowUnixTimestamp();
        const scoutData = await fetchSitesFromScout(chunk, false);
        const duration = nowUnixTimestamp() - startTime;
        console.log(`scout took ${duration} seconds`);
        res = _.concat(res, scoutData);
        await wait(1 * 1000);
    }
    const totalDuration = nowUnixTimestamp() - totalStartTime;
    console.log(`graduallyLoadScoutItems took ${totalDuration} seconds`);
    return res;
}

export default async function Home({ searchParams }: {
    searchParams: Record<string, unknown> | null;
}) {
    console.log("Empower Home");
    var serverData = await getServerData();

    if (!serverData.pageData) {
        return null;
    }

    console.log("Empower Home about to render");
    return (
        <ActivistPageClient
            pageData={serverData.pageData}
            itemInfos={serverData.itemInfos}
            searchParams={searchParams ?? {}}
        />
    )
}