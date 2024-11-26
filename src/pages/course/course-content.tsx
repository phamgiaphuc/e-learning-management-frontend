import useModuleContext from "@/hooks/contexts/use-module-context";
import { initialModule, ModuleDetailsProps } from "@/types/module";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { CircleChevronRight } from "lucide-react";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LessonDetailsProps } from "@/types/lesson";
import useLessonContext from "@/hooks/contexts/use-lesson-context";

const ModuleListItem = styled(ListItemText)({
  fontWeight: "800",
  fontSize: "10px",
  "&:hover": {
    cursor: "pointer",
  },
});

const CourseContent = () => {
  const [modules, setModules] = useState<Array<ModuleDetailsProps>>([]);
  const [module, setSelectedModule] =
    useState<ModuleDetailsProps>(initialModule);
  const [lessons, setLessons] = useState<Array<LessonDetailsProps>>([]);
  const { id } = useParams();
  const [openMaterials, setOpenMaterials] = useState(true);
  const [openAssignments, setOpenAssignments] = useState(false);
  const [openInformation, setOpenInformation] = useState(false);

  const handleAssignmentsClick = () => {
    setOpenAssignments(!openAssignments);
  };
  const handleMaterialsClick = () => {
    setOpenMaterials(!openMaterials);
  };
  const handleInformationClick = () => {
    setOpenInformation(!openInformation);
  };

  const { getModules } = useModuleContext();
  const { getLessons } = useLessonContext();

  useEffect(() => {
    const fetchModules = async () => {
      if (id) {
        const modules = await getModules(id);
        setModules(modules);
      }
    };
    if (modules.length > 0 && module === initialModule) {
      setSelectedModule(modules[0]); //automatically select the first module
    }
    fetchModules();
  }, [id, getModules]);

  useEffect(() => {
    const fetchLessons = async () => {
      if (module && module.id) {
        const lessons = await getLessons(module.id);
        setLessons(lessons);
      }
    };
    fetchLessons();
  }, [module, getLessons, modules]);

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        PaperProps={{
          sx: {
            width: "23vw",
            paddingTop: "5rem",
            overflow: "auto",
            zIndex: "-1",
          },
        }}
      >
        <List>
          <ListItemButton onClick={handleMaterialsClick}>
            <ModuleListItem primary="Course Materials" />
            {openMaterials ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMaterials} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {modules.length > 0 ? (
                modules.map((mod) => (
                  <ListItem key={mod.id} sx={{ pl: 2 }}>
                    <ListItemButton onClick={() => setSelectedModule(module)}>
                      <CircleChevronRight color="green" />
                      <ModuleListItem
                        primary={mod.name}
                        sx={{ paddingLeft: "1rem" }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))
              ) : (
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary="No materials available"
                    sx={{ fontStyle: "italic", color: "grey.500" }}
                  />
                </ListItem>
              )}
            </List>
          </Collapse>
          <ListItemButton onClick={handleAssignmentsClick}>
            <ModuleListItem primary="Assignments" />
            {openAssignments ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <ListItemButton onClick={handleInformationClick}>
            <ModuleListItem primary="Course Information" />
            {openInformation ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        sx={{
          marginLeft: "25vw",
          zIndex: "-1",
          paddingTop: "1rem",
        }}
      >
        {module.name ? (
          <Typography fontWeight="700" fontSize="40px" color="primary.main">
            {module.name}
          </Typography>
        ) : (
          <Typography fontWeight="400" fontSize="20px" color="grey.500">
            Please select a module from the list
          </Typography>
        )}
        <Typography fontWeight="400" fontSize="16px" color="grey.500">
          {module.description}
        </Typography>
        <Divider />
        <Typography
          fontWeight="700"
          fontSize="18px"
          color="grey.900"
          marginTop="1.5rem"
        >
          Lessons
        </Typography>
        <List component="div" disablePadding>
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <ListItem key={lesson.id} sx={{ pl: 2 }}>
                <ListItemButton>
                  <ModuleListItem
                    primary={lesson.name}
                    sx={{ paddingLeft: "1rem" }}
                  />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem sx={{ pl: 4 }}>
              <ListItemText
                primary="No lessons available"
                sx={{ fontStyle: "italic", color: "grey.500" }}
              />
            </ListItem>
          )}
        </List>
      </Box>
    </>
  );
};

export default CourseContent;
