import { nowUnixTimestamp } from '../agnostic/utils/timeUtils';
import { mainMetadata } from '../frontCode/metadata';
import ActivistPageClient from './act/ActivistPageClient';
import pageData from '@/data/pageData.json';
import { ItemInfos } from '../shared/scoutTypes';
import { loadServerData } from '../serverCode/load-item-infos';

export const metadata = mainMetadata;

// export const dynamic = 'force-dynamic';
export const revalidate = 25200;

async function getServerData() {
    const startUts = nowUnixTimestamp();
    console.log(`Empower-Kit: getServerData: ${startUts}`);

    const pageDataObj = pageData;
    const itemInfos: ItemInfos = await loadServerData();
    const dur = nowUnixTimestamp() - startUts;
    console.log(`Empower-Kit: getServerData (took ${dur}s)`);

    return { pageData: pageDataObj, itemInfos};
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