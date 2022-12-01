import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const QuizCreateSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const QuizUpdateSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
});

export const quizRouter = router({
  create: publicProcedure.input(QuizCreateSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.quiz.create({
      data: {
        title: input.title,
        description: input.description ?? "",
      },
    });
  }),
  update: publicProcedure.input(QuizUpdateSchema).mutation(({ input }) => {
    return prisma?.quiz.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
    });
  }),
  deleteOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return prisma?.quiz.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.quiz.findMany({
      include: {
        questions: true,
      },
    });
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const hasQuestion = await ctx.prisma.question.findFirst({
        where: {
          quizId: input.id,
        },
        select: {
          // count
          id: true,
        },
      });
      console.log(
        "🚀 ~ file: quiz.ts ~ line 50 ~ .query ~ hasQuestion",
        hasQuestion
      );

      return ctx.prisma.quiz.findFirst({
        where: {
          id: input.id,
        },
        include: {
          questions: !!hasQuestion
            ? {
                orderBy: {
                  order: "asc",
                },
              }
            : false,
        },
        orderBy: {},
      });
    }),
});
