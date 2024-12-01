import { useAppSelector } from "@/hooks/use-app-selector";
import { initialUser, userProfileSchema, UserProfileProps } from "@/types/user";
import {
  Avatar,
  Box,
  Button,
  Grid2,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Camera } from "lucide-react";
import useImageContext from "@/hooks/contexts/use-image-context";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const UserInformationSection = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [avatarUrl, setAvatarUrl] = useState(user?.userProfile.avatar || "");
  const [hoverAvatar, setHoverAvatar] = useState(false);
  //  const { editProfile } = useUserContext();
  const formik = useFormik<UserProfileProps>({
    validationSchema: userProfileSchema,
    initialValues: initialUser.userProfile,
    onSubmit: async () => {
      // await editProfile(user?.id);
    },
  });
  const { uploadImage } = useImageContext();
  const handleUploadImage = async (image: File) => {
    const { imageUrl } = await uploadImage(image);
    setAvatarUrl(imageUrl);
    formik.setFieldValue("avatar", imageUrl);
  };
  return (
    <Stack flexDirection="row" margin="0 5rem" marginTop="3rem" gap="15rem">
      <Grid2
        sx={{
          direction: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            textAlign: "center",
            cursor: "pointer",
            alignItems: "center",
            width: 200,
          }}
        >
          <Box
            sx={{ display: "flex" }}
            onMouseEnter={() => setHoverAvatar(true)}
            onMouseLeave={() => setHoverAvatar(false)}
          >
            <Avatar
              src={avatarUrl}
              sx={{
                width: 200,
                height: 200,
                transition: "opacity 0.3s ease",
                opacity: hoverAvatar ? 0.7 : 1,
              }}
            />
            {hoverAvatar && (
              <Box
                sx={{
                  position: "absolute",
                  width: 200,
                  height: 200,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        handleUploadImage(file);
                      }
                    }}
                  />
                  <Camera />
                </IconButton>
                <Typography color="white" fontSize={14}>
                  Upload New Picture
                </Typography>
              </Box>
            )}
          </Box>
          <Typography
            variant="h5"
            fontWeight={600}
            marginTop={5}
            color="#032751"
          >
            {user?.userProfile.firstName} {user?.userProfile.lastName}
          </Typography>
          <Typography fontSize={18} fontWeight={400}>
            {user?.email}
          </Typography>
        </Box>
      </Grid2>
      <Grid2 container rowSpacing={3} columnSpacing={4}>
        <Grid2
          size={{
            lg: 6,
          }}
        >
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontSize={18} fontWeight={500}>
              First name
            </Typography>
            <TextField
              autoFocus
              name="firstName"
              value={user?.userProfile.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.firstName && formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              fullWidth
            />
          </Box>
        </Grid2>
        <Grid2
          size={{
            lg: 6,
          }}
        >
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontSize={18} fontWeight={500}>
              Last name
            </Typography>
            <TextField
              autoFocus
              name="lastName"
              value={user?.userProfile.lastName}
              onChange={formik.handleChange}
              error={!!(formik.touched.lastName && formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              onBlur={formik.handleBlur}
              fullWidth
            />
          </Box>
        </Grid2>
        <Grid2
          size={{
            lg: 6,
          }}
        >
          <Box display="flex" flexDirection="column">
            <Typography fontSize={18} fontWeight={500}>
              Date of birth
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  // value={formik.values.birthDate}
                  onChange={(date) => formik.setFieldValue("birthDate", date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Grid2>
        <Grid2
          size={{
            lg: 6,
          }}
        >
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontSize={18} fontWeight={500}>
              Gender
            </Typography>
            <Select
              id="gender"
              label="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Rather not say</MenuItem>
            </Select>
          </Box>
        </Grid2>
        <Grid2
          size={{
            lg: 12,
          }}
        >
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontSize={18} fontWeight={500}>
              Contact number
            </Typography>
            <TextField
              autoFocus
              name="contactNumber"
              value={user?.userProfile.contactNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>
        </Grid2>
        <Grid2 size={{ lg: 12 }}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                height: 48,
              }}
            >
              <Typography fontWeight={600}>Save Changes</Typography>
            </Button>
          </Box>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default UserInformationSection;
