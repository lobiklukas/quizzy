import { publicProcedure, router } from "../trpc";

export const statsRouter = router({
  getAllStats: publicProcedure
    .query(async ({ ctx }) => {
      const learnedCards = await ctx.prisma?.question.count();
      console.log("🚀 ~ file: stats.ts:11 ~ .query ~ learnedCards:", learnedCards)
      const registeredUsers = await ctx.prisma?.account.count();
      console.log("🚀 ~ file: stats.ts:16 ~ .query ~ registeredUsers:", registeredUsers)
      const numOfQuizes = await ctx.prisma?.quiz.count();
      return {
        registeredUsers,
        learnedCards,
        numOfQuizes
      }
    }),

});
