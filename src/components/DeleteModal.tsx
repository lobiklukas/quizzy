import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { useModalStore } from "../store/modalStore";

export default function Modal() {
  // Create modal for creating new folder using headlessui
  const { isOpen, closeModal, onConfirm } = useModalStore((state) => ({
    isOpen: state.isOpen,
    onConfirm: state.onConfirm,
    closeModal: state.closeModal,
    modal: state.modal,
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
          <div className="bg-base fixed inset-0 bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-center text-lg font-medium leading-6"
                >
                  Are you sure?
                </Dialog.Title>
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
                    className="btn-error btn"
                    onClick={handleConfirm}
                  >
                    Delete
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
