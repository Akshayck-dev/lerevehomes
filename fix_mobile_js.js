const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\ACER\\Downloads\\Le Reve';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

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

  // Inject JS if it doesn't already have the loop
  if (!content.includes("querySelectorAll('.mobile-dropdown-toggle')")) {
    content = content.replace(/\s*\/\* ---- Mobile menu ---- \*\/[\s\S]*?classList\.remove\('open'\)\);/, "\n" + newJs);
    fs.writeFileSync(p, content);
    console.log('Fixed JS in', file);
  }
}
