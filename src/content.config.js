import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const siteCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/site' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    headline: z.string().optional(),
    subheadline: z.string().optional(),
    subheadlinePrefix: z.string().optional(),
    companyName: z.string().optional(),
    companyIcon: z.string().optional(),
    location: z.string().optional(),
    rotatingPhrases: z.array(z.string()).optional(),
    eyebrow: z.string().optional(),
    intro: z.string().optional(),
    stats: z.array(z.string()).optional(),
    paragraphs: z.array(z.string()).optional(),
    experienceIntro: z
      .object({
        eyebrow: z.string(),
        title: z.string(),
        description: z.string(),
      })
      .optional(),
    stackIntro: z
      .object({
        eyebrow: z.string(),
        title: z.string(),
      })
      .optional(),
    stack: z.array(z.string()).optional(),
    supportTitle: z.string().optional(),
    supportItems: z.array(z.string()).optional(),
    primaryCta: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
    secondaryCta: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
    footer: z.string().optional(),
    githubUrl: z.string().optional(),
    featured: z
      .object({
        title: z.string(),
        subtitle: z.string(),
        image: z.string(),
        link: z.string(),
        productHuntLink: z.string(),
        timeline: z.string(),
        role: z.string(),
        challenge: z.string(),
        solution: z.string(),
        impact: z.array(z.string()),
        stack: z.array(z.string()),
      })
      .optional(),
  }),
});

const experienceCollection = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/experience' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    organization: z.string(),
    time: z.string(),
    image: z.string(),
    details: z.array(z.string()),
  }),
});

const educationCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/education' }),
  schema: z.object({
    order: z.number(),
    degree: z.string(),
    school: z.string(),
    years: z.string(),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    timeline: z.string(),
    outcome: z.string(),
    image: z.string(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    impact: z.array(z.string()).optional(),
    secondaryLink: z.string().optional(),
    secondaryLabel: z.string().optional(),
    stack: z.array(z.string()),
    link: z.string(),
  }),
});

const artworkCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/artwork' }),
  schema: z.object({
    order: z.number(),
    src: z.string(),
    title: z.string(),
    category: z.string(),
  }),
});

const contactMethodsCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/contact-methods' }),
  schema: z.object({
    order: z.number(),
    label: z.string(),
    value: z.string(),
    href: z.string(),
    icon: z.enum(['github', 'linkedin', 'mail', 'send']),
  }),
});

export const collections = {
  site: siteCollection,
  experience: experienceCollection,
  education: educationCollection,
  projects: projectsCollection,
  artwork: artworkCollection,
  'contact-methods': contactMethodsCollection,
};
