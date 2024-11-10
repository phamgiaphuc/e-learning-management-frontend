import { grey } from "@/theme/color";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { CircleCheck } from "lucide-react";

const CompletedSection = () => {
  return (
    <Stack gap={2}>
      <Paper
        elevation={12}
        sx={{
          padding: 2,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 260,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <img
              src="https://i.ytimg.com/vi/9SGDpanrc8U/maxresdefault.jpg"
              alt="course"
              width="100%"
              height="100%"
            />
          </Box>
          <Stack
            gap={1}
            sx={{
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Chip label="Beginners" />
              <Chip label="Java" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: grey[600],
                }}
              >
                Course | Offer by IBM
              </Typography>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  color: blue[700],
                }}
              >
                Data Visualization with Python
              </Typography>
              <Typography variant="subtitle2">
                Data visualization is the graphical representation of data in
                order to interactively and efficiently convey insights to
                clients.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <SvgIcon>
                  <CircleCheck size={20} color={green[700]} />
                </SvgIcon>
                <Typography mb={0.5}>
                  Great Work! You have passed all requirements and can view your
                  course.
                </Typography>
              </Box>
              <Button variant="outlined" color="secondary">
                View courses
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};

export default CompletedSection;
