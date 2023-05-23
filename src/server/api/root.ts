import { createTRPCRouter } from "~/server/api/trpc";
import { ingredientRouter } from "~/server/api/routers/ingredient";
import { dayRouter } from "./routers/day";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ingredient: ingredientRouter,
  day: dayRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
