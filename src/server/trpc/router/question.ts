import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const QuestionCreateSchema = z.object({
  title: z.string(),
  order: z.number(),
  description: z.string().optional(),
  quizId: z.string(),
  answer: z.string(),
});

const QuestionUpdateSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  quizId: z.string(),
  answer: z.string(),
});

export const questionRouter = router({
  create: publicProcedure.input(QuestionCreateSchema).mutation(({ input }) => {
    return prisma?.question.create({
      data: {
        ...input,
      },
    });
  }),
  update: publicProcedure.input(QuestionUpdateSchema).mutation(({ input }) => {
    return prisma?.question.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
    });
  }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return prisma?.question.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
