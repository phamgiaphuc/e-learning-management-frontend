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
    birth: Date;
    //  gender: string;
    address: string;
    phoneNumber: string;
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
    birth: new Date(),
    // gender: "",
    address: "",
    phoneNumber: "",
  },
};

export interface UserProfileProps {
  avatar: string;
  firstName: string;
  lastName: string;
  birth: Date;
  // gender: string;
  address: string;
  phoneNumber: string;
}

export const userProfileSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),

  birthDate: yup
    .date()
    .nullable()
    .max(new Date(), "Birth date cannot be in the future"),
  // gender: yup.string().oneOf(["MALE", "FEMALE", "CUSTOM"], "Invalid gender"),
  phoneNumber: yup.string(),
  address: yup.string(),
});

export interface TokenProps {
  accessToken: string;
  refreshToken: string;
}
