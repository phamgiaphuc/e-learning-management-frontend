import HCMIUIcon from "@/assets/icons/hcmiu.png";
import { grey } from "@/theme/color";
import {
  AppBar,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const HomePage = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "blue",
        justifyContent: "center",
        height: "4rem",
      }}
    >
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <img src={HCMIUIcon} alt="hcmiu-logo" height={38} width={38} />
        <Typography
          variant="h6"
          color="text.primary"
          font-size="35px"
          fontWeight={700}
          lineHeight="43px"
        >
          Scholaro
        </Typography>
        <Stack
          direction="row"
          spacing={5}
          color={grey[700]}
          fontWeight={400}
          fontSize="16px"
          lineHeight="24px"
          paddingLeft={6}
        >
          <Link href="#" underline="hover" color="inherit">
            Homepage
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Course
          </Link>
          <Link href="#" underline="hover" color="inherit">
            My Learning
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default HomePage; /* HomePage */
