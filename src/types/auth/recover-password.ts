import * as yup from "yup";

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
    .min(6, "Password must be 6 characters at minimum")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "Password must contain at least one letter and one number",
    ),
  passwordConfirm: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});
