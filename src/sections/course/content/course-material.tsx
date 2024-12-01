import { GetCourseByIdProps } from "@/types/course";
import { ModuleDetailProps } from "@/types/module";
import { Box, Collapse, Stack, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface CourseMaterialProps {
  modules: GetCourseByIdProps["modules"];
  moduleId: ModuleDetailProps["id"];
  onClickModule: (id: ModuleDetailProps["id"]) => void;
}
const CourseMaterial = ({
  modules,
  moduleId,
  onClickModule,
}: CourseMaterialProps) => {
  const [open, setOpen] = useState<boolean>(true);

  const onClickOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  useEffect(() => {
    if (modules?.length) {
      onClickModule(modules[0].id);
    }
  }, [modules, onClickModule]);

  return (
    <Stack gap={1}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onClickOpen}
      >
        {open ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        <Typography>Course material</Typography>
      </Box>
      <Collapse in={open} unmountOnExit>
        <Stack
          sx={{
            marginLeft: 3.5,
            marginTop: 0.5,
            gap: 1,
          }}
        >
          {modules?.map((module, index) => (
            <Box
              key={module.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                textDecoration: moduleId === module.id ? "underline" : "",
                textDecorationColor: moduleId === module.id ? green[700] : "",
                ":hover": {
                  textDecoration: "underline",
                  textDecorationColor: moduleId === module.id ? green[700] : "",
                },
                cursor: "pointer",
                textUnderlineOffset: 2,
              }}
              onClick={() => onClickModule(module.id)}
            >
              <Typography
                key={module.id}
                sx={{
                  fontWeight: moduleId === module.id ? 600 : 400,
                  color: moduleId === module.id ? green[700] : "",
                }}
              >
                {index + 1}. {module.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default CourseMaterial;
