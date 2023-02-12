import { z } from "zod";

import { publicProcedure, router } from "../trpc";

const QuestionCreateSchema = z.object({
  title: z.string(),
  order: z.number(),
  description: z.string().optional(),
  quizId: z.string(),
  answer: z.string(),
});

export const QuestionUpdateSchema = z.object({
  id: z.string(),
  order: z.number().optional(),
  title: z.string().optional(),
  quizId: z.string().optional(),
  answer: z.string().optional(),
  learned: z.boolean().optional(),
});

export type QuizUpdateSchemaType = z.infer<typeof QuestionUpdateSchema>;

export const questionRouter = router({
  create: publicProcedure
    .input(QuestionCreateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma?.question.create({
        data: {
          ...input,
        },
      });
    }),
  update: publicProcedure
    .input(QuestionUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma?.question.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });

      return result;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma?.question.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
