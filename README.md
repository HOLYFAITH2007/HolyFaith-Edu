# HOLYFAITH ENGLISH SCHOOL Website

This is a static website for HOLYFAITH ENGLISH SCHOOL, converted from Flask/Python to pure HTML, CSS, and JavaScript for deployment on Vercel.

## Project Structure

```
HolyFaith/
├── public/              # HTML pages
│   ├── index.html      # Home page
│   ├── about.html      # About Us page
│   ├── academics.html  # Academics page
│   ├── admissions.html # Admissions page
│   └── contact.html    # Contact page
├── static/             # Static assets
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   ├── images/        # Images and logos
│   └── downloads/     # Downloadable files (PDFs)
├── vercel.json        # Vercel deployment configuration
└── README.md          # This file
```

## Changes Made

✅ **Removed all Python/Flask code:**
- Removed `{% extends %}`, `{% block %}`, and other Jinja2 template syntax
- Removed `{{ url_for() }}` functions
- Removed Flask flash message system
- Removed server-side form processing

✅ **Fixed all file paths:**
- Static assets now use relative paths: `../static/...`
- Page links now use direct HTML file names: `index.html`, `about.html`, etc.

✅ **Updated form handling:**
- Forms now use client-side JavaScript
- Contact form shows confirmation alerts
- Admission form shows confirmation alerts

✅ **Created Vercel configuration:**
- Added `vercel.json` for proper routing and deployment

## How to Deploy on Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Navigate to the project directory:
```bash
cd C:\Users\saksh\OneDrive\Desktop\HolyFaith
```

3. Deploy to Vercel:
```bash
vercel
```

4. Follow the prompts to complete deployment.

### Option 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Or upload the project folder directly
5. Vercel will automatically detect the configuration
6. Click "Deploy"

## Local Testing

To test the website locally:

1. Use a local server (recommended):
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

2. Open your browser and navigate to:
```
http://localhost:8000/public/index.html
```

**Note:** Don't open HTML files directly in the browser (file:// protocol) as some features may not work correctly.

## Features

- ✨ Responsive design
- 📱 Mobile-friendly navigation
- 🎨 Modern UI with animations (AOS library)
- 📝 Contact form
- 📋 Admission enquiry form
- 📄 Downloadable brochures and forms
- 🗺️ Google Maps integration
- 🌐 Social media links

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling
- **JavaScript** - Interactivity
- **Font Awesome** - Icons
- **AOS (Animate On Scroll)** - Scroll animations
- **Google Fonts** - Typography

## Forms Note

Currently, forms display confirmation alerts but don't send data to a backend. To enable form submissions:

1. **Option A:** Set up a form service like:
   - [Formspree](https://formspree.io/)
   - [Netlify Forms](https://www.netlify.com/products/forms/)
   - [Web3Forms](https://web3forms.com/)

2. **Option B:** Create a serverless API endpoint in Vercel to handle form submissions.

3. **Option C:** Re-enable Supabase by adding your credentials in `admissions.html`

## Support

For issues or questions, contact:
- Email: holyfaithenglishschool2007@gmail.com
- Phone: +91 9923873374 / 7058522522

## License

© 2026 HOLYFAITH ENGLISH SCHOOL. All Rights Reserved.
