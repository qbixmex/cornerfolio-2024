"use server";

import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache';

const API_URL = process.env.API_URL ?? "http://localhost:4000";

type UpdateDivider = {
	title: string;
	titleSize: number;
};

type UpdateImage =
	| { caption: string; captionSize: number }
	| { position: "left" | "center" | "right" };

type UpdateText =
	| { heading: string; headingSize: number }
	| { content: string; contentSize: number }
	| { position: 'left' | 'center' | 'right' };

type UpdateImageText =
	| { imgCaption: string; imgCaptionSize: number }
	| { txtHeading: string; txtHeadingSize: number }
	| { txtContent: string; txtContentSize: number }
	| { position: 'text_img' | 'img_text' };

type UpdateColumn =
	| { heading: string; headingSize: number }
	| { content: string; contentSize: number }

type UpdateGallery = { caption: string; captionSize: number }

export const updateSectionDivider = async (sectionId: string, updateData: UpdateDivider) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");		

	const response = await fetch(`${API_URL}/api/section-divider/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			'token': token?.value!
		},
		body: JSON.stringify(updateData)
	});

	return response.json();
};

export const updateSectionImage = async (portfolioId: string, sectionId: string, updateData: UpdateImage) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");

		const response = await fetch(`${API_URL}/api/section-image/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			'token': token?.value!
		},
		body: JSON.stringify(updateData)
	});

	revalidatePath(`admin/portfolios/${portfolioId}`);

	return response.json();
};

export const uploadSectionImage = async (portfolioId: string, sectionId: string, formData: FormData) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");

	try {
		const response = await fetch(`${API_URL}/api/section-image/upload/${sectionId}`, {
			method: 'PATCH',
			headers: {
				'token': token?.value!
			},
			body: formData,
		});

		revalidatePath(`admin/portfolios/${portfolioId}`);

		return response.json();
	} catch (error) {
		console.error("There has been a problem with your fetch operation: ", error);
		throw error;
	}
};

export const uploadSectionImageText = async (portfolioId: string, sectionId: string, formData: FormData) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");

	try {
		const response = await fetch(`${API_URL}/api/section-image-text/upload/${sectionId}`, {
				method: 'PATCH',
				headers: {
					'token': token?.value!
				},
				body: formData,
		});

		revalidatePath(`admin/portfolios/${portfolioId}`);

		return response.json();
	} catch (error) {
		console.error("There has been a problem with your fetch operation: ", error);
		throw error;
	}
};

export const updateSectionText = async (portfolioId: string, sectionId: string, updateData: UpdateText) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");

	const response = await fetch(`${API_URL}/api/section-text/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			'token': token?.value!
		},

		
		body: JSON.stringify(updateData)
	});
	
	revalidatePath(`admin/portfolios/${portfolioId}`);

	return response.json();
};

export const updateSectionImageText = async (portfolioId: string, sectionId: string, updateData: UpdateImageText) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");

	const response = await fetch(`${API_URL}/api/section-image-text/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			'token': token?.value!
		},
		body: JSON.stringify(updateData)
	});

	revalidatePath(`admin/portfolios/${portfolioId}`);

	return response.json();
};


export const updateSectionColumn = async (position: 1|2|3, sectionId: string, updateData: UpdateColumn) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");
	let body: any = {};

    // depending on position, set key
    if ('heading' in updateData && 'headingSize' in updateData) {
        if (position === 1) {
            body = {
                ...updateData,
                heading1: updateData.heading,
                headingSize1: updateData.headingSize
            };
        } else if (position === 2) {
            body = {
                ...updateData,
                heading2: updateData.heading,
                headingSize2: updateData.headingSize
            };
        } else {
            body = {
                ...updateData,
                heading3: updateData.heading,
                headingSize3: updateData.headingSize
            };
        }
    } else if ('content' in updateData && 'contentSize' in updateData) {
        if (position === 1) {
            body = {
                ...updateData,
                content1: updateData.content,
                contentSize1: updateData.contentSize
            };
        } else if (position === 2) {
            body = {
                ...updateData,
                content2: updateData.content,
                contentSize2: updateData.contentSize
            };
        } else {
            body = {
                ...updateData,
                content3: updateData.content,
                contentSize3: updateData.contentSize
            };
        }
    }

	const response = await fetch(`${API_URL}/api/section-column/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			'token': token?.value!
		},
		body: JSON.stringify(body)
	});

	return response.json();
};

export const updateSectionGallery = async (position: 1 | 2 | 3, sectionId: string, updateData: UpdateGallery) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");
	let body: any = {};

	// depending on position, set key
	if ('caption' in updateData && 'captionSize' in updateData) {
		if (position === 1) {
			body = {
				...updateData,
				caption1: updateData.caption,
				captionSize1: updateData.captionSize
			};
		} else if (position === 2) {
			body = {
				...updateData,
				caption2: updateData.caption,
				captionSize2: updateData.captionSize
			};
		} else {
			body = {
				...updateData,
				caption3: updateData.caption,
				captionSize3: updateData.captionSize
			};
		}
	}
	const response = await fetch(`${API_URL}/api/section-gallery/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			'token': token?.value!,
		},
		body: JSON.stringify(body),
	});

	return response.json();
};

export const uploadSectionGallery = async (position: 1 | 2 | 3, portfolioId: string, sectionId: string, formData: FormData) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");

	try {
		const response = await fetch(`${API_URL}/api/section-gallery/upload/${sectionId}/${position}`, {
			method: 'PATCH',
			headers: {
				'token': token?.value!
			},
			body: formData,
		});

		revalidatePath(`admin/portfolios/${portfolioId}`);

		return response.json();
	} catch (error) {
		console.error("There has been a problem with your fetch operation: ", error);
		throw error;
	}
};
