import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import * as React from "react";
import { useLearningStore } from "../store/learnStore";

interface LearnSettingsModalProps {
  restartProgress: () => void;
}

export default function LearnSettingsModal({
  restartProgress,
}: LearnSettingsModalProps) {
  const { setIsFrontFirst, setIsShuffled, isShuffled, isFrontFirst } =
    useLearningStore((state) => ({
      setIsFrontFirst: state.setIsFrontFirst,
      setIsShuffled: state.setIsShuffled,
      isShuffled: state.isShuffled,
      isFrontFirst: state.isFrontFirst,
    }));

  const [isRestarted, setIsRestarted] = React.useState(false);

  return (
    <div className="mt-6 flex justify-between px-8">
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            !isRestarted && restartProgress();
            setIsRestarted(true);
          }}
          className={clsx(
            "btn-circle btn",
            isRestarted ? "btn-primary" : "btn-outline"
          )}
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
        <p className="mt-2 max-w-xs">Restart</p>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={() => setIsFrontFirst(!isFrontFirst)}
          className={clsx(
            "btn-circle btn",
            isFrontFirst ? "btn-primary" : "btn-outline"
          )}
        >
          <Square2StackIcon className="h-5 w-5" />
        </button>
        <p className="mt-2 max-w-xs">Show definition first</p>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={() => setIsShuffled(!isShuffled)}
          className={clsx(
            "btn-circle btn",
            isShuffled ? "btn-primary" : "btn-outline"
          )}
        >
          <ArrowsRightLeftIcon className="h-5 w-5" />
        </button>
        <p className="mt-2 max-w-xs">Shuffle</p>
      </div>
    </div>
  );
}
