# Jason Dunn For Congress - Campaign Website

A professional one-page scrolling campaign website for Jason Dunn's congressional campaign.

## Features

- Eye-catching hero banner with patriotic color scheme
- Under construction notice
- Bold mission statement focused on accountability
- Video placeholders for Introduction, Why Vote for Jason, and Platform & Stances
- Contact form with Netlify Forms integration
- Fully responsive design
- Red and blue patriotic theme

## Setup Instructions

### Deploying to GitHub Pages

1. **Create a new repository** on GitHub (if you haven't already)
   - Name it whatever you like (e.g., `jasondunnforcongress`)
   - Make it public

2. **Upload these files** to your repository:
   - `index.html`
   - `styles.css`
   - `CNAME`

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Source", select "main" branch
   - Click Save

4. **Set up custom domain** (if using jasondunnforcongress.com):
   - In Cloudflare DNS, add:
     - CNAME record: `www` → `yourusername.github.io`
     - A records pointing to GitHub's IPs (see main conversation for details)
   - Wait for DNS propagation (5-30 minutes)
   - Enable "Enforce HTTPS" in GitHub Pages settings

### Contact Form Setup

The contact form is now on a **separate page** (`contact.html`) and submits directly to **Google Sheets**.

**Setup Instructions:**

1. **Create a Google Sheet**:
   - Go to https://sheets.google.com and create a new spreadsheet
   - Name it "Jason Dunn Campaign Contacts"
   - Add headers in row 1: Timestamp, Name, Email, Phone, ZIP Code, Interest, Message
   - Copy the Spreadsheet ID from the URL

2. **Set up Google Apps Script**:
   - Open `google-apps-script.js` and follow the detailed instructions inside
   - Go to https://script.google.com and create a new project
   - Paste the code from the file (replacing the Spreadsheet ID)
   - Deploy as a web app
   - Copy the deployment URL

3. **Update contact.html**:
   - Open `contact.html`
   - Find `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
   - Replace with your actual deployment URL
   - Save and upload to GitHub

**See `google-apps-script.js` for complete step-by-step instructions with screenshots descriptions.**

### Adding Videos Later

When you have videos ready, replace the placeholder divs with embedded videos:

```html
<!-- Replace the video-placeholder div with: -->
<div class="video-container">
    <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
    </iframe>
</div>
```

Then add this CSS:
```css
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    max-width: 800px;
    margin: 40px auto;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

## Customization

### Colors
To adjust the red/blue theme, modify these variables in `styles.css`:
- Primary blue: `#1e3a8a`
- Primary red: `#b91c1c`

### Mission Statement
Edit the mission text in `index.html` under the `<section class="mission">` section.

### Contact Form Fields
Add or remove form fields in the `<section id="contact-form">` section of `index.html`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

© 2025 Jason Dunn For Congress. All rights reserved.
