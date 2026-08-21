import Image from "next/image";
import Link from "next/link";
import { Octokit } from "octokit";

export default async function ModCard({
  name,
  location,
  gitRepo,
}: {
  name: string;
  location: string;
  gitRepo: string;
}) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const repository: string[] = gitRepo.split("/");
  if (repository.length !== 2) {
    throw new Error("Repo string is incorrect");
  }

  const owner = repository[0];
  const repoName = repository[1];

  const { data: repo } = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: owner,
    repo: repoName,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return (
    <Link href={`/mods/${location}`}>
      <div
        className={
          "flex flex-row space-x-4 rounded-4xl border-2 p-4 lg:min-h-32"
        }
      >
        <Image
          src={`/mods/${location}/mod-icon.png`}
          alt={"Mod icon"}
          width={256}
          height={256}
          className="size-16 rounded-2xl md:size-24"
          loading="eager"
        />
        <div className="min-w-0.5 max-w-0.5 shrink bg-fd-border" />
        <div className="flex flex-col">
          <span className={"text-fd-primary text-sm md:text-2xl"}>{name}</span>
          <span className={"text-left text-[10px]/3.5 md:text-base"}>
            {repo.description}
          </span>
        </div>
      </div>
    </Link>
  );
}
