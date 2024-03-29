import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import autoAnimate from "@formkit/auto-animate";
import { PlusIcon } from "@heroicons/react/24/outline";
import { FolderPlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
// import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import CreateFolderModal from "../components/CreateFolderModal";
import Folder from "../components/Folder";
import FolderView from "../components/FolderView";
import PreviewCard from "../components/PreviewCard";
import { useModalStore } from "../store/modalStore";
import { useSearchStore } from "../store/searchStore";
import { trpc } from "../utils/trpc";
import Loading from "./Loading";
import { useUser } from "@clerk/nextjs";

const Dashboard: React.FC = () => {
  const openModal = useModalStore((state) => state.openModal);
  const filter = useSearchStore((state) => state.search);
  const [activeId, setActiveId] = useState<string | null>();
  const [folder, setFolder] = useState<string | null>();
  const animateFolderRef = useRef(null);
  const animateQuizRef = useRef(null);

  const utils = trpc.useContext();
  const session = useUser();
  console.log("🚀 ~ file: Dashboard.tsx:34 ~ session:", session)
  const { data, isLoading, refetch } = trpc.quiz.getAll.useQuery({
    includeInFolder: true,
  });

  const {
    data: folders,
    isLoading: isFoldersLoading,
    refetch: refetchFolders,
  } = trpc.folder.getAll.useQuery();

  useEffect(() => {
    animateFolderRef?.current &&
      autoAnimate(animateFolderRef.current, {
        duration: 300,
        easing: "ease-in-out",
      });
    animateQuizRef?.current &&
      autoAnimate(animateQuizRef.current, {
        duration: 300,
        easing: "ease-in-out",
      });
  }, [data, folders]);

  // Filter quizes and fodlers based on filter prop
  const filteredQuizes = useMemo(() => {
    if (!filter) return data ?? [];
    return (
      data?.filter((quiz) =>
        quiz.title.toLowerCase().includes(filter.toLowerCase())
      ) ?? []
    );
  }, [data, filter]);

  const filteredFolders = useMemo(() => {
    if (!filter) return folders ?? [];
    return (
      folders?.filter((folder) =>
        folder.title.toLowerCase().includes(filter.toLowerCase())
      ) ?? []
    );
  }, [filter, folders]);

  const { mutate: createFolder } = trpc.folder.create.useMutation({
    onMutate: async (folder) => {
      utils.folder.getAll.cancel();
      const previousFolders = utils.folder.getAll.getData();

      utils.folder.getAll.setData(undefined, (old) => {
        const newFolder = {
          ...folder,
          quizes: [],
          id: "customId",
          updatedAt: new Date(),
          createdAt: new Date(),
          userId: session?.user?.id ?? "",
        };
        if (!old?.length) return [newFolder];
        return [...old, newFolder];
      });

      return { previousFolders };
    },
    onError: (err, newTodo, context) => {
      utils.folder.getAll.setData(undefined, context?.previousFolders);
    },
    onSettled: async () => {
      await refetch();
      await refetchFolders();
    },
  });
  const { mutate: moveToFolder } = trpc.folder.moveToFolder.useMutation({
    onMutate: async (quiz) => {
      utils.folder.getAll.cancel();
      const previousFolders = utils.folder.getAll.getData();
      const previousQuizes = utils.quiz.getAll.getData({
        includeInFolder: false,
      });

      const updatedFolder = previousFolders?.find(
        (folder) => folder.id === quiz.folderId
      );

      const updatedQuiz = previousQuizes?.find((q) => q.id === quiz.quizId);

      if (!updatedFolder || !updatedQuiz) return;

      utils.folder.getAll.setData(undefined, (old) => {
        return old?.map((folder) => {
          if (folder.id === updatedFolder.id) {
            return {
              ...folder,
              quizes: [...folder.quizes, updatedQuiz],
            };
          }
          return folder;
        });
      });

      return { previousFolders };
    },
    onError: (err, newTodo, context) => {
      utils.folder.getAll.setData(undefined, context?.previousFolders);
    },
    onSettled: async () => {
      await refetch();
      await refetchFolders();
    },
  });
  const { mutate: moveFromFolder } = trpc.folder.moveFromFolder.useMutation({
    onMutate: async (quiz) => {
      utils.folder.getAll.cancel();
      const previousFolders = utils.folder.getAll.getData();

      const updatedFolder = previousFolders?.find(
        (folder) => folder.id === quiz.folderId
      );

      const updatedQuiz = updatedFolder?.quizes?.find(
        (q) => q.id === quiz.quizId
      );

      if (!updatedFolder || !updatedQuiz) return;

      utils.folder.getAll.setData(undefined, (old) => {
        return old?.map((folder) => {
          if (folder.id === updatedFolder.id) {
            return {
              ...folder,
              quizes: folder.quizes.filter((q) => q.id !== updatedQuiz.id),
            };
          }
          return folder;
        });
      });

      return { previousFolders };
    },
    onError: (err, newTodo, context) => {
      utils.folder.getAll.setData(undefined, context?.previousFolders);
    },
    onSettled: async () => {
      await refetch();
      await refetchFolders();
    },
  });
  const { mutate: createQuiz } = trpc.quiz.create.useMutation({
    onMutate: async (quiz) => {
      utils.quiz.getAll.cancel();
      const previousQuizes = utils.quiz.getAll.getData();

      utils.quiz.getAll.setData({ includeInFolder: false }, (old) => {
        const newQuiz = {
          ...quiz,
          id: "customId",
          description: quiz.description || "",
          updatedAt: new Date(),
          createdAt: new Date(),
          questions: [],
          selectedQuestionId: "",
          studied: 0,
          folderId: null,
          userId: session?.user?.id ?? "",
        };
        if (!old?.length) return [newQuiz];
        return [...old, newQuiz];
      });

      return { previousQuizes };
    },
    onError: (err, newTodo, context) => {
      utils.quiz.getAll.setData(
        { includeInFolder: false },
        context?.previousQuizes
      );
    },
    onSettled: async () => {
      await refetch();
    },
  });
  const { mutate: deleteQuiz, isLoading: isDeleting } =
    trpc.quiz.deleteOne.useMutation({
      onMutate: async (deletedQuiz) => {
        utils.quiz.getAll.cancel();
        utils.folder.getAll.cancel();
        const previousQuizes = utils.quiz.getAll.getData();
        const previousFolders = utils.folder.getAll.getData();

        utils.quiz.getAll.setData({ includeInFolder: false }, (old) => {
          return old?.filter((f) => f.id !== deletedQuiz.id);
        });

        utils.folder.getAll.setData(undefined, (old) => {
          return old?.map((folder) => {
            return {
              ...folder,
              quizes: folder.quizes.filter((q) => q.id !== deletedQuiz.id),
            };
          });
        });

        return { previousQuizes, previousFolders };
      },
      onError: (err, newTodo, context) => {
        utils.quiz.getAll.setData(
          { includeInFolder: false },
          context?.previousQuizes
        );
        utils.folder.getAll.setData(undefined, context?.previousFolders);
      },
      onSettled: async () => {
        await refetch();
      },
    });
  const { mutate: deleteFolder } = trpc.folder.deleteOne.useMutation({
    onMutate: async (folder) => {
      utils.folder.getAll.cancel();
      const previousFolders = utils.folder.getAll.getData();

      utils.folder.getAll.setData(undefined, (old) => {
        return old?.filter((f) => f.id !== folder.id);
      });

      return { previousFolders };
    },
    onError: (err, newTodo, context) => {
      utils.folder.getAll.setData(undefined, context?.previousFolders);
    },
    onSettled: async () => {
      await refetch();
    },
  });

  const createNewQuiz = async () => {
    createQuiz({
      title: "My new Quiz",
      description: "My new description",
    });
  };

  const handleDeleteQuiz = async (id: string) => {
    deleteQuiz({
      id,
    });
    setTimeout(() => setActiveId(null), 100);
  };

  const displayDeleteModal = (id: string, title: string) => {
    openModal({
      onConfirm: () => handleDeleteQuiz(id),
      modal: {
        title: `Delete quiz "${title}"?`,
      },
    });
  };

  const createNewFolder = async (title?: string) => {
    if (!title) return;

    createFolder({
      title,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active?.id && over?.id) {
      moveToFolder({
        quizId: active.id as string,
        folderId: over.id as string,
      });
    }
    setActiveId(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (event: any) => {
    if (isDeleting) return;
    setActiveId(event.active.id);
  };

  const selectedFolder = useMemo(
    () => folders?.find((f) => f.id === folder),
    [folders, folder]
  );

  const sensors = useSensors(useSensor(PointerSensor, {}));

  // IS folder or quiz loading

  if (isLoading || isFoldersLoading) {
    return <Loading />;
  }

  return (
    <div id="dashboard" className="px-2 md:px-4">
      {selectedFolder ? (
        <FolderView
          id={selectedFolder.id}
          title={selectedFolder.title}
          quizes={selectedFolder.quizes}
          deleteQuiz={(id, title) => displayDeleteModal(id, title)}
          closeFolder={() => setFolder(null)}
          moveFromFolder={(quizId: string) => {
            moveFromFolder({
              quizId,
              folderId: selectedFolder.id,
            });
          }}
        />
      ) : (
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          sensors={sensors}
        >
          <div>
            <div className="flex justify-between">
              <h1 className="text-4xl font-bold">Folders</h1>
              <button
                onClick={() =>
                  openModal({
                    onConfirm: createNewFolder,
                    modal: {
                      title: "Create new folder",
                      content: <CreateFolderModal />,
                      showActions: false,
                    },
                  })
                }
                className="btn-secondary btn-circle btn"
              >
                <FolderPlusIcon className="h-6 w-6" />
              </button>
            </div>
            <div
              ref={animateFolderRef}
              className={clsx(
                "flex flex-wrap items-center gap-4 p-4 transition-all duration-300 ease-in-out",
                activeId && "rounded-md bg-base-300"
              )}
            >
              {folders?.length ? (
                filteredFolders.map((folder) => (
                  <Folder
                    key={folder.id}
                    id={folder.id}
                    title={folder.title}
                    numberOfQuizzes={folder.quizes?.length ?? 0}
                    onDelete={(id) => deleteFolder({ id })}
                    isDragging={!!activeId}
                    openFolder={() => setFolder(folder.id)}
                  />
                ))
              ) : (
                <span className="w-full text-center">No Folders...</span>
              )}
            </div>
            <div className="flex justify-between">
              <h1 className="text-4xl font-bold">Quizzes</h1>
              <button
                className="btn-secondary btn-circle btn"
                onClick={createNewQuiz}
              >
                <PlusIcon className="h-6 w-6" />
              </button>
            </div>
            <div
              ref={animateQuizRef}
              className="flex flex-wrap items-center gap-4 p-4"
            >
              {data &&
                filteredQuizes.map((quiz) => (
                  <PreviewCard
                    key={quiz.id}
                    {...quiz}
                    onDelete={(id) => displayDeleteModal(id, quiz.title)}
                    isDragging={activeId === quiz.id}
                  />
                ))}
              <DragOverlay>
                {activeId && data && (
                  <PreviewCard
                    {...data.find((quiz) => quiz.id === activeId)}
                    id={activeId}
                    isOverlay
                  />
                )}
              </DragOverlay>
            </div>
          </div>
        </DndContext>
      )}
    </div>
  );
};

export default Dashboard;
