import { useDraggable } from "@dnd-kit/core";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
export interface IFolderProps {
  id: string;
  title?: string;
  description?: string;
  isDragging?: boolean;
  isOverlay?: boolean;
  onDelete?: (id: string) => void;
}

export default function PreviewCard({
  id,
  title,
  description,
  onDelete,
  isDragging,
  isOverlay,
}: IFolderProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      key={id}
      className={clsx(
        "card min-h-[200px] w-80 bg-base-100 shadow-xl lg:w-96",
        isDragging && "opacity-50",
        isOverlay && "border-2 border-accent"
      )}
    >
      <div className="card-body">
        <h2 className="card-title flex justify-between">
          <div className="flex items-center gap-1">
            <div {...listeners} {...attributes} className="touch-none">
              <ArrowsPointingOutIcon className="h-4 w-4 rotate-45" />
            </div>
            {title}
          </div>
          <button
            className="btn-secondary btn-circle btn"
            disabled={id === "customId"}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete?.(id);
            }}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </h2>
        <p>{description}</p>
        <div className="card-actions mt-2 justify-center gap-2 lg:gap-4">
          <Link
            slot="./app/learn/[quizId]"
            href={`./app/learn/${id}`}
            className="btn-primary btn"
          >
            Learn
          </Link>
          <Link
            slot="./app/quiz/[quizId]"
            href={`./app/quiz/${id}`}
            className="btn-primary btn"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
