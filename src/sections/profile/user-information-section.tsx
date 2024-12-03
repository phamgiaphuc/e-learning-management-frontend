import { useAppSelector } from "@/hooks/use-app-selector";
import { initialUser, userProfileSchema, UserProfileProps } from "@/types/user";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid2,
  IconButton,
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
import useUserContext from "@/hooks/contexts/use-user-context";
import useMetaTitle from "@/hooks/use-meta-title";

const UserInformationSection = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [avatarUrl, setAvatarUrl] = useState(user?.userProfile.avatar || "");
  const [hoverAvatar, setHoverAvatar] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { editProfile } = useUserContext();
  const formik = useFormik<UserProfileProps>({
    validationSchema: userProfileSchema,
    initialValues: {
      ...initialUser.userProfile,
      firstName: user?.userProfile.firstName || "",
      lastName: user?.userProfile.lastName || "",
      phoneNumber: user?.userProfile.phoneNumber || "",
      address: user?.userProfile.address || "",
      avatar: user?.userProfile.avatar || "",
      birth: user?.userProfile.birth || new Date(),
    },
    onSubmit: async (values) => {
      if (user?.id) {
        await editProfile(user?.id, values);
      }
      setIsDisabled(true);
    },
  });
  const { uploadImage } = useImageContext();
  const handleUploadImage = async (image: File) => {
    const { imageUrl } = await uploadImage(image);
    setAvatarUrl(imageUrl);
    formik.setFieldValue("avatar", imageUrl);
  };

  useMetaTitle({ title: "Profile" });

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
                  justifyContent: "center",
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
                  <Camera size={50} color="white" />
                </IconButton>
              </Box>
            )}
          </Box>
          <Typography variant="h5" fontWeight={600} marginTop={5}>
            {user?.userProfile.firstName} {user?.userProfile.lastName}
          </Typography>
          <Typography fontSize={18} fontWeight={400}>
            {user?.email}
          </Typography>
        </Box>
      </Grid2>
      <form onSubmit={formik.handleSubmit}>
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
                value={formik.values.firstName}
                disabled={isDisabled}
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
                value={formik.values.lastName}
                disabled={isDisabled}
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
                    //   value={formik.values.birthDate}
                    name="birth"
                    disabled={isDisabled}
                    onChange={(date) => formik.setFieldValue("birth", date)}
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
              <FormControl fullWidth>
                <Select name="gender" label="gender">
                  {/* //     value={formik.values.gender}
                //   disabled={isDisabled}
                //   onChange={formik.handleChange}
                //   onBlur={formik.handleBlur}
                //   fullWidth
                // >
                //   <MenuItem value="MALE">Male</MenuItem>
                //   <MenuItem value="FEMALE">Female</MenuItem>
                //   <MenuItem value="CUSTOM">Rather not say</MenuItem> */}
                </Select>
              </FormControl>
            </Box>
          </Grid2>
          <Grid2
            size={{
              lg: 6,
            }}
          >
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography fontSize={18} fontWeight={500}>
                Phone number
              </Typography>
              <TextField
                autoFocus
                name="phoneNumber"
                disabled={isDisabled}
                value={user?.userProfile.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
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
                Address
              </Typography>
              <TextField
                autoFocus
                name="address"
                value={formik.values.address}
                disabled={isDisabled}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!(formik.touched.address && formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                fullWidth
              />
            </Box>
          </Grid2>
        </Grid2>
        <Grid2 size={{ lg: 12 }}>
          <Box display="flex" justifyContent="flex-end" marginTop="1.5rem">
            {isDisabled ? (
              <Button
                size="large"
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  height: 48,
                }}
                onClick={() => setIsDisabled(false)}
              >
                <Typography fontWeight={600}>Edit profile</Typography>
              </Button>
            ) : (
              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  height: 48,
                }}
              >
                <Typography fontWeight={600}>Save changes</Typography>
              </Button>
            )}
          </Box>
        </Grid2>
      </form>
    </Stack>
  );
};

export default UserInformationSection;
