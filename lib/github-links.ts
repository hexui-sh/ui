export const GITHUB_REPO_OWNER = "hexui-sh"
export const GITHUB_REPO_NAME = "ui"
export const GITHUB_REPO_BRANCH = "main"

const REPO_BASE_URL = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`

type BuildGitHubIssueUrlOptions = {
  title: string
  body?: string
  labels?: string[]
}

export function buildGitHubIssueUrl(options: BuildGitHubIssueUrlOptions) {
  const params = new URLSearchParams()
  params.set("title", options.title)
  if (options.body) {
    params.set("body", options.body)
  }
  if (options.labels && options.labels.length > 0) {
    params.set("labels", options.labels.join(","))
  }
  return `${REPO_BASE_URL}/issues/new?${params.toString()}`
}

export function buildGitHubEditUrl(repoRelativePath: string) {
  const normalized = repoRelativePath.replace(/\\/g, "/").replace(/^\/+/, "")
  return `${REPO_BASE_URL}/edit/${GITHUB_REPO_BRANCH}/${normalized}`
}
