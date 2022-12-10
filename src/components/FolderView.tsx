import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { FolderIcon } from "@heroicons/react/24/solid";
import type { Question, Quiz } from "@prisma/client";
import { useState } from "react";
import DropZone from "./DropZone";
import PreviewCard from "./PreviewCard";

export interface IFolderViewProps {
  id: string;
  title: string;
  quizes: (Quiz & {
    questions: Question[];
  })[];
  deleteQuiz: (id: string, title: string) => void;
  closeFolder: () => void;
  moveFromFolder: (id: string) => void;
}

export default function FolderView({
  id,
  title,
  quizes,
  deleteQuiz,
  closeFolder,
  moveFromFolder,
}: IFolderViewProps) {
  const [activeId, setActiveId] = useState<string | null>();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active?.id && over?.id) {
      moveFromFolder(active.id as string);
    }
    setActiveId(null);
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 8,
        },
      })
    );

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div key={id}>
        <button className="btn-primary btn my-2" onClick={closeFolder}>
          Back
        </button>
        <h2 className="card-title my-2 flex justify-between">
          <div className="flex items-center">
            <span className="mr-2 h-8 w-8">
              <FolderIcon />
            </span>
            {title}
          </div>
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          {quizes &&
            quizes.map((quiz) => (
              <PreviewCard
                key={quiz.id}
                {...quiz}
                onDelete={()=>deleteQuiz(quiz.id, quiz.title)}
                isDragging={activeId === quiz.id}
              />
            ))}
          <DragOverlay>
            {activeId && quizes && (
              <PreviewCard
                {...quizes.find((quiz) => quiz.id === activeId)}
                id={activeId}
                isOverlay
              />
            )}
          </DragOverlay>
        </div>
        <DropZone show={!!activeId} />
      </div>
    </DndContext>
  );
}
