import { ScoutItem } from "@/src/shared/scoutTypes";

export type PageSectionT  = {
    title: string;
    size?: number;
    body: string;
    links: Array<ScoutItem>
    addSeparator?:boolean;
}

export type PageDataT = {
    intro1: string,
    intro2: string,
    updated: string,
    sections: Array<PageSectionT>,
    collectionKey: string,
  }