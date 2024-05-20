import { ItemLabel } from "./scoutTypes";

export type PageSectionT  = {
    title: string;
    size?: number;
    body: string;
    links: Array<ItemLabel>
    addSeparator?:boolean;
}