import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

export const configurationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string().trim(),
        parts: z.string().trim(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.configuration.create({
        data: {
          userId: input.userId,
          parts: input.parts,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        configurationId: z.string().trim(),
        parts: z.string().trim(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.configuration.update({
        where: {
          id: input.configurationId,
        },
        data: {
          parts: input.parts,
        },
      });
    }),
  getConfigurationsById: protectedProcedure
    .input(
      z.object({
        userId: z.string().trim(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.configuration.findMany({
        where: { userId: input.userId },
        orderBy: { createdAt: 'desc' },
      });
    }),
  getConfigurationById: protectedProcedure
    .input(
      z.object({
        id: z.string().trim(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.configuration.findUnique({ where: { id: input.id } });
    }),
});
