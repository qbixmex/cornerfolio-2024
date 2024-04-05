"use server";

import { cookies } from "next/headers";

export const createSectionImage = async (portfolioId: string, order: number) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-image/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body:JSON.stringify({})
    });

    return response.json();
};

export const createSectionText = async (portfolioId: string, order: number) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-text/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body: JSON.stringify({})
    });

    return response.json();
};

export const createSectionDivider = async (portfolioId: string, order: number) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-divider/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body:JSON.stringify({})
    });

    return response.json();
};


export const createSectionEmbeddedMedia = async (portfolioId: string, order: number, code: string) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-embedded-media/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body:JSON.stringify({code:code})
    });

    return response.json();
};

export const createSectionImageText = async (portfolioId: string, order: number) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-image-text/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body:JSON.stringify({})
    });

    return response.json();
};

export const createSectionColumn = async (portfolioId: string, order: number) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-column/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body: JSON.stringify({})
    });

    return response.json();
};

export const createSectionGallery = async (portfolioId: string, order: number) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-gallery/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body:JSON.stringify({})
    });

    return response.json();
};

export const deleteSectionImage = async (sectionId: string) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-image/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

	return response.json();
};

export const deleteSectionText = async (sectionId:string) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-text/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

  return response.json();
};

export const deleteSectionImageText = async (sectionId: string) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-image-text/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

    return response.json();
};

export const deleteSectionDivider = async (sectionId:string) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-divider/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

  return response.json();
};

export const deleteSectionEmbeddedMedia = async (sectionId:string) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-embedded-media/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

  return response.json();
};

export const deleteSectionColumn = async (sectionId:string) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-column/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

  return response.json();
};

export const deleteSectionGallery = async (sectionId:string) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`http://localhost:4000/api/section-gallery/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

    return response.json();
};
