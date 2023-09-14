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
    collection: string;
    comment: string;
    tags: string[];
    priority: number;
    created: Date;
    updated: Date;
    status: string;
};

export type ScoutInfo = {
    url: string;
    fullUrl: string;
    hash: string;
    title: string;
    summary: string;
    image: string;
    contentType: string | null;
    duration: number | null;
    likes: number | null;
    authorName: string | null;
    authorLink: string | null;
    created: Date;
    updated: Date;
    checked: Date;
};
