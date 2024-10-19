import Observer from "@/src/agnostic/components/Observer";
import { stripProtocolAndWww } from "@/src/agnostic/utils/urlUtils";
import { BaseWidth } from "@/src/components/BaseWidth";
import ItemDisplay from "@/src/components/scout/ItemDisplay";
import { PageSectionT } from "@/src/shared/pageTypes";
import { ScoutInfo } from "@/src/shared/scoutTypes";

type Props = {
    data: PageSectionT;
    infoMap: Map<string, ScoutInfo>;
    titleId: string;
    handleLinkClick: (arg0: string) => void;
    handleObserve: () => void;
    ipab: number;
    css:CssStuff;
};

type CssStuff = {
    ITEM_GRID_COLS:string,
    ITEM_TAG:string,
    SEARCH_SECTION_BG:string,
    BACKGROUND:string
}

export default function PageSectionC(props: Props) {

    const myCss = props.css;
    const infoMap = props.infoMap;
    const linkItems = props.data.links.filter(link => {
        const urlForKey = stripProtocolAndWww(link.url)!;
        const info = infoMap.get(urlForKey);
        return info != null;
    });
    for(const item of linkItems){
        item.url = stripProtocolAndWww(item.url)!;
    }

    const doNothing = (x: any) => {
    }

    return (
        <>
            <Observer onFirstObserve={props.handleObserve} />
            <BaseWidth>
                <div className="text-lg">
                {props.data.body}
                </div>
            </BaseWidth>
            <div className="py-8">
                <div className={myCss.ITEM_GRID_COLS}>
                    {linkItems.map(item => (
                        <ItemDisplay
                            key={item.url}
                            item={item}
                            info={infoMap.get(item.url)!}
                            onTagClick={doNothing}
                            onLinkClick={props.handleLinkClick}
                            scoutCss={myCss}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
