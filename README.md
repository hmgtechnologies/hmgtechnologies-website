# HMG Technologies Website — v2.0
**AI-Augmented Tools for Nigerian Businesses, Schools, NGOs, and Organisations**
**Subsidiary of HMG Concepts (His Marvellous Grace Educational Consult)**

🌐 **Live site (after deploy):** https://hmgtechnologies.pages.dev
🐙 **GitHub:** https://github.com/hmgtechnologies
📧 **Email:** buildingmyictcareer@gmail.com
💬 **WhatsApp:** +234 810 086 6322

---

## 📂 File Structure

```
tech-v2/
│
├── index.html          ← Homepage
├── services.html       ← Full 6-service breakdown
├── products.html       ← All live products (CBT Pro, ChatLens, 11 simulators, LMS)
├── about.html          ← Company story, method, values, founder, HMG family
├── portfolio.html      ← 34 live projects with live links
├── contact.html        ← Enquiry form, FAQ accordion, WhatsApp CTA
│
├── README.md           ← This file
├── DEPLOYMENT.md       ← Step-by-step deployment guide (read this first)
├── .gitignore          ← Git exclusions
│
├── _nav.html           ← Reusable nav snippet (reference only — already embedded)
├── _footer.html        ← Reusable footer snippet (reference only — already embedded)
│
└── assets/
    ├── css/
    │   └── style.css   ← Global stylesheet v2 (dark+light mode, all components)
    ├── js/
    │   └── main.js     ← All JavaScript v2 (25 features documented)
    └── images/
        ├── README.md   ← Logo upload instructions
        ├── logo.png    ← 👈 ADD YOUR LOGO HERE
        └── og-image.jpg← Social sharing image (1200×630px)
```

---

## ✨ Complete Feature List

### From v1 (ALL PRESERVED)
| Feature | How it works |
|---------|-------------|
| Mobile hamburger nav | Burger → X animation, body scroll lock, Escape to close |
| Active nav link | Highlights current page link automatically |
| Reading progress bar | Blue gradient bar fills at page top as you scroll |
| AOS scroll animations | Elements fade/slide in when entering viewport |
| Stat counter animation | Numbers count up 0→N with ease-out cubic |
| Smooth scroll | All #anchor links scroll with 70px nav offset |
| Contact form (Formspree) | Async submit, inline success/error message |
| Service filter chips | Products page: filter by category |
| Logo fallback | If logo.png missing, shows text instead |

### New in v2
| Feature | How it works |
|---------|-------------|
| **Dark / Light mode toggle** | ☀️🌙 button in nav; saves to localStorage; CSS custom properties handle all colour changes |
| **Announcement bar** | Animated gradient bar above nav; × dismisses for session (sessionStorage) |
| **Toast notifications** | `showToast(title, msg, type)` function; auto-dismiss with progress bar; success/error/info/warning |
| **Cookie consent banner** | GDPR-friendly notice; localStorage remembers acceptance |
| **Testimonial carousel** | Auto-plays every 5s; pause on hover; prev/next buttons; dot indicators; touch swipe support |
| **Back-to-top with SVG ring** | Circular progress ring shows scroll %; appears after 400px |
| **FAQ accordion** | One open at a time; keyboard accessible (Enter/Space); ARIA expanded |
| **Form validation** | Field-level inline errors; validates required, email format, min message length |
| **Character counter** | Auto-added to textareas with maxlength; warns at 80%, red at 100% |
| **Scroll-spy** | Nav links highlight based on which section is in viewport |
| **Lazy image loading** | `data-src` images load only when entering viewport (saves bandwidth) |
| **Copy code button** | Auto-added to `<pre><code>` blocks; clipboard API with visual feedback |
| **Nav shadow on scroll** | Nav gains deeper shadow after 10px of scroll |
| **AOS animation variants** | `data-aos="fade|slide-left|slide-right|zoom"` on any .aos element |
| **External link handler** | Auto-adds `target="_blank" rel="noopener noreferrer"` to external links |
| **Service chip pre-fill** | Quick-select chips on contact page pre-populate the service dropdown |
| **Progress bar animation** | `.progress-fill[data-width]` animates 0→value% on scroll |
| **Glassmorphism card** | `.card-glass` class for frosted-glass card variant |
| **Print styles** | Clean print output for any page (Ctrl+P) |
| **Gradient animated text** | `.grad-text` class for animated blue-cyan gradient text |

---

## 🎨 Brand Colours

```css
--blue:      #0ea5e9  /* Electric sky-blue — primary brand */
--cyan:      #22d3ee  /* Accent / hover states */
--green:     #10b981  /* Success / live indicators */
--orange:    #f97316  /* Warnings / secondary CTAs */
--bg:        #060b14  /* Near-black base (dark mode) */
```

Light mode colours are defined in `style.css` under `[data-theme="light"]` and activate automatically when the theme toggle is clicked.

---

## 🖼️ Adding Your Logo

1. Name your file `logo.png` (PNG, transparent background)
2. Place it in `assets/images/`
3. Push to GitHub
4. Nav and footer auto-detect and display it
5. In light mode the filter is removed (keep this in mind for logo design)

---

## ⚙️ One-Time Setup

| Task | File | Action |
|------|------|--------|
| Contact form | `index.html` + `contact.html` | Replace `your-hmgtech-form-id` with real Formspree ID |
| Logo | `assets/images/` | Add `logo.png` |
| Social image | `assets/images/` | Add `og-image.jpg` (1200×630px) |
| Favicon | `assets/images/` | Add `favicon.png` (64×64px) |
| Announcement | `index.html` (and other pages) | Edit text in `.ann-bar` |

See **DEPLOYMENT.md** for full step-by-step instructions.

---

*© 2025–2026 HMG Technologies · HMG Concepts · Adewale Samson Adeagbo*
