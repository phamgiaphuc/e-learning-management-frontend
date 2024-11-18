import { TokenProps, UserDetailProps } from "@/types/user";
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
  data: { tokens: TokenProps; user: UserDetailProps } | null;
}

const initialState: AuthStateProps = {
  type: null,
  loading: false,
  isAuthenticated: false,
  data: null,
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
    authSignIn(state, action: PayloadAction<AuthStateProps["data"]>) {
      state.isAuthenticated = true;
      state.data = action.payload;
    },
    authSignOut(state) {
      state.isAuthenticated = false;
      state.data = null;
    },
  },
});

export const { startAuth, finishAuth, authSignIn, authSignOut } =
  authSlice.actions;

export default authSlice.reducer;
