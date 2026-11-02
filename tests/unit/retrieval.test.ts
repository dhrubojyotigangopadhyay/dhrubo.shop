import { describe, expect, it } from "vitest";
import knowledge from "@/generated/knowledge.json";
import { BM25Index, stem, tokenize, uniqueSources, type Chunk } from "@/lib/ai/retrieval";

const index = new BM25Index(knowledge.chunks as Chunk[]);

describe("tokenize/stem", () => {
  it("drops stop words and stems plurals and -ing forms", () => {
    expect(tokenize("The approvals are gating the agents")).toEqual(["approval", "gat", "agent"]);
    expect(stem("releases")).toBe(stem("release"));
    expect(stem("gated")).toBe(stem("gate"));
    expect(stem("mcp")).toBe("mcp");
  });
  it("keeps technical tokens such as c++, node.js and next.js", () => {
    expect(tokenize("Next.js and Node.js")).toEqual(["next.js", "node.js"]);
  });
});

describe("BM25Index over the generated knowledge base", () => {
  it("indexes every chunk", () => {
    expect(index.size).toBe(knowledge.chunks.length);
    expect(index.size).toBeGreaterThan(80);
  });
  it("ranks the Sahkarmi project first for a question about approval gates", () => {
    const hits = index.search("How does Sahkarmi stop an agent from doing something risky?", 5);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].url.startsWith("/projects/sahkarmi") || hits[0].url.startsWith("/writing/approval-gates")).toBe(true);
  });
  it("finds the revenue-operations background for a career question", () => {
    const hits = index.search("What did Dhrubo do before AI engineering? cement steel revenue operations", 5);
    expect(hits.some((h) => /cement|revenue/i.test(h.text))).toBe(true);
  });
  it("returns nothing for an empty or stop-word-only query", () => {
    expect(index.search("the and of")).toEqual([]);
  });
  it("collapses chunks into unique page sources preserving rank", () => {
    const hits = index.search("Sahkarmi releases tests Microsoft Store", 8);
    const sources = uniqueSources(hits);
    const urls = sources.map((s) => s.url.split("#")[0]);
    expect(new Set(urls).size).toBe(urls.length);
    expect(sources.length).toBeLessThanOrEqual(hits.length);
  });
});
