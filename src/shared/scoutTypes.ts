import { ScoutInfo } from "../serverCode/scoutApi";

export type ScoutResponse = {
    collection: ScoutCollection;
    items: Array<ScoutItem>;
    infos: Array<ScoutInfo>;
};

export type ItemInfos = {
    items: Array<ScoutItem>;
    infos: Array<ScoutInfo>;
};



export type ScoutCollection = {
    id: string;
    title: string;
    description: string;
    settings: string;
    created: Date;
    updated: Date;
};

export type ScoutItem = {
    url: string;
    comment: string;
    tags: string[];
};

export type { ScoutInfo };
