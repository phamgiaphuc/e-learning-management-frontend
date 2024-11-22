import { v4 as uuidv4 } from "uuid";
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

export interface ModuleProps {
  id: number;
  name: string;
  lessons: Array<{ id: string; name: string }>;
  sequence: number;
}

const moduleList: Array<ModuleProps> = [
  {
    id: 1,
    name: "Module 1 - Introduction",
    lessons: [
      {
        id: uuidv4(),
        name: "Lesson 1.1: Intro 1",
      },
      {
        id: uuidv4(),
        name: "Lesson 1.2: Intro 2",
      },
    ],
    sequence: 1,
  },
  {
    id: 2,
    name: "Module 2 - Getting Started",
    lessons: [
      {
        id: uuidv4(),
        name: "Lesson 2.1",
      },
      {
        id: uuidv4(),
        name: "Lesson 2.2",
      },
    ],
    sequence: 2,
  },
];

const ModuleList = () => {
  const [modules, setModules] = useState(moduleList);
  const [activeModule, setActiveModule] = useState<ModuleProps | undefined>(
    undefined,
  );
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const removeItem = (id: number) => {
    const updated = modules
      .filter((module) => module.id !== id)
      .map((module, i) => ({ ...module, sequence: i + 1 }));
    setModules(updated);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveModule(modules?.find((item) => item.sequence === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeItem = modules.find((ex) => ex.sequence === active.id);
    const overItem = modules.find((ex) => ex.sequence === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = modules.findIndex((ex) => ex.sequence === active.id);
    const overIndex = modules.findIndex((ex) => ex.sequence === over.id);

    if (activeIndex !== overIndex) {
      setModules((prev) => {
        const updated = arrayMove(prev, activeIndex, overIndex).map(
          (ex, i) => ({ ...ex, sequence: i + 1 }),
        );

        return updated;
      });
    }
    setActiveModule(undefined);
  };

  const handleDragCancel = () => {
    setActiveModule(undefined);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={modules.map((item) => item.sequence)}
        strategy={verticalListSortingStrategy}
      >
        {modules.map((module) => (
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
  );
};

export default ModuleList;
