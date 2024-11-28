type Role = "admin" | "teacher" | "user";

export const roles: Record<Role, string> = {
  admin: "Admin",
  teacher: "Teacher",
  user: "Student",
};

interface UserProps {
  id: string;
  email: string;
  username: string;
  role: Role;
  isVerified: boolean;
  userProfileId: string;
  userProfile: {
    avatar: string;
    firstName: string;
    lastName: string;
    birth: string;
    gender: string;
    contactNumber: number;
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
