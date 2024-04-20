"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

type ResponseCreateSection = 
    | { message: string; }
    | { error: string; };

export const createSectionImage = async (
    portfolioId: string,
    order: number
): Promise<ResponseCreateSection> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-image/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body:JSON.stringify({})
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};

export const createSectionText = async (
    portfolioId: string,
    order: number
): Promise<ResponseCreateSection> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-text/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body: JSON.stringify({})
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};

export const createSectionDivider = async (
    portfolioId: string,
    order: number
): Promise<ResponseCreateSection> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-divider/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body:JSON.stringify({})
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};


export const createSectionEmbeddedMedia = async (
    portfolioId: string,
    order: number,
    code: string
): Promise<ResponseCreateSection> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-embedded-media/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body:JSON.stringify({code:code})
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};

export const createSectionImageText = async (
    portfolioId: string,
    order: number
): Promise<ResponseCreateSection> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-image-text/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body:JSON.stringify({})
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};

export const createSectionColumn = async (
    portfolioId: string,
    order: number
): Promise<ResponseCreateSection> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-column/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body: JSON.stringify({})
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};

export const createSectionGallery = async (
    portfolioId: string,
    order: number
): Promise<ResponseCreateSection> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-gallery/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        },
        body:JSON.stringify({})
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};

type DeleteSectionResponse =
    | { message: string; }
    | { error: string; };

export const deleteSectionImage = async (
    portfolioId: string,
    sectionId: string
): Promise<DeleteSectionResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-image/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

	return response.json();
};

export const deleteSectionText = async (
    portfolioId: string,
    sectionId: string
): Promise<DeleteSectionResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-text/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};

export const deleteSectionImageText = async (
    portfolioId: string,    
    sectionId: string
): Promise<DeleteSectionResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-image-text/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};

export const deleteSectionDivider = async (
    portfolioId: string,
    sectionId: string
): Promise<DeleteSectionResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-divider/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};

export const deleteSectionEmbeddedMedia = async (
    portfolioId: string,
    sectionId: string
): Promise<DeleteSectionResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-embedded-media/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};

export const deleteSectionColumn = async (
    portfolioId: string,
    sectionId: string
): Promise<DeleteSectionResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-column/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};

export const deleteSectionGallery = async (
    portfolioId: string,
    sectionId: string
): Promise<DeleteSectionResponse> => {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    const response = await fetch(`${API_URL}/api/section-gallery/${sectionId}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "token": token?.value!,
        }
    });

    revalidatePath(`/admin/portfolios/${portfolioId}`);

    return response.json();
};
