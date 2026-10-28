import {
  browseRepositorySchema,
  type LatestVerionResponse,
  latestVersionSchema,
} from "./schema/mavenApi";

const BASE_URL: string = "https://maven.ramen.games";

export async function getLatestVersion(
  path: string,
  repository: string = "releases",
): Promise<LatestVerionResponse> {
  const res = await fetch(
    `${BASE_URL}/api/maven/latest/version/${repository}/${path}`,
  );

  if (res.ok) {
    const data = latestVersionSchema.parse(await res.json());
    return data;
  } else {
    throw Error("");
  }
}

export async function getContents(
  path: string,
  repository: string = "releases",
) {
  const res = await fetch(
    `${BASE_URL}/api/maven/details/${repository}/${path}`,
  );

  if (res.ok) {
    const data = browseRepositorySchema.parse(await res.json());
    return data;
  } else {
    throw Error("");
  }
}
