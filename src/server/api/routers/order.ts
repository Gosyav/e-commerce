import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

export const orderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string().trim(),
        products: z.string().trim(),
        adress: z.string().trim(),
        city: z.string().trim(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.order.create({
        data: {
          userId: input.userId,
          products: input.products,
          adress: input.adress,
          city: input.city,
          status: 'Очікування'
        },
      });
    }),
  getOrdersById: protectedProcedure
    .input(
      z.object({
        userId: z.string().trim(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.order.findMany({
        where: { userId: input.userId },
        orderBy: { createdAt: 'desc' },
      });
    }),
  getOrderById: protectedProcedure
    .input(
      z.object({
        id: z.string().trim(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.order.findUnique({ where: { id: input.id } });
    }),
});
