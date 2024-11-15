import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
}

const initialState: AuthState = {
  isAuthenticated: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin(state, action: PayloadAction<{ name: string; email: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    signout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;
