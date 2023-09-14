import { ScoutItem } from "./scoutTypes";

export type PageSectionT  = {
    title: string;
    size?: number;
    body: string;
    links: Array<ScoutItem>
    addSeparator?:boolean;
}