import { UserDetailProps } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthStateProps {
  type:
    | "signin"
    | "signout"
    | "signup"
    | "verify-account"
    | "recover-account"
    | "forgot-password"
    | null;
  loading: boolean;
  isAuthenticated: boolean;
  user: UserDetailProps | null;
}

const initialState: AuthStateProps = {
  type: null,
  loading: false,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startAuth(state, action: PayloadAction<AuthStateProps["type"]>) {
      state.loading = true;
      state.type = action.payload;
    },
    finishAuth(state) {
      state.loading = false;
      state.type = null;
    },
    authSignIn(state, action: PayloadAction<AuthStateProps["user"]>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    authSignOut(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { startAuth, finishAuth, authSignIn, authSignOut } =
  authSlice.actions;

export default authSlice.reducer;
