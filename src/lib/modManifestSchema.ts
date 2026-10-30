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

export const versionMetadataSchema = z
  .object({
    version: z.string().min(1).max(128),
    uploadedAt: z.iso.datetime().optional(),
    size: z.number().int().nonnegative().optional(),
  })
  .strict();

export const channelVersionSchema = versionMetadataSchema;

export const channelVersionsSchema = z
  .object({
    alphas: z.array(channelVersionSchema),
    betas: z.array(channelVersionSchema),
    releases: z.array(channelVersionSchema),
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
  })
  .strict();

export type ModManifest = z.infer<typeof modManifestSchema>;

export type ChannelKey = keyof z.infer<typeof channelVersionsSchema>;
export type ChannelVersions = z.infer<typeof channelVersionsSchema>;
export type ChannelVersion = z.infer<typeof channelVersionSchema>;
