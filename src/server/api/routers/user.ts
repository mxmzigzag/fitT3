import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { userSettingsSchema } from "~/types/user.types";

export const userRouter = createTRPCRouter({
  getUserSettings: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: { caloriesLimit: true },
    });
  }),
  saveUserSettings: protectedProcedure
    .input(userSettingsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          ...input,
          caloriesLimit: Number(input.caloriesLimit),
        },
      });
    }),
});
