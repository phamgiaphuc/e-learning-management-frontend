import { axiosJwt } from "@/configs/axios.config";
import useToast from "@/hooks/use-toast";
import { ChildrenNodeProps } from "@/types/children";
import { initialUser, UserDetailProps, UserProfileProps } from "@/types/user";
import { AxiosError } from "axios";
import { createContext, useCallback } from "react";

export interface UserContextProps {
  getUserById: (id: string) => Promise<UserDetailProps>;
  editProfile: (id: string) => Promise<UserProfileProps>;
}

export const UserContext = createContext<UserContextProps>({
  getUserById: async () => initialUser,
  editProfile: async () => initialUser.userProfile,
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

  const editProfile = useCallback(async (id: string) => {
    try {
      const {
        data: { profile },
      } = await axiosJwt.patch(`/users/${id}`);
      return profile;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  return (
    <UserContext.Provider value={{ getUserById, editProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
