import { ScoutInfo } from "../serverCode/scoutApi";

// export type ScoutResponse = {
//     collection: ScoutCollection;
//     items: Array<ItemLabel>;
//     infos: Array<ScoutInfo>;
// };

export type ItemInfos = {
    items: Array<ItemLabel>;
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

export type ItemLabel = {
    url: string;
    comment: string;
    tags: string[];
    priority?: number;
};

export type { ScoutInfo };
