import create from "zustand";

type Modal = {
  title?: string;
  content?: string | JSX.Element;
  confirmText?: string;
  showActions?: boolean;
};

interface ModalState {
  isOpen: boolean;
  onConfirm: (value?: string) => void;
  openModal: ({
    onConfirm,
    modal,
  }: {
    onConfirm?: (value?: string) => void;
    modal: Modal;
  }) => void;
  closeModal: () => void;
  modal: Modal;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onConfirm: () => {},
  openModal: ({ onConfirm, modal }) => set({ isOpen: true, onConfirm, modal }),
  closeModal: () => set({ isOpen: false }),
  modal: {
    title: "Modal Title",
    content: "",
    confirmText: "Okay",
  },
}));
