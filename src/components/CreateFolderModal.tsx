import * as React from "react";
import { useModalStore } from "../store/modalStore";

export default function CreateFolderModal() {
  // Create modal for creating new folder using headlessui
  const { closeModal, onConfirm } = useModalStore((state) => ({
    onConfirm: state.onConfirm,
    closeModal: state.closeModal,
  }));

  const [title, setTitle] = React.useState("");

  const handleConfirm = () => {
    closeModal();
    onConfirm(title);
    setTitle("");
  };

  const handleClose = () => {
    closeModal();
    setTitle("");
  };

  return (
    <>
      <div className="mt-2 flex justify-center">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Folder Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            maxLength={24}
            onChange={(e) => setTitle(e.target.value)}
            className="input-bordered input w-full max-w-xs"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button
          type="button"
          className="btn-secondary btn"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          type="button"
          className="btn-primary btn"
          onClick={handleConfirm}
        >
          Okay
        </button>
      </div>
    </>
  );
}
