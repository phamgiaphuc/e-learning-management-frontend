import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { authSignIn } from "@/stores/auth/auth.slice";
import { SignInProps } from "@/types/auth/signin";
import { SignUpProps } from "@/types/auth/signup";
import { ChildrenNodeProps } from "@/types/children";
import axios from "axios";
import { createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = ChildrenNodeProps;

export interface AuthContextProps {
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: Omit<SignUpProps, "confirmPassword">) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  signIn: async () => {},
  signUp: async () => {},
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
        console.error("Sign-in failed:", error);
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

  return (
    <AuthContext.Provider value={{ signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
