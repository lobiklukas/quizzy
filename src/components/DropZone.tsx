import { useDroppable } from "@dnd-kit/core";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React from "react";

export interface IDropZoneViewProps {
  id?: string;
  show: boolean;
}

export default function DropZone({
  id = "dropzone",
  show,
}: IDropZoneViewProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div ref={setNodeRef}>
      <Transition
        appear
        show={show}
        as={React.Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={clsx(
            "card border-base-300 mt-8 border-2 transition-all duration-300 ease-in-out",
            isOver ? "bg-base-100" : "bg-base-200"
          )}
        >
          <div className="card-body flex h-32 items-center">
            <h2 className="card-title h-full text-center">
              Drop here to delete from folder
            </h2>
          </div>
        </div>
      </Transition>
    </div>
  );
}
