import { nowHHMMSS, nowUnixTimestamp } from '../agnostic/utils/timeUtils';
import { fetchBlob } from '../serverCode/jarvisApi';
import { mainMetadata } from '../frontCode/metadata';
import _ from "lodash-es";
import ActivistPageClient from './act/ActivistPageClient';

import items from '@/data/items.json';
import pageData from '@/data/pageData.json';
import { ScoutInfo, fetchSitesFromScout } from '../serverCode/scoutApi';
import { ItemInfos } from '../shared/scoutTypes';
import { wait } from '../agnostic/utils/asyncUtils';

export const metadata = mainMetadata;

// export const dynamic = 'force-dynamic';
export const revalidate = 25200;

async function getServerData() {
    const now = nowHHMMSS();
    console.log(`${now} Empower-Kit: getServerData`);

    const pageDataObj = pageData;
    const itemUrls = items.map(itm => itm.url);
    const scoutData = await graduallyLoadScoutItems(itemUrls);

    const itemInfos: ItemInfos = {
        items: items,
        infos: scoutData
    };


    return { pageData: pageDataObj, itemInfos, time: now };
}

async function graduallyLoadScoutItems(itemUrls: Array<string>): Promise<Array<ScoutInfo>> {
    const itemChunks = _.chunk(itemUrls, 32);
    let res: Array<ScoutInfo> = [];
    for (const chunk of itemChunks) {
        const startTime = nowUnixTimestamp();
        const scoutData = await fetchSitesFromScout(chunk, false);
        const duration = nowUnixTimestamp() - startTime;
        console.log(`scout took ${duration} seconds`);
        res = _.concat(res, scoutData);
        await wait(3 * 1000);
    }
    return res;
}

export default async function Home({ searchParams }: {
    searchParams: Record<string, unknown> | null;
}) {
    var serverData = await getServerData();

    if (!serverData.pageData) {
        return null;
    }

    return (
        <ActivistPageClient
            pageData={serverData.pageData}
            itemInfos={serverData.itemInfos}
            searchParams={searchParams ?? {}}
        />
    )
}