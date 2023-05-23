import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createDaySchema } from "~/types/day.types";

export const dayRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createDaySchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.day.create({
        // @ts-ignore
        data: input,
      });
    }),
});
