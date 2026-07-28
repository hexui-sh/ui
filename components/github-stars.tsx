import { Button } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";

async function getGitHubStars(): Promise<number> {
  try {
    const res = await fetch("https://api.github.com/repos/hexui-sh/ui", {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.stargazers_count ?? 0;
  } catch {
    return 0;
  }
}

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

export async function GitHubStars() {
  const stars = await getGitHubStars();

  if (stars === 0) return null;

  return (
    <Button variant="ghost" className="border border-border">
      <a
        href="https://github.com/hexui-sh/ui"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${stars} stars on GitHub`}
        className="flex items-center gap-2 text-sm"
      >
        <SiGithub className="size-4" />
        <span>{formatStars(stars)}</span>
      </a>
    </Button>
  );
}
