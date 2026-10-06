/**
 * Content collections. Everything here was migrated from Hygraph by
 * scripts/export-hygraph.mjs; the schemas validate it on every build.
 */
import { defineCollection, reference, type SchemaContext } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Site-relative path or absolute URL. */
const href = z.string().regex(/^(\/|https?:\/\/|mailto:|tel:)/, 'Expected a site path or absolute URL');

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: reference('team').nullable(),
      categories: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      heroImage: image(),
      heroAlt: z.string().default(''),
      draft: z.boolean().default(false),
      hygraphId: z.string().optional(),
    }),
});

const team = defineCollection({
  loader: glob({ base: './src/content/team', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      slug: z.string(),
      role: z.string(),
      email: z.email().nullable(),
      phone: z.string().nullable(),
      meetingLink: z.url().nullable(),
      category: z.enum(['Management', 'Operations', 'AccountingOperationsManagement', 'Sales', 'Service']),
      isProducer: z.boolean(),
      order: z.number().int().nullable(),
      hasTeamPage: z.boolean(),
      miniBio: z.string().nullable(),
      photo: image(),
      blogPhoto: image().optional(),
      pets: z
        .array(z.object({ name: z.string(), photo: image(), bio: z.string().nullable() }))
        .default([]),
      hygraphId: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      description: z.string().nullable(),
      /** Original Hygraph template (SingleColumn, Grid, GridWithSearch, ...). */
      template: z.string(),
      /** false for listing pages whose content comes from data (blog, carriers, ...). */
      hasBody: z.boolean(),
      headerImage: image().nullable(),
      headerAlt: z.string().default(''),
      updatedDate: z.coerce.date().optional(),
      hygraphId: z.string().optional(),
    }),
});

const glossary = defineCollection({
  loader: file('src/data/glossary.json'),
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    type: z.enum(['Business', 'Personal']),
  }),
});

const carriers = defineCollection({
  loader: file('src/data/carriers.json'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      phones: z.object({
        general: z.string().nullable(),
        claims: z.string().nullable(),
        billing: z.string().nullable(),
      }),
      website: href.nullable(),
      claimLink: href.nullable(),
      payLink: href.nullable(),
      showInCarousel: z.boolean(),
      logo: image(),
    }),
});

const programs = defineCollection({
  loader: file('src/data/programs.json'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().nullable(),
      url: href,
      order: z.number().int().nullable(),
      image: image(),
    }),
});

const officeResources = defineCollection({
  loader: file('src/data/office-resources.json'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      link: href,
      category: z.string(),
      order: z.number().int().nullable(),
      altLogoText: z.string().nullable(),
      image: image(),
    }),
});

const offices = defineCollection({
  loader: file('src/data/offices.json'),
  schema: ({ image }) =>
    z.object({
      state: z.string(),
      stateCode: z.string().length(2),
      city: z.string(),
      address: z.string(),
      zip: z.string(),
      phone: z.string(),
      email: z.email(),
      established: z.number().int().nullable(),
      order: z.number().int().nullable(),
      image: image(),
    }),
});

const testimonials = defineCollection({
  loader: file('src/data/testimonials.json'),
  schema: z.object({
    text: z.string(),
    from: z.string(),
    subText: z.string().nullable(),
    highlight: z.boolean(),
    teamMembers: z.array(reference('team')).default([]),
  }),
});

const cardSchema = ({ image }: SchemaContext) =>
  z.object({
    label: z.string(),
    href,
    icon: z.string().nullable(),
    order: z.number().int().nullable(),
    image: image(),
  });

const quoteCards = defineCollection({
  loader: file('src/data/quote-cards.json'),
  schema: cardSchema,
});

const checkUpCards = defineCollection({
  loader: file('src/data/check-up-cards.json'),
  schema: cardSchema,
});

const navigation = defineCollection({
  loader: file('src/data/navigation.json'),
  schema: z.object({
    text: z.string(),
    href,
    external: z.boolean(),
    externalUrl: z.url().nullable(),
    openInNewTab: z.boolean(),
    highlight: z.boolean(),
    isDropdown: z.boolean(),
    order: z.number().int(),
    children: z.array(z.object({ title: z.string(), href })).default([]),
  }),
});

/** Hygraph-native form definitions (the contact form). */
const hygraphForms = defineCollection({
  loader: file('src/data/hygraph-forms.json'),
  schema: z.object({
    name: z.string(),
    pages: z.array(z.string()),
    fields: z.array(
      z.discriminatedUnion('kind', [
        z.object({
          kind: z.literal('input'),
          name: z.string(),
          label: z.string(),
          placeholder: z.string().nullable(),
          required: z.boolean(),
          inputType: z.string().nullable(),
        }),
        z.object({
          kind: z.literal('select'),
          name: z.string(),
          label: z.string(),
          required: z.boolean(),
          options: z.array(z.object({ value: z.string(), label: z.string() })),
        }),
        z.object({ kind: z.literal('checkbox'), name: z.string(), label: z.string(), required: z.boolean() }),
      ]),
    ),
  }),
});

const button = z.object({ label: z.string(), href: href.nullable() });

/** Component-built landing pages (content only; they will be redesigned). */
const landing = defineCollection({
  loader: glob({ base: './src/data/landing', pattern: '*.json' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      template: z.string(),
      headerImage: image().nullable(),
      /** Slug of the matching entry in src/data/forms.ts, if the page embeds a form. */
      formEmbed: z.string().nullable(),
      components: z.array(
        z.discriminatedUnion('type', [
          z.object({ type: z.literal('InfoCard'), title: z.string(), description: z.string().nullable(), icon: z.string().nullable() }),
          z.object({ type: z.literal('PageHeader'), header: z.string().nullable(), image: image().nullable() }),
          z.object({
            type: z.literal('WideCard'),
            header: z.string().nullable(),
            text: z.string().nullable(),
            showBackgroundColor: z.boolean(),
            textOnLeft: z.boolean(),
            useVideo: z.boolean(),
            videoUrl: z.url().nullable(),
            buttons: z.array(button),
            images: z.array(image()),
          }),
          z.object({
            type: z.literal('ActionBanner'),
            title: z.string().nullable(),
            description: z.string().nullable(),
            buttons: z.array(button),
          }),
          z.object({
            type: z.literal('IconBanner'),
            title: z.string().nullable(),
            items: z.array(z.object({ label: z.string(), description: z.string().nullable(), icon: z.string().nullable() })),
          }),
        ]),
      ),
    }),
});

export const collections = {
  blog,
  team,
  pages,
  glossary,
  carriers,
  programs,
  officeResources,
  offices,
  testimonials,
  quoteCards,
  checkUpCards,
  navigation,
  hygraphForms,
  landing,
};
