import create from "zustand";
import { persist } from "zustand/middleware";

interface ILearningState {
  isShuffled: boolean;
  isFrontFirst: boolean;
  showStaredOnly: boolean;
  setIsShuffled: (isShuffled: boolean) => void;
  setIsFrontFirst: (isFrontFirst: boolean) => void;
  setShowStaredOnly: (showStaredOnly: boolean) => void;
}

export const useLearningStore = create<ILearningState>()(
  persist(
    (set) => ({
      isShuffled: false,
      isFrontFirst: true,
      showStaredOnly: false,
      setIsShuffled: (isShuffled) => set({ isShuffled }),
      setIsFrontFirst: (isFrontFirst) => set({ isFrontFirst }),
      setShowStaredOnly: (showStaredOnly) => set({ showStaredOnly }),
    }),
    {
      name: "learn-storage",
    }
  )
);
