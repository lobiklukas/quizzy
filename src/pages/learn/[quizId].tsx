import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { LearningComplete } from "../../components/LearnComplete";
import { LearningEnd } from "../../components/LearnEnd";
import LearnSettingsModal from "../../components/LearnSettingsModal";
import { LearningCard } from "../../components/LearningCard";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import { requireAuth } from "../../middleware/requireAuth";
import { useLearningStore } from "../../store/learnStore";
import { useModalStore } from "../../store/modalStore";
import { trpc } from "../../utils/trpc";
import { AnimatePresence } from "framer-motion";

export default function Learn() {
  const router = useRouter();
  const id = (router.query?.quizId as string) || "";

  const { openModal } = useModalStore((store) => ({
    openModal: store.openModal,
  }));

  const { isShuffled } = useLearningStore((store) => ({
    isShuffled: store.isShuffled,
  }));

  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [isEnd, setIsEnd] = useState(false);

  const {
    data: quiz,
    isLoading,
    refetch,
  } = trpc.quiz.findOne.useQuery({ id: id });

  const { mutate: updateQuiz } = trpc.quiz.update.useMutation();
  const { mutateAsync: restartQuizProgress } =
    trpc.quiz.restartProgress.useMutation();
  const { mutate: updateQuestion } = trpc.question.update.useMutation();

  const filteredQuestions = useMemo(() => {
    let questions =
      quiz?.questions.filter((question) => !question.learned) ?? [];
    if (isShuffled) {
      questions = questions.sort(() => Math.random() - 0.5);
    }
    return questions;
  }, [isShuffled, quiz?.questions]);

  const selectedQuestion = useMemo(() => {
    if (filteredQuestions) {
      return filteredQuestions[selectedIndex ?? 0];
    }
  }, [filteredQuestions, selectedIndex]);

  const questions = useMemo(() => {
    if (filteredQuestions) {
      const index = selectedIndex ?? 0;
      return [filteredQuestions?.[index], filteredQuestions?.[index + 1]];
    }
  }, [filteredQuestions, selectedIndex]);

  useEffect(() => {
    if (quiz && selectedIndex === undefined) {
      const foundIndex = filteredQuestions?.findIndex(
        (question) => question.id === quiz.selectedQuestionId
      );
      setSelectedIndex(foundIndex !== -1 ? foundIndex : 0);
    }
  }, [filteredQuestions, quiz, selectedIndex]);

  useEffect(() => {
    if (selectedQuestion?.id && quiz?.id) {
      updateQuiz({
        id: quiz.id,
        studied: quiz.studied ?? 0,
        selectedQuestionId: selectedQuestion.id,
        title: quiz.title,
      });
    }
  }, [quiz, selectedQuestion?.id, updateQuiz]);

  if (isLoading || !quiz) {
    return <Loading />;
  }

  const handleNext = () => {
    if (
      selectedIndex !== undefined &&
      selectedIndex < filteredQuestions.length - 1
    ) {
      if (selectedQuestion?.id) {
        updateQuestion({
          id: selectedQuestion.id,
        });
      }
      setSelectedIndex(selectedIndex + 1);
    } else {
      setIsEnd(true);
    }
  };

  const handlePrevious = () => {
    if (selectedIndex !== undefined && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleLearned = () => {
    if (selectedQuestion?.id) {
      updateQuestion({
        id: selectedQuestion.id,
        learned: true,
      });
    }
    handleNext();
  };

  const openLearningSettings = () => {
    openModal({
      modal: {
        title: "Learning Settings",
        content: <LearnSettingsModal restartProgress={handleRestartProgress} />,
        showActions: false,
      },
    });
  };

  const handleStartOver = async () => {
    await refetch();
    setSelectedIndex(0);
    updateQuiz({
      studied: (quiz?.studied ?? 0) + 1,
      selectedQuestionId: filteredQuestions?.[0]?.id,
      title: quiz.title,
      id: quiz.id,
    });
    setIsEnd(false);
  };

  const handleRestartProgress = async () => {
    if (quiz?.id) {
      await restartQuizProgress({ id: quiz.id });
      await refetch();
      setSelectedIndex(0);
      setIsEnd(false);
    }
  };

  return (
    <main id="#learning-card" className="container mx-auto min-h-screen">
      <nav className="mb-auto flex w-full items-center justify-between p-4">
        <Link href="/" className="btn-secondary btn-circle btn font-bold">
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>

        <button
          className="btn-outline btn-circle btn"
          onClick={openLearningSettings}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </button>
      </nav>
      <div className="flex h-full w-full flex-col items-center justify-center px-4">
        {!!filteredQuestions.length && (
          <>
            <div
              key={quiz.id}
              className="flex flex-col items-center justify-center gap-2"
            >
              <h1 className="text-2xl font-bold">{quiz.title}</h1>
              <p className="text-lg">{quiz.description}</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              {(selectedIndex ?? 0) + 1} / {filteredQuestions?.length}
              <progress
                // eslint-disable-next-line tailwindcss/no-custom-classname
                className="flip progress my-4 w-full"
                value={(selectedIndex ?? 0) + 1}
                max={filteredQuestions?.length}
              />
            </div>
            <AnimatePresence initial={false} mode="wait">
              {isEnd ? (
                <LearningEnd handleStartOver={handleStartOver} />
              ) : (
                questions &&
                questions.map((item, i) => (
                  <div
                    key={item?.id}
                    className={clsx("mt-2 w-full", i === 1 && "hidden")}
                  >
                    {item && (
                      <LearningCard
                        handleLerning={handleNext}
                        handleLearned={handleLearned}
                        data={item}
                      />
                    )}
                  </div>
                ))
              )}
            </AnimatePresence>
          </>
        )}
      </div>
      {(!isEnd || filteredQuestions.length) && (
        <nav className="flex items-center justify-center gap-4 p-4 px-16">
          <button
            onClick={handlePrevious}
            disabled={selectedIndex === 0}
            className="btn-primary btn font-bold"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={
              selectedIndex === quiz?.questions?.length || !filteredQuestions
            }
            className="btn-primary btn font-bold"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        </nav>
      )}
      {!filteredQuestions.length && (
        <LearningComplete handleRestart={handleRestartProgress} />
      )}
      <Modal />
    </main>
  );
}

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
