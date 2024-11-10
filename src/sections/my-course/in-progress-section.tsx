import { grey } from "@/theme/color";
import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";

const InProgressSection = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <LinearProgress
                  variant="determinate"
                  color="secondary"
                  value={progress}
                />
              </Box>
              <Typography>{Math.round(progress)}%</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Overall Progress</Typography>
              <Button variant="outlined" color="secondary">
                Go to class
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};

export default InProgressSection;
