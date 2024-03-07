export interface ISectionText {
    id: string;
    kind: string;
    item: {
        id: string;
        heading: string;
        content: string;
        position: string;
        createdAt: string;
        updatedAt: string;
    }
}

export interface ISectionImage {
    id: string;
    kind: string;
    item: {
        id: string;
        url: string;
        alt: string;
        caption: string;
        position: string;
        createdAt: string;
        updatedAt: string;
    }
}

export interface ISectionEmbeddedMedia {
    id: string;
    kind: string;
    item: {
        id: string;
        code: string;
        createdAt: string;
        updatedAt: string;
    }
}

export interface ISectionImageText {
    id: string;
    kind: string;
    item: {
        id: string;
        imgUrl: string;
        imgAlt: string;
        imgCaption: string;
        txtHeading: string;
        txtContent: string;
        position: string;
        createdAt: string;
        updatedAt: string;
    }
}

export interface ISectionDivider {
    id: string;
    kind: string;
    item: {
        id: string;
        title: string;
        createdAt: string;
        updatedAt: string;
    }
}