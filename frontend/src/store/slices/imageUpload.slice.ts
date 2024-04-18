import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ImageUploadState = {
	imageId: string | null;
	loadingImage: boolean;
};

const defaultState: ImageUploadState = {
	imageId: null,
	loadingImage: false,
};

export const imageUploadSlice = createSlice({
	name: 'imageUpload',
	initialState: defaultState,
	reducers: {
		setUploadingImage: (state, action: PayloadAction<{ imageId: string, loading: boolean }>) => {
			state.imageId = action.payload.imageId;
			state.loadingImage = action.payload.loading;
		},
		resetUploadingImage: (state) => {
			state = defaultState;
		},
	}
});

export const { setUploadingImage, resetUploadingImage } = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
