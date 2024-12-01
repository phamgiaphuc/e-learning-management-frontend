import { useAppSelector } from "@/hooks/use-app-selector";
import useMetaTitle from "@/hooks/use-meta-title";
import { formatDate } from "@/utils/format-date";
import { Box, Stack, Typography, Button, Grid2, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";
import SliderPic from "@/assets/images/slider_pic.png";
import { grey } from "@/theme/color";
import StarIcon from "@mui/icons-material/Star";

const PreivewCourse = () => {
  const { course, modules } = useAppSelector((state) => state.course);

  const lessons = modules?.flatMap((module) => module.lessons);

  useMetaTitle({ title: "Preview course" });

  return (
    <Stack gap={2}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: blue[100],
          height: 300,
          display: "flex",
          paddingRight: 16,
          paddingLeft: 8,
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingY: 8,
          }}
        >
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            {course?.name}
          </Typography>
          <Button
            variant="contained"
            sx={{
              height: 56,
              marginTop: 2,
              width: 280,
              borderRadius: 2,
              paddingY: 1,
            }}
          >
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Enroll for free</Typography>
              <Typography variant="body2">
                Starts at {formatDate(new Date())}
              </Typography>
            </Stack>
          </Button>
          <Typography sx={{ display: "flex", marginY: 1.5 }}>
            <Typography sx={{ fontWeight: 600, marginRight: 0.5 }}>
              {0}
            </Typography>
            already enrolled
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={SliderPic} height="100%" style={{ objectFit: "cover" }} />
        </Box>
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            bottom: -64,
            left: 64,
            height: 100,
            backgroundColor: "white",
            width: "calc(100vw - 128px)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Grid2
            container
            sx={{
              width: "100%",
            }}
            columnSpacing={2}
          >
            <Grid2 size={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "center",
                  flexGrow: 1,
                  borderRight: 1,
                  borderColor: grey[600],
                  height: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {modules?.length} modules
                </Typography>
                <Typography variant="body2">
                  Gain insight into a topic and learn the fundamentals.
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={3}>
              <Box
                sx={{
                  flexGrow: 1,
                  borderRight: 1,
                  borderColor: grey[600],
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {lessons?.length} lessons
                </Typography>
                <Typography variant="body2">
                  Explore each problem from the lessons
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={3}>
              <Box
                sx={{
                  flexGrow: 1,
                  borderRight: 1,
                  borderColor: grey[600],
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    0
                  </Typography>
                  <StarIcon color="warning" />
                </Box>
                <Typography variant="body2">Ratings & Reviews.</Typography>
              </Box>
            </Grid2>
            <Grid2 size={3}>
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  {course?.level} level
                </Typography>
                <Typography variant="body2">Course level.</Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingX: 8,
        }}
      >
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, marginBottom: 0.5 }}
            >
              Description
            </Typography>
            <Typography>{course?.description}</Typography>
          </Box>
          {course?.thumbnailUrl && (
            <img
              src={course.thumbnailUrl}
              alt={course?.name}
              style={{
                width: 600,
                height: 150,
                objectFit: "cover",
                borderRadius: 16,
              }}
            />
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default PreivewCourse;
