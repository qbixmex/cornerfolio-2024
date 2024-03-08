"use server"

export const createSectionImage = async (portfolioId:string,order:number) =>{
    const response = await fetch(`http://localhost:4000/api/section-image/${portfolioId}/?order=${order}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body:JSON.stringify({})
    });

    if (response.ok) {
        const data=await response.json()
        console.log(data);
        return data
    } else {
        console.error('Failed to create image');
    }
}

export const createSectionText = async (portfolioId:string, order:number) => {
    const response = await fetch(`http://localhost:4000/api/section-text/${portfolioId}/?order=${order}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body:JSON.stringify({})
        });

        if (response.ok) {
            const data=await response.json()
            console.log(data);
            return data
        } else {
            console.error('Failed to create text');
        }
}

export const createSectionDivider = async (portfolioId:string, order:number) => {
    const response = await fetch(`http://localhost:4000/api/section-divider/${portfolioId}/?order=${order}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body:JSON.stringify({})
        });

        if (response.ok) {
            const data=await response.json()
            console.log(data);
            return data
        } else {
            console.error('Failed to create divider');
        }
}


export const createSectionEmbeddedMedia = async (portfolioId:string, order:number, code:string) => {
    const response = await fetch(`http://localhost:4000/api/section-embedded-media/${portfolioId}/?order=${order}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body:JSON.stringify({code:code})
        });

        if (response.ok) {
            const data=await response.json()
            console.log(data);
            return data
        } else {
            console.error('Failed to create embedded media');
        }
}

export const createSectionImageText = async (portfolioId:string, order:number) => {
    const response = await fetch(`http://localhost:4000/api/section-image-text/${portfolioId}/?order=${order}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body:JSON.stringify({})
        });

        if (response.ok) {
            const data=await response.json()
            console.log(data);
            return data
        } else {
            console.error('Failed to create image-text');
        }
}
