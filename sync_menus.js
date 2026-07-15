const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Users\\\\ACER\\\\Downloads\\\\Le Reve';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

// Read the golden templates from index.html
const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

const navMatch = indexHtml.match(/<nav id="navbar">[\s\S]*?<\/nav>/);
if (!navMatch) throw new Error("Could not find <nav> in index.html");
let goldenNav = navMatch[0];
goldenNav = goldenNav.replace('<nav id="navbar">', '<nav id="navbar" class="scrolled">'); // Other pages usually have the scrolled class by default

const mobileMatch = indexHtml.match(/<div class="mobile-menu" id="mobileMenu">[\s\S]*?<\/div>/);
if (!mobileMatch) throw new Error("Could not find mobile menu in index.html");
const goldenMobile = mobileMatch[0];

// CSS Golden values from index.html to ensure the new HTML styling works perfectly
const cssUpdates = {
    '.nav-links': 'display: flex; align-items: center; gap: 32px;',
    '.nav-dropdown > a svg': 'width: 10px; height: 10px;',
    '.mobile-dropdown-toggle svg': 'width: 10px; height: 6px; stroke: currentColor; fill: none; stroke-width: 1.5; transition: transform var(--transition);',
    '.mobile-close': 'position: absolute; top: 24px; right: 24px; background: none; border: none; cursor: pointer; font-size: 28px; color: var(--ink);'
};

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace <nav ...> ... </nav>
    content = content.replace(/<nav id="navbar"[^>]*>[\s\S]*?<\/nav>/, goldenNav);
    
    // Replace mobile menu
    content = content.replace(/<div class="mobile-menu" id="mobileMenu">[\s\S]*?<\/div>/, goldenMobile);
    
    // Apply minor CSS fixes to make sure it matches index.html precisely
    content = content.replace(/\.nav-dropdown > a svg \{ width: 10px; height: 10px; \}/, '.nav-dropdown > a svg { width: 10px; height: 6px; }');
    content = content.replace(/width: 14px; height: 8px/g, 'width: 10px; height: 6px'); // Fix mobile svg caret size
    content = content.replace(/<svg viewBox="0 0 24 24">/g, '<svg viewBox="0 0 10 6">'); // Replace old svg viewboxes

    fs.writeFileSync(path.join(dir, file), content);
    console.log('Updated ' + file);
});
