import { useDroppable } from "@dnd-kit/core";
import { FolderIcon, TrashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export interface IFolderProps {
  id: string;
  title: string;
  numberOfQuizzes: number;
  onDelete: (id: string) => void;
  isDragging?: boolean;
  openFolder: () => void;
}

export default function Folder({
  id,
  title,
  onDelete,
  numberOfQuizzes,
  isDragging,
  openFolder,
}: IFolderProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      key={id}
      ref={setNodeRef}
      className={clsx(
        "indicator card bg-base-100 cursor-pointer shadow-xl",
        isOver && "bg-accent",
        isDragging && "border-accent border-2"
      )}
      onClick={openFolder}
    >
      <div className="card-body ">
        <span className="badge-accent badge indicator-item h-8 w-8 z-0">
          {numberOfQuizzes}
        </span>
        <h2 className="card-title flex justify-between">
          <div className="flex items-center">
            <FolderIcon className="text-info-content mr-2 h-8 w-8" />
            {title}
          </div>
          <button
            className="btn-secondary btn-circle btn ml-4"
            disabled={id === "customId"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(id);
            }}
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </h2>
      </div>
    </div>
  );
}
