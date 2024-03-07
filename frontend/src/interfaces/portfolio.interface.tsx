import { ISections } from './index'

export interface IPortfolio{
    id: string,
    header: {
        title: string;
        subHeading: string;
    },
    status: string;
    sections: ISections.ISectionText[]
        | ISections.ISectionImage[]
        | ISections.ISectionEmbeddedMedia[]
        | ISections.ISectionImageText[]
        | ISections.ISectionDivider[];
    footer: {
        links: string[];
        text: string;
    },
    template: string;
}