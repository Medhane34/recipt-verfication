import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "";
const dataset = process.env.SANITY_STUDIO_DATASET || "";

export default defineConfig({
  name: "default",
  title: "Studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'receipt-by-merchant',
        title: 'Receipt for Merchant',
        schemaType: 'receipt',
        parameters: [{ name: 'merchantId', type: 'string' }],
        value: (params: { merchantId: string }) => ({
          merchant: { _type: 'reference', _ref: params.merchantId },
        }),
      },
    ],
  },
});
