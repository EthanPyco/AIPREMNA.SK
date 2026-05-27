import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const guideSchema = z.object({
  title: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    foundation: defineCollection({
      type: 'page',
      source: 'initial_info/**/*.md',
      schema: guideSchema,
    }),
    usecases: defineCollection({
      type: 'page',
      source: 'jednotlive_usecases/**/*.md',
      schema: guideSchema,
    }),
    tools: defineCollection({
      type: 'page',
      source: 'jednotlive_tools/**/*.md',
      schema: guideSchema,
    }),
    impactEffort: defineCollection({
      type: 'page',
      source: 'impact_effort_map/**/*.md',
      schema: guideSchema,
    }),
  },
})
