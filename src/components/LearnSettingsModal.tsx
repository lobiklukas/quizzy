import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  Square2StackIcon,
  StarIcon as StarIconOutlined,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import clsx from "clsx";
import * as React from "react";
import { useLearningStore } from "../store/learnStore";
interface LearnSettingsModalProps {
  restartProgress: () => void;
}

export default function LearnSettingsModal({
  restartProgress,
}: LearnSettingsModalProps) {
  const {
    setIsFrontFirst,
    setIsShuffled,
    isShuffled,
    isFrontFirst,
    setShowStaredOnly,
    showStaredOnly,
  } = useLearningStore((state) => ({
    setIsFrontFirst: state.setIsFrontFirst,
    setIsShuffled: state.setIsShuffled,
    setShowStaredOnly: state.setShowStaredOnly,
    isShuffled: state.isShuffled,
    isFrontFirst: state.isFrontFirst,
    showStaredOnly: state.showStaredOnly,
  }));

  const [isRestarted, setIsRestarted] = React.useState(false);

  return (
    <div className="mt-6 grid grid-cols-2 gap-y-4 px-2 md:px-8">
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
        <p className="mt-2 max-w-xs">Definition first</p>
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
      <div className="flex flex-col items-center">
        <button
          onClick={() => setShowStaredOnly(!showStaredOnly)}
          className={clsx(
            "btn-circle btn",
            showStaredOnly ? "btn-primary" : "btn-outline"
          )}
        >
          {showStaredOnly ? (
            <StarIconSolid className="h-6 w-6" />
          ) : (
            <StarIconOutlined className="h-6 w-6" />
          )}
        </button>
        <p className="mt-2 max-w-xs">Stared only</p>
      </div>
    </div>
  );
}
