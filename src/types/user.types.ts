import z from "zod";

export const userSettingsSchema = z.object({
  caloriesLimit: z.string(),
});

export type UserSettings = z.infer<typeof userSettingsSchema>;
