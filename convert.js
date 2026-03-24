const fs = require('fs');
const path = require('path');

// Template header and footer
const getHeader = (title, activePage) => `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="icon" type="image/png" href="../static/images/logo.png">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
  <link rel="stylesheet" href="../static/css/style.css">
</head>

<body>
  <div id="splash-screen" class="splash-screen">
    <div class="splash-orb splash-orb-1"></div>
    <div class="splash-orb splash-orb-2"></div>
    <div class="splash-orb splash-orb-3"></div>
    <div class="splash-content">
      <div class="splash-logo-wrap">
        <img src="../static/images/logo.png" alt="School Logo" class="splash-logo">
      </div>
      <h1 class="splash-name">HOLYFAITH ENGLISH SCHOOL</h1>
      <p class="splash-tagline">We Shape Your Future.</p>
    </div>
    <button class="splash-skip" onclick="skipSplash()">Skip Intro</button>
  </div>

  <script>
    function skipSplash() {
      const splash = document.getElementById('splash-screen');
      if (splash) {
        splash.classList.add('hidden');
        sessionStorage.setItem('splashShown', 'true');
        document.body.classList.add('splash-finished');
      }
    }

    (function () {
      const splash = document.getElementById('splash-screen');
      if (sessionStorage.getItem('splashShown')) {
        splash.style.display = 'none';
        document.body.classList.add('splash-finished');
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => {
            skipSplash();
            document.body.classList.add('splash-finished');
          }, 3000);
        });
      }
    })();
  </script>

  <div class="tricolor"><span></span><span></span><span></span></div>

  <header class="header" id="header">
    <div class="container">
      <div class="nav__card">
        <a href="index.html" class="nav__logo">
          <img src="../static/images/logo.png" alt="HOLYFAITH Logo" class="nav__logo-img">
          <span class="nav__logo-name">HOLYFAITH ENGLISH SCHOOL</span>
        </a>
        <nav class="nav__center" id="nav-menu">
          <ul class="nav__list">
            <li><a href="index.html" class="nav__link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
            <li><a href="about.html" class="nav__link ${activePage === 'about' ? 'active' : ''}">About Us</a></li>
            <li><a href="academics.html" class="nav__link ${activePage === 'academics' ? 'active' : ''}">Academics</a></li>
            <li><a href="admissions.html" class="nav__link ${activePage === 'admissions' ? 'active' : ''}">Admissions</a></li>
            <li><a href="contact.html" class="nav__link ${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
          </ul>
        </nav>
        <div class="nav__right">
          <a href="admissions.html" class="nav__apply">Apply Now <i class="fas fa-arrow-up-right-from-square"></i></a>
        </div>
        <div class="nav__toggle" id="nav-toggle"><i class="fas fa-bars"></i></div>
      </div>
    </div>
  </header>

  <div class="nav__overlay"></div>

  <main>
`;

const getFooter = () => `
  </main>

  <footer class="footer">
    <div class="footer__wave">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,40 1440,50 L1440,0 L0,0 Z" fill="var(--bg)"></path>
      </svg>
    </div>
    <div class="container">
      <div class="footer__grid">
        <div class="footer__col">
          <div class="footer__brand">
            <img src="../static/images/logo.png" alt="Logo" class="footer__logo">
            <div>
              <h3 class="footer__brand-name">HOLYFAITH ENGLISH SCHOOL</h3>
              <p class="footer__brand-sub">We Shape Your Future</p>
            </div>
          </div>
          <p class="footer__desc">Established in 2007, HOLYFAITH ENGLISH SCHOOL is committed to shaping confident, responsible, and future-ready students through quality education and innovative teaching.</p>
          <div class="footer__social">
            <a href="#" class="footer__social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/holyfaith.official" class="footer__social-link" aria-label="Instagram" target="_blank" rel="noopener"><i class="fab fa-instagram"></i></a>
            <a href="#" class="footer__social-link" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
            <a href="https://wa.me/919923873374" class="footer__social-link" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>
        <div class="footer__col">
          <h4 class="footer__heading">Quick Links</h4>
          <ul class="footer__links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="academics.html">Academics</a></li>
            <li><a href="admissions.html">Admissions</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4 class="footer__heading">Our Programs</h4>
          <ul class="footer__links">
            <li><a href="academics.html">Nursery</a></li>
            <li><a href="academics.html">LKG &amp; UKG</a></li>
            <li><a href="academics.html">Standard 1–5</a></li>
            <li><a href="academics.html">Robotics &amp; AI</a></li>
            <li><a href="academics.html">Smart Education</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4 class="footer__heading">Contact Us</h4>
          <ul class="footer__contact">
            <li><i class="fas fa-map-marker-alt"></i><span>HOLYFAITH ENGLISH SCHOOL,<br>Rukadi, Kolhapur</span></li>
            <li><i class="fas fa-phone-alt"></i><span><a href="https://wa.me/919923873374" style="color:inherit" target="_blank" rel="noopener">+91 9923873374</a> / <a href="https://wa.me/917058522522" style="color:inherit" target="_blank" rel="noopener">7058522522</a></span></li>
            <li><i class="fas fa-envelope"></i><span><a href="mailto:holyfaithenglishschool2007@gmail.com" style="color:inherit">holyfaithenglishschool2007@gmail.com</a></span></li>
            <li><i class="fas fa-clock"></i><span>Mon – Sat: 8 AM – 4 PM</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tricolor"><span></span><span></span><span></span></div>
    <div class="footer__bottom">
      <div class="container">
        <p>&copy; 2026 HOLYFAITH ENGLISH SCHOOL. All Rights Reserved. | We Shape Your Future</p>
      </div>
    </div>
  </footer>

  <button class="scroll-top" id="scroll-top" aria-label="Scroll to top"><i class="fas fa-arrow-up"></i></button>

  <script src="../static/js/main.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
  <script>AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });</script>
</body>

</html>`;

function convertContent(content) {
  // Remove Flask template syntax
  content = content.replace(/{%\s*extends\s+['"]base\.html['"]\s*%}/g, '');
  content = content.replace(/{%\s*block\s+title\s*%}(.*?){%\s*endblock\s*%}/gs, '');
  content = content.replace(/{%\s*block\s+content\s*%}/g, '');
  content = content.replace(/{%\s*endblock\s*%}/g, '');
  content = content.replace(/{%\s*block\s+scripts\s*%}.*?{%\s*endblock\s*%}/gs, '');
  
  // Replace url_for for static files
  content = content.replace(/{{\s*url_for\('static',\s*filename='([^']*)'\)\s*}}/g, '../static/$1');
  
  // Replace url_for for pages
  content = content.replace(/{{\s*url_for\('home'\)\s*}}/g, 'index.html');
  content = content.replace(/{{\s*url_for\('about'\)\s*}}/g, 'about.html');
  content = content.replace(/{{\s*url_for\('academics'\)\s*}}/g, 'academics.html');
  content = content.replace(/{{\s*url_for\('admissions'\)\s*}}/g, 'admissions.html');
  content = content.replace(/{{\s*url_for\('contact'\)\s*}}/g, 'contact.html');
  content = content.replace(/{{\s*url_for\('submit_contact'\)\s*}}/g, '#');
  
  // Remove Flask flash message blocks
  content = content.replace(/{%\s*with\s+messages.*?{%\s*endwith\s*%}/gs, '');
  
  // Remove Flask conditionals
  content = content.replace(/{%\s*if\s+request\.endpoint\s*==\s*'[^']*'\s*%}active{%\s*endif\s*%}/g, '');
  
  // Remove Supabase config
  content = content.replace(/{{\s*config\.\w+\s*}}/g, '');
  
  return content.trim();
}

const files = [
  { input: 'about.html', title: 'About Us – HOLYFAITH ENGLISH SCHOOL, Rukadi', active: 'about' },
  { input: 'contact.html', title: 'Contact Us – HOLYFAITH ENGLISH SCHOOL', active: 'contact' },
  { input: 'admissions.html', title: 'Admissions – HOLYFAITH ENGLISH SCHOOL', active: 'admissions' },
  { input: 'academics.html', title: 'Academics – HOLYFAITH ENGLISH SCHOOL', active: 'academics' }
];

console.log('Converting Flask HTML files to standalone HTML...\n');

files.forEach(file => {
  const inputPath = path.join(__dirname, 'public', file.input);
  const outputPath = inputPath;
  
  console.log(`Processing: ${file.input}`);
  
  try {
    const content = fs.readFileSync(inputPath, 'utf8');
    const convertedContent = convertContent(content);
    const fullHTML = getHeader(file.title, file.active) + convertedContent + getFooter();
    
    fs.writeFileSync(outputPath, fullHTML, 'utf8');
    console.log(`✓ Converted: ${file.input}\n`);
  } catch (error) {
    console.error(`✗ Error processing ${file.input}:`, error.message);
  }
});

console.log('Conversion complete!');
console.log('\nNow creating vercel.json...');

const vercelConfig = {
  "version": 2,
  "builds": [
    {
      "src": "public/**/*.html",
      "use": "@vercel/static"
    },
    {
      "src": "static/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)\\.html",
      "dest": "/public/$1.html"
    },
    {
      "src": "/",
      "dest": "/public/index.html"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1.html"
    }
  ]
};

fs.writeFileSync(path.join(__dirname, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));
console.log('✓ Created vercel.json');

console.log('\n✓ All done! Your project is ready to deploy on Vercel.');
console.log('\nTo deploy:');
console.log('1. Install Vercel CLI: npm install -g vercel');
console.log('2. Run: vercel');
