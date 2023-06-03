import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createDaySchema } from "~/types/day.types";

export const dayRouter = createTRPCRouter({
  getDaysOfUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.day.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: [{ date: "asc" }],
      include: {
        meals: {
          include: {
            ingredients: {
              include: { ingredient: true },
            },
          },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(createDaySchema)
    .mutation(async ({ input: { date, meals }, ctx }) => {
      const dayWithThisDate = await ctx.prisma.day.findFirst({
        where: {
          date,
        },
      });
      if (Boolean(dayWithThisDate)) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "This Date is already taken!",
        });
      }

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
  getUsedDates: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.day.findMany({
      select: {
        date: true,
      },
    });
  }),
});
