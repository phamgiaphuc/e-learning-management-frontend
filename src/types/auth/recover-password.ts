import * as yup from "yup";
import { passwordRegex } from "../regex";

export interface RecoverPasswordProps {
  newPassword: string;
}

export const initialRecoverPasswordValues: RecoverPasswordProps = {
  newPassword: "",
};

export const recoverPasswordSchema = yup.object<RecoverPasswordProps>({
  // Minimum 6 characters, at least 1 letter and 1 number
  newPassword: yup
    .string()
    .required("New password is required")
    .matches(
      passwordRegex,
      "Password must have minimum 6 characters, contain at least 1 letter and 1 number",
    ),
});
