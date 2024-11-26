import { axiosJwt } from "@/configs/axios.config";
import useToast from "@/hooks/use-toast";
import { ChildrenNodeProps } from "@/types/children";
import { initialUser, UserDetailProps } from "@/types/user";
import { AxiosError } from "axios";
import { createContext, useCallback } from "react";

export interface UserContextProps {
  getUserById: (id: string) => Promise<UserDetailProps>;
}

export const UserContext = createContext<UserContextProps>({
  getUserById: async () => initialUser,
});

const UserProvider = ({ children }: ChildrenNodeProps) => {
  const { errorToast } = useToast();

  const getUserById = useCallback(
    async (id: string) => {
      try {
        const {
          data: { user },
        } = await axiosJwt.get(`/users/${id}`);
        return user;
      } catch (error) {
        if (error instanceof AxiosError) {
          const code = error.code;
          if (code === "ERR_NETWORK") {
            errorToast("Network error");
          }
        }
        throw error;
      }
    },
    [errorToast],
  );

  return (
    <UserContext.Provider value={{ getUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
