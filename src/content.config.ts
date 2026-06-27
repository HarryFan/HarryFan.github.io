import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		draft: z.boolean().optional().default(false),
	}),
});

const styles = defineCollection({
	loader: glob({ base: './src/content/styles', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.enum(['anime', 'illustration', 'realistic', 'game']),
		tags: z.array(z.string()).default([]),
		difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
		prompt_zh: z.string(),
		prompt_en: z.string(),
		negative_prompt: z.string().default(''),
		seo_title: z.string(),
		seo_description: z.string().max(160),
		cover_image: z.string().optional(),
		related_styles: z.array(z.string()).default([]),
		pubDate: z.coerce.date(),
		updated_at: z.coerce.date().optional(),
		featured: z.boolean().default(false),
		models: z.array(z.string()).default([]),
		use_cases: z.array(z.string()).default([]),
		mistakes: z.array(z.string()).default([]),
		faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
		prompt_breakdown: z.array(z.object({ term: z.string(), effect: z.string() })).default([]),
	}),
});

export const collections = { blog, styles };
