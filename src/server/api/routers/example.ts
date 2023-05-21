import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ingredientRouter = createTRPCRouter({
  getAllIngredients: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.ingredient.findMany();
  }),
});
