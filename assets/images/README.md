# HMG Technologies v2 — Image Assets

## Files to add to this folder

| Filename          | Size / Format                | Used in                              |
|-------------------|------------------------------|--------------------------------------|
| `logo.png`        | PNG, transparent bg, 300px+  | Navigation bar + footer              |
| `logo-white.png`  | Same, white version          | Dark backgrounds (optional)          |
| `og-image.jpg`    | JPG, 1200 × 630 px           | Social sharing (LinkedIn, WhatsApp)  |
| `favicon.png`     | PNG, 64×64 or 512×512 px     | Browser tab icon                     |

## How the logo system works
1. Place `logo.png` in this folder
2. Push to GitHub
3. The `<img class="nav-logo-img">` tag tries to load it
4. If the file is missing, the `onerror` handler hides the img and the text "HMG Technologies" shows instead
5. No code change needed — it's automatic

## Light mode note
In light mode (toggled by the ☀️ button), the logo filter is removed
so a coloured/dark logo looks correct. Keep this in mind when
designing your logo — a version that works on both dark and light
backgrounds is ideal.
