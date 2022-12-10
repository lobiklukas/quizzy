import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import _ from "lodash";
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import { EditorWrapper } from "../../EditorWrapper";
import { useLocalStorage } from "../../hooks/useLocalStorage";
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

  const [storedValue, storeValue] = useLocalStorage("quiz", quiz);
  const [lastSubmit, setLastSubmit] = useState<{
    updated: Date;
    values: any;
  }>();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    mode: "onChange",
  });

  const { register } = methods;

  const updatedAt = methods.getValues("updatedAt");

  useEffect(() => {
    if (quiz !== undefined) {
      methods.reset(
        {
          ...quiz,
          questions: quiz?.questions ?? [],
        } ?? defaultQuiz
      );
    }
  }, [quiz, methods.reset, methods]);

  const { fields, append, remove, move } = useFieldArray({
    name: "questions",
    control: methods.control,
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

  const handleRemoveQuestion = async (id: string) => {
    const index = fields.findIndex((q) => q.id === id);
    const question = fields[index];

    // add window confirm with text "Are you sure you want to delete this question?"
    const result = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!result) return;

    if (question) {
      deleteOne({
        id: question.id,
      });
      remove(index);
    }
  };

  const handleSaveAll = useCallback(async () => {
    const values = methods.getValues();
    storeValue(values);

    const result = await updateQuiz({
      ...values,
      id: id,
      selectedQuestionId: values.selectedQuestionId ?? "",
      studied: values.studied ?? 0,
      questions: values.questions.map((q) => ({
        ...q,
        quizId: id,
      })),
    });
    if (result) {
      setLastSubmit({ updated: result.updatedAt, values: values });
      setToastMessage("Saved");
      setTimeout(() => {
        setToastMessage(null);
      }, 1000);
    }
  }, [id, methods, storeValue, updateQuiz]);

  const handleSaveQuestion = useCallback(
    async (questionId: string) => {
      const index = fields.findIndex((q) => q.id === questionId);
      const question = methods.getValues(`questions.${index}`);
      console.log("🚀 ~ file: [quizId].tsx:145 ~ question", question);

      if (question) {
        const result = await updateQuestion({
          ...question,
          id: question.id,
          quizId: id,
        });
        if (result) {
          setToastMessage("Saved");
          setTimeout(() => {
            setToastMessage(null);
          }, 1000);
        }
      }
    },
    [fields, id, methods, updateQuestion]
  );

  const handleSaveQuiz = useCallback(async () => {
    const values = methods.getValues();
    storeValue(values);

    const result = await updateQuiz({
      id: quiz?.id ?? "",
      selectedQuestionId: values.selectedQuestionId ?? "",
      studied: values.studied ?? 0,
      title: values.title,
      description: values.description,
    });
    if (result) {
      setLastSubmit({
        updated: result.updatedAt,
        values: {
          ...values,
          questions: lastSubmit?.values.questions ?? [],
        },
      });
      setToastMessage("Saved");
      setTimeout(() => {
        setToastMessage(null);
      }, 1000);
    }
  }, [lastSubmit?.values.questions, methods, storeValue, updateQuiz]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormProvider {...methods}>
      <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b-2 bg-white p-4 px-16">
        <Link href="/" className=" font-bold text-gray-800 hover:text-gray-700">
          Back
        </Link>
        <div className="flex items-center gap-2">
          {isCreateLoading ||
          isUpdateQuizLoading ||
          isUpdateQuestionLoading ||
          isDeleteLoading ? (
            <div className="text-gray-800">Saving...</div>
          ) : (
            <span>
              Naposledy uloženo:{" "}
              {(lastSubmit?.updated ?? updatedAt)?.toLocaleString("cs")}
            </span>
          )}
          <button
            className="btn-secondary btn"
            onClick={() => methods.reset(storedValue)}
          >
            Load
          </button>
          <button className="btn-primary btn" onClick={() => handleSaveAll()}>
            Save
          </button>
        </div>
      </nav>
      <main className="container mx-auto mt-12 flex flex-col items-center justify-center">
        <div className="overflow-x-auto"></div>
        <div className="flex min-h-screen flex-col items-center justify-center">
          {quiz && (
            <div
              key={quiz.id}
              className="flex flex-col items-center justify-center gap-2"
            >
              <input {...register("id")} type="hidden" />
              <input {...register("selectedQuestionId")} type="hidden" />
              <input
                {...register("studied", {
                  // return as number
                  valueAsNumber: true,
                })}
                type="hidden"
              />
              <div className="w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  {...register("title", {
                    onBlur: handleSaveQuiz,
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
                    onBlur: handleSaveQuiz,
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
                        className="card flex max-w-[800px] flex-col items-center justify-center gap-2 bg-base-100 p-8 shadow-xl"
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
                            {...register(`questions.${index}.quizId` as const)}
                            type="hidden"
                          />
                          <input
                            {...register(`questions.${index}.title` as const, {
                              onBlur: () => handleSaveQuestion(question.id),
                            })}
                            className="input-bordered input-ghost input w-full"
                          />
                          <button
                            onClick={() => handleRemoveQuestion(question.id)}
                            className="btn-secondary btn-square btn"
                          >
                            <TrashIcon className="h-6 w-6" />
                          </button>
                        </div>
                        <EditorWrapper
                          name={`questions.${index}.answer` as const}
                          onBlur={() => handleSaveQuestion(question.id)}
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
      {toastMessage && (
        <div className="toast-end toast toast-top">
          <div className="alert alert-success">
            <div>
              <span>{toastMessage}</span>
            </div>
          </div>
        </div>
      )}
    </FormProvider>
  );
};

export default Home;
