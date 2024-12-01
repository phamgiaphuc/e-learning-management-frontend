type Role = "admin" | "teacher" | "user";
import * as yup from "yup";

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
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    contactNumber: number;
  };
}

export interface UserDetailProps extends UserProps {
  updatedAt: string | Date;
  createdAt: string | Date;
  deletedAt: string | Date;
}

export const initialUser: UserDetailProps = {
  updatedAt: "",
  createdAt: "",
  deletedAt: "",
  id: "",
  email: "",
  username: "",
  role: "admin",
  isVerified: false,
  userProfileId: "",
  userProfile: {
    avatar: "",
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    gender: "",
    contactNumber: 0,
  },
};

export interface UserProfileProps {
  avatar: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  contactNumber: number;
}

export const userProfileSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  contactNumber: yup.number(),
  birthDate: yup
    .date()
    .nullable()
    .max(new Date(), "Birth date cannot be in the future"),
  gender: yup.string().oneOf(["Male", "Female", "Other"], "Invalid gender"),
});

export interface TokenProps {
  accessToken: string;
  refreshToken: string;
}
