import useModuleContext from "@/hooks/contexts/use-module-context";
import { ModuleDetailsProps } from "@/types/module";
import { SquareMinus } from "lucide-react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LessonDetailsProps } from "@/types/lesson";
import useLessonContext from "@/hooks/contexts/use-lesson-context";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";

const CustomTreeItem = styled(TreeItem)(() => ({
  [`& .${treeItemClasses.content}`]: {
    padding: 2,
    height: "3rem",
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 600,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
  },
}));

const LessonTreeItem = styled(TreeItem)(() => ({
  [`& .${treeItemClasses.content}`]: {
    padding: 2,
    height: "3rem",
    [`& .${treeItemClasses.label}`]: {
      fontSize: "15px",
      fontWeight: 400,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 10,
    paddingLeft: 18,
    borderLeft: "1px dashed black",
  },
}));

const CourseContent = () => {
  const [modules, setModules] = useState<Array<ModuleDetailsProps>>([]);
  const [lessons, setLessons] = useState<Array<LessonDetailsProps>>([]);
  const { id } = useParams();
  const [selectedModule, setSelectedModule] =
    useState<ModuleDetailsProps | null>(null);

  const { getModules } = useModuleContext();
  const { getLessons } = useLessonContext();

  useEffect(() => {
    const fetchModules = async () => {
      if (id) {
        const modules = await getModules(id);
        setModules(modules);
        if (modules.length > 0) {
          handleModuleSelection(modules[0]);
          console.log(modules[0].lessons);
        }
      }
    };
    fetchModules();
  }, [id, getModules]);

  const handleModuleSelection = async (module: ModuleDetailsProps) => {
    if (selectedModule?.id === module.id) return;
    setSelectedModule(module);

    const fetchedLessons = await getLessons(module.id);
    setLessons(fetchedLessons);
  };

  const renderLessons = (module: ModuleDetailsProps) => {
    if (selectedModule?.id === module.id && lessons.length > 0) {
      return lessons.map((lesson) => (
        <LessonTreeItem
          key={lesson.id}
          itemId={lesson.id.toString()}
          label={lesson.name}
        />
      ));
    }
    return null;
  };

  return (
    <Box>
      <Drawer
        variant="permanent"
        anchor="left"
        PaperProps={{
          sx: {
            width: "23vw",
            paddingTop: "5rem",
            overflow: "auto",
            zIndex: -1,
          },
        }}
      >
        <SimpleTreeView defaultExpandedItems={["course-material"]}>
          <CustomTreeItem itemId="course-material" label="Course Material">
            {modules.length > 0 ? (
              modules.map((module) => (
                <TreeItem
                  key={module.id}
                  itemId={module.id.toString()}
                  label={module.name}
                  onClick={() => handleModuleSelection(module)}
                >
                  {renderLessons(module)}
                </TreeItem>
              ))
            ) : (
              <TreeItem itemId="no-modules" label="No materials available" />
            )}
          </CustomTreeItem>
          <TreeItem itemId="assignments" label="Assignments"></TreeItem>
          <TreeItem itemId="info" label="Course Information"></TreeItem>
        </SimpleTreeView>
      </Drawer>
      <Box
        sx={{
          marginLeft: "25vw",
          padding: "2rem",
          zIndex: 1,
        }}
      >
        {selectedModule ? (
          <>
            <Typography fontWeight="700" fontSize="40px" color="primary.main">
              {selectedModule.name}
            </Typography>
            <Typography fontWeight="400" fontSize="16px" color="grey.500">
              {selectedModule.description || "No description available."}
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography
              fontWeight="700"
              fontSize="18px"
              color="grey.900"
              marginTop="1.5rem"
            >
              Lessons
            </Typography>
            <List component="div" disablePadding>
              {lessons.map((lesson) => (
                <ListItem key={lesson.id} sx={{ pl: 1 }}>
                  <ListItemButton>
                    <SquareMinus color="lightgrey" />
                    <ListItemText
                      primary={lesson.name}
                      sx={{ paddingLeft: "0.5rem" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography fontWeight="400" fontSize="20px" color="grey.500">
            Please select a module from the list.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CourseContent;
