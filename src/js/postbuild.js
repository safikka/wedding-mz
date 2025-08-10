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

// Copy thumbnail
const source = './public/thumbnail.jpg';
const dest = './build/thumbnail.jpg';

try {
  fs.copyFileSync(source, dest);
  console.log('✅ Thumbnail copied to build/');
} catch (err) {
  console.error('❌ Failed to copy thumbnail:', err);
}
