/**
 * Simple in-memory blog adapter. In a production environment the
 * posts would be stored in a CMS or database. For demonstration
 * purposes we define three posts here. Each post includes a slug
 * (used in the URL), a title, a short excerpt used on the blog
 * listing page, the full content, and an image path. Only the
 * approved hero images are referenced.
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
}

const posts: BlogPost[] = [
  {
    slug: 'story-of-hydrasal',
    title: 'The Story of Hydrasal',
    excerpt:
      'Discover how a quest for clean electrolytes turned into our flagship hydration line—and why every ingredient matters.',
    content:
      `### The Birth of Hydrasal\n\nIt started with a simple need: hydration without compromise. Frustrated by commercial electrolyte drinks loaded with sugar and fillers, we set out to create a blend that would nourish and restore. After countless experiments in our own kitchen, Hydrasal was born.\n\n### What Makes It Different\n\nHydrasal is built on a foundation of salt and mineral ratios that mirror human plasma. We sweeten with our Benedulce™ system to avoid blood‑sugar spikes while still delivering a pleasant flavour. Each ingredient is chosen for function, not filler.\n\n### Looking Ahead\n\nHydrasal has become a cornerstone product for crews, athletes and families alike. But our work isn’t finished—we’re continually refining and developing new flavours to serve you better.`,
    image: '/images/hydrasal.png',
  },
  {
    slug: 'adaptogens-and-elation',
    title: 'From Adaptogens to Elation',
    excerpt:
      'Learn how ancient herbs like ashwagandha and holy basil inspired our luxurious Elation tonic blends.',
    content:
      `### Ancient Roots, Modern Form\n\nAdaptogens have been used for centuries to help the body adapt to stress. In creating Elation, we drew upon herbs like ashwagandha, holy basil and saffron to design a modern tonic that nourishes the endocrine system.\n\n### The Benedulce Edge\n\nElation is powered by our Benedulce™ sweetener, allowing us to deliver decadent flavours without the crash of sugar. The result is a daily ritual that tastes as good as it feels.\n\n### Why Elation Matters\n\nWe believe well‑being should be both effective and enjoyable. Elation bridges the gap between herbal tradition and culinary delight, offering a daily moment of luxury that supports hormonal and neurological balance.`,
    image: '/images/elation.png',
  },
  {
    slug: 'ancestral-skincare',
    title: 'Ancestral Skincare Reimagined',
    excerpt:
      'Why we turned to grass‑fed tallow and botanicals to create Sanctus Una—and what it can do for your skin.',
    content:
      `### Returning to Tradition\n\nLong before synthetic moisturisers, our ancestors turned to tallow and herbs to protect and heal the skin. Sanctus Una revives this wisdom with grass‑fed tallow, regenerative botanicals and no unnecessary additives.\n\n### The Sanctus Difference\n\nUnlike modern creams filled with seed oils and preservatives, Sanctus Una products are made to work with your skin’s natural barrier. The result is supple, nourished skin without irritation.\n\n### More Than Skin Deep\n\nSkincare should be as honest as food. By sourcing local tallow and botanicals, we support sustainable agriculture and honour the land. Sanctus Una is our way of giving back to both the earth and your skin.`,
    image: '/images/sanctus.png',
  },
];

/**
 * Returns all posts in publication order. In a real system this
 * might filter out unpublished drafts or sort by date.
 */
export function listBlogPosts(): BlogPost[] {
  return posts;
}

/**
 * Retrieve a single post by its slug. Returns undefined if no post
 * matches. Slugs are assumed to be unique.
 */
export function getBlogPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}