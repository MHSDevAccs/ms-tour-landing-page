// Standard sanityFetch without live functionality
// Live content API is not available in this version of next-sanity
import { client } from './client'

export const sanityFetch = client.fetch.bind(client);

// Placeholder component for compatibility
export const SanityLive = () => null;
