import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ImgaeUploadState = {
	uploading_image_key: string;
};

const defaultState: ImgaeUploadState = {
	uploading_image_key:''
};

export const imgaeUploadSlice = createSlice({
	name: 'imgaeUpload',
	initialState: defaultState,
	reducers: {
		setUplodingImageKey: (state, action: PayloadAction<string>) => {
			state.uploading_image_key = action.payload;
		},
	}
});

export const { setUplodingImageKey } = imgaeUploadSlice.actions;

export default imgaeUploadSlice.reducer;
