import { grey } from "@/theme/color";
import { styled } from "@mui/material";
import MuiLink from "@mui/material/Box";

const NavBarLink = styled(MuiLink)(() => ({
  underline: "hover",
  color: grey[500],
  fontWeight: "400",
  fontFamily: "Poppins, sans-serif",
  lineHeight: "24px",
  textDecoration: "none",
  "&:hover": {
    color: "text.primary",
    textDecoration: "underline",
  },
}));

export default NavBarLink;
