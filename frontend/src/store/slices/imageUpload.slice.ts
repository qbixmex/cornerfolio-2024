import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ImageUploadState = {
	uploading_image_key: string;
};

const defaultState: ImageUploadState = {
	uploading_image_key:''
};

export const imageUploadSlice = createSlice({
	name: 'imageUpload',
	initialState: defaultState,
	reducers: {
		setUploadingImageKey: (state, action: PayloadAction<string>) => {
			state.uploading_image_key = action.payload;
		},
	}
});

export const { setUploadingImageKey } = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
