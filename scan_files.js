const fs = require('fs');

const files = ['about.html','architectural_designing.html','contact.html','Contractors.html','Interior Designing.html','Project Management.html','Services.html'];

files.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    // Find ALL occurrences of mobile-dropdown-menu
    const regex = /mobile-dropdown-menu/g;
    let count = 0;
    let m;
    while((m = regex.exec(c)) !== null) count++;
    
    // Also find all mobile-menu id=mobileMenu
    const mobileMenuCount = (c.match(/id="mobileMenu"/g) || []).length;
    
    console.log(f + ': mobile-dropdown-menu count=' + count + ', mobileMenu divs=' + mobileMenuCount);
});
