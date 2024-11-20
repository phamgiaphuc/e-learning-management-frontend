import { useAppDispatch } from "@/hooks/use-app-dispatch";
import useToast from "@/hooks/use-toast";
import { authSignIn } from "@/stores/auth/auth.slice";
import { SignInProps } from "@/types/auth/signin";
import { SignUpProps } from "@/types/auth/signup";
import { VerfiyCodeProps } from "@/types/auth/verify-code";
import { ChildrenNodeProps } from "@/types/children";
import axios, { AxiosError } from "axios";
import { createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = ChildrenNodeProps;

export interface AuthContextProps {
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: Omit<SignUpProps, "confirmPassword">) => Promise<void>;
  verifyCode: (credentials: VerfiyCodeProps) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  signIn: async () => {},
  signUp: async () => {},
  verifyCode: async () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { successToast, errorToast } = useToast();

  const signIn = useCallback(
    async (credentials: SignInProps) => {
      try {
        const {
          data: { user, tokens },
        } = await axios.post("/auth/signin", credentials);
        dispatch(authSignIn(user));
        localStorage.setItem("token", tokens.accessToken);
        successToast("Sign in successfully");
        navigate("/");
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const { message, status, ...rest } = error.response.data;
          errorToast(message);
          if (rest.data && status === "failed") {
            const {
              data: { userVerification },
            } = rest;
            if (userVerification) {
              navigate(
                `/verify?id=${userVerification.id}&userId=${userVerification.userId}`,
              );
            }
          }
        }
        throw error;
      }
    },
    [dispatch, errorToast, navigate, successToast],
  );

  const signUp = useCallback(
    async (credentials: Omit<SignUpProps, "confirmPassword">) => {
      try {
        const {
          data: { userVerification },
        } = await axios.post("/auth/signup", credentials);
        successToast("Sign up successfully");
        navigate(
          `/verify?id=${userVerification.id}&userId=${userVerification.userId}`,
        );
      } catch (error) {
        console.error("Sign-up failed:", error);
        throw error;
      }
    },
    [navigate, successToast],
  );

  const verifyCode = useCallback(
    async (credentials: VerfiyCodeProps) => {
      try {
        const {
          data: { user, tokens },
        } = await axios.post("/auth/validation/verify", credentials);
        dispatch(authSignIn(user));
        localStorage.setItem("token", tokens.accessToken);
        navigate("/");
      } catch (error) {
        console.log("Verify code failed:", error);
        throw error;
      }
    },
    [dispatch, navigate],
  );

  return (
    <AuthContext.Provider value={{ signIn, signUp, verifyCode }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
