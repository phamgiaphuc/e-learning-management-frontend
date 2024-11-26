type Role = "admin" | "teacher" | "user";

export const roles: Record<Role, string> = {
  admin: "Admin",
  teacher: "Teacher",
  user: "Student",
};

export interface UserProps {
  id: string;
  email: string;
  username: string;
  role: Role;
  isVerified: boolean;
  userProfileId: string;
  userProfile: {
    avatar: string;
  };
}

export interface UserDetailProps extends UserProps {
  updatedAt: string | Date;
  createdAt: string | Date;
  deletedAt: string | Date;
}

export interface TokenProps {
  accessToken: string;
  refreshToken: string;
}

export const initialUser: UserDetailProps = {
  id: "",
  email: "",
  username: "",
  role: "user",
  isVerified: false,
  userProfileId: "",
  userProfile: {
    avatar: "",
  },
  updatedAt: new Date(),
  createdAt: new Date(),
  deletedAt: new Date(),
};
