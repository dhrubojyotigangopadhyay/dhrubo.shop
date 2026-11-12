import github from "@/generated/github.json";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/**
 * Every published Sahkarmi release, one square each, stacked by the UTC day
 * it shipped. Drawn on the server from the build-time GitHub snapshot.
 */
export function ReleaseChart() {
  const { releases, releaseCount, first, latest, url, checkedOn } = github;
  const day = (iso: string) => Math.floor(Date.parse(iso) / 86400000);
  const d0 = day(first.date);
  const span = Math.max(1, day(latest.date) - d0);
  const perDay = new Map<number, number>();
  const W = 1000;
  const cell = Math.min(26, Math.floor((W - 20) / (span + 1)) - 4);
  const step = (W - cell) / span;
  const squares = releases.map((r) => {
    const d = day(r.date) - d0;
    const n = perDay.get(d) ?? 0;
    perDay.set(d, n + 1);
    return { ...r, x: d * step, n };
  });
  const tallest = Math.max(...perDay.values());
  const H = tallest * (cell + 4) + 34;
  const busiest = [...perDay.entries()].sort((a, b) => b[1] - a[1])[0];

  return (
    <figure className="proof-chart" data-reveal>
      <figcaption>
        <span>Sahkarmi releases by day shipped</span>
        <span>
          {fmt(first.date)} to {fmt(latest.date)}
        </span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${releaseCount} Sahkarmi releases published between ${fmt(first.date)} and ${fmt(latest.date)}, shown as one square per release stacked by day. The busiest day had ${busiest[1]} releases.`}>
        <line x1="0" x2={W} y1={H - 24} y2={H - 24} />
        {squares.map((s) => (
          <rect key={s.tag} className={s.tag === latest.tag ? "latest" : undefined} x={s.x} y={H - 30 - (s.n + 1) * (cell + 4) + 4} width={cell} height={cell} rx="2">
            <title>{`${s.tag} · ${fmt(s.date)}`}</title>
          </rect>
        ))}
        <text x="0" y={H - 6}>
          {first.tag}
        </text>
        <text x={W} y={H - 6} textAnchor="end">
          {latest.tag}
        </text>
      </svg>
      <details>
        <summary>List all {releaseCount} release tags</summary>
        <ol>
          {releases.map((r) => (
            <li key={r.tag}>
              <a href={`${url}/releases/tag/${r.tag}`} target="_blank" rel="noopener noreferrer">
                {r.tag}
              </a>
            </li>
          ))}
        </ol>
      </details>
      <p className="proof-note" style={{ marginTop: "1rem" }}>
        Read from the public GitHub API on {fmt(checkedOn)}. The CV dated 2 Nov 2026 records 50 releases; the count has moved on since.
      </p>
    </figure>
  );
}
