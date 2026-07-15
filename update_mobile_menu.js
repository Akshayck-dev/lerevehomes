const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\ACER\\Downloads\\Le Reve';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldMobileMenu = `  <!-- Mobile menu -->
  <div class="mobile-menu" id="mobileMenu">
    <button class="mobile-close" id="mobileClose">✕</button>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="architectural_designing.html">Architectural Designing</a>
    <a href="Project Management.html">Project Management</a>
    <a href="Interior Designing.html">Interior Designers</a>
    <a href="Contractors.html">Contractors</a>
    <a href="int-gallery.html">Interior Gallery</a>
    <a href="ext-gallery.html">Exterior Gallery</a>
    <a href="testimonials.html">Testimonials</a>
    <a href="contact.html">Contact</a>
    <a href="contact.html" style="color:var(--gold);margin-top:8px;">Get In Touch →</a>
  </div>`;

const newMobileMenu = `  <!-- Mobile menu -->
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

const newCss = `
    .mobile-dropdown { display: flex; flex-direction: column; border-bottom: 1px solid var(--line); }
    .mobile-dropdown-toggle { 
      display: flex; align-items: center; justify-content: space-between; 
      padding: 14px 0; font-size: 22px; font-family: var(--ff-display);
      color: var(--ink); cursor: pointer;
    }
    .mobile-dropdown-toggle svg { width: 14px; height: 8px; stroke: currentColor; fill: none; stroke-width: 1.5; transition: transform var(--transition); }
    .mobile-dropdown.open .mobile-dropdown-toggle svg { transform: rotate(180deg); color: var(--gold); }
    .mobile-dropdown-menu {
      display: none; flex-direction: column; padding-left: 20px; padding-bottom: 10px;
    }
    .mobile-dropdown.open .mobile-dropdown-menu { display: flex; }
    .mobile-dropdown-menu a { border-bottom: none; font-size: 16px; padding: 10px 0; font-family: var(--ff-body); }
  </style>`;

const newJs = `    /* ---- Mobile menu ---- */
    document.getElementById('navToggle').addEventListener('click', () =>
      document.getElementById('mobileMenu').classList.add('open'));
    document.getElementById('mobileClose').addEventListener('click', () =>
      document.getElementById('mobileMenu').classList.remove('open'));
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.parentElement.classList.toggle('open');
      });
    });`;

for (let file of files) {
  let p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');

  // Replace HTML
  if (content.includes('Architectural Designing</a>') && content.includes('Contractors</a>') && content.includes('id="mobileMenu"')) {
    let startIdx = content.indexOf('  <!-- Mobile menu -->');
    let endIdx = content.indexOf('</div>', startIdx) + 6;
    if(startIdx !== -1) {
       content = content.substring(0, startIdx) + newMobileMenu + content.substring(endIdx);
    }
  }

  // Inject CSS before </style>
  if (!content.includes('.mobile-dropdown {')) {
    content = content.replace('  </style>', newCss);
  }

  // Inject JS
  if (!content.includes('.mobile-dropdown-toggle')) {
    content = content.replace(/    \/\* ---- Mobile menu ---- \*\/[\s\S]*?classList\.remove\('open'\)\);/, newJs);
  }

  fs.writeFileSync(p, content);
  console.log('Updated', file);
}
