import { z } from "zod";

export type PrimaryHeaderRow = z.infer<typeof primaryHeaderRowSchema>;
export type SecondaryHeaderRow = z.infer<typeof secondaryHeaderRowSchema>;
export type SectionHeaderRow = z.infer<typeof sectionHeaderRowSchema>;
export type EstimatedRow = z.infer<typeof estimatedRowSchema>;
export type NotEstimatedRow = z.infer<typeof notEstimatedRowSchema>;

export const primaryHeaderRowSchema = z.tuple([
  z.string(),
  z.string(),
  z.unknown(),
  z.unknown(),
  z.unknown(),
  z.unknown(),
]);

export const secondaryHeaderRowSchema = z.tuple([
  z.string().nullish(),
  z.unknown(),
  z.unknown(),
  z.unknown(),
  z.unknown(),
  z.unknown(),
]);

export const sectionHeaderRowSchema = z.tuple([
  z.string().startsWith("#"),
  z.string().nullish(),
  z.unknown(),
  z.unknown(),
  z.unknown(),
  z.unknown(),
]);

export const estimatedRowSchema = z.tuple([
  z.string(),
  z.string().nullish(),
  z.string().nullish(),
  z.number(),
  z.number(),
  z.number(),
]);

export const notEstimatedRowSchema = z.tuple([
  z.string(),
  z.string().nullish(),
  z.string().nullish(),
  z.null(),
  z.null(),
  z.null(),
]);
