# 🚀 Deployment Guide — HMG Technologies Website v2.0
## Complete, Unambiguous, Step-by-Step Instructions

---

## OVERVIEW

This website is a **pure static site** — HTML, CSS, and JavaScript only.
- No server required
- No npm or build process
- No databases (Formspree handles form submissions)
- No paid services required
- Works on GitHub Pages, Cloudflare Pages, or Vercel — all free

**Estimated total setup time: 20–40 minutes (most of that is waiting for deploys)**

---

## STEP 0 — BEFORE YOU START (Preparation Checklist)

Complete these before touching any deployment platform:

### 0a. Confirm your file structure
Open your `tech-v2` folder and verify these files exist:
```
tech-v2/
├── index.html      ✅
├── services.html   ✅
├── products.html   ✅
├── about.html      ✅
├── portfolio.html  ✅
├── contact.html    ✅
├── assets/
│   ├── css/style.css   ✅
│   ├── js/main.js      ✅
│   └── images/         ✅ (folder exists, logo goes here)
├── README.md       ✅
├── DEPLOYMENT.md   ✅
└── .gitignore      ✅
```

### 0b. Add your logo (optional but recommended)
1. Take your HMG Technologies logo file
2. Rename it to exactly: `logo.png`
3. Place it inside `assets/images/`
4. If you don't have a logo yet, the site shows "HMG Technologies" text — that's fine for now

### 0c. Set up your contact form (required for form to work)
1. Open your browser and go to: **https://formspree.io**
2. Click **"Get Started"** → sign up with your Gmail
3. Click **"+ New Form"**
4. Name it: `HMG Technologies Contact`
5. Click **Create Form**
6. Copy the **Form ID** shown (looks like: `xpznkwqr`)
7. Open `index.html` in any text editor (Notepad, VS Code, Acode)
8. Find this text (around line 470):
   ```
   action="https://formspree.io/f/your-hmgtech-form-id"
   ```
9. Replace `your-hmgtech-form-id` with your real ID:
   ```
   action="https://formspree.io/f/xpznkwqr"
   ```
10. Save the file
11. Do the same in `contact.html` (same search and replace)

---

## STEP 1 — CREATE A GITHUB ACCOUNT (Skip if you already have one)

1. Open: **https://github.com**
2. Click **"Sign up"** (top right)
3. Enter your email address
4. Create a username and password
5. Verify your email
6. You're done — you have a GitHub account

**Note:** You already have `@cssadewale` and `@hmgtechnologies` GitHub accounts.
For this website, you can use either:
- The `@hmgtechnologies` organisation account (most appropriate)
- Your personal `@cssadewale` account

---

## STEP 2 — CREATE A NEW GITHUB REPOSITORY

1. Log in to GitHub
2. Click the **`+`** button in the top-right corner
3. Click **"New repository"**
4. Fill in the form:
   - **Repository name:** `hmgtechnologies-website` (or just `website`)
   - **Description:** `HMG Technologies official website — AI-Augmented Tools for Nigerian Businesses`
   - **Visibility:** ✅ Public (required for free hosting)
   - Do NOT check "Add a README file" (you already have one)
   - Do NOT add .gitignore (you already have one)
5. Click **"Create repository"** (green button)
6. You now see an empty repository page — keep this tab open

---

## STEP 3 — UPLOAD YOUR FILES TO GITHUB

### Method A: GitHub Web Interface (EASIEST — no software needed)

1. On the empty repository page, click **"uploading an existing file"**
   (it appears in the middle of the page as a link)
2. Open your `tech-v2` folder on your computer/tablet
3. Select ALL files and folders:
   - `index.html`
   - `services.html`
   - `products.html`
   - `about.html`
   - `portfolio.html`
   - `contact.html`
   - `README.md`
   - `DEPLOYMENT.md`
   - `.gitignore`
   - The entire `assets/` folder (drag it — GitHub uploads all subfolders)
4. Drag everything into the GitHub upload area
5. Wait for all files to appear in the file list
6. Scroll down to the **"Commit changes"** section
7. In the text box, type: `Initial upload — HMG Technologies website v2.0`
8. Click the green **"Commit changes"** button
9. Wait 10–30 seconds
10. You should now see all your files listed in the repository ✅

### Method B: GitHub Desktop App (Recommended for regular updates)

1. Download GitHub Desktop: **https://desktop.github.com**
2. Install and open it
3. Sign in with your GitHub credentials
4. Click **"Clone a repository"** → paste your repo URL
5. Choose a local folder on your computer
6. Copy all `tech-v2` files into that local folder
7. GitHub Desktop shows all the changed files
8. Bottom-left: type commit message: `Initial upload — HMG Technologies v2.0`
9. Click **"Commit to main"**
10. Click **"Push origin"** (blue button at top)

### Method C: Git Command Line (Advanced)

```bash
cd tech-v2
git init
git remote add origin https://github.com/YOUR-USERNAME/hmgtechnologies-website.git
git add .
git commit -m "Initial upload — HMG Technologies v2.0"
git push -u origin main
```

---

## STEP 4 — DEPLOY TO CLOUDFLARE PAGES (RECOMMENDED)

Cloudflare Pages is the best free option because:
- Unlimited bandwidth (no traffic limits)
- Free custom domain support
- Fast CDN (Content Delivery Network) — loads quickly in Nigeria
- Automatic redeploy when you update files on GitHub

### 4a. Create a Cloudflare Account

1. Go to: **https://dash.cloudflare.com**
2. Click **"Sign Up"**
3. Enter your email and create a password
4. Verify your email

### 4b. Connect GitHub to Cloudflare

1. After signing in, look at the left sidebar
2. Click **"Workers & Pages"**
3. Click **"Create application"**
4. Click the **"Pages"** tab
5. Click **"Connect to Git"**
6. Click **"Connect GitHub"**
7. A GitHub authorisation window opens — click **"Authorize Cloudflare Pages"**
8. If asked which repositories to share: click **"All repositories"** or select your specific repo

### 4c. Set Up Your Project

1. You'll see a list of your GitHub repositories
2. Click **Select** next to your `hmgtechnologies-website` repository
3. Click **"Begin setup"**
4. Fill in the configuration:

   | Setting | Value |
   |---------|-------|
   | **Project name** | `hmgtechnologies` |
   | **Production branch** | `main` |
   | **Framework preset** | `None` |
   | **Build command** | *(leave completely empty)* |
   | **Build output directory** | *(leave completely empty)* |
   | **Root directory** | *(leave completely empty)* |

5. Click **"Save and Deploy"** (green button)

### 4d. Wait for Deployment

1. You'll see a progress screen with a rotating circle
2. After 30–90 seconds, it says **"Success"** with a green checkmark
3. You'll see a URL like: `https://hmgtechnologies.pages.dev`
4. Click the URL — your site is now live! 🎉

---

## STEP 5 — TEST YOUR LIVE SITE

Visit your live URL and test each item:

```
Navigation
□ Homepage loads correctly
□ All 6 nav links work (Home, Services, Products, About, Portfolio, Contact)
□ Mobile hamburger menu opens and closes (view on phone or resize browser)
□ Escape key closes mobile menu
□ Active nav link is highlighted

NEW v2 Features
□ Announcement bar appears at top with animated gradient
□ × button dismisses announcement bar (stays gone on refresh)
□ ☀️ button switches to light mode
□ 🌙 button switches back to dark mode
□ Theme preference is remembered after closing and reopening browser
□ Reading progress bar appears at page top as you scroll
□ Elements animate in as you scroll down (fade/slide)
□ Numbers count up in the stats bar
□ Scroll-to-top ring appears after scrolling 400px
□ Testimonial carousel auto-plays and responds to prev/next buttons
□ Carousel responds to touch swipe on mobile

Content
□ Profile logo appears in nav (if you added logo.png)
□ All product links open correct pages
□ Live product links (CBT Pro, ChatLens, simulators) work
□ GitHub links open correct repositories
□ WhatsApp link opens WhatsApp with correct number

Forms
□ Contact form validates required fields
□ Email field rejects invalid email format
□ Textarea character counter appears and updates
□ Form submission sends and shows success toast notification
□ Error toast appears if something goes wrong

Footer
□ All footer links work
□ Social media icons link correctly
□ Copyright text is visible

Print
□ Ctrl+P produces clean print output (nav and footer hidden)
```

---

## STEP 6 — (OPTIONAL) ADD A CUSTOM DOMAIN

If you have a domain like `hmgtechnologies.com.ng`:

1. In your Cloudflare Pages project, click **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter your domain: `hmgtechnologies.com.ng`
4. Cloudflare shows you DNS records to add
5. If your domain is already with Cloudflare: it adds them automatically
6. If with another registrar: log into that registrar and add the DNS records shown
7. Wait 1–24 hours for DNS to propagate

**Free Nigerian domain options:**
- `.com.ng` domains from Whogohost, SmartWeb Nigeria, Qservers
- Or use the free `hmgtechnologies.pages.dev` subdomain permanently

---

## STEP 7 — FUTURE UPDATES (Making Changes)

Every time you need to update the site:

1. Edit the file(s) on your computer or tablet (Acode, VS Code, Notepad)
2. Save the file
3. Upload to GitHub (web interface, GitHub Desktop, or git CLI)
4. Cloudflare Pages **automatically detects the change** and redeploys
5. New version is live within 60 seconds

**Example: Updating the announcement bar text**
1. Open `index.html`
2. Find: `<span>🚀 CBT Pro is live in Nigerian classrooms`
3. Change the text
4. Save → upload to GitHub → live in 60 seconds

**Example: Adding a new product to products.html**
1. Open `products.html`
2. Copy an existing `.sim-card` block
3. Update the name, description, and links
4. Save → upload to GitHub → live in 60 seconds

---

## ALTERNATIVE DEPLOYMENT PLATFORMS

### GitHub Pages (Alternative — Free)
1. Complete Steps 1–3 above
2. Go to your repository → **Settings** → **Pages** (left sidebar)
3. Under "Source": select **"Deploy from a branch"**
4. Branch: **main** | Folder: **/ (root)**
5. Click **Save**
6. Site goes live at: `https://yourusername.github.io/hmgtechnologies-website/`
7. Note: The URL includes the repo name unless you rename the repo to `hmgtechnologies.github.io`

### Vercel (Alternative — Free)
1. Go to: **https://vercel.com**
2. Click **"Import Project"**
3. Connect GitHub and select your repository
4. Framework: **Other**
5. Build command: *(empty)*
6. Output directory: *(empty)*
7. Click **Deploy**
8. Live at: `https://your-project.vercel.app`

---

## TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Site shows old version | Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac) |
| Logo not showing | Check filename is exactly `logo.png`, inside `assets/images/` |
| Contact form not working | Check you replaced `your-hmgtech-form-id` in both `index.html` AND `contact.html` |
| Mobile menu not working | Check `assets/js/main.js` was uploaded |
| Styles not loading | Check `assets/css/style.css` was uploaded |
| Announcement bar won't close | Clear localStorage in browser dev tools |
| Theme doesn't switch | Clear localStorage in browser dev tools |
| Carousel not working | Check browser console for JS errors |

**Still stuck?** WhatsApp: +234 810 086 6322

---

## QUICK REFERENCE

```
Formspree free form:   https://formspree.io
Cloudflare Pages:      https://dash.cloudflare.com → Workers & Pages
GitHub:                https://github.com
GitHub Desktop:        https://desktop.github.com
Image compressor:      https://tinypng.com
Your live site:        https://hmgtechnologies.pages.dev
```

---

*Last updated: June 2026 · HMG Technologies · HMG Concepts*
