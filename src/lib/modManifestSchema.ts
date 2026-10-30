import { z } from "zod";

export const modNameSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[a-zA-Z0-9_-]+$/)
  .refine(
    (value) => !["__proto__", "constructor", "prototype"].includes(value),
    "Reserved identifier",
  );

export const manifestKeySchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[a-zA-Z0-9._+-]+$/)
  .refine(
    (value) => !["__proto__", "constructor", "prototype"].includes(value),
    "Reserved identifier",
  );

export const channelVersionsSchema = z
  .object({
    alphas: z.array(z.string().min(1).max(128)),
    betas: z.array(z.string().min(1).max(128)),
    releases: z.array(z.string().min(1).max(128)),
  })
  .strict();

export const artifactMetadataSchema = z
  .object({
    uploadedAt: z.iso.datetime().optional(),
    sizeBytes: z.number().int().nonnegative().optional(),
  })
  .strict();

export const modManifestSchema = z
  .object({
    schemaVersion: z.literal(1),
    lastUpdated: z.iso.datetime(),
    versions: z.record(
      manifestKeySchema,
      z.record(manifestKeySchema, channelVersionsSchema),
    ),
    artifacts: z.record(z.string().min(1), artifactMetadataSchema).default({}),
  })
  .strict();

export type ModManifest = z.infer<typeof modManifestSchema>;

export type ChannelKey = keyof z.infer<typeof channelVersionsSchema>;
