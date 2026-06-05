/** GitHub Pages subpath when the repo is not a user/org pages site. */
export function getBasePath() {
  const full = process.env.GITHUB_REPOSITORY;
  if (!full?.includes("/")) return "";
  const [owner, name] = full.split("/");
  if (!owner || !name) return "";
  if (name.toLowerCase() === `${owner.toLowerCase()}.github.io`) return "";
  return `/${name}`;
}
