import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { LearningCard } from "../../components/LearningCard";
import { trpc } from "../../utils/trpc";

const Learn: NextPage = () => {
  const router = useRouter();
  const id = (router.query?.quizId as string) || "";

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const { data: quiz, isLoading } = trpc.quiz.findOne.useQuery({ id: id });

  const filteredQuestions = useMemo(
    () => quiz?.questions.filter((question) => !question.learned),
    [quiz?.questions]
  );

  const selectedQuestion = useMemo(
    () => filteredQuestions?.[selectedIndex],
    [filteredQuestions, selectedIndex]
  );

  if (isLoading || !quiz) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container  mx-auto min-h-screen">
      <nav className="mb-auto flex w-full items-center justify-between p-4 px-16">
        <Link
          href="/"
          className="btn-primary btn font-bold text-gray-800 hover:text-gray-700"
        >
          Back
        </Link>
      </nav>

      <div className="flex h-full w-full flex-col items-center justify-center px-4">
        {quiz && (
          <>
            <div
              key={quiz.id}
              className="flex flex-col items-center justify-center gap-2"
            >
              <h1 className="text-2xl font-bold">{quiz.title}</h1>
              <p className="text-lg">{quiz.description}</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              {selectedIndex + 1} / {quiz.questions.length}
              <progress
                className="flip progress my-4 w-full"
                value={selectedIndex + 1}
                max={quiz.questions?.length}
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
                      src="/happy-end.gif"
                      width={200}
                      height={300}
                      alt="end"
                    />
                    <button
                      className="btn-primary btn"
                      onClick={() => {
                        setSelectedIndex(0);
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
                  <LearningCard data={selectedQuestion} />
                </div>
              )
            )}
          </>
        )}
      </div>

      {!isEnd && (
        <nav className="mt-auto flex items-center justify-center gap-4 p-4 px-16">
          <button
            onClick={() => {
              if (selectedIndex > 0) {
                setSelectedIndex(selectedIndex - 1);
              }
            }}
            disabled={selectedIndex === 0}
            className="btn-primary btn font-bold text-gray-800 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => {
              if (selectedIndex < quiz?.questions?.length - 1) {
                setSelectedIndex(selectedIndex + 1);
              } else {
                setIsEnd(true);
              }
            }}
            disabled={
              selectedIndex === quiz?.questions?.length || !quiz.questions
            }
            className="btn-primary btn font-bold text-gray-800 hover:text-gray-700"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        </nav>
      )}
    </main>
  );
};

export default Learn;
