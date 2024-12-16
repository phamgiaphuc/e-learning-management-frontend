import { useAppSelector } from "@/hooks/use-app-selector";
import useMetaTitle from "@/hooks/use-meta-title";
import CourseList from "@/sections/home/course-list";
import CourseStudent from "@/sections/home/course-student";
import CourseTeacher from "@/sections/home/course-teacher";
import { blue, grey } from "@/theme/color";
import { Box, Button, Stack, Typography, Link } from "@mui/material";
import { User } from "lucide-react";
import GoogleIcon from "@/assets/icons/google-logo.svg";
import FacebookIcon from "@/assets/icons/facebook-logo.svg";
import CalculatorIcon from "@/assets/images/calculator.png";
import GraduationHatIcon from "@/assets/images/graduation-hat.png";
import PaperPlaneIcon from "@/assets/images/paper-plane.png";
import LighBulbIcon from "@/assets/images/light-bulb.png";
import { useNavigate } from "react-router-dom";
import envConfig from "@/configs/env.config";

const HomePage = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useMetaTitle({ title: "Home" });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingX: 4,
          paddingTop: 2,
          gap: 2,
          alignItems: "center",
        }}
      >
        {!isAuthenticated && (
          <Box
            sx={{
              height: "",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1.5,
              padding: 4,
              position: "relative",
              width: "100%",
            }}
          >
            <img
              src={CalculatorIcon}
              alt="calculator-icon"
              height={72}
              style={{
                position: "absolute",
                right: 220,
                bottom: 48,
              }}
            />
            <img
              src={GraduationHatIcon}
              alt="calculator-icon"
              height={72}
              style={{
                position: "absolute",
                right: 128,
                top: 40,
              }}
            />
            <img
              src={PaperPlaneIcon}
              alt="paper-plane-icon"
              height={64}
              style={{
                position: "absolute",
                left: 164,
                bottom: 64,
              }}
            />
            <img
              src={LighBulbIcon}
              alt="paper-plane-icon"
              height={64}
              style={{
                position: "absolute",
                left: 72,
                top: 48,
              }}
            />
            <Typography
              sx={{
                textTransform: "uppercase",
                color: grey[700],
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Online course
            </Typography>
            <Typography
              sx={{
                fontSize: 36,
                fontWeight: 600,
                color: "#053368",
              }}
            >
              Sharpen Your Skills With Professional Online Courses
            </Typography>
            <Typography
              sx={{
                color: grey[600],
              }}
              variant="body2"
            >
              Log in to start learning
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  backgroundColor: blue[100],
                  color: "black",
                  paddingX: 4,
                  paddingY: 1,
                }}
                startIcon={<User size={20} />}
                onClick={() => navigate("/login")}
              >
                Log in with account
              </Button>
              <Button
                sx={{
                  backgroundColor: grey[200],
                  padding: 0,
                  width: 40.5,
                  height: 40.5,
                }}
                onClick={() =>
                  window.open(`${envConfig.serverUrl}/auth/google`, "_self")
                }
              >
                <img src={GoogleIcon} alt="google-icon" height={24} />
              </Button>
              <Button
                sx={{
                  backgroundColor: grey[200],
                  padding: 0,
                  width: 40.5,
                  height: 40.5,
                }}
              >
                <img src={FacebookIcon} alt="google-icon" height={24} />
              </Button>
            </Box>
            <Typography
              sx={{
                color: grey[600],
              }}
              variant="body2"
            >
              Or create free account, <Link href="/signup">Click here</Link>
            </Typography>
          </Box>
        )}
        <Stack gap={2} sx={{ width: "100%", marginBottom: 4 }}>
          {isAuthenticated ? (
            user?.role === "user" ? (
              <CourseStudent />
            ) : (
              <CourseTeacher />
            )
          ) : (
            <></>
          )}
          <CourseList />
        </Stack>
      </Box>
    </>
  );
};

export default HomePage;
