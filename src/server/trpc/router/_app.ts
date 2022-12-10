import { router } from "../trpc";
import { authRouter } from "./auth";
import { folderRouter } from "./folder";
import { questionRouter } from "./question";
import { quizRouter } from "./quiz";

export const appRouter = router({
  quiz: quizRouter,
  folder: folderRouter,
  question: questionRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
