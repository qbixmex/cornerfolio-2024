import { string } from "yup";

type UpdateDivider = {
    title:string;
};

type UpdateImage = {
    caption:string;
} | {
    position: "left"|"center"|"right"
};

type UpdateText = {
    heading: string;
} | {
    content: string;
} | {
    position:'left'|'center'|'right'
};

type UpdateImageText = {
    imgCaption: string;
} | {
    txtHeading: string;
} | {
    txtContent: string;
} | {
    position: "text_img"|"img_text"
}

export const updateSectionDivider = async (sectionId:string,updateData:UpdateDivider) => {
    const response = await fetch(`http://localhost:4000/api/section-divider/${sectionId}`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
        },
        body:JSON.stringify(updateData)
    });

    return response.json();
};

export const updateSectionImage= async (sectionId:string,updateData:UpdateImage) => {
    const response = await fetch(`http://localhost:4000/api/section-image/${sectionId}`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
        },
        body:JSON.stringify(updateData)
    });

    return response.json();
};

export const updateSectionText= async (sectionId:string,updateData:UpdateText) => {
    const response = await fetch(`http://localhost:4000/api/section-text/${sectionId}`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
        },
        body:JSON.stringify(updateData)
    });

    return response.json();
};

export const updateSectionImageText= async (sectionId:string,updateData:UpdateImageText) => {
    const response = await fetch(`http://localhost:4000/api/section-image-text/${sectionId}`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
        },
        body:JSON.stringify(updateData)
    });

    return response.json();
};