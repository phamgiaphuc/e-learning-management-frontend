import * as yup from "yup";

export interface ForgotPasswordProps {
  email: string;
}

export const initialForgotPasswordValues: ForgotPasswordProps = {
  email: "",
};

export const forgotPasswordSchema = yup.object<ForgotPasswordProps>({
  email: yup.string().email("Email is invalid").required("Email is required"),
});
