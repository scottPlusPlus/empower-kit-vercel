import OgImage from '@/public/images/indieAtlas-soc.png';
import { JarvisPage } from '../agnostic/components/JarvisPage';
import { nowHHMMSS } from '../agnostic/utils/timeUtils';
import { fetchFromScoutRemix } from '../serverCode/scoutApi';
import JSONViewer from '../agnostic/components/JSONViewer';
import { fetchBlob } from '../serverCode/jarvisApi';

export const metadata = {
    title: 'Empower-Kit',
    description: 'do good stuff',
    openGraph: {
        images: [{
            url: OgImage.src,
        }],
    },
}


export const dynamic = 'force-dynamic';
// export const revalidate = 3600;

async function getServerDtata() {
    const now = nowHHMMSS();
    console.log(`${now} Empower-Kit: getServerData`);

    const pageDataStr = await fetchBlob("activistPage");
    console.log(`blob string: (${pageDataStr.length}`);
    console.log(pageDataStr);

    const pageData = JSON.parse(pageDataStr);
    return { ...pageData, time: now};        

    // try {
    //     const data = await fetchFromScoutRemix();
    //     console.log("got data from scout");
    //     return { ...data, time: now};        
    // } catch (err:any){
    //     console.log("error getting server data:");
    //     console.log(err.message);
    //     return  { time: now};        
    // }

}

export default async function Home({ searchParams }: {
    searchParams: Record<string, unknown> | null;
}) {
    var serverData = await getServerDtata();

    return (
        <JarvisPage>
            <div className='text-white'>
                <JSONViewer dataObj={serverData}></JSONViewer>
            </div>
        </JarvisPage>
    )
}