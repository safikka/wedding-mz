import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputPath = process.argv[2];
const outputPath = process.argv[3] || './webp';

if (!inputPath) {
  console.error('❌ Tolong kasih path file atau folder input.');
  console.log('Usage: node to-webp.js <input> [output]');
  process.exit(1);
}

function convertImage(file, outputDir) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const outFile =
    fs.existsSync(outputDir) && !outputDir.endsWith('.webp')
      ? path.join(outputDir, path.basename(file, ext) + '.webp')
      : outputDir;

  sharp(file)
    .webp({ quality: 80 })
    .toFile(outFile)
    .then(() => console.log(`✅ ${file} → ${outFile}`))
    .catch((err) => console.error(err));
}

const stat = fs.statSync(inputPath);

if (stat.isDirectory()) {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  fs.readdirSync(inputPath).forEach((file) => {
    convertImage(path.join(inputPath, file), outputPath);
  });
} else {
  convertImage(inputPath, outputPath);
}
