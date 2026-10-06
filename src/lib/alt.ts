import altText from '../data/alt-text.json';

const map = altText as Record<string, string>;

/**
 * Alt text for a file in src/assets, keyed by its repo path
 * (e.g. "src/assets/hotels/hero-boutique-hotel.jpg"). See src/data/alt-text.json.
 */
export function altFor(assetPath: string): string {
  const alt = map[assetPath];
  if (alt === undefined) throw new Error(`Missing alt text for ${assetPath} in src/data/alt-text.json`);
  return alt;
}
