import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  basePath: '/admin/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Cinematic Command Center',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    codeInput(),
  ],
});
