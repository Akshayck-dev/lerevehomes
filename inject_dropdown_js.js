const fs = require('fs');

const htmlFiles = [
  'c:\\Users\\ACER\\Downloads\\Le Reve\\int-gallery.html',
  'c:\\Users\\ACER\\Downloads\\Le Reve\\ext-gallery.html',
  'c:\\Users\\ACER\\Downloads\\Le Reve\\about.html',
  'c:\\Users\\ACER\\Downloads\\Le Reve\\contact.html',
  'c:\\Users\\ACER\\Downloads\\Le Reve\\Contractors.html',
  'c:\\Users\\ACER\\Downloads\\Le Reve\\Interior Designing.html',
  'c:\\Users\\ACER\\Downloads\\Le Reve\\Project Management.html',
  'c:\\Users\\ACER\\Downloads\\Le Reve\\architectural_designing.html',
  'c:\\Users\\ACER\\Downloads\\Le Reve\\Services.html',
  'c:\\Users\\ACER\\Downloads\\Le Reve\\testimonials.html',
];

// The dropdown toggle JS to inject
const dropdownToggleJS = `\n    // Mobile submenu dropdowns\n    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {\n      toggle.addEventListener('click', () => {\n        toggle.parentElement.classList.toggle('open');\n      });\n    });`;

htmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log('SKIP (not found): ' + filePath);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Check if the dropdown toggle listener already exists
  if (html.includes('mobile-dropdown-toggle')) {
    // Check if the JS event listener specifically is there
    if (html.includes("querySelectorAll('.mobile-dropdown-toggle')")) {
      console.log('ALREADY HAS IT: ' + filePath);
      return;
    }
  }

  // Inject the dropdown toggle JS right after the mobileClose listener
  const anchor = "document.getElementById('mobileClose').addEventListener('click', () =>\n      document.getElementById('mobileMenu').classList.remove('open'));";
  
  if (html.includes(anchor)) {
    html = html.replace(anchor, anchor + dropdownToggleJS);
    fs.writeFileSync(filePath, html);
    console.log('FIXED: ' + filePath);
  } else {
    // Try alternate format
    const anchor2 = "document.getElementById('mobileClose').addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));";
    if (html.includes(anchor2)) {
      html = html.replace(anchor2, anchor2 + dropdownToggleJS);
      fs.writeFileSync(filePath, html);
      console.log('FIXED (alt): ' + filePath);
    } else {
      console.log('ANCHOR NOT FOUND: ' + filePath);
    }
  }
});
