import type { MetadataRoute } from 'next';

const SITE_URL = 'https://karktech.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1, lastModified: new Date('2026-08-09') },
    { path: '/chat', priority: 0.9, lastModified: new Date('2026-08-09') },
    { path: '/privacy-policy', priority: 0.2, lastModified: new Date('2026-08-09') },
    { path: '/terms-of-service', priority: 0.2, lastModified: new Date('2026-08-09') },
    { path: '/cookie-policy', priority: 0.2, lastModified: new Date('2026-08-09') },
  ];

  return routes.map(({ path, priority, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : path === '/chat' ? 'weekly' : 'monthly',
    priority,
  }));
}
