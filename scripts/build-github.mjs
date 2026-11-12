// Snapshots public GitHub evidence for Sahkarmi into src/generated/github.json.
// Runs before every build. If the API is unreachable or rate-limited the committed
// snapshot is kept, so the site never shows invented or empty numbers.
import { readFile, writeFile } from "node:fs/promises";

const REPO = "ganguydhrubo/sahakarmi";
const OUT = new URL("../src/generated/github.json", import.meta.url);
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const headers = { Accept: "application/vnd.github+json", "User-Agent": "dhrubo.shop-build", ...(token ? { Authorization: `Bearer ${token}` } : {}) };

async function api(path) {
  const res = await fetch(`https://api.github.com/${path}`, { headers, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res;
}
const lastPage = (res) => Number(/[?&]page=(\d+)>; rel="last"/.exec(res.headers.get("link") ?? "")?.[1] ?? 1);

try {
  const repo = await (await api(`repos/${REPO}`)).json();
  const releases = [];
  for (let page = 1; page < 6; page++) {
    const batch = await (await api(`repos/${REPO}/releases?per_page=100&page=${page}`)).json();
    releases.push(...batch.filter((r) => !r.draft).map((r) => ({ tag: r.tag_name, date: r.published_at })));
    if (batch.length < 100) break;
  }
  const commits = lastPage(await api(`repos/${REPO}/commits?sha=${repo.default_branch}&per_page=1`));
  const mergedPrs = (await (await api(`search/issues?q=repo:${REPO}+is:pr+is:merged&per_page=1`)).json()).total_count;
  if (!releases.length || !commits) throw new Error("empty response");
  releases.sort((a, b) => a.date.localeCompare(b.date));
  const data = {
    repo: REPO,
    url: repo.html_url,
    license: repo.license?.spdx_id ?? null,
    checkedOn: new Date().toISOString().slice(0, 10),
    commits,
    mergedPrs,
    releaseCount: releases.length,
    first: releases[0],
    latest: releases[releases.length - 1],
    releases,
  };
  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`[github] ${data.releaseCount} releases, ${commits} commits, ${mergedPrs} merged PRs, latest ${data.latest.tag}`);
} catch (err) {
  try {
    const kept = JSON.parse(await readFile(OUT, "utf8"));
    console.warn(`[github] refresh failed (${err.message}); keeping snapshot from ${kept.checkedOn}`);
  } catch {
    console.error(`[github] refresh failed (${err.message}) and no snapshot exists`);
    process.exit(1);
  }
}
