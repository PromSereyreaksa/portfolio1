import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const htmlAttributePattern = /\b(href|src|srcset|poster)=("([^"]*)"|'([^']*)')/g;
const styleUrlPattern = /url\((['"]?)(\/(?!\/)[^'")]+)\1\)/g;

const shouldRewritePath = (value) => {
  if (!value.startsWith('/')) return false;
  if (value.startsWith('//')) return false;
  if (value.startsWith('/#')) return false;
  if (value.startsWith('/api/')) return false;
  return true;
};

const toRelativePath = (value, htmlFilePath) => {
  const fileDir = path.dirname(htmlFilePath);
  const targetPath = path.join(distDir, value.slice(1));
  let relativePath = path.relative(fileDir, targetPath).replaceAll(path.sep, '/');

  if (!relativePath || relativePath === '') {
    relativePath = '.';
  }

  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
};

const rewriteSrcset = (value, htmlFilePath) =>
  value
    .split(',')
    .map((entry) => {
      const trimmed = entry.trim();
      if (!trimmed) return trimmed;

      const [url, descriptor] = trimmed.split(/\s+/, 2);
      if (!shouldRewritePath(url)) return trimmed;

      const rewrittenUrl = toRelativePath(url, htmlFilePath);
      return descriptor ? `${rewrittenUrl} ${descriptor}` : rewrittenUrl;
    })
    .join(', ');

const rewriteHtml = (contents, htmlFilePath) => {
  let rewritten = contents.replace(htmlAttributePattern, (fullMatch, attr, quotedValue, doubleQuoted, singleQuoted) => {
    const rawValue = doubleQuoted ?? singleQuoted ?? '';
    let nextValue = rawValue;

    if (attr === 'srcset') {
      nextValue = rewriteSrcset(rawValue, htmlFilePath);
    } else if (shouldRewritePath(rawValue)) {
      nextValue = toRelativePath(rawValue, htmlFilePath);
    }

    if (nextValue === rawValue) return fullMatch;
    const quote = quotedValue[0];
    return `${attr}=${quote}${nextValue}${quote}`;
  });

  rewritten = rewritten.replace(styleUrlPattern, (fullMatch, quote, rawValue) => {
    if (!shouldRewritePath(rawValue)) return fullMatch;
    const nextValue = toRelativePath(rawValue, htmlFilePath);
    return `url(${quote}${nextValue}${quote})`;
  });

  return rewritten;
};

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const htmlFiles = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      htmlFiles.push(...(await walk(entryPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.html')) {
      htmlFiles.push(entryPath);
    }
  }

  return htmlFiles;
};

const htmlFiles = await walk(distDir);

await Promise.all(
  htmlFiles.map(async (htmlFilePath) => {
    const original = await readFile(htmlFilePath, 'utf8');
    const rewritten = rewriteHtml(original, htmlFilePath);

    if (rewritten !== original) {
      await writeFile(htmlFilePath, rewritten, 'utf8');
    }
  })
);
