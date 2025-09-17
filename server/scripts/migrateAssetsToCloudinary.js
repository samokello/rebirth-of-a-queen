/*
  Usage: node server/scripts/migrateAssetsToCloudinary.js
  - Uploads files from client/public/images and client/public/videos to Cloudinary
  - Outputs a JSON map file: server/scripts/cloudinary-map.json
*/

const path = require('path');
const fs = require('fs');
// Load env FIRST, then import cloudinary service
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const cloudinary = require('../services/cloudinary');

const PUBLIC_DIR = path.resolve(__dirname, '../../client/public');
const SOURCES = [
  { dir: 'images', folder: 'site/images' },
  { dir: 'videos', folder: 'site/videos', resource_type: 'video' },
];

const outputMapPath = path.resolve(__dirname, './cloudinary-map.json');
const mapJson = {};

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkDir(full));
    else files.push(full);
  }
  return files;
}

async function uploadFile(localPath, folder, resource_type = 'image') {
  const rel = path.relative(PUBLIC_DIR, localPath).replace(/\\/g, '/');
  const publicId = rel
    .replace(/^images\//, '')
    .replace(/^videos\//, '')
    .replace(path.extname(rel), '')
    .replace(/[^a-zA-Z0-9/_-]/g, '_');
  const uploadOpts = { folder, public_id: publicId, resource_type, overwrite: true };
  const res = resource_type === 'video'
    ? await cloudinary.uploader.upload_large(localPath, uploadOpts)
    : await cloudinary.uploader.upload(localPath, uploadOpts);
  return { rel, url: res.secure_url };
}

async function main() {
  for (const src of SOURCES) {
    const base = path.join(PUBLIC_DIR, src.dir);
    if (!fs.existsSync(base)) continue;
    const files = walkDir(base);
    for (const f of files) {
      try {
        const { rel, url } = await uploadFile(f, src.folder, src.resource_type || 'image');
        mapJson['/' + rel] = url;
        console.log('Uploaded:', rel, '->', url);
      } catch (e) {
        console.error('Failed:', f, (e && (e.message || e.error?.message)) || 'unknown error');
      }
    }
  }
  fs.writeFileSync(outputMapPath, JSON.stringify(mapJson, null, 2));
  console.log('Done. Map saved to', outputMapPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


