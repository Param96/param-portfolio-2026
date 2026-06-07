import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Export the sanityFetch function and SanityLive component
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // You can set an API token here if you need to fetch drafts
    // token: process.env.SANITY_API_READ_TOKEN,
  }),
});
