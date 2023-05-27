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
          const existingIngr = await ctx.prisma.ingredient.findUnique({
            where: { name: ingr.name },
          });
          console.log("ingr:", meal.type, ingr, existingIngr);
          if (existingIngr) {
            await ctx.prisma.ingredient.update({
              where: {
                name: existingIngr.name,
              },
              data: {
                meals: {
                  connect: {
                    id: meal.id,
                  },
                },
              },
            });
          } else {
            await ctx.prisma.ingredient.create({
              data: {
                name: ingr.name,
                protein: ingr.protein,
                fat: ingr.fat,
                carbohydrate: ingr.carbohydrate,
                calories: ingr.calories,
                meals: {
                  connect: {
                    id: meal.id,
                  },
                },
              },
            });
          }
          return ingr;
        })
      );

      return day;
    }),
});
