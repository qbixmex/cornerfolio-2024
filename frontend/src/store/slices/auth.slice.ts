import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  name: string;
  imageUrl: string;
};

export type AuthState = {
  user: User | null;
};

const defaultState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: defaultState,
  reducers: {
    setAuth: (state, action: PayloadAction<User>) => {
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        imageUrl: action.payload.imageUrl,
      };
    },
    resetAuth: (state) => {
      state.user = null;
    },
  }
});

//? Action creators are generated for each case reducer function
export const { setAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
