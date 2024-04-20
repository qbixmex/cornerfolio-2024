import {
	SectionText, SectionDivider, SectionEmbeddedMedia, SectionImage, SectionImageText
} from '.';

export interface IPortfolio {
	id: string,
	header: {
		title: string;
		subHeading: string;
	},
	status: string;
	sections:
	| SectionText[]
	| SectionImage[]
	| SectionEmbeddedMedia[]
	| SectionImageText[]
	| SectionDivider[];
	footer: {
		links: string;
		text: string;
	},
	template: 'light' | 'dark' | 'modern';
	theme: string;
	tinyUrlId: string;
}