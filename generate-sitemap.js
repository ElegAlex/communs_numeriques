const fs = require('fs');
const path = require('path');

const baseUrl = 'https://alexandre-berge.fr';
const excludeDirs = new Set(['partials', 'node_modules', 'images']);

const urls = [];

function walk(dir) {
  fs.readdirSync(dir).forEach(entry => {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!excludeDirs.has(entry)) {
        walk(fullPath);
      }
    } else if (stat.isFile() && entry.endsWith('.html')) {
      const relative = path.relative(__dirname, fullPath).replace(/\\/g, '/');
      urls.push(`${baseUrl}/${relative}`);
    }
  });
}

walk(__dirname);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
console.log(`Sitemap generated with ${urls.length} URLs`);
