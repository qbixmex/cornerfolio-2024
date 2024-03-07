export interface SectionText {
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

export interface SectionImage {
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

export interface SectionEmbeddedMedia {
    id: string;
    kind: string;
    item: {
        id: string;
        code: string;
        createdAt: string;
        updatedAt: string;
    }
}

export interface SectionImageText {
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

export interface SectionDivider {
    id: string;
    kind: string;
    item: {
        id: string;
        title: string;
        createdAt: string;
        updatedAt: string;
    }
}