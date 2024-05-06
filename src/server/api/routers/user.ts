import bcrypt from 'bcrypt';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string().trim(),
        lastName: z.string().trim(),
        email: z.string().trim(),
        password: z.string().trim(),
        phone: z.string().trim(),
        city: z.string().trim(),
        adress: z.string().trim(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      return await ctx.db.user.create({
        data: {
          name: `${input.firstName} ${input.lastName}`,
          email: input.email,
          password: hashedPassword,
          phone: input.phone,
          city: input.city,
          adress: input.adress,
        },
      });
    }),
});
