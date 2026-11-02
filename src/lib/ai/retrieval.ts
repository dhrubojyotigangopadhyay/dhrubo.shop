/**
 * Dependency-free BM25 retrieval over the build-time knowledge base.
 * Deterministic, synchronous and small enough to run on every request
 * without a vector database. Chunks carry a URL so answers can cite pages.
 */
export interface Chunk {
  id: string;
  title: string;
  url: string;
  section: string;
  text: string;
}

export interface ScoredChunk extends Chunk {
  score: number;
}

const STOP = new Set(
  "a an and are as at be but by for from has have he his how i if in is it its of on or that the this to was what when where which who why will with you your does do did can about into than then there these those also not".split(" "),
);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#./-]+/g, " ")
    .split(" ")
    .map((t) => t.replace(/^[./-]+|[./-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);
}

/** Minimal suffix stemmer: enough to match "approvals"/"approval", "gated"/"gate". */
export function stem(t: string): string {
  if (t.length <= 3 || /[.0-9+#]/.test(t)) return t;
  for (const [suffix, repl] of [
    ["ations", "ate"],
    ["ation", "ate"],
    ["ings", ""],
    ["ing", ""],
    ["ies", "y"],
    ["ers", "er"],
    ["ed", ""],
    ["es", ""],
    ["s", ""],
  ] as const) {
    if (t.endsWith(suffix) && t.length - suffix.length >= 3) {
      t = t.slice(0, -suffix.length) + repl;
      break;
    }
  }
  // Drop a trailing "e" so "gate"/"gated"/"gating" and "release"/"releases" collapse together.
  return t.length > 3 && t.endsWith("e") ? t.slice(0, -1) : t;
}

export class BM25Index {
  private readonly docs: Chunk[];
  private readonly tf: Map<string, number>[] = [];
  private readonly df = new Map<string, number>();
  private readonly len: number[] = [];
  private readonly avgLen: number;
  private readonly k1 = 1.4;
  private readonly b = 0.75;

  constructor(docs: Chunk[]) {
    this.docs = docs;
    let total = 0;
    for (const d of docs) {
      const tokens = tokenize(`${d.title} ${d.section} ${d.text}`);
      const tf = new Map<string, number>();
      for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
      for (const t of tf.keys()) this.df.set(t, (this.df.get(t) ?? 0) + 1);
      this.tf.push(tf);
      this.len.push(tokens.length);
      total += tokens.length;
    }
    this.avgLen = docs.length ? total / docs.length : 1;
  }

  get size() {
    return this.docs.length;
  }

  search(query: string, k = 6): ScoredChunk[] {
    const terms = Array.from(new Set(tokenize(query)));
    if (!terms.length) return [];
    const N = this.docs.length;
    const scores = new Float64Array(N);
    for (const term of terms) {
      const df = this.df.get(term);
      if (!df) continue;
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
      for (let i = 0; i < N; i++) {
        const f = this.tf[i].get(term);
        if (!f) continue;
        const norm = f * (this.k1 + 1);
        const denom = f + this.k1 * (1 - this.b + (this.b * this.len[i]) / this.avgLen);
        scores[i] += idf * (norm / denom);
      }
    }
    const ranked: ScoredChunk[] = [];
    for (let i = 0; i < N; i++) if (scores[i] > 0) ranked.push({ ...this.docs[i], score: scores[i] });
    ranked.sort((a, b) => b.score - a.score);
    return ranked.slice(0, k);
  }
}

/** Collapses chunks to unique pages for the "Sources" list, keeping best score. */
export function uniqueSources(chunks: ScoredChunk[]): { title: string; url: string }[] {
  const seen = new Map<string, { title: string; url: string }>();
  for (const c of chunks) {
    const key = c.url.split("#")[0];
    if (!seen.has(key)) seen.set(key, { title: c.title, url: c.url });
  }
  return Array.from(seen.values());
}
