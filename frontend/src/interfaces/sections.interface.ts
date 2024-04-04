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

export interface SectionColumn {
	id: string;
	kind: string;
	item: {
		id: string;
		heading1: string;
		content1: string;
		headingSize1: number;
		contentSize1: number;
		heading2: string;
		content2: string;
		headingSize2: number;
		contentSize2: number;
		heading3: string;
		content3: string;
		headingSize3: number;
		contentSize3: number;
		createdAt: string;
		updatedAt: string;
	}
}

export interface SectionGallery {
	id: string;
	kind: string;
	item: {
		id: string;
		url1: string;
		alt1: string;
		caption1: string;
		captionSize1: number;
		url2: string;
		alt2: string;
		caption2: string;
		captionSize2: number;
		url3: string;
		alt3: string;
		caption3: string;
		captionSize3: number;
		createdAt: string;
		updatedAt: string;
	}
}