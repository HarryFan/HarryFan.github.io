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
		category: z.enum(['frontend', 'ai', 'events', 'career']).default('frontend'),
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

const works = defineCollection({
	loader: glob({ base: './src/content/works', pattern: '**/*.{md,mdx}' }),
	schema: z
		.object({
			title: z.string(),
			subtitle: z.string(),
			description: z.string().max(160),
			// 只接受單一值：漏寫或寫錯，build 直接失敗。誠實標示交給型別系統，不靠自律。
			origin: z.literal('self-directed'),
			brand_basis: z.enum(['fictional', 'unofficial-concept']),
			disclaimer: z.string().optional(),
			year: z.number(),
			pubDate: z.coerce.date(),
			cover: z.string().optional(),
			video: z.string().optional(),
			video_loop: z.string().optional(),
			repo: z.string().url().optional(),
			repo_private: z.boolean().default(false),
			blog_post: z.string().optional(),
			tech: z.array(z.string()).min(1),
			category: z.enum(['product', 'collection', 'interactive']).default('product'),
			featured: z.boolean().default(false),
			role: z.string(),
			challenge: z.string(),
			outcome: z.string(),
			subworks: z
				.array(z.object({ name: z.string(), note: z.string(), thumb: z.string().optional() }))
				.default([]),
			seo_title: z.string(),
			seo_description: z.string().max(160),
		})
		.refine((d) => d.brand_basis !== 'unofficial-concept' || Boolean(d.disclaimer?.length), {
			message: 'brand_basis 為 unofficial-concept 時，disclaimer 必填',
			path: ['disclaimer'],
		}),
});

export const collections = { blog, styles, works };
