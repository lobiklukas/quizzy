import Image from "next/image";
import { useState, useEffect } from "react";

export interface ILearningCompleteProps {
  handleRestart: () => void;
}

export function LearningComplete({ handleRestart }: ILearningCompleteProps) {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  useEffect(() => {
    setAudio(new Audio("/epicsaxguy.mp3"));
  }, []);

  useEffect(() => {
    if (audio && audio.paused) {
      audio?.play();
      audio.loop = true;
    } else {
      audio?.pause();
    }
    return () => {
      audio?.pause();
    };
  }, [audio]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 px-16">
      <div className="rotate-12">
        <h1 className="rotate-45 animate-bounce text-3xl font-bold">
          Good job!
        </h1>
      </div>
      <div className="-rotate-6">
        <h1 className="rotate-45 animate-bounce text-4xl font-bold">
          You are amazing!
        </h1>
      </div>
      <Image
        src="/end.gif"
        width={200}
        height={300}
        alt="end"
        className="animate-pulse duration-75"
      />
      <button onClick={handleRestart} className="btn-primary btn animate-spin">
        Restart progress
      </button>
    </div>
  );
}
