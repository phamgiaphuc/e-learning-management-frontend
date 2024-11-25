import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableRow } from "@/sections/my-course/module-row";
import { Box, Button, Typography } from "@mui/material";
import { grey } from "@/theme/color";
import { Plus } from "lucide-react";
import { ModuleProps } from "@/types/module";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateModule } from "@/stores/course/course.slice";

const ModuleList = () => {
  const { modules } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const [activeModule, setActiveModule] = useState<ModuleProps | undefined>(
    undefined,
  );
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const removeItem = (id: number) => {
    if (!modules) {
      return;
    }
    const updated = modules
      .filter((module) => module.id !== id)
      .map((module, i) => ({ ...module, sequence: i + 1 }));
    dispatch(updateModule(updated));
  };

  const addItem = () => {
    const updated = [
      ...(modules || []),
      {
        id: (modules || []).length + 1,
        name: `Module ${(modules || []).length + 1}`,
        lessons: [],
        sequence: (modules || []).length + 1,
      },
    ];
    dispatch(updateModule(updated));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveModule(modules?.find((item) => item.sequence === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (!modules) {
      return;
    }

    const activeItem = modules.find((ex) => ex.sequence === active.id);
    const overItem = modules.find((ex) => ex.sequence === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = modules.findIndex((ex) => ex.sequence === active.id);
    const overIndex = modules.findIndex((ex) => ex.sequence === over.id);

    if (activeIndex !== overIndex) {
      const updated = arrayMove(modules, activeIndex, overIndex).map(
        (ex, i) => ({
          ...ex,
          sequence: i + 1,
        }),
      );
      dispatch(updateModule(updated));
    }
    setActiveModule(undefined);
  };

  const handleDragCancel = () => {
    setActiveModule(undefined);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        border: 1,
        borderColor: grey[400],
        borderRadius: 2,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            marginLeft: 0.5,
          }}
        >
          Course content
        </Typography>
        <Button
          size="large"
          variant="outlined"
          startIcon={<Plus size={20} />}
          onClick={addItem}
        >
          Add new section
        </Button>
      </Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={(modules || []).map((item) => item.sequence)}
          strategy={verticalListSortingStrategy}
        >
          {(modules || []).map((module) => (
            <SortableRow
              key={module.id}
              module={module}
              removeModule={removeItem}
            />
          ))}
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {activeModule ? (
            <SortableRow
              module={activeModule}
              removeModule={removeItem}
              forceDragging={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default ModuleList;
