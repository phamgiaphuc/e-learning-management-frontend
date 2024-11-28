import { useAppSelector } from "@/hooks/use-app-selector";
import {
  Avatar,
  Box,
  Grid2,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const UserInformationSection = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Stack flexDirection="row" margin="0 3rem" marginTop="2rem" gap={10}>
      <Grid2
        sx={{
          direction: "column",
          justifyContent: "center",
          marginTop: "2.5rem",
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
          }}
        >
          <Avatar
            src={user?.userProfile.avatar}
            sx={{ width: 220, height: 220 }}
          ></Avatar>
          <Typography fontSize={30} fontWeight={500} marginTop={5}>
            {user?.userProfile.firstName} {user?.userProfile.lastName}
          </Typography>
          <Typography fontSize={16} fontWeight={400}>
            {user?.email}
          </Typography>
        </Box>
      </Grid2>
      <Grid2 container rowSpacing={3} columnSpacing={4}>
        <Grid2
          size={{
            lg: 12,
          }}
        >
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontSize={18} fontWeight={500}>
              First name
            </Typography>
            <TextField
              disabled
              autoFocus
              name="firstname"
              value={user?.userProfile.firstName}
              fullWidth
            />
          </Box>
        </Grid2>
        <Grid2
          size={{
            lg: 12,
          }}
        >
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontSize={18} fontWeight={500}>
              Last name
            </Typography>
            <TextField
              disabled
              autoFocus
              name="lastname"
              value={user?.userProfile.lastName}
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
              Date of birth
            </Typography>
            <TextField
              disabled
              autoFocus
              name="birthdate"
              value={user?.userProfile.birth}
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
              Gender
            </Typography>
            <Select
              id="gender"
              label="Gender"
              value={user?.userProfile.gender}
              defaultValue="Male"
            >
              <MenuItem>Male</MenuItem>
              <MenuItem>Female</MenuItem>
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
              disabled
              autoFocus
              name="contactNumber"
              value={user?.userProfile.contactNumber}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default UserInformationSection;
