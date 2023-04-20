import {
  PencilIcon,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import type { Question } from "@prisma/client";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { FormProvider, useForm } from "react-hook-form";

import { StarIcon as StarIconOutlined } from "@heroicons/react/24/outline";
import clsx from "clsx";
import _ from "lodash";
import "react-quill/dist/quill.snow.css";
import { EditorWrapper } from "../EditorWrapper";
import { useLearningStore } from "../store/learnStore";
import { trpc } from "../utils/trpc";
import { SwipableCard } from "./SwipableCard";
import dynamic from "next/dynamic";

const QuilPreview = dynamic(() => import("./QuillPreview"), {
  ssr: false,
});

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
  const isFrontFirst = useLearningStore((state) => state.isFrontFirst);

  const [showAnswer, setShowAnswer] = useState(!isFrontFirst);
  const [editMode, setEditMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isStared, setIsStared] = useState(data.stared ?? false);
  const [isLearned, setIsLearned] = useState<boolean | null>(null);

  useEffect(() => {
    setShowAnswer(!isFrontFirst);
  }, [isFrontFirst]);

  useEffect(() => {
    methods.reset(data);
  }, [data, methods]);

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

  const handleUpdate = _.debounce(() => {
    const values = methods.getValues();
    updateQuestion({
      ...values,
      quizId: data.quizId as string,
    });
  }, 1000);

  const cardClass = clsx(
    "card relative min-h-[500px] bg-base-100 shadow-xl transition-all",
    isLearned == true && "border-4 border-success",
    isLearned == false && "border-4 border-warning",
    isLearned == null && " border border-slate-100"
  );

  const editButton = (
    <button
      onPointerDownCapture={(e) => e.stopPropagation()}
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
  );

  const starButton = (
    <button
      onPointerDownCapture={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        updateQuestion({
          ...data,
          stared: !isStared,
          quizId: data.quizId as string,
        });
        setIsStared(!isStared);
      }}
      className="btn-primary btn-ghost btn-circle btn"
    >
      {isStared ? (
        <StarIconSolid className="h-6 w-6" />
      ) : (
        <StarIconOutlined className="h-6 w-6" />
      )}
    </button>
  );

  return (
    <SwipableCard
      onDragStart={() => setIsDragging(true)}
      onDragChange={(res) => setIsLearned(res)}
      onDragEnd={() => setIsDragging(false)}
      onResult={(result) => (result ? handleLearned() : handleLerning())}
    >
      <div onClick={() => !isDragging && setShowAnswer(!showAnswer)}>
        <FormProvider {...methods}>
          <ReactCardFlip isFlipped={showAnswer}>
            <div className={cardClass}>
              <div className="absolute top-1.5 left-1.5">{starButton}</div>
              <div className="absolute top-1.5 right-1.5">{editButton}</div>
              <div className="card-body flex flex-col items-center justify-center gap-2 text-center">
                {editMode ? (
                  <input
                    {...methods.register("title", {
                      onBlur: handleUpdate,
                    })}
                    onPointerDownCapture={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    className="input-bordered input "
                  />
                ) : (
                  <h2 className="card-title">{data.title}</h2>
                )}
              </div>
            </div>
            <div className={cardClass}>
              <div className="absolute top-1.5 left-1.5">{starButton}</div>
              <div className="absolute top-1.5 right-1.5">{editButton}</div>
              <div className="card-body my-auto h-full items-center p-2 md:p-4">
                {editMode ? (
                  <div
                    className="my-auto h-full w-full"
                    onPointerDownCapture={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditorWrapper name="answer" onBlur={handleUpdate} />
                  </div>
                ) : (
                  <QuilPreview value={data.answer} />
                  // <div
                  //   className="ql-editor my-auto h-full animate-none text-lg transition-none"
                  //   dangerouslySetInnerHTML={{ __html: data.answer ?? "" }}
                  // />
                )}
                <div className="flex justify-center gap-2">
                  <button
                    onPointerDownCapture={(e) => e.stopPropagation()}
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
                    onPointerDownCapture={(e) => e.stopPropagation()}
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
    </SwipableCard>
  );
}
