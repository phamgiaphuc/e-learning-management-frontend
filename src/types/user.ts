type Role = "admin" | "teacher" | "student";

interface UserProps {
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
