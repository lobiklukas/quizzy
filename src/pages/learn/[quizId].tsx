import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { LearningCard } from "../../components/LearningCard";
import Loading from "../../components/Loading";
import { trpc } from "../../utils/trpc";
import { ThemeSwitch } from "../../components/ThemeSwitch";

const Learn: NextPage = () => {
  const router = useRouter();
  const id = (router.query?.quizId as string) || "";

  const [audio, setAudio] = useState<HTMLAudioElement>();
  useEffect(() => {
    setAudio(new Audio("/epicsaxguy.mp3"));
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [isEnd, setIsEnd] = useState(false);

  const {
    data: quiz,
    isLoading,
    refetch,
  } = trpc.quiz.findOne.useQuery({ id: id });

  const { mutate: updateQuiz } = trpc.quiz.update.useMutation();
  const { mutate: updateQuestion } = trpc.question.update.useMutation();
  const { mutateAsync: unLearn } = trpc.question.unLearn.useMutation();

  const filteredQuestions = useMemo(
    () => quiz?.questions.filter((question) => !question.learned) ?? [],
    [quiz?.questions]
  );

  useEffect(() => {
    console.log(
      "🚀 ~ file: [quizId].tsx:40 ~ useEffect ~ filteredQuestions",
      filteredQuestions
    );
    if (!isLoading && filteredQuestions.length === 0 && audio && audio.paused) {
      audio?.play();
      audio.loop = true;
    } else {
      audio?.pause();
    }
    return () => {
      audio?.pause();
    };
  }, [audio, filteredQuestions.length]);

  const selectedQuestion = useMemo(() => {
    if (filteredQuestions) {
      return filteredQuestions[selectedIndex ?? 0];
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

  console.log(
    "🚀 ~ file: [quizId].tsx:264 ~ filteredQuestions.length",
    !isEnd || filteredQuestions.length
  );
  return (
    <main className="container mx-auto min-h-screen">
      <nav className="mb-auto flex w-full items-center justify-between p-4 px-16">
        <Link href="/" className="btn-primary btn font-bold">
          Back
        </Link>
        <ThemeSwitch />
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
                className="flip progress my-4 w-full"
                value={(selectedIndex ?? 0) + 1}
                max={filteredQuestions?.length}
              />
            </div>
            {isEnd ? (
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
                    <Image
                      src="/happy.gif"
                      width={200}
                      height={300}
                      alt="end"
                    />
                    <button
                      className="btn-primary btn"
                      onClick={async () => {
                        await refetch();
                        setSelectedIndex(0);
                        updateQuiz({
                          studied: (quiz?.studied ?? 0) + 1,
                          selectedQuestionId: filteredQuestions?.[0]?.id,
                          title: quiz.title,
                          id: quiz.id,
                        });
                        setIsEnd(false);
                      }}
                    >
                      Start over
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              selectedQuestion && (
                <div className="mt-2 w-full">
                  <LearningCard
                    handleLerning={handleNext}
                    handleLearned={handleLearned}
                    data={selectedQuestion}
                  />
                </div>
              )
            )}
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
            className="duration-70 animate-pulse"
          />
          <button
            onClick={async () => {
              await unLearn({ quizId: quiz.id });
              await refetch();
              setSelectedIndex(0);
              setIsEnd(false);
            }}
            className="btn-primary btn animate-spin"
          >
            Restart progress
          </button>
        </div>
      )}
    </main>
  );
};

export default Learn;
