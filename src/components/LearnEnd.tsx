import Image from "next/image";
import * as React from "react";

export interface ILearningEndProps {
  handleStartOver: () => void;
}

export function LearningEnd({ handleStartOver }: ILearningEndProps) {
  return (
    <div className="h-full">
      <div className="card min-h-[500px] w-full border border-slate-100 bg-base-100 shadow-xl">
        <div className="card-body flex flex-col items-center justify-center gap-y-12 text-center">
          <div className="card-title animate-bounce gap-8 text-5xl">
            <span className="scale-x-[-1] ">
              <Image
                src="/confetti.svg"
                width={48}
                height={48}
                alt="confetti"
                className="animate-bounce"
              />
            </span>
            <span>Good job! You&apos;re done!</span>
            <Image
              src="/confetti.svg"
              width={48}
              height={48}
              alt="confetti"
              className="animate-bounce"
            />
          </div>
          <Image src="/happy.gif" width={200} height={300} alt="end" />
          <button className="btn-primary btn" onClick={handleStartOver}>
            Start over
          </button>
        </div>
      </div>
    </div>
  );
}
