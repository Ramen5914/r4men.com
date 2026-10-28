import { z } from "zod";

const versionsSuccessSchema = z.object({
  isSnapshot: z.boolean(),
  versions: z.array(z.string()),
});

const versionsNotFoundSchema = z.object({
  status: z.literal(404),
  message: z.string(),
});

export const versionsResponseSchema = z.union([
  versionsSuccessSchema,
  versionsNotFoundSchema,
]);

export type VersionsResponse = z.infer<typeof versionsResponseSchema>;

export const latestVersionSchema = z.object({
  isSnapshot: z.boolean(),
  version: z.string(),
});

export type LatestVerionResponse = z.infer<typeof latestVersionSchema>;

const fileSchema = z.object({
  name: z.string(),
  contentType: z.string(),
  contentLength: z.int(),
  lastModifiedTime: z.number().transform((seconds) => new Date(seconds * 1000)),
  type: z.literal("FILE"),
});

const directorySchema = z.object({
  name: z.string(),
  files: z.array(
    z.union([
      fileSchema,
      z.object({
        name: z.string(),
        type: z.literal("DIRECTORY"),
      }),
    ]),
  ),
  type: z.literal("DIRECTORY"),
});

export const browseRepositorySchema = z.union([fileSchema, directorySchema]);

export type BrowseRepositoryResponse = z.infer<typeof browseRepositorySchema>;
