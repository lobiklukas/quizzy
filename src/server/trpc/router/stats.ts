import { publicProcedure, router } from "../trpc";

export const statsRouter = router({
  getAllStats: publicProcedure
    .query(async ({ ctx }) => {
      const learnedCards = await ctx.prisma?.question.count();
      const registeredUsers = await ctx.prisma?.account.count();
      const numOfQuizes = await ctx.prisma?.quiz.count();
      return {
        registeredUsers,
        learnedCards,
        numOfQuizes
      }
    }),

});
