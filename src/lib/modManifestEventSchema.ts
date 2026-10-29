import { z } from "zod";

import { manifestKeySchema, modNameSchema } from "./modManifestSchema";

export const manifestEventSchema = z
  .object({
    operation: z.enum(["upsert", "remove"]),
    mod: modNameSchema,
    minecraftVersion: manifestKeySchema,
    loader: manifestKeySchema,
    channel: z.enum(["alpha", "beta", "release"]),
    version: z.string().min(1).max(128),
  })
  .strict();

export type ManifestEvent = z.infer<typeof manifestEventSchema>;
