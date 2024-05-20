import { ScoutItem } from '@/src/sharedCode/scoutTypes';
import { ScoutCss } from './ScoutCss';


type TagObj = {
    name: string,
    count: number
}

type TagCloudProps = {
    items: ScoutItem[],
    onTagClick: (arg0: string) => void,
    scoutCss: ScoutCss,
}

export default function TagCloud(props: TagCloudProps) {
    const tagCountMap = new Map<string, TagObj>();

    props.items.forEach((item) => {
        item.tags.forEach((tag) => {
            const obj = tagCountMap.get(tag) || { name: tag, count: 0 };
            obj.count += 1;
            tagCountMap.set(tag, obj);
        });
    });

    const tagObjs = Array.from(tagCountMap.values())
        .sort((a, b) => { return b.count - a.count });

    return (
        <div>
            {tagObjs.map(tag => (
                <button key={tag.name}
                    onClick={() => { props.onTagClick(tag.name) }}
                    className={props.scoutCss.ITEM_TAG}>
                    {tag.name} | {tag.count}
                </button>
            ))}
        </div>
    )
}