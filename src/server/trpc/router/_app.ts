import { router } from "../trpc";
import { authRouter } from "./auth";
import { questionRouter } from "./question";
import { quizRouter } from "./quiz";

export const appRouter = router({
  quiz: quizRouter,
  question: questionRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
