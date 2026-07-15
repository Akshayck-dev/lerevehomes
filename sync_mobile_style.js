const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\ACER\\Downloads\\Le Reve';

const htmlFiles = fs.readdirSync(dir)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

// The golden mobile menu CSS from index.html
const goldenCSS = `
    /* ============================================================
       MOBILE MENU (matches homepage exactly)
    ============================================================ */
    .nav-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
    .nav-toggle span { display: block; width: 24px; height: 1.5px; background: var(--ink); transition: background 0.4s; }
    .mobile-menu {
      display: none; position: fixed; inset: 0; background: #fff; z-index: 999;
      flex-direction: column; padding: 100px 32px 40px;
    }
    .mobile-menu.open { display: flex; }
    .mobile-menu > a {
      display: block; padding: 14px 0; font-size: 22px; font-family: 'Cormorant Garamond', Georgia, serif;
      border-bottom: 1px solid #e8e2d6; color: #1a1a1a;
    }
    .mobile-menu > a:hover { color: #b8912a; }
    .mobile-close {
      position: absolute; top: 24px; right: 24px;
      background: none; border: none; cursor: pointer; font-size: 28px; color: #1a1a1a;
    }
    .mobile-dropdown { display: flex; flex-direction: column; border-bottom: 1px solid #e8e2d6; }
    .mobile-dropdown-toggle { 
      display: flex; align-items: center; justify-content: space-between; 
      padding: 14px 0; font-size: 22px; font-family: 'Cormorant Garamond', Georgia, serif;
      color: #1a1a1a; cursor: pointer;
    }
    .mobile-dropdown-toggle svg { width: 14px; height: 8px; stroke: currentColor; fill: none; stroke-width: 1.5; transition: transform 0.4s; }
    .mobile-dropdown.open .mobile-dropdown-toggle svg { transform: rotate(180deg); color: #b8912a; }
    .mobile-dropdown-menu {
      display: none; flex-direction: column; padding-left: 20px; padding-bottom: 10px;
    }
    .mobile-dropdown.open .mobile-dropdown-menu { display: flex; }
    .mobile-dropdown-menu a { border-bottom: none; font-size: 16px; padding: 10px 0; font-family: 'Jost', sans-serif; color: #1a1a1a; }
    .mobile-dropdown-menu a:hover { color: #b8912a; }
    @media (max-width: 950px) {
      .nav-links { display: none !important; }
      .nav-toggle { display: flex !important; }
    }
`;

// The golden mobile menu JS
const goldenJS = `
    // Mobile menu toggle
    document.getElementById('navToggle').addEventListener('click', () =>
      document.getElementById('mobileMenu').classList.add('open'));
    document.getElementById('mobileClose').addEventListener('click', () =>
      document.getElementById('mobileMenu').classList.remove('open'));
    // Mobile submenu dropdowns
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.parentElement.classList.toggle('open');
      });
    });
`;

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  // 1. Inject CSS just before </style></head> if not already there
  if (!html.includes('MOBILE MENU (matches homepage exactly)')) {
    // Find the last </style> before </head>
    const styleEnd = html.lastIndexOf('</style>', html.indexOf('</head>'));
    if (styleEnd !== -1) {
      html = html.slice(0, styleEnd) + goldenCSS + '\n  ' + html.slice(styleEnd);
      console.log(file + ': CSS injected');
    } else {
      console.log(file + ': No </style> found before </head>');
    }
  } else {
    console.log(file + ': CSS already present');
  }
  
  // 2. Make sure the JS is there (all three listeners)
  if (!html.includes("querySelectorAll('.mobile-dropdown-toggle')")) {
    // Find </script> near end of file
    const lastScript = html.lastIndexOf('</script>');
    if (lastScript !== -1) {
      html = html.slice(0, lastScript) + goldenJS + '\n  ' + html.slice(lastScript);
      console.log(file + ': JS injected');
    }
  } else {
    console.log(file + ': JS already present');
  }
  
  fs.writeFileSync(filePath, html);
});

console.log('\nDone!');
