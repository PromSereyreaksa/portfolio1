import { getCollection } from 'astro:content';

const byOrder = (a, b) => a.data.order - b.data.order;

export async function loadPortfolioContent() {
  const siteEntries = await getCollection('site');
  const siteData = Object.fromEntries(siteEntries.map((entry) => [entry.id, entry.data]));

  const experience = (await getCollection('experience')).sort(byOrder).map((entry) => entry.data);
  const education = (await getCollection('education')).sort(byOrder).map((entry) => entry.data);
  const projects = (await getCollection('projects')).sort(byOrder).map((entry) => entry.data);
  const artwork = (await getCollection('artwork')).sort(byOrder).map((entry) => ({
    id: entry.data.order,
    ...entry.data,
  }));
  const contactMethods = (await getCollection('contact-methods'))
    .sort(byOrder)
    .map((entry) => entry.data);

  return {
    siteData,
    experience,
    education,
    projects,
    artwork,
    contactMethods,
  };
}
