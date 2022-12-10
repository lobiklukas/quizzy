import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { useModalStore } from "../store/modalStore";

export default function Modal() {
  // Create modal for creating new folder using headlessui
  const { isOpen, closeModal, onConfirm } = useModalStore((state) => ({
    isOpen: state.isOpen,
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
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-center text-lg font-medium leading-6 text-gray-900"
                >
                  Create New Folder
                </Dialog.Title>
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
                    Create
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
