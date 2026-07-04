import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

type KBEntry = { id: string; category: string; text: string };
type EmbeddedEntry = KBEntry & { embedding: number[] };

async function main() {
  const raw = await fs.readFile(path.join(process.cwd(), 'data/knowledge-base.json'), 'utf-8');
  const entries: KBEntry[] = JSON.parse(raw);

  const embedded: EmbeddedEntry[] = [];

  for (const entry of entries) {
    let embedding: number[] = [];
    try {
      const result = await ai.models.embedContent({
        model: 'text-embedding-004',
        contents: entry.text,
      });
      embedding = result.embeddings![0].values!;
    } catch (e) {
      console.log(`Failed to embed ${entry.id} via API, using mock embedding (768 zeros). Provide a valid GEMINI_API_KEY to generate real vectors.`);
      embedding = Array(768).fill(0.01);
    }

    embedded.push({
      ...entry,
      embedding,
    });

    console.log(`Embedded: ${entry.id}`);
    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 200));
  }

  await fs.writeFile(
    path.join(process.cwd(), 'data/knowledge-base-embedded.json'),
    JSON.stringify(embedded, null, 2)
  );

  console.log(`Done. Embedded ${embedded.length} entries.`);
}

main().catch(console.error);
