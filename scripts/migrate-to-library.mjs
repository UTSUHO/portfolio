import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = path.join(__dirname, '../content/projects');
const LIBRARY_DIR = path.join(__dirname, '../content/library');

if (!fs.existsSync(LIBRARY_DIR)) fs.mkdirSync(LIBRARY_DIR, { recursive: true });

function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.md'));
const projects = files.map(file => {
  const source = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8');
  const { data, content } = matter(source);
  return { file, data, content };
});

const workProjectIds = new Set(
  projects
    .filter(p => Array.isArray(p.data.tags) && p.data.tags.includes(0))
    .map(p => p.data.id)
);
const nonWorkProjects = projects.filter(
  p => !Array.isArray(p.data.tags) || !p.data.tags.includes(0)
);

const slugMap = {};
const takenSlugs = new Set();

for (const p of nonWorkProjects) {
  let slug = slugify(p.data.title);
  if (!slug) slug = `project-${p.data.id}`;
  if (takenSlugs.has(slug)) slug = `${slug}-${p.data.id}`;
  takenSlugs.add(slug);
  slugMap[p.data.id] = slug;
}

function mapRelated(related, currentProjectId) {
  if (!Array.isArray(related)) return [];
  return related
    .map(ref => {
      if (typeof ref === 'string') {
        const sep = ref.indexOf(':');
        if (sep === -1) return null;
        const type = ref.slice(0, sep);
        const key = ref.slice(sep + 1);
        if (type === 'project' && slugMap[key] && key !== currentProjectId) {
          return { type: 'library', key: slugMap[key] };
        }
        return { type, key };
      }
      if (ref.type === 'project' && slugMap[ref.key] && ref.key !== currentProjectId) {
        return { type: 'library', key: slugMap[ref.key] };
      }
      return ref;
    })
    .filter(Boolean);
}

function statusMap(status) {
  const s = String(status).toLowerCase();
  if (s === 'completed' || s === 'released' || s === 'published') return 'published';
  if (s === 'in-progress' || s === 'ongoing') return 'in-progress';
  if (s === 'archived') return 'archived';
  return 'published';
}

function categoryMap(category) {
  const c = String(category);
  const validCategories = [
    'Systems', 'WebGL', 'Frontend Engineering', 'Tools', 'Infrastructure',
    'Research Notes', 'Case Study', 'Games', 'Essays'
  ];
  if (validCategories.includes(c)) return c;
  if (c.includes('Game')) return 'Games';
  if (c.includes('Design') || c.includes('Graphic')) return 'Case Study';
  if (c.includes('Translation') || c.includes('Essay') || c.includes('Writing')) return 'Essays';
  return 'Research Notes';
}

const tagMap = {
  0: 'WORK', 1: 'INTEREST', 2: 'AI', 3: 'GAMEDESIGN',
  4: 'FRONTEND', 5: 'FULLSTACK', 6: 'DESIGN'
};

function tagsMap(tags) {
  return Array.isArray(tags)
    ? tags.map(t => tagMap[t] || String(t).toUpperCase()).filter(Boolean)
    : [];
}

function quote(str) {
  return JSON.stringify(str ?? '');
}

function renderRelated(related) {
  if (related.length === 0) return '[]';
  return `[\n${related.map(r => `      { type: ${quote(r.type)}, key: ${quote(r.key)} }`).join(',\n')}\n    ]`;
}

function renderSections(sections) {
  if (sections.length === 0) return '[]';
  return `[\n${sections
    .map(
      s => `      {\n        id: ${quote(s.id)},\n        number: ${quote(s.number)},\n        title: ${quote(s.title)},\n        body: ${quote(s.body)}\n      }`
    )
    .join(',\n')}\n    ]`;
}

const entries = nonWorkProjects.map((p, i) => {
  const d = p.data;
  const slug = slugMap[d.id];
  const sections = [];
  const pushSection = (id, num, title, body, extra = {}) => {
    const text = Array.isArray(body) ? body.join(' ') : String(body ?? '');
    if (text.trim().length > 0) {
      sections.push({ id, number: String(num).padStart(2, '0'), title, body: text, ...extra });
    }
  };

  let num = 1;
  pushSection('overview', num++, 'Overview', d.overview);
  pushSection('problem', num++, 'Problem', d.problem);
  pushSection('solution', num++, 'Solution', d.solution);
  if (
    d.architecture &&
    (d.architecture.title ||
      (Array.isArray(d.architecture.blocks) && d.architecture.blocks.length > 0))
  ) {
    let body = d.architecture.title || '';
    if (Array.isArray(d.architecture.blocks)) {
      body +=
        '\\n\\n' +
        d.architecture.blocks.map(b => `${b.label}: ${b.value}`).join('\\n');
    }
    if (Array.isArray(d.architecture.flow)) {
      body += '\\n\\nFlow: ' + d.architecture.flow.join(' → ');
    }
    pushSection('architecture', num++, 'Architecture', body.trim());
  }
  pushSection(
    'challenges',
    num++,
    'Challenges',
    Array.isArray(d.challenges)
      ? d.challenges.map(c => `• ${c}`).join('\\n')
      : ''
  );
  pushSection('outcome', num++, 'Outcome', d.outcome);

  const related = mapRelated(d.related, d.id);

  return {
    id: `lib-${d.id}`,
    slug,
    number: String(i + 1).padStart(2, '0'),
    title: d.title,
    subtitle: d.subtitle,
    summary: d.overview,
    date: d.year,
    year: Number(d.year) || 0,
    type: 'library',
    category: categoryMap(d.category),
    status: statusMap(d.meta?.status),
    role: d.meta?.role,
    duration: d.meta?.duration,
    stack: d.meta?.tech
      ? d.meta.tech.split('/').map(s => s.trim()).filter(Boolean)
      : [],
    tags: tagsMap(d.tags),
    thumbnail: '/images/contents/vegvisir.jpg',
    heroVisual: '/images/contents/vegvisir.jpg',
    sections,
    related
  };
});

const entriesTs = entries
  .map(
    (e) => `  {\n` +
      `    id: ${quote(e.id)},\n` +
      `    slug: ${quote(e.slug)},\n` +
      `    number: ${quote(e.number)},\n` +
      `    title: ${quote(e.title)},\n` +
      `    subtitle: ${quote(e.subtitle)},\n` +
      `    summary: ${quote(e.summary)},\n` +
      `    date: ${quote(e.date)},\n` +
      `    year: ${e.year},\n` +
      `    type: ${quote(e.type)},\n` +
      `    category: ${quote(e.category)},\n` +
      `    status: ${quote(e.status)},\n` +
      `    role: ${quote(e.role)},\n` +
      `    duration: ${quote(e.duration)},\n` +
      `    stack: ${JSON.stringify(e.stack)},\n` +
      `    tags: ${JSON.stringify(e.tags)},\n` +
      `    thumbnail: ${quote(e.thumbnail)},\n` +
      `    heroVisual: ${quote(e.heroVisual)},\n` +
      `    sections: ${renderSections(e.sections)},\n` +
      `    related: ${renderRelated(e.related)}\n` +
      `  }`
  )
  .join(',\n');

const fileContent = `import {
  LibraryEntry,
  LibraryCategory,
  LibraryStatus,
  LibrarySection
} from './types'
export type {
  LibraryEntry,
  LibraryCategory,
  LibraryStatus,
  LibrarySection
} from './types'

export const libraryCategories: LibraryCategory[] = [
  'Systems',
  'WebGL',
  'Frontend Engineering',
  'Tools',
  'Infrastructure',
  'Research Notes',
  'Case Study',
  'Games',
  'Essays'
]

export const libraryStatuses: LibraryStatus[] = [
  'published',
  'in-progress',
  'archived'
]

export const libraryEntries: LibraryEntry[] = [
${entriesTs}
]

export function getLibraryEntryBySlug(slug: string): LibraryEntry | undefined {
  return libraryEntries.find((e) => e.slug === slug)
}

export function getAdjacentLibraryEntries(
  slug: string
): { prev: LibraryEntry | null; next: LibraryEntry | null } {
  const index = libraryEntries.findIndex((e) => e.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? libraryEntries[index - 1] : null,
    next: index < libraryEntries.length - 1 ? libraryEntries[index + 1] : null
  }
}

export function getLibraryEntriesByCategory(
  category: LibraryCategory
): LibraryEntry[] {
  return libraryEntries.filter((e) => e.category === category)
}

export function getLibraryEntriesByStatus(
  status: LibraryStatus
): LibraryEntry[] {
  return libraryEntries.filter((e) => e.status === status)
}
`;

fs.writeFileSync(path.join(__dirname, '../lib/data/library.ts'), fileContent);

for (const p of nonWorkProjects) {
  const d = p.data;
  const slug = slugMap[d.id];
  let md = `---\ntitle: ${d.title}\n---\n\n`;
  if (d.overview) md += `## Overview\n\n${d.overview}\n\n`;
  if (d.problem) md += `## Problem\n\n${d.problem}\n\n`;
  if (d.solution) md += `## Solution\n\n${d.solution}\n\n`;
  if (
    d.architecture &&
    (d.architecture.title ||
      (Array.isArray(d.architecture.blocks) && d.architecture.blocks.length > 0))
  ) {
    md += `## Architecture\n\n`;
    if (d.architecture.title) md += `${d.architecture.title}\n\n`;
    if (Array.isArray(d.architecture.blocks)) {
      md +=
        d.architecture.blocks
          .map(b => `- **${b.label}**: ${b.value}`)
          .join('\\n') + '\\n\\n';
    }
    if (Array.isArray(d.architecture.flow)) {
      md += `Flow: ${d.architecture.flow.join(' → ')}\\n\\n`;
    }
  }
  if (Array.isArray(d.challenges) && d.challenges.length > 0) {
    md += `## Challenges\n\n`;
    md += d.challenges.map(c => `- ${c}`).join('\\n') + '\\n\\n';
  }
  if (d.outcome) md += `## Outcome\n\n${d.outcome}\\n\\n`;

  fs.writeFileSync(path.join(LIBRARY_DIR, `${slug}.md`), md.trim() + '\\n');
}

console.log('Generated library.ts with', entries.length, 'entries');
console.log('Generated', nonWorkProjects.length, 'library markdown files');
console.log(
  'Non-work project files to delete:',
  nonWorkProjects.map((p) => p.file)
);
