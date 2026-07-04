// lib/bm25.ts

type Doc = { id: string; tokens: string[] };

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

export class BM25 {
  private docs: Doc[] = [];
  private docFreq: Map<string, number> = new Map();
  private avgDocLen = 0;
  private k1 = 1.5;
  private b = 0.75;

  constructor(entries: { id: string; text: string }[]) {
    this.docs = entries.map((e) => ({ id: e.id, tokens: tokenize(e.text) }));
    this.avgDocLen =
      this.docs.reduce((sum, d) => sum + d.tokens.length, 0) / this.docs.length;

    for (const doc of this.docs) {
      const seen = new Set(doc.tokens);
      for (const term of seen) {
        this.docFreq.set(term, (this.docFreq.get(term) ?? 0) + 1);
      }
    }
  }

  private idf(term: string): number {
    const n = this.docs.length;
    const df = this.docFreq.get(term) ?? 0;
    return Math.log((n - df + 0.5) / (df + 0.5) + 1);
  }

  score(query: string, docId: string): number {
    const doc = this.docs.find((d) => d.id === docId);
    if (!doc) return 0;

    const queryTerms = tokenize(query);
    let score = 0;

    for (const term of queryTerms) {
      const tf = doc.tokens.filter((t) => t === term).length;
      if (tf === 0) continue;

      const idf = this.idf(term);
      const numerator = tf * (this.k1 + 1);
      const denominator =
        tf + this.k1 * (1 - this.b + (this.b * doc.tokens.length) / this.avgDocLen);

      score += idf * (numerator / denominator);
    }

    return score;
  }

  scoreAll(query: string): { id: string; score: number }[] {
    return this.docs.map((d) => ({ id: d.id, score: this.score(query, d.id) }));
  }
}
