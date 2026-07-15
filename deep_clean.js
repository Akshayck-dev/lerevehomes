const fs = require('fs');

const files = ['about.html','architectural_designing.html','contact.html','Contractors.html','Interior Designing.html','Project Management.html','Services.html'];

files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    
    // Fix bad indentation on mobile-menu div
    c = c.replace('      <div class="mobile-menu" id="mobileMenu">', '  <div class="mobile-menu" id="mobileMenu">');
    
    // Remove the leftover garbage fragment that starts after the mobile menu closing </div>
    // The garbage looks like:
    //   </div>
    //       <div class="mobile-dropdown-menu">
    //         ...
    //   </div>
    // followed by real page content
    
    // Strategy: remove everything between the "Get In Touch" line's closing </div> and the next real HTML section
    // by finding the garbage block specifically
    const garbagePattern = /(<\/div>\n)\s*<div class="mobile-dropdown-menu">[\s\S]*?<\/div>\s*<\/div>(\s*\n\s*<[!a-z])/;
    const match = c.match(garbagePattern);
    if (match) {
        c = c.replace(garbagePattern, '$1$2');
        console.log(f + ': Removed garbage.');
    } else {
        console.log(f + ': Pattern not found, trying fallback...');
        // Fallback: find the specific double-</div> that closes both the garbage and the first clean div
        // This is the section: "  </div>\n      <div class="mobile-dropdown-menu">..."
        const fallback = /(<a href="contact\.html" style="color:var\(--gold\);margin-top:8px;">Get In Touch →<\/a>\n  <\/div>)\s*\n\s*<div class="mobile-dropdown-menu">[\s\S]*?<\/div>\s*(<[!a-z])/;
        const m2 = c.match(fallback);
        if (m2) {
            c = c.replace(fallback, '$1\n\n  $2');
            console.log(f + ': Fallback worked!');
        } else {
            console.log(f + ': Could not fix automatically.');
        }
    }
    
    fs.writeFileSync(f, c);
});
