'use server'

export const createSectionImage = async (portfolioId: string, order: number) =>{
    const response = await fetch(`http://localhost:4000/api/section-image/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body:JSON.stringify({})
    });

    return response.json();
};

export const createSectionText = async (portfolioId: string, order: number) => {
    const response = await fetch(`http://localhost:4000/api/section-text/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({})
    });

    return response.json();
};

export const createSectionDivider = async (portfolioId: string, order: number) => {
    const response = await fetch(`http://localhost:4000/api/section-divider/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body:JSON.stringify({})
    });

    return response.json();
};


export const createSectionEmbeddedMedia = async (portfolioId: string, order: number, code: string) => {
    const response = await fetch(`http://localhost:4000/api/section-embedded-media/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body:JSON.stringify({code:code})
    });

    return response.json();
};

export const createSectionImageText = async (portfolioId: string, order: number) => {
    const response = await fetch(`http://localhost:4000/api/section-image-text/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body:JSON.stringify({})
    });

    return response.json();
};

export const deleteSectionImage = async (sectionId: string) => {
    const response = await fetch(`http://localhost:4000/api/section-image/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
        }
    });

	return response.json();
};

export const deleteSectionText = async (sectionId:string) => {
    const response = await fetch(`http://localhost:4000/api/section-text/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
        }
    });

    return response.json();
};

export const deleteSectionImageText = async (sectionId: string) => {
    const response = await fetch(`http://localhost:4000/api/section-image-text/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
        }
    });

    return response.json();
};

export const deleteSectionDivider = async (sectionId:string) => {
    const response = await fetch(`http://localhost:4000/api/section-divider/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
        }
    });

    return response.json();
};

export const deleteSectionEmbeddedMedia = async (sectionId:string) => {
    const response = await fetch(`http://localhost:4000/api/section-embedded-media/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
        }
    });

    return response.json();
};