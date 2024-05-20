import { ScoutInfo, ScoutItem } from "@/src/sharedCode/scoutTypes";
import { SearchTermT } from "./SearchTermT";

export function remapItemPriorities(
  items: ScoutItem[],
  infoMap: Map<string, ScoutInfo>,
  searchParams: SearchTermT[],
  caseSensitive: Boolean = false
): ScoutItem[] {
  const includes = (strA: string, strB: string) => {
    return strA.toLowerCase().includes(strB.toLowerCase());
  };

  const prioritizedItems = items.map((item) => {
    item.priority = 0;
    searchParams.forEach((search) => {
      if (search.term.length == 0) {
        return;
      }

      item.tags.forEach((tag) => {
        if (includes(tag, search.term)) {
          item.priority += search.priority * 5;
        }
      });

      if (includes(item.comment, search.term)) {
        item.priority += search.priority;
      }
      if (includes(item.url, search.term)) {
        item.priority += search.priority;
      }

      const info = infoMap.get(item.url)!;
      if (includes(info.title, search.term)) {
        item.priority += search.priority;
      }
      if (includes(info.summary, search.term)) {
        item.priority += search.priority;
      }
    });
    //console.log(`${item.url} priority now ${item.priority}`);
    return item;
  });
  return prioritizedItems;
}