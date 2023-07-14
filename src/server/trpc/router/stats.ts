import { publicProcedure, router } from "../trpc";

export const statsRouter = router({
  getAllStats: publicProcedure
    .query(async ({ ctx }) => {
      const [learnedCards, registeredUsers, numOfQuizes] = await ctx.prisma.$transaction([
        ctx.prisma?.question.count(),
        ctx.prisma?.account.count(),
        ctx.prisma?.quiz.count()
      ])
      return {
        registeredUsers,
        learnedCards,
        numOfQuizes
      }
    }),

});
