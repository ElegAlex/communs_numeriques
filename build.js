const fs = require('fs');
const path = require('path');

const headerTpl = fs.readFileSync(path.join(__dirname, 'partials', 'header.html'), 'utf8');
const footerTpl = fs.readFileSync(path.join(__dirname, 'partials', 'footer.html'), 'utf8');

function processFile(filePath) {
  const relativeDir = path.relative(__dirname, path.dirname(filePath));
  const depth = relativeDir ? relativeDir.split(path.sep).length : 0;
  const root = depth === 0 ? '.' : Array(depth).fill('..').join('/');
  const header = headerTpl.replace(/{{root}}/g, root);
  const footer = footerTpl.replace(/{{root}}/g, root);

  let html = fs.readFileSync(filePath, 'utf8');
  const headerRegex = /<header id="main-header">[\s\S]*?<\/header>/;
  const footerRegex = /<footer id="main-footer">[\s\S]*?<\/footer>/;

  if (headerRegex.test(html)) {
    html = html.replace(headerRegex, header);
  }
  if (footerRegex.test(html)) {
    html = html.replace(footerRegex, footer);
  }
  fs.writeFileSync(filePath, html);
  console.log('Processed', filePath);
}

function walk(dir) {
  fs.readdirSync(dir).forEach(entry => {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry !== 'partials' && entry !== 'node_modules') {
        walk(fullPath);
      }
    } else if (stat.isFile() && fullPath.endsWith('.html')) {
      processFile(fullPath);
    }
  });
}

walk(__dirname);
