import create from "zustand";
import { persist } from "zustand/middleware";

interface ILearningState {
  isShuffled: boolean;
  isFrontFirst: boolean;
  setIsShuffled: (isShuffled: boolean) => void;
  setIsFrontFirst: (isFrontFirst: boolean) => void;
}

export const useLearningStore = create<ILearningState>()(
  persist(
    (set) => ({
      isShuffled: false,
      isFrontFirst: true,
      setIsShuffled: (isShuffled) => set({ isShuffled }),
      setIsFrontFirst: (isFrontFirst) => set({ isFrontFirst }),
    }),
    {
      name: "learn-storage",
    }
  )
);
