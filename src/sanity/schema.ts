import { type SchemaTypeDefinition } from "sanity";
import { projectType } from "./schemaTypes/project";
import { labNoteType } from "./schemaTypes/labNote";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, labNoteType],
};
