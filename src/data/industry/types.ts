import type { Photo, PhotoKey } from '../photos';

export interface Link {
  label: string;
  href: string;
}

export interface Crumb {
  label: string;
  href?: string;
}

/** A designed industry program page (replaces a landing page's Hygraph components). */
export interface IndustryProgram {
  /** Meta title. */
  title: string;
  description: string;
  hero: {
    crumbs: Crumb[];
    title: string;
    lead: string;
    photo: Photo;
    position: string;
    height: number;
    actions: Link[];
  };
  program: { eyebrow: string; statement: string; listLabel: string; list: string[]; paragraphs: string[] };
  services: { eyebrow: string; heading: string; text: string; items: { title: string; text: string }[] };
  oversight: { photo: Photo; position: string; eyebrow: string; heading: string; items: { title: string; text: string }[] };
  benefits: { eyebrow: string; heading: string; items: { title: string; text: string }[] };
  /** Closing band; the secondary action defaults to the main phone line. */
  closing: { eyebrow: string; heading: string; primary: Link; secondary?: Link };
}

/** Presentation settings for a Hygraph landing page rendered by LandingTemplate. */
export interface LandingSettings {
  /** Hero photo (used when the page's header image is a logo or text banner). */
  photo: PhotoKey;
  photoPosition?: string;
  crumbs: Crumb[];
  /** IconBanner titles that are CMS labels, not copy (e.g. "EQ banner"); they are not rendered. */
  hiddenTitles?: string[];
}
