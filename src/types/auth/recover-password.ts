import * as yup from "yup";
import { passwordRegex } from "../regex";

export interface RecoverPasswordProps {
  password: string;
  passwordConfirm: string;
}

export const initialRecoverPasswordValues: RecoverPasswordProps = {
  password: "",
  passwordConfirm: "",
};

export const recoverPasswordSchema = yup.object<RecoverPasswordProps>({
  // Minimum 6 characters, at least 1 letter and 1 number
  password: yup
    .string()
    .required("New password is required")
    .matches(
      passwordRegex,
      "Password must have minimum 6 characters, contain at least 1 letter and 1 number",
    ),
  passwordConfirm: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});
