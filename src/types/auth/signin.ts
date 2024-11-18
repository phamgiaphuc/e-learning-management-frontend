import { passwordRegex } from "@/types/regex";
import * as yup from "yup";

export interface SignInProps {
  account: string;
  password: string;
}

export const initialSignInValues: SignInProps = {
  account: "",
  password: "",
};

export const signInSchema = yup.object<SignInProps>({
  account: yup.string().required("Username or email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(passwordRegex, { message: "Password does not match" }),
});
