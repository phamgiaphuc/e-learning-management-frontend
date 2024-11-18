import { RoleProps } from "@/types/auth/role";
import { passwordRegex } from "@/types/regex";
import * as yup from "yup";

export interface SignUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleProps;
  username: string;
  confirmPassword?: string;
}

export const initialSignUpValues: SignUpProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "student",
  username: "",
  confirmPassword: "",
};

export const signUpSchema = yup.object<SignUpProps>({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(passwordRegex, { message: "Password does not match" }),
  username: yup.string().required("Username is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .matches(passwordRegex, { message: "Password does not match" }),
});
