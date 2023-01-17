import { PencilIcon } from "@heroicons/react/24/solid";
import type { Question } from "@prisma/client";
import * as React from "react";
import ReactCardFlip from "react-card-flip";
import { FormProvider, useForm } from "react-hook-form";

import "react-quill/dist/quill.snow.css";
import { EditorWrapper } from "../EditorWrapper";
import { trpc } from "../utils/trpc";

import _ from "lodash";
export interface ILergingCardProps {
  data: Question;
  handleLerning: () => void;
  handleLearned: () => void;
}

export function LearningCard({
  data,
  handleLerning,
  handleLearned,
}: ILergingCardProps) {
  const methods = useForm({ defaultValues: data });
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  const utils = trpc.useContext();
  const { mutate: updateQuestion } = trpc.question.update.useMutation({
    onMutate: async (updatedQuestion) => {
      utils.quiz.findOne.cancel();
      const prevQuiz = utils.quiz.findOne.getData({
        id: data.quizId as string,
      });

      utils.quiz.findOne.setData({ id: data.quizId as string }, (old) => {
        return {
          ...old,
          id: data.quizId as string,
          title: old?.title ?? "",
          description: old?.description ?? "",
          createdAt: old?.createdAt ?? new Date(),
          updatedAt: old?.updatedAt ?? new Date(),
          selectedQuestionId: old?.selectedQuestionId ?? "",
          studied: old?.studied ?? 0,
          folderId: old?.folderId ?? "",
          userId: old?.userId ?? "",
          questions:
            old?.questions.map((question) => {
              if (question.id === updatedQuestion.id) {
                return {
                  ...question,
                  ...updatedQuestion,
                };
              }
              return question;
            }) ?? [],
        };
      });

      return { prevQuiz };
    },
  });

  React.useEffect(() => {
    setShowAnswer(false);
  }, [data.id]);

  const handleUpdate = _.debounce(() => {
    const values = methods.getValues();
    updateQuestion({
      ...values,
      quizId: data.quizId as string,
    });
  }, 1000);

  return (
    <div onClick={() => setShowAnswer(!showAnswer)}>
      <FormProvider {...methods}>
        <ReactCardFlip isFlipped={showAnswer}>
          <div className="card relative min-h-[500px] border border-slate-100 bg-base-100 shadow-xl">
            <div className="absolute top-1.5 right-1.5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (editMode) {
                    const values = methods.getValues();
                    updateQuestion({
                      ...values,
                      quizId: data.quizId as string,
                    });
                  }
                  setEditMode(!editMode);
                }}
                className="btn-primary btn-ghost btn-circle btn"
              >
                <PencilIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="card-body flex flex-col items-center justify-center gap-2 text-center">
              {editMode ? (
                <input
                  {...methods.register("title", {
                    onBlur: handleUpdate,
                  })}
                  onClick={(e) => e.stopPropagation()}
                  className="input-bordered input "
                />
              ) : (
                <h2 className="card-title">{data.title}</h2>
              )}
            </div>
          </div>
          <div className="card min-h-[500px] border border-slate-100 bg-base-100 shadow-xl">
            <div className="absolute top-1.5 right-1.5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (editMode) {
                    const values = methods.getValues();
                    updateQuestion({
                      ...values,
                      quizId: data.quizId as string,
                    });
                  }
                  setEditMode(!editMode);
                }}
                className="btn-primary btn-ghost btn-circle btn"
              >
                <PencilIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="card-body my-auto h-full items-center p-2 md:p-4">
              {editMode ? (
                <div
                  className="my-auto h-full w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EditorWrapper name="answer" onBlur={handleUpdate} />
                </div>
              ) : (
                <div
                  className="ql-editor my-auto h-full animate-none text-lg transition-none"
                  dangerouslySetInnerHTML={{ __html: data.answer ?? "" }}
                />
              )}
              <div className="flex justify-center gap-2">
                <button
                  className="btn-secondary btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowAnswer(false);
                    setTimeout(() => handleLerning(), 500);
                  }}
                >
                  Still learning
                </button>
                <button
                  className="btn-primary btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowAnswer(false);
                    setTimeout(() => handleLearned(), 500);
                  }}
                >
                  Known
                </button>
              </div>
            </div>
          </div>
        </ReactCardFlip>
      </FormProvider>
    </div>
  );
}
