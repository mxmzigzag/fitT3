import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createDaySchema } from "~/types/day.types";

export const dayRouter = createTRPCRouter({
  getDaysOfUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.day.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        meals: true,
      },
    });
  }),
  create: protectedProcedure
    .input(createDaySchema)
    .mutation(async ({ input: { date, meals }, ctx }) => {
      const day = await ctx.prisma.day.create({
        data: {
          userId: ctx.session.user.id,
          date,
          meals: {
            createMany: {
              data: meals.map((meal) => ({ id: meal.id, type: meal.type })),
              skipDuplicates: true,
            },
          },
        },
      });

      console.log("DAY:", day, date, meals);
      meals.map((meal) =>
        meal.ingredients.map(async (ingr) => {
          const { ingredient, weight } = ingr;

          await ctx.prisma.ingredientWithWeight.create({
            data: {
              ingredient: {
                connectOrCreate: {
                  where: { id: ingredient.id },
                  create: { ...ingredient },
                },
              },
              weight,
              meal: {
                connect: {
                  id: meal.id,
                },
              },
            },
          });
          return ingr;
        })
      );

      return day;
    }),
});
