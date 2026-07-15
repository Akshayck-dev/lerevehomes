const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\ACER\\Downloads\\Le Reve';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const goldenMobile = `  <!-- MOBILE MENU -->
  <div class="mobile-menu" id="mobileMenu">
    <button class="mobile-close" id="mobileClose">✕</button>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    
    <div class="mobile-dropdown">
      <div class="mobile-dropdown-toggle">Services <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></div>
      <div class="mobile-dropdown-menu">
        <a href="architectural_designing.html">Architectural Designing</a>
        <a href="Project Management.html">Project Management</a>
        <a href="Interior Designing.html">Interior Designers</a>
        <a href="Contractors.html">Contractors</a>
      </div>
    </div>

    <div class="mobile-dropdown">
      <div class="mobile-dropdown-toggle">Gallery <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></div>
      <div class="mobile-dropdown-menu">
        <a href="int-gallery.html">Interior Gallery</a>
        <a href="ext-gallery.html">Exterior Gallery</a>
      </div>
    </div>

    <a href="testimonials.html">Testimonials</a>
    <a href="contact.html">Contact</a>
    <a href="contact.html" style="color:var(--gold);margin-top:8px;">Get In Touch →</a>
  </div>`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Nuclear approach: find everything between </nav> and the next major section
    // Replace the entire chunk that includes the mobile menu (and any leftover garbage)
    // with just the golden mobile menu
    
    // Pattern: find the mobile-menu div (wherever it starts) and clean up
    // by finding ALL content from "<!-- MOBILE MENU -->" or first mobile-menu div
    // through to the next page section marker
    
    // Strategy: Find the block starting from the mobile menu comment (or just the div)
    // and ending JUST BEFORE the next non-mobile section (<!-- HERO, <!-- PAGE, <!-- ABOUT, etc.)
    const mobileBlockRegex = /(?:<!-- MOBILE MENU -->)?\s*<div class="mobile-menu" id="mobileMenu">[\s\S]*?<!-- (?:HERO|ABOUT|PAGE|GALLERY|SERVICES|CONTACT|INTERIOR|EXTERIOR|SECTION|=+)/;
    
    const match = content.match(mobileBlockRegex);
    if (match) {
        // keep the next section comment intact
        const nextSectionComment = match[0].match(/<!-- (?:HERO|ABOUT|PAGE|GALLERY|SERVICES|CONTACT|INTERIOR|EXTERIOR|SECTION|=+)[\s\S]*$/)[0];
        content = content.replace(mobileBlockRegex, goldenMobile + '\n\n  ' + nextSectionComment);
        fs.writeFileSync(path.join(dir, file), content);
        console.log('Cleaned ' + file);
    } else {
        // Try a simpler approach: just remove everything between first </div> after mobile-menu and the next <!-- section
        // Look for duplicate leftovers after the closing </div> of mobile menu
        // Find the mobile menu closing div + any garbage before the next real section
        const cleanRegex = /(  <\/div>\n)\s*(?:<div class="mobile-dropdown[\s\S]*?<\/div>\s*)*(\s*  <!-- )/g;
        const cleaned = content.replace(cleanRegex, '$1\n$2');
        if (cleaned !== content) {
            fs.writeFileSync(path.join(dir, file), cleaned);
            console.log('Garbage cleaned from ' + file);
        } else {
            console.log('No match for ' + file + ' - manual check needed');
        }
    }
});
