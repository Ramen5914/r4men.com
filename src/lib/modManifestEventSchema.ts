import { z } from "zod";

import { manifestKeySchema, modNameSchema } from "./modManifestSchema";

export const manifestBuildSchema = z
  .object({
    mod: modNameSchema,
    minecraftVersion: manifestKeySchema,
    loader: manifestKeySchema,
    channel: z.enum(["alpha", "beta", "release"]),
    version: z.string().min(1).max(128),
  })
  .strict();

export const manifestEventSchema = manifestBuildSchema.extend({
  operation: z.enum(["upsert", "remove"]),
});

export const reconcileEventSchema = z
  .object({
    operation: z.literal("reconcile"),
    builds: z.array(manifestBuildSchema).max(100_000),
  })
  .strict();

export const manifestRequestSchema = z.discriminatedUnion("operation", [
  manifestEventSchema,
  reconcileEventSchema,
]);

export type ManifestEvent = z.infer<typeof manifestEventSchema>;

export type ReconcileEvent = z.infer<typeof reconcileEventSchema>;
