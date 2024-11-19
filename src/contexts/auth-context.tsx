import { useAppDispatch } from "@/hooks/use-app-dispatch";
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

  const signIn = useCallback(
    async (credentials: SignInProps) => {
      try {
        const {
          data: { user, tokens },
        } = await axios.post("/auth/signin", credentials);
        dispatch(authSignIn({ user, tokens }));
        navigate("/");
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const {
            data: { userVerification },
            status,
          } = error.response.data;
          if (status === "failed" && userVerification) {
            navigate(
              `/verify?id=${userVerification.id}&userId=${userVerification.userId}`,
            );
          }
        }
        throw error;
      }
    },
    [dispatch, navigate],
  );

  const signUp = useCallback(
    async (credentials: Omit<SignUpProps, "confirmPassword">) => {
      try {
        const {
          data: { userVerification },
        } = await axios.post("/auth/signup", credentials);
        navigate(
          `/verify?id=${userVerification.id}&userId=${userVerification.userId}`,
        );
      } catch (error) {
        console.error("Sign-up failed:", error);
        throw error;
      }
    },
    [navigate],
  );

  const verifyCode = useCallback(
    async (credentials: VerfiyCodeProps) => {
      try {
        const {
          data: { user, tokens },
        } = await axios.post("/auth/validation/verify", credentials);
        dispatch(authSignIn({ user, tokens }));
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
