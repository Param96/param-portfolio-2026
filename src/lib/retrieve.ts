import fs from 'fs/promises';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { BM25 } from './bm25';

type EmbeddedEntry = {
  id: string;
  category: string;
  text: string;
  embedding: number[];
};

let cachedKB: EmbeddedEntry[] | null = null;
let cachedBM25: BM25 | null = null;

async function loadKnowledgeBase(): Promise<{ kb: EmbeddedEntry[]; bm25: BM25 }> {
  if (cachedKB && cachedBM25) return { kb: cachedKB, bm25: cachedBM25 };

  const raw = await fs.readFile(
    path.join(process.cwd(), 'data/knowledge-base-embedded.json'),
    'utf-8'
  );
  cachedKB = JSON.parse(raw);
  cachedBM25 = new BM25(cachedKB!.map((e) => ({ id: e.id, text: e.text })));

  return { kb: cachedKB!, bm25: cachedBM25 };
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Reciprocal Rank Fusion — combines two ranked lists without needing to
// normalize disparate score scales (cosine similarity vs BM25 scores).
function reciprocalRankFusion(
  rankedLists: { id: string }[][],
  k = 60
): Map<string, number> {
  const fused = new Map<string, number>();

  for (const list of rankedLists) {
    list.forEach((item, rank) => {
      const contribution = 1 / (k + rank + 1);
      fused.set(item.id, (fused.get(item.id) ?? 0) + contribution);
    });
  }

  return fused;
}

export async function retrieveRelevantContext(
  query: string,
  ai: GoogleGenAI,
  topK = 4
): Promise<string> {
  const { kb, bm25 } = await loadKnowledgeBase();

  // ---- Semantic (vector) ranking ----
  let queryEmbedding: number[] = [];
  try {
    const queryEmbeddingResult = await ai.models.embedContent({
      model: 'text-embedding-004',
      contents: query,
    });
    queryEmbedding = queryEmbeddingResult.embeddings![0].values!;
  } catch (e) {
    console.warn("Embedding API failed, using fallback empty vector for semantic search.");
    queryEmbedding = Array(768).fill(0.01);
  }

  const vectorRanked = kb
    .map((entry) => ({ id: entry.id, score: cosineSimilarity(queryEmbedding, entry.embedding) }))
    .sort((a, b) => b.score - a.score);

  // ---- Keyword (BM25) ranking ----
  const keywordRanked = bm25
    .scoreAll(query)
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  // ---- Fuse rankings ----
  const fused = reciprocalRankFusion([vectorRanked, keywordRanked]);

  const fusedRanked = Array.from(fused.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topK)
    .map(([id]) => kb.find((e) => e.id === id)!)
    .filter(Boolean);

  if (fusedRanked.length === 0) {
    return '';
  }

  return fusedRanked
    .map((entry) => `[${entry.category}] ${entry.text}`)
    .join('\n\n');
}
