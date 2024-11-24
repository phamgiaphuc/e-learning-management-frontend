import { LessonProps } from "@/types/lesson";
import { ModuleProps } from "@/types/module";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  GripVertical,
  ChevronDown,
  Hammer,
  Trash,
  ChevronUp,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

type SortableRowProps = {
  module: ModuleProps;
  removeModule: (id: string) => void;
  forceDragging?: boolean;
};

export function SortableRow({
  module,
  removeModule,
  forceDragging = false,
}: SortableRowProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = useCallback(() => {
    navigate(`/my-course/edit?type=module&id=${module.id}`);
  }, [module.id, navigate]);

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: module.sequence,
  });

  const parentStyles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={parentStyles}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        border: 1,
        borderColor: grey[400],
        borderRadius: 2,
        cursor: isDragging || forceDragging ? "grabbing" : "pointer",
        gap: 2,
        bgcolor: isDragging ? grey[100] : "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexGrow: 1,
          }}
        >
          <Box
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "grab",
            }}
          >
            <GripVertical size={24} />
          </Box>
          <IconButton
            onClick={() => module.lessons.length > 0 && setOpen(!open)}
          >
            {open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </IconButton>
          <TextField
            size="small"
            value={module.name}
            sx={{ width: 650, fontWeight: 500 }}
            placeholder="Enter module name"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<Hammer size={16} />}
            sx={{ width: 100, borderRadius: 2 }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Trash size={16} />}
            sx={{ width: 100, borderRadius: 2 }}
            onClick={() => removeModule(module.id)}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <Collapse in={open} unmountOnExit>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginLeft: 12,
          }}
        >
          <List disablePadding>
            {module.lessons.map((lesson: LessonProps) => (
              <ListItem
                key={lesson.id}
                disablePadding
                sx={{ width: "fit-content" }}
              >
                <ListItemButton
                  sx={{
                    color: "black",
                    borderRadius: 2,
                  }}
                >
                  {lesson.name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Collapse>
    </Box>
  );
}
