const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Users\\\\ACER\\\\Downloads\\\\Le Reve';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// This was the broken regex that generated the bad string
const badMatch = indexHtml.match(/<div class="mobile-menu" id="mobileMenu">[\s\S]*?<\/div>/);
const badString = badMatch[0];

const goldenMobile = `  <div class="mobile-menu" id="mobileMenu">
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
    
    // Replace the bad injected string with the golden string
    if (content.includes(badString)) {
        content = content.replace(badString, goldenMobile);
        fs.writeFileSync(path.join(dir, file), content);
        console.log('Fixed ' + file);
    } else {
        console.log('Bad string not found in ' + file);
    }
});
