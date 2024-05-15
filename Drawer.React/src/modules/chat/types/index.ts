import { z } from "zod";

export const submitMessageSchema = z.object({
  text: z.string().min(1).max(250),
});

export type SubmitMessageSchema = z.infer<typeof submitMessageSchema>;
