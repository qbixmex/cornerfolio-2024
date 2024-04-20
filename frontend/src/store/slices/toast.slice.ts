import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Type = "success" | "info" | "warning" | "error";

export type ToastState = {
  message: string;
  type?: Type;
};

const defaultState: ToastState = {
  message: "",
  type: "info",
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState: defaultState,
  reducers: {
    setToast: (state, action: PayloadAction<{ message: string; type?: Type }>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    resetToast: (state) => {
      state.message = defaultState.message;
      state.type = defaultState.type;
    },
  }
});

//? Action creators are generated for each case reducer function
export const { setToast, resetToast } = toastSlice.actions;

export default toastSlice.reducer;
