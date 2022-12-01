import type { Question } from "@prisma/client";
import * as React from "react";
import ReactCardFlip from "react-card-flip";

import "react-quill/dist/quill.snow.css";
export interface ILergingCardProps {
  data: Question;
}

export function LearningCard({ data }: ILergingCardProps) {
  const [showAnswer, setShowAnswer] = React.useState(false);

  React.useEffect(() => {
    setShowAnswer(false);
  }, [data.id]);

  return (
    <div onClick={() => setShowAnswer(!showAnswer)}>
      <ReactCardFlip isFlipped={showAnswer}>
        <div className="card min-h-[500px] border border-slate-100 bg-base-100 shadow-xl">
          <div className="card-body flex flex-col items-center justify-center gap-2 text-center">
            <h2 className="card-title">{data.title}</h2>
          </div>
        </div>
        <div className="card min-h-[500px] border border-slate-100 bg-base-100 shadow-xl">
          <div className="card-body my-auto h-full items-center">
            <div
              className="ql-editor my-auto h-full animate-none text-lg transition-none"
              dangerouslySetInnerHTML={{ __html: data.answer ?? "" }}
            />
            <div className="flex justify-center gap-2">
              <button
                className="btn-secondary btn"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                Still learning
              </button>
              <button
                className="btn-primary btn"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                Known
              </button>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}
