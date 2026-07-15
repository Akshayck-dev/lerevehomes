const fs = require('fs');

const filesToFix = [
  'c:\\Users\\ACER\\Downloads\\Le Reve\\int-gallery.html',
  'c:\\Users\\ACER\\Downloads\\Le Reve\\ext-gallery.html',
  'c:\\Users\\ACER\\Downloads\\Le Reve\\contact.html'
];

const newMobileMenu = `  <div class="mobile-menu" id="mobileMenu">
    <button class="mobile-close" id="mobileClose">×</button>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <div class="mobile-dropdown">
      <div class="mobile-dropdown-toggle">Services <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></div>
      <div class="mobile-dropdown-menu">
        <a href="architectural_designing.html">Architectural Designing</a>
        <a href="Project Management.html">Project Management</a>
        <a href="Interior Designing.html">Interior Designing</a>
        <a href="Contractors.html">Contractors</a>
      </div>
    </div>
    <div class="mobile-dropdown">
      <div class="mobile-dropdown-toggle">Gallery <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></div>
      <div class="mobile-dropdown-menu">
        <a href="int-gallery.html">Interior Gallery</a>
        <a href="ext-gallery.html">Exterior Gallery</a>
      </div>
    </div>
    <a href="testimonials.html">Testimonials</a>
    <a href="contact.html">Contact</a>
  </div>`;

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Use regex to find and replace the entire <div class="mobile-menu" id="mobileMenu"> block
    // Assuming the block ends with the </a> for contact.html followed by </div>
    const regex = /<div class="mobile-menu" id="mobileMenu">[\s\S]*?<a href="contact\.html">Contact<\/a>\s*<\/div>/g;
    
    html = html.replace(regex, newMobileMenu);
    
    fs.writeFileSync(filePath, html);
    console.log('Fixed', filePath);
  }
});
