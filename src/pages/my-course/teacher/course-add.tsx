import { useAppSelector } from "@/hooks/use-app-selector";
import { Breadcrumbs, Stack, Typography, Box } from "@mui/material";
import { ChevronRight } from "lucide-react";
import ModuleList from "@/sections/my-course/teacher/module-list";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { resetCourse } from "@/stores/course/course.slice";
import {
  initialNewCourse,
  NewCourseProps,
  newCourseSchema,
} from "@/types/course";
import CourseSideForm from "@/sections/my-course/teacher/course-side-form";
import useCourseContext from "@/hooks/contexts/use-course-context";
import useModuleContext from "@/hooks/contexts/use-module-context";
import useLessonContext from "@/hooks/contexts/use-lesson-context";
import useToast from "@/hooks/use-toast";
import CourseInfoForm from "@/sections/my-course/teacher/course-info-form";

const CourseAddPage = () => {
  const { course, modules } = useAppSelector((state) => state.course);
  const { user } = useAppSelector((state) => state.auth);
  const { createCourse } = useCourseContext();
  const { createModule } = useModuleContext();
  const { createLesson } = useLessonContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { successToast, errorToast } = useToast();

  const formik = useFormik<NewCourseProps>({
    initialValues: initialNewCourse,
    validationSchema: newCourseSchema,
    onSubmit: async (values) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = values;
        const course = await createCourse({
          ...rest,
          teacherId: user?.id || "",
        });
        if (modules) {
          for (const module of modules) {
            const data = await createModule({
              courseId: course.id,
              name: module.name,
              description: "",
            });
            for (const lesson of module.lessons) {
              await createLesson({
                name: lesson.name,
                moduleId: data.id,
                description: "",
                content: lesson.content,
              });
            }
          }
        }
        dispatch(resetCourse());
        successToast("Create course successfully");
        navigate("/my-course");
      } catch (error) {
        errorToast(String(error));
      }
    },
  });

  const handleClose = useCallback(() => {
    dispatch(resetCourse());
    navigate("/my-course");
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!course) {
      navigate("/my-course");
    } else {
      formik.setValues({
        id: course.id,
        name: course.name,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        level: course.level,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, navigate]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack sx={{ padding: 2, gap: 2 }}>
        <Box sx={{ display: "flex", gap: 2, position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "84%",
              gap: 2,
            }}
          >
            <Breadcrumbs separator={<ChevronRight size={20} />}>
              {[
                <Typography
                  color="text.primary"
                  sx={{
                    cursor: "pointer",
                    ":hover": {
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    },
                  }}
                  onClick={handleClose}
                >
                  My course
                </Typography>,
                <Typography
                  color="primary"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {formik.values.name || "Project's name"}
                </Typography>,
              ]}
            </Breadcrumbs>
            <Box>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 800 }}>
                {formik.values.name || "Project's name"}
              </Typography>
            </Box>
            <CourseInfoForm formik={formik} />
            <ModuleList />
          </Box>
          <CourseSideForm handleClose={handleClose} formik={formik} />
        </Box>
      </Stack>
    </form>
  );
};

export default CourseAddPage;
