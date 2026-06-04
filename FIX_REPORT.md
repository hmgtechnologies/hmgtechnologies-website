# HMG Technologies Website — Diagnosis & Fix Report

## Primary tablet rendering issue

### Symptom
On tablets, the homepage hero terminal/card could render poorly:
- the right-side visual stayed visible too long,
- floating badges could clip/overlap,
- the two-column hero could become cramped and feel broken.

### Root cause
The homepage hero used a fixed-width visual column and large gap, which was too aggressive for tablet widths.

### Fix applied
- made the hero grid more flexible with `minmax()`
- hid floating badges earlier on medium screens
- collapsed the hero to a single-column layout sooner on tablets (`1100px`)
- added safer wrapping in the terminal body

---

## Bugs found and fixed

### 1) Broken tablet hero rendering on homepage
**File:** `index.html`
- Improved responsive grid
- Hid floating badges earlier
- Hid hero visual sooner on tablet widths
- Added overflow-safe wrapping in terminal content

### 2) Broken internal links on homepage category tiles
**File:** `index.html`
Broken anchors were pointing to sections that did not exist.
Updated links to valid destinations:
- EdTech → `portfolio.html#lms-platforms`
- ML models → `portfolio.html#ml-models`
- Simulators → `products.html#simulators`
- FaithTech → `about.html#faithtech`

### 3) Products page missing v2 header features
**File:** `products.html`
Issues found:
- missing `data-theme="dark"`
- missing announcement bar
- missing theme toggle
- inconsistent mobile CTA text

Fixes applied:
- restored announcement bar
- restored theme toggle
- restored consistent nav/mobile CTA behaviour

### 4) Contact page missing v2 header features
**File:** `contact.html`
Issues found:
- missing announcement bar
- missing theme toggle
- missing mobile quote CTA

Fixes applied:
- restored announcement bar
- restored theme toggle
- restored mobile CTA

### 5) Contact page FAQ conflict
**File:** `contact.html`
Issue:
- FAQ items used inline `onclick` handlers while `main.js` also attached FAQ logic
- this could cause double-toggle / unreliable opening and closing

Fix:
- removed inline handlers and let `main.js` handle FAQ behaviour properly

### 6) Contact page service chip conflict
**File:** `contact.html`
Issue:
- service chips used inline JS while `main.js` already handled chip selection

Fix:
- removed inline JS
- converted chips to `type="button"`
- added `data-service` attributes for the shared JS logic

### 7) Malformed textarea markup on contact form
**File:** `contact.html`
Issue:
- the message textarea had broken HTML in the placeholder attribute
- this could affect rendering and form behaviour

Fix:
- corrected the textarea markup
- added proper validation message blocks

### 8) Contact form validation UX gaps
**File:** `contact.html`
Issue:
- required fields did not all have inline error containers

Fix:
- added IDs, labels, and `.form-error` elements for required fields

### 9) Portfolio quick links pointed to missing sections
**File:** `portfolio.html`
Issue:
- quick links referenced anchors that did not exist

Fix:
- updated those buttons to valid destinations
- clarified copy so the page honestly describes itself as a highlighted subset of the wider 34-project portfolio

### 10) FaithTech homepage link had no valid destination
**File:** `about.html`
Fix:
- added `id="faithtech"` to the HMG family section so the FaithTech link resolves correctly

### 11) Unconfigured Formspree endpoint failure state
**File:** `assets/js/main.js`
Issue:
- if `your-hmgtech-form-id` was not replaced, submissions failed with a generic error

Fix:
- added a guard that detects the placeholder endpoint and shows a clear warning toast telling the owner to configure Formspree or use WhatsApp

### 12) Service-chip JS was too narrowly targeted
**File:** `assets/js/main.js`
Fix:
- made the service-chip prefill logic more robust by falling back to `select[name="service"]`

---

## Important note still requiring owner action
The actual Formspree form ID is still a placeholder in:
- `index.html`
- `contact.html`

The site now fails gracefully instead of silently behaving badly, but to make email submission fully work you still need to replace:

`https://formspree.io/f/your-hmgtech-form-id`

with the real Formspree endpoint.

---

## Files modified
- `index.html`
- `products.html`
- `contact.html`
- `portfolio.html`
- `about.html`
- `assets/js/main.js`

---

## Recommendation
After review, redeploy the updated repo to Cloudflare Pages so the fixes go live.