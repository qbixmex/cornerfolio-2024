type UpdateDivider = {
	title: string;
	titleSize: number;
};

type UpdateImage =
	| { caption: string; captionSize: number }
	| { position: "left" | "center" | "right" };

type UpdateText =
	| { heading: string; headingSize:number }
	| { content: string; contentSize: number}
	| { position: 'left' | 'center' | 'right' };

type UpdateImageText =
	| { imgCaption: string; imgCaptionSize: number}
	| { txtHeading: string; txtHeadingSize: number}
	| { txtContent: string; txtContentSize: number}
	| { position: 'text_img' | 'img_text' };

type UpdateColumn =
	| { heading: string; headingSize: number }
	| { content: string; contentSize: number}

type UpdateGallery = { caption:string; captionSize:number }

export const updateSectionDivider = async (sectionId: string, updateData: UpdateDivider) => {
	const response = await fetch(`http://localhost:4000/api/section-divider/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(updateData)
	});

	return response.json();
};

export const updateSectionImage = async (sectionId: string, updateData: UpdateImage) => {
	const response = await fetch(`http://localhost:4000/api/section-image/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(updateData)
	});
	return response.json();
};

export const uploadSectionImage = async (sectionId: string, imageFile: File) => {
	try{
		const formData = new FormData();
        formData.append('image', imageFile);

        const response = await fetch(`http://localhost:4000/api/section-image/upload/${sectionId}`, {
            method: 'PATCH',
            body: formData,
        });

	return response.json();
	} catch (error) {
		console.error( "There has been a problem with your fetch operation: ", error );
		throw error;
	}
};

export const uploadSectionImageText = async (sectionId: string, imageFile: File) => {
	try{
		const formData = new FormData();
	
		formData.append('image', imageFile);

		const response = await fetch(`http://localhost:4000/api/section-image-text/upload/${sectionId}`, {
				method: 'PATCH',
				body: formData,
		});

		return response.json();
	} catch (error) {
		console.error( "There has been a problem with your fetch operation: ", error );
		throw error;
	}
};

export const updateSectionText = async (sectionId: string, updateData: UpdateText) => {
	const response = await fetch(`http://localhost:4000/api/section-text/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(updateData)
	});

	return response.json();
};

export const updateSectionImageText = async (sectionId: string, updateData: UpdateImageText) => {
	const response = await fetch(`http://localhost:4000/api/section-image-text/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(updateData)
	});

	return response.json();
};


export const updateSectionColumn = async (position: 1|2|3, sectionId: string, updateData: UpdateColumn) => {
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
	const response = await fetch(`http://localhost:4000/api/section-column/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(body)
	});

	return response.json();
};

export const updateSectionGallery = async (position: 1|2|3, sectionId: string, updateData: UpdateGallery) => {
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
	const response = await fetch(`http://localhost:4000/api/section-gallery/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(body)
	});

	return response.json();
};

export const uploadSectionGallery = async (position:1|2|3,sectionId: string, imageFile: File) => {
	try{
		const formData = new FormData();
        formData.append('image', imageFile);

        const response = await fetch(`http://localhost:4000/api/section-gallery/upload/${sectionId}/${position}`, {
            method: 'PATCH',
            body: formData,
        });

	return response.json();
	} catch (error) {
		console.error( "There has been a problem with your fetch operation: ", error );
		throw error;
	}
};