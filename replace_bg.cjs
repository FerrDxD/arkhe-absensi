const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.svelte')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src/routes');
files.push('./src/lib/components/ArkheCard.svelte');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // We only replace exact matches of bg-white surrounded by quotes, spaces or backticks
    // Since class="bg-white ...", this regex works:
    const newContent = content.replace(/(['"\s])bg-white(['"\s])/g, '$1bg-arkhe-white$2');
    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        console.log(`Updated ${file}`);
    }
});
