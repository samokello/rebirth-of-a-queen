/*
  Usage: node server/scripts/replaceAssetRefs.js
  - Reads cloudinary-map.json and replaces local /images and /videos refs in client/src and client/public html/css/js with Cloudinary URLs
*/

const path = require('path');
const fs = require('fs');

const mapPath = path.resolve(__dirname, './cloudinary-map.json');
const root = path.resolve(__dirname, '../../client');
const exts = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.html'];

if (!fs.existsSync(mapPath)) {
  console.error('cloudinary-map.json not found. Run migrateAssetsToCloudinary first.');
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));

function listFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full));
    else if (exts.includes(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function replaceInFile(file) {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;
  for (const [local, url] of Object.entries(mapping)) {
    if (content.includes(local)) {
      content = content.split(local).join(url);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
}

const files = listFiles(root);
files.forEach(replaceInFile);
console.log('Replacement complete.');


