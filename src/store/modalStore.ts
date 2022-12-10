import create from "zustand";

interface ModalState {
  isOpen: boolean;
  onConfirm: (value: string) => void;
  openModal: ({ onConfirm }: { onConfirm: (value: string) => void }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onConfirm: () => {},
  openModal: ({ onConfirm }) => set({ isOpen: true, onConfirm }),
  closeModal: () => set({ isOpen: false }),
}));
