import type { Question } from "@prisma/client";
import _ from "lodash";
import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { QuestionUpdateSchema } from "./question";

export const FolderCreateSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const FolderUpdateSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  studied: z.number().optional(),
  selectedQuestionId: z.string().optional(),
  questions: QuestionUpdateSchema.array().optional(),
});

export const folderRouter = router({
  create: publicProcedure
    .input(FolderCreateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.folder.create({
        data: {
          title: input.title,
        },
      });
    }),
  moveToFolder: publicProcedure
    .input(
      z.object({
        folderId: z.string(),
        quizId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const question = await ctx.prisma.quiz.update({
        where: {
          id: input.quizId,
        },
        data: {
          folderId: input.folderId,
        },
      });

      return question;
    }),
  moveFromFolder: publicProcedure
    .input(
      z.object({
        folderId: z.string(),
        quizId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const question = await ctx.prisma.quiz.update({
        where: {
          id: input.quizId,
        },
        data: {
          folderId: null,
        },
      });

      return question;
    }),

  update: publicProcedure
    .input(FolderUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const quiz = await ctx.prisma?.folder.update({
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
  deleteOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma?.folder.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.folder.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        quizes: {
          include: {
            questions: true,
          },
        },
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
