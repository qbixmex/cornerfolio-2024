export interface SectionText {
	id: string;
	kind: string;
	item: {
		id: string;
		heading: string;
		content: string;
		position: 'left' | 'center' | 'right';
		headingSize: number;
		contentSize: number;
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
		captionSize: number;
		position: 'left' | 'center' | 'right';
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
		imgCaptionSize: number;
		txtHeading: string;
		txtContent: string;
		txtHeadingSize: number;
		txtContentSize: number;
		position: 'img_text' | 'text_img';
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
		titleSize: number;
		createdAt: string;
		updatedAt: string;
	}
}