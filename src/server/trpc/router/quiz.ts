import type { Question } from "@prisma/client";
import _ from "lodash";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { QuestionUpdateSchema } from "./question";

export const QuizCreateSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const QuizUpdateSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  studied: z.number().optional(),
  selectedQuestionId: z.string().optional(),
  questions: QuestionUpdateSchema.array().optional(),
});

// Create type for QuizUpdateSchema
export type QuizUpdateSchemaType = z.infer<
  typeof QuizUpdateSchema & { questions: QuizUpdateSchemaType[] }
>;

export const quizRouter = router({
  create: publicProcedure.input(QuizCreateSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.quiz.create({
      data: {
        title: input.title,
        description: input.description ?? "",
      },
    });
  }),
  update: publicProcedure
    .input(QuizUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const quiz = await ctx.prisma?.quiz.update({
        where: {
          id: input.id,
        },
        data: {
          ..._.omit(input, "questions"),
        },
      });
      let questions = [] as Question[];
      if (input.questions) {
        questions =
          (await prisma?.$transaction(
            input.questions.map((question) => {
              return ctx.prisma?.question.update({
                where: {
                  id: question.id,
                },
                data: {
                  ...question,
                },
              });
            })
          )) ?? [];
      }

      return { ...quiz, questions };
    }),
  deleteOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma?.quiz.delete({
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
          id: true,
        },
      });

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
