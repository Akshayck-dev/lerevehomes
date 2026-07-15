const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\ACER\\Downloads\\Le Reve';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newMediaQuery = `@media (max-width: 560px) {
      #footer .footer-top { grid-template-columns: 1fr 1fr; gap: 30px; }
      #footer .footer-brand { grid-column: span 2; }
      #footer .footer-col:last-child { grid-column: span 2; }
    }`;

let updatedCount = 0;

for (let file of files) {
  let p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');

  // Replace @media (max-width: 560px) { #footer .footer-top { grid-template-columns: 1fr; } }
  // OR @media (max-width: 560px) { .footer-top { grid-template-columns: 1fr; } }
  
  const regex = /@media\s*\(\s*max-width\s*:\s*560px\s*\)\s*\{\s*(?:#footer\s*)?\.footer-top\s*\{\s*grid-template-columns\s*:\s*1fr;\s*\}\s*\}/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, newMediaQuery);
    fs.writeFileSync(p, content);
    console.log('Updated', file);
    updatedCount++;
  } else {
    console.log('Skipped', file, '(Pattern not found)');
  }
}

console.log('Total files updated:', updatedCount);
