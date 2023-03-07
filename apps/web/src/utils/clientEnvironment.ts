import { z } from "zod";

const validateEnvVars = z.object({
  EXAMPLE_ESTIMATION_SECRET: z.string().min(1),
  STORYBLOK_ACCESS_TOKEN: z.string().min(1),
});

export const clientEnvironment = validateEnvVars.parse(
  Object.freeze({
    EXAMPLE_ESTIMATION_SECRET:
      process.env.NEXT_PUBLIC_EXAMPLE_ESTIMATION_SECRET,
    STORYBLOK_ACCESS_TOKEN:
       process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  })
);
