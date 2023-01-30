import type { Question } from "@prisma/client";
import _ from "lodash";
import { z } from "zod";

import { protectedProcedure, router } from "../trpc";
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
  create: protectedProcedure
    .input(QuizCreateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.quiz.create({
        data: {
          title: input.title,
          description: input.description ?? "",
          userId: ctx.session?.user?.id ?? "",
        },
      });
    }),
  update: protectedProcedure
    .input(QuizUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const quiz = await ctx.prisma?.quiz.update({
        where: {
          id: input.id,
        },
        data: {
          ..._.omit(input, "questions"),
          userId: ctx.session.user.id,
        },
      });
      let questions = [] as Question[];
      if (input.questions) {
        questions =
          (await ctx.prisma?.$transaction(
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
  restartProgress: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const questions = await ctx.prisma?.question.updateMany({
        where: {
          quizId: input.id,
        },
        data: {
          learned: false,
        },
      });

      return questions;
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma?.quiz.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        includeInFolder: z.boolean().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.quiz.findMany({
        include: {
          questions: {
            orderBy: {
              order: "asc",
            },
          },
        },
        where: input.includeInFolder
          ? { userId: ctx.session.user.id }
          : { folderId: null, userId: ctx.session.user.id },
        orderBy: {
          updatedAt: "desc",
        },
      });

      return data;
    }),
  findOne: protectedProcedure
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
          userId: ctx.session.user.id,
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
