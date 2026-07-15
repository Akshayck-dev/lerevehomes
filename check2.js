const fs = require('fs');
['contact.html','Services.html'].forEach(f => {
    const c = fs.readFileSync(f,'utf8');
    const matches = (c.match(/<div class="mobile-dropdown-menu">/g) || []).length;
    console.log(f + ': HTML mobile-dropdown-menu divs=' + matches);
});
