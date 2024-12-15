import Cookies from "js-cookie";

export const setRefreshTokenCookie = (refreshToken: string) => {
  Cookies.set("refreshToken", refreshToken, {
    path: "/",
    sameSite: "Strict",
    secure: false,
    expires: 7,
  });
};

export const deleteRefreshTokenCookie = () => {
  Cookies.remove("refreshToken");
};
