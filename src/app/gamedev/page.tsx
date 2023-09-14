import OgImage from '@/public/images/indieAtlas-soc.png';
import { JarvisPage } from '@/agnostic/components/JarvisPage';
import AtlasClientComponent from '../AtlasClientComponent';
import { nowHHMMSS } from '@/agnostic/utils/timeUtils';
import { fetchFromJarvis } from '@/serverCode/jarvisApi';
import { stringFromSearchParams } from '@/frontCode/routeUtils';

export const metadata = {
    title: '🧭 Indie Atlas',
    description: 'what #indiegamedev are working on',
    openGraph: {
        images: [{
            url: OgImage.src,
        }],
    },
}

// export const dynamic = 'force-dynamic';
export const revalidate = 3600;

async function getServerDtata({ searchParams }: {
    searchParams: Record<string, unknown> | null;
}) {
    console.log(`${nowHHMMSS()} Indie Atlas Home: getServerData: ${JSON.stringify(searchParams)}`);
    const term = stringFromSearchParams(searchParams, "search");
    var creators = await fetchFromJarvis("indiegames", term);
    // creators = shuffleArray(creators);
    return { atlasCreators: creators, junk: "shrug", term:term };
}

export default async function GamedevPage({ searchParams }: {
    searchParams: Record<string, unknown> | null;
}) {
    var serverData = await getServerDtata({ searchParams: searchParams });

    return (
        <JarvisPage>
            <AtlasClientComponent projects={serverData.atlasCreators} junk={serverData.junk} searchText={serverData.term}></AtlasClientComponent>
        </JarvisPage>
    )
}