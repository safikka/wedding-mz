import { minify } from 'html-minifier-terser';
import fs from 'fs';

const inputPath = './build/index.html';
const outputPath = './build/index.html';

const html = fs.readFileSync(inputPath, 'utf8');

const minified = await minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
});

fs.writeFileSync(outputPath, minified);
console.log('✅ Final HTML (with inline CSS/JS) has been minified.');
