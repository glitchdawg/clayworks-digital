const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '../strapi/src/api');

function scanDir(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            scanDir(fullPath);
        } else if (item.name.endsWith('.json')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                JSON.parse(content);
                // console.log(`✅ Valid: ${item.name}`);
            } catch (e) {
                console.error(`❌ INVALID JSON: ${fullPath}`);
                console.error(e.message);
            }
        }
    }
}

console.log(`Scanning ${apiDir}...`);
scanDir(apiDir);
console.log('Done.');
