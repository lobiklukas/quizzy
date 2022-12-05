import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import { EditorWrapper } from "../../EditorWrapper";
import { trpc } from "../../utils/trpc";

type Question = {
  id: number;
  title: string;
  answer: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

const defaultQuiz = { title: "", description: "", questions: [] };

const Home: NextPage = () => {
  const router = useRouter();
  const id = (router.query?.quizId as string) || "";

  const [enableRefetch, setEnableRefetch] = useState(true);

  const {
    data: quiz,
    isSuccess,
    isLoading,
  } = trpc.quiz.findOne.useQuery(
    { id: id },
    {
      enabled: enableRefetch,
      refetchInterval: false,
    }
  );
  useEffect(() => {
    if (isSuccess && enableRefetch) {
      setEnableRefetch(false);
    }
  }, [enableRefetch, isSuccess]);

  const { mutateAsync: create, isLoading: isCreateLoading } =
    trpc.question.create.useMutation();
  const { mutateAsync: updateQuiz, isLoading: isUpdateQuizLoading } =
    trpc.quiz.update.useMutation();
  const { mutateAsync: updateQuestion, isLoading: isUpdateQuestionLoading } =
    trpc.question.update.useMutation();
  const { mutateAsync: deleteOne, isLoading: isDeleteLoading } =
    trpc.question.delete.useMutation();

  const methods = useForm({
    defaultValues: quiz ?? {},
    mode: "onBlur",
  });

  const { register, control, reset } = methods;

  useEffect(() => {
    if (quiz !== undefined) {
      reset(
        {
          ...quiz,
          questions: quiz?.questions ?? [],
        } ?? defaultQuiz
      );
    }
  }, [quiz, reset]);

  const { fields, append, remove, move } = useFieldArray({
    name: "questions",
    control,
    keyName: "cid",
  });

  const handleAddQuestion = async () => {
    const result = await create({
      quizId: id,
      title: "",
      answer: "",
      order: fields.length + 1,
    });
    if (result) {
      append({ ...result, id: result.id.toString() });
    }
  };

  const handleRemoveQuestion = async (index: number) => {
    const question = fields[index];
    if (question) {
      await deleteOne({
        id: question.id,
      });
      remove(index);
    }
  };

  const handleUpdateQuestion = async (index: number) => {
    const values = methods.getValues(`questions.${index}`);
    await updateQuestion({
      ...values,
      quizId: id,
    });
  };

  const handleUpdateQuiz = async () => {
    const values = methods.getValues();
    await updateQuiz({
      ...values,
      studied: quiz?.studied ?? 0,
      selectedQuestionId: quiz?.selectedQuestionId ?? "",
      id,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormProvider {...methods}>
      <main className="justify-cente container mx-auto flex flex-col items-center">
        <nav className="flex w-full items-center justify-between p-4 px-16">
          <Link
            href="/"
            className=" font-bold text-gray-800 hover:text-gray-700"
          >
            Back
          </Link>
          {(isCreateLoading ||
            isUpdateQuizLoading ||
            isUpdateQuestionLoading ||
            isDeleteLoading) && <div className="text-gray-800">Saving...</div>}
        </nav>

        <div className="flex min-h-screen flex-col items-center justify-center">
          {quiz && (
            <div
              key={quiz.id}
              className="flex flex-col items-center justify-center gap-2"
            >
              <input {...register("id")} type="hidden" />
              <div className="w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  {...register("title", {
                    onBlur: handleUpdateQuiz,
                  })}
                  className="input-bordered input w-full"
                />
              </div>
              <div className="w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  {...register("description", {
                    onBlur: handleUpdateQuiz,
                  })}
                  className="input-bordered input w-full"
                />
              </div>
              <div className="mt-8 text-center">
                <div>
                  <h2 className="text-3xl ">Questions</h2>
                  Number of questions:{fields.length}
                </div>
                <div className="mt-4 flex flex-col gap-8">
                  {fields.map((question, index) => {
                    return (
                      <div
                        key={question.id}
                        className="card flex flex-col items-center justify-center gap-2 bg-base-100 p-8 shadow-xl"
                      >
                        <div className="flex w-full items-center gap-x-2">
                          <input
                            minLength={1}
                            maxLength={fields.length}
                            key={question.id + index}
                            defaultValue={index + 1}
                            type="number"
                            onBlur={async (e) => {
                              const value = Number(e.target.value);
                              if (
                                value <= fields.length &&
                                value >= 1 &&
                                value !== index + 1
                              ) {
                                await updateQuestion({
                                  ...question,
                                  title: question.title ?? "",
                                  answer: question.answer ?? "",
                                  quizId: id,
                                  order: Number(value),
                                });
                                const secondQuestion = fields[value - 1];
                                await updateQuestion({
                                  id: secondQuestion?.id ?? "",
                                  title: secondQuestion?.title ?? "",
                                  answer: secondQuestion?.answer ?? "",
                                  quizId: id,
                                  order: index + 1,
                                });
                                move(index, Number(value) - 1);
                              }
                            }}
                            className="input-ghost input w-24"
                          />
                          .
                          <input
                            {...register(`questions.${index}.id` as const)}
                            type="hidden"
                          />
                          <input
                            {...register(`questions.${index}.title` as const, {
                              onBlur: async () => handleUpdateQuestion(index),
                            })}
                            className="input-bordered input-ghost input w-full"
                          />
                          <button
                            onClick={() => handleRemoveQuestion(index)}
                            className="btn-secondary btn-square btn"
                          >
                            <TrashIcon className="h-6 w-6" />
                          </button>
                        </div>
                        <EditorWrapper
                          name={`questions.${index}.answer` as const}
                          onBlur={() => handleUpdateQuestion(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <button
            className="btn-outline btn-primary btn-circle btn my-8"
            onClick={handleAddQuestion}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
      </main>
    </FormProvider>
  );
};

export default Home;
