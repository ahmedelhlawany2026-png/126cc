import type { MetadataRoute } from 'next';

const baseUrl = 'https://www.visiongroup-eg.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/bio-vision', '/home-vision', '/vec', '/team', '/contact'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8
  }));
}
