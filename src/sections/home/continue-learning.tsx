import {
  Typography,
  Box,
  Button,
  Card,
  Chip,
  LinearProgress,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import python from "@/assets/images/python.png";
import { useNavigate, useParams } from "react-router-dom";

const Chips = styled(Chip)({
  borderRadius: "40px",
});

const ContinueLearningSection = () => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate(`/course/${title}/details`);
  };
  return (
    <>
      <Typography variant="h5" color="primary.main" fontWeight={700}>
        Continue Learning
      </Typography>
      <Card
        sx={{
          borderRadius: "1rem",
          boxShadow: "0 2.5px 5px black",
        }}
      >
        <Box display="flex">
          <Box padding="2rem 1rem 2rem 1rem">
            <CardMedia
              component="img"
              style={{ width: "10rem", height: "10rem" }}
              image={python}
              alt="Data Visualization with Python"
            />
          </Box>
          <CardContent style={{ flex: 1 }}>
            <Stack direction="row" spacing={1}>
              <Chips label="Beginers" color="success" />
              <Chips label="Data visualization" color="primary" />
            </Stack>
            <Typography variant="body2" color="text.secondary" marginTop={2}>
              Course| Offer by IBM
            </Typography>
            <Typography
              gutterBottom
              color="primary.main"
              variant="h6"
              component="div"
            >
              Data Visualization with Python
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Data visualization is the graphical representation of data in
              order to interactively and efficiently convey insights to clients.
            </Typography>
            <Box display="flex" alignItems="center" marginTop={2}>
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={10}
                sx={{
                  height: "10px",
                  borderRadius: "10px",
                  width: "100%",
                  marginRight: "1rem",
                }}
              />
              <Typography variant="body2" color="text.secondary">
                10%
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Typography>Overall Progress</Typography>
              <Button
                onClick={onButtonClick}
                sx={{ cursor: "pointer" }}
                variant="outlined"
                color="secondary"
              >
                Go to class
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default ContinueLearningSection;
