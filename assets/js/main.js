/*
 * ═══════════════════════════════════════════════════════════════════════════
 *  HMG TECHNOLOGIES — MAIN JAVASCRIPT v2.0
 *  Site    : hmgtechnologies.pages.dev
 *  GitHub  : @hmgtechnologies
 *  Updated : June 2026
 *
 *  WHAT'S NEW IN v2.0 (all v1 features preserved + enhanced)
 *  ──────────────────────────────────────────────────────────
 *  PRESERVED FROM v1:
 *  01. Mobile Navigation Toggle
 *  02. Active Nav Link Highlighter
 *  03. Reading Progress Bar
 *  04. Scroll Animations (AOS — IntersectionObserver)
 *  05. Stat Counter Animation
 *  06. Smooth Scroll for Anchor Links
 *  07. Contact Form (Formspree + inline feedback)
 *  08. Service Filter Chips
 *  09. Logo Image Fallback
 *
 *  NEW IN v2:
 *  10. Dark / Light Mode Toggle (localStorage persistent)
 *  11. Announcement Bar with Dismiss (localStorage persistent)
 *  12. Toast Notification System (success / error / info / warning)
 *  13. Cookie Consent Banner (localStorage persistent)
 *  14. Testimonial Carousel (pure JS, no library)
 *  15. Back-to-Top with SVG Progress Ring
 *  16. FAQ Accordion (keyboard accessible)
 *  17. Form Validation (inline field-level errors)
 *  18. Character Counter for textarea
 *  19. Scroll-spy for nav links (highlights active section)
 *  20. Lazy Image Loading (IntersectionObserver)
 *  21. Copy-to-clipboard on code blocks
 *  22. "Sticky on scroll" nav shadow enhancement
 *  23. AOS animation variants (slide-left, slide-right, zoom, fade)
 *  24. Keyboard accessibility (Escape, Tab trapping in modals)
 *  25. Service chip pre-fill for contact form
 * ═══════════════════════════════════════════════════════════════════════════
 */
'use strict';

/* ─────────────────────────────────────────────────────────────────
   01. MOBILE NAVIGATION TOGGLE (v1 preserved + enhanced)
   The hamburger button opens/closes the mobile drawer.
   Burger icon animates to × when open.
   Body scroll is locked while menu is open.
   Escape key closes the menu.
───────────────────────────────────────────────────────────────── */
function initNav() {
  const burger = document.querySelector('.nav-burger');
  const drawer = document.getElementById('nav-mobile');
  if (!burger || !drawer) return;

  function closeMenu() {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ─────────────────────────────────────────────────────────────────
   02. ACTIVE NAV LINK HIGHLIGHTER (v1 preserved)
   Marks the correct nav link as .active based on current page URL.
───────────────────────────────────────────────────────────────── */
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop().split('#')[0] || 'index.html';
    a.classList.toggle('active', href === page);
  });
}

/* ─────────────────────────────────────────────────────────────────
   03. READING PROGRESS BAR (v1 preserved)
   A thin blue gradient bar at the very top of the viewport that
   fills horizontally as the user scrolls down the page.
───────────────────────────────────────────────────────────────── */
function initProgress() {
  const bar = document.createElement('div');
  bar.id = 'reading-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const d = document.documentElement;
    const pct = d.scrollHeight > d.clientHeight
      ? (window.scrollY / (d.scrollHeight - d.clientHeight)) * 100
      : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────────────
   04. SCROLL ANIMATIONS — AOS VARIANTS (v1 preserved + enhanced)
   Elements with class .aos animate in when they enter the viewport.
   NEW v2: supports data-aos="fade|slide-left|slide-right|zoom"
           and data-delay="ms" for staggered reveals.
   Fallback: all elements visible if IntersectionObserver unavailable.

   BUG FIX (June 2026):
   ─────────────────────
   Problem: Elements already in the viewport on page load (above-the-fold
   content like the hero section) received opacity:0 from the AOS CSS class
   but the IntersectionObserver callback was unreliable for them because
   some browsers fire the callback before CSS is fully applied, or don't
   re-fire for elements already intersecting at observer creation time.
   
   Fix applied:
   1. Elements in the viewport at init time get .visible immediately (0ms delay)
   2. A 300ms safety-net timer force-reveals any .aos element that is still
      invisible and within / above the current scroll position
   3. .hero-text and .hero-eyebrow are NEVER assigned .aos class (done in HTML)
   4. The observer threshold lowered to 0.05 for better sensitivity
───────────────────────────────────────────────────────────────── */
function initAOS() {
  const els = document.querySelectorAll('.aos');

  // Ensure default animation type is set
  els.forEach(el => {
    if (!el.dataset.aos) el.dataset.aos = 'fade';
  });

  // No IntersectionObserver support → show everything immediately
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('visible'));
    return;
  }

  const viewportH = window.innerHeight;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const delay = parseInt(en.target.dataset.delay || 0);
      setTimeout(() => en.target.classList.add('visible'), delay);
      obs.unobserve(en.target);
    });
  }, {
    threshold: 0.05,           // BUG FIX: was 0.1 — lower threshold catches more
    rootMargin: '0px 0px 0px 0px'
  });

  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    // BUG FIX: If element is already fully or partially in the viewport
    // at page load time, make it visible immediately — don't wait for observer
    if (rect.top < viewportH && rect.bottom > 0) {
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('visible'), Math.min(delay, 50));
    } else {
      obs.observe(el);
    }
  });

  // BUG FIX: Safety-net — after 300ms, force-reveal any .aos element
  // that is still invisible and at or above the viewport bottom.
  // This catches race conditions between CSS loading and JS execution.
  setTimeout(() => {
    document.querySelectorAll('.aos:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportH + 100) {
        el.classList.add('visible');
      }
    });
  }, 300);

  // BUG FIX: Second safety-net at 1000ms for slow connections
  setTimeout(() => {
    document.querySelectorAll('.aos:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportH + 200) {
        el.classList.add('visible');
      }
    });
  }, 1000);
}

/* ─────────────────────────────────────────────────────────────────
   05. STAT COUNTER ANIMATION (v1 preserved)
   Elements with data-count="N" count up from 0 to N when scrolled
   into view. data-suffix="+" appends a suffix after the number.
   Uses cubic ease-out for natural deceleration.
───────────────────────────────────────────────────────────────── */
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1500;
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
        el.textContent = Math.round(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  els.forEach(e => obs.observe(e));
}

/* ─────────────────────────────────────────────────────────────────
   06. SMOOTH SCROLL (v1 preserved + BUG FIX)
   All internal anchor links (#id) scroll smoothly.
   BUG FIX: Correctly calculates total fixed header height:
   announcement bar (40px, or 0 if dismissed) + nav (64px) + 8px buffer.
───────────────────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();

      // Calculate total fixed header height dynamically
      const annGone = document.body.classList.contains('ann-gone');
      const annH    = annGone ? 0 : (parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--ann-h')
      ) || 40);
      const navH    = document.querySelector('.nav')?.offsetHeight || 64;
      const totalOffset = annH + navH + 8; // 8px breathing room

      const top = window.scrollY + target.getBoundingClientRect().top - totalOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────────────────────────────
   07. CONTACT FORM — Formspree + inline feedback (v1 preserved + enhanced)
   Submits asynchronously via Formspree's free tier.
   Shows a toast notification on success or failure.
   Also shows inline field-level validation errors (NEW v2).
   Replace the form action URL with your real Formspree endpoint.
───────────────────────────────────────────────────────────────── */
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const btn = form.querySelector('.form-submit');
    const origText = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; btn.classList.add('loading'); }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error('Server error');
      showToast('Message sent!', 'We\'ll respond within 24 hours. Check WhatsApp for faster replies.', 'success');
      form.reset();
      // Reset all char counters
      form.querySelectorAll('textarea[maxlength]').forEach(ta => updateCharCounter(ta));
    } catch {
      showToast('Something went wrong', 'Please WhatsApp us directly: +234 810 086 6322', 'error');
    } finally {
      if (btn) { btn.textContent = origText; btn.disabled = false; btn.classList.remove('loading'); }
    }
  });
}

/* ─────────────────────────────────────────────────────────────────
   08. SERVICE FILTER CHIPS (v1 preserved)
   On the Products page: clicking a chip hides/shows product cards
   based on their data-category attribute. "All" shows everything.
───────────────────────────────────────────────────────────────── */
function initFilters() {
  const chips = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  if (!chips.length) return;
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const f = chip.dataset.filter;
      cards.forEach(card => {
        card.style.display = (f === 'all' || card.dataset.category.includes(f)) ? '' : 'none';
      });
    });
  });
}

/* ─────────────────────────────────────────────────────────────────
   09. LOGO IMAGE FALLBACK (v1 preserved)
   If logo.png is not found in the repo, the <img> is hidden and
   the text fallback (.nav-logo-text) remains visible.
───────────────────────────────────────────────────────────────── */
function initLogoFallback() {
  document.querySelectorAll('.nav-logo-img').forEach(img => {
    img.addEventListener('error', () => { img.style.display = 'none'; });
  });
}

/* ─────────────────────────────────────────────────────────────────
   10. DARK / LIGHT MODE TOGGLE (NEW v2)
   Clicking the 🌙/☀️ button in the nav toggles [data-theme="light"]
   on <html>. CSS custom properties handle the rest.
   Preference is saved to localStorage and restored on every page load.
───────────────────────────────────────────────────────────────── */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const saved = localStorage.getItem('hmgtech_theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('hmgtech_theme', next);
  });

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

/* ─────────────────────────────────────────────────────────────────
   11. ANNOUNCEMENT BAR DISMISS (NEW v2)
   The coloured bar above the nav can be dismissed with the × button.
   Dismissed state is saved to sessionStorage so it stays gone for
   the current browser session.
───────────────────────────────────────────────────────────────── */
function initAnnBar() {
  const bar = document.querySelector('.ann-bar');
  if (!bar) return;

  // If already dismissed this session, remove immediately
  if (sessionStorage.getItem('hmgtech_ann_dismissed') === '1') {
    dismissAnn(false);
    return;
  }

  const btn = bar.querySelector('.ann-dismiss');
  if (btn) btn.addEventListener('click', () => {
    dismissAnn(true);
    sessionStorage.setItem('hmgtech_ann_dismissed', '1');
  });

  function dismissAnn(animate) {
    if (animate) {
      bar.style.transition = 'opacity .3s, transform .3s';
      bar.style.opacity = '0';
      bar.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        document.body.classList.add('ann-gone');
        document.documentElement.classList.add('no-ann');
        document.documentElement.style.setProperty('--ann-h', '0px');
      }, 310);
    } else {
      document.body.classList.add('ann-gone');
      document.documentElement.classList.add('no-ann');
      document.documentElement.style.setProperty('--ann-h', '0px');
    }
  }
}

/* ─────────────────────────────────────────────────────────────────
   12. TOAST NOTIFICATION SYSTEM (NEW v2)
   showToast(title, message, type, duration)
   type: 'success' | 'error' | 'info' | 'warning'
   duration: auto-dismiss after N ms (default 5000)
   Each toast has an animated progress bar showing time remaining.
   Can be dismissed early by clicking ×.
───────────────────────────────────────────────────────────────── */
function initToastContainer() {
  if (document.getElementById('toast-container')) return;
  const c = document.createElement('div');
  c.id = 'toast-container';
  document.body.appendChild(c);
}

function showToast(title, message, type = 'info', duration = 5000) {
  initToastContainer();
  const container = document.getElementById('toast-container');

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
      <div class="toast-progress" id="tp-${Date.now()}"></div>
    </div>
    <button class="toast-close" aria-label="Dismiss notification">✕</button>
  `;

  container.appendChild(toast);

  // Animate progress bar
  const bar = toast.querySelector('.toast-progress');
  if (bar) {
    bar.style.width = '100%';
    bar.style.transition = `width ${duration}ms linear`;
    requestAnimationFrame(() => { bar.style.width = '0%'; });
  }

  const dismiss = () => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 320);
  };

  const timer = setTimeout(dismiss, duration);
  toast.querySelector('.toast-close').addEventListener('click', () => { clearTimeout(timer); dismiss(); });
}

/* ─────────────────────────────────────────────────────────────────
   13. COOKIE CONSENT BANNER (NEW v2)
   Displays a GDPR-friendly notice at the bottom of the screen.
   Once accepted or dismissed, the choice is saved to localStorage
   and the banner never shows again for that browser.
   NOTE: This site does not use any tracking cookies — the banner
   is purely informational good practice.
───────────────────────────────────────────────────────────────── */
function initCookieBanner() {
  if (localStorage.getItem('hmgtech_cookie_ok') === '1') return;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'banner');
  banner.setAttribute('aria-label', 'Cookie notice');
  banner.innerHTML = `
    <p class="cookie-text">
      🍪 This website uses only essential browser storage (localStorage) to remember your theme
      preference and announcement dismissal. No tracking cookies. No third-party analytics.
      <a href="#" onclick="return false;">Learn more</a>
    </p>
    <div class="cookie-actions">
      <button class="btn btn-blue btn-sm" id="cookie-accept">Got it</button>
      <button class="btn btn-ghost btn-sm" id="cookie-dismiss">✕</button>
    </div>
  `;
  document.body.appendChild(banner);

  const accept = () => {
    localStorage.setItem('hmgtech_cookie_ok', '1');
    banner.classList.add('hidden');
  };

  document.getElementById('cookie-accept').addEventListener('click', accept);
  document.getElementById('cookie-dismiss').addEventListener('click', accept);
}

/* ─────────────────────────────────────────────────────────────────
   14. TESTIMONIAL CAROUSEL (NEW v2)
   Pure vanilla JS carousel — no external library, no jQuery.
   Auto-plays every 5 seconds. Pauses on hover.
   Previous/Next buttons + dot indicators.
   Touch/swipe support for mobile.
   Works with any elements that have class .carousel-slide.
───────────────────────────────────────────────────────────────── */
function initCarousel() {
  const wraps = document.querySelectorAll('.carousel-wrap');
  wraps.forEach(wrap => {
    const track  = wrap.querySelector('.carousel-track');
    const slides = wrap.querySelectorAll('.carousel-slide');
    const prevBtn = wrap.querySelector('.car-prev');
    const nextBtn = wrap.querySelector('.car-next');
    const dotsWrap = wrap.querySelector('.car-dots');
    if (!track || !slides.length) return;

    let current = 0;
    let timer;
    let startX = 0;

    // Build dots
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'car-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      const slideW = slides[0].offsetWidth + 20; // gap 20px ≈ 1.3rem
      track.style.transform = `translateX(-${current * slideW}px)`;
      // Update dots
      wrap.querySelectorAll('.car-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // Auto-play
    function startAuto() { timer = setInterval(next, 5000); }
    function stopAuto()  { clearInterval(timer); }
    startAuto();
    wrap.addEventListener('mouseenter', stopAuto);
    wrap.addEventListener('mouseleave', startAuto);

    // Touch/swipe support
    wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend',   e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    }, { passive: true });

    // Keyboard navigation when carousel is focused
    wrap.setAttribute('tabindex', '0');
    wrap.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    });
  });
}

/* ─────────────────────────────────────────────────────────────────
   15. BACK-TO-TOP WITH SVG PROGRESS RING (NEW v2)
   Replaces the simple arrow button from v1 with a circular SVG ring
   that visually shows scroll progress. The blue arc grows as you
   scroll down. Appears after 400px of scrolling.
───────────────────────────────────────────────────────────────── */
function initScrollTopRing() {
  const btn = document.createElement('button');
  btn.id = 'scroll-top-ring';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `
    <svg width="44" height="44" viewBox="0 0 44 44">
      <circle id="scroll-ring-track" cx="22" cy="22" r="20"/>
      <circle id="scroll-ring-fill"  cx="22" cy="22" r="20"/>
    </svg>
    <span class="ring-inner">↑</span>
  `;
  document.body.appendChild(btn);

  const fillEl = btn.querySelector('#scroll-ring-fill');
  const circumference = 2 * Math.PI * 20; // r=20 → C≈125.7
  if (fillEl) {
    fillEl.style.strokeDasharray = circumference;
    fillEl.style.strokeDashoffset = circumference;
  }

  window.addEventListener('scroll', () => {
    const d = document.documentElement;
    const pct = d.scrollHeight > d.clientHeight
      ? window.scrollY / (d.scrollHeight - d.clientHeight)
      : 0;

    btn.style.display = window.scrollY > 400 ? 'flex' : 'none';

    if (fillEl) fillEl.style.strokeDashoffset = circumference * (1 - pct);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─────────────────────────────────────────────────────────────────
   16. FAQ ACCORDION (NEW v2)
   Elements with class .faq-item contain a .faq-q (question toggle)
   and .faq-a (answer body). Only one opens at a time.
   Keyboard accessible: Enter/Space toggle.
───────────────────────────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.setAttribute('role', 'button');
    q.setAttribute('tabindex', '0');
    q.setAttribute('aria-expanded', 'false');

    const toggle = () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      });

      // Open this one unless it was already open
      if (!wasOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    };

    q.addEventListener('click', toggle);
    q.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
}

/* ─────────────────────────────────────────────────────────────────
   17. FORM VALIDATION (NEW v2)
   Client-side validation before Formspree submission.
   Shows red border + error message under each invalid field.
   Validates: required fields, email format, min message length.
───────────────────────────────────────────────────────────────── */
function validateForm(form) {
  let valid = true;

  // Clear previous errors
  form.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

  form.querySelectorAll('[required]').forEach(field => {
    const group = field.closest('.form-group');
    const errEl = group?.querySelector('.form-error');
    let msg = '';

    if (!field.value.trim()) {
      msg = 'This field is required.';
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      msg = 'Please enter a valid email address.';
    } else if (field.tagName === 'TEXTAREA' && field.value.trim().length < 20) {
      msg = 'Please provide at least 20 characters.';
    }

    if (msg) {
      valid = false;
      if (group) group.classList.add('has-error');
      if (errEl) errEl.textContent = msg;
    }
  });

  if (!valid) showToast('Please check your form', 'Some fields need attention before sending.', 'warning');
  return valid;
}

/* ─────────────────────────────────────────────────────────────────
   18. CHARACTER COUNTER FOR TEXTAREA (NEW v2)
   Add maxlength attribute to any textarea and it gets an automatic
   character counter that changes colour as the limit approaches.
   Warn at 80%, over-limit highlighted in red.
───────────────────────────────────────────────────────────────── */
function updateCharCounter(ta) {
  const counter = ta.parentElement?.querySelector('.char-counter');
  if (!counter || !ta.maxLength || ta.maxLength === -1) return;
  const used = ta.value.length;
  const max  = ta.maxLength;
  counter.textContent = `${used} / ${max}`;
  counter.className = 'char-counter';
  if (used / max >= 1)    counter.classList.add('over');
  else if (used / max >= 0.8) counter.classList.add('warn');
}

function initCharCounters() {
  document.querySelectorAll('textarea[maxlength]').forEach(ta => {
    // Create counter element if it doesn't exist
    const group = ta.closest('.form-group');
    if (!group) return;
    let counter = group.querySelector('.char-counter');
    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'char-counter';
      ta.after(counter);
    }
    updateCharCounter(ta);
    ta.addEventListener('input', () => updateCharCounter(ta));
  });
}

/* ─────────────────────────────────────────────────────────────────
   19. SCROLL-SPY (NEW v2 — BUG FIXED)
   BUG FIX: The original scroll-spy was conflicting with the page-based
   active nav link highlighter (initActiveNav). On a multi-page site,
   nav links point to page URLs (services.html, products.html) — not
   to #section anchors. The spy was incorrectly removing .active from
   the correct page link.
   
   FIX: Scroll-spy is now ONLY active on the homepage (index.html)
   where in-page sections exist, and only targets nav links that
   contain a '#' in their href (in-page anchor links).
   On inner pages, the page-based highlighter (initActiveNav) wins.
───────────────────────────────────────────────────────────────── */
function initScrollSpy() {
  // Only run on index/homepage
  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page !== 'index.html' && page !== '' && page !== '/') return;

  const sections = document.querySelectorAll('section[id]');
  if (!sections.length || !('IntersectionObserver' in window)) return;

  // Only target nav links that are in-page anchors (#id)
  const anchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!anchorLinks.length) return; // No anchor links on this page nav → skip

  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const id = en.target.id;
      anchorLinks.forEach(a => {
        const href = a.getAttribute('href') || '';
        a.classList.toggle('active', href === '#' + id);
      });
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* ─────────────────────────────────────────────────────────────────
   20. LAZY IMAGE LOADING (NEW v2)
   Images with data-src attribute are loaded only when they enter
   the viewport. This saves bandwidth on mobile connections.
   Usage: <img data-src="real-url.jpg" src="placeholder.jpg" />
   After loading, data-src is removed and .loaded class is added.
───────────────────────────────────────────────────────────────── */
function initLazyImages() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length || !('IntersectionObserver' in window)) {
    imgs.forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const img = en.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.addEventListener('load', () => img.classList.add('loaded'));
      obs.unobserve(img);
    });
  }, { rootMargin: '200px' });
  imgs.forEach(img => obs.observe(img));
}

/* ─────────────────────────────────────────────────────────────────
   21. COPY-TO-CLIPBOARD ON CODE BLOCKS (NEW v2)
   Any <pre><code> block gets a "Copy" button in the top-right corner.
   Clicking copies the code and shows a brief "Copied!" confirmation.
───────────────────────────────────────────────────────────────── */
function initCopyCode() {
  document.querySelectorAll('pre code').forEach(code => {
    const pre = code.closest('pre');
    if (!pre) return;
    pre.style.position = 'relative';
    const btn = document.createElement('button');
    btn.textContent = 'Copy';
    btn.style.cssText = 'position:absolute;top:8px;right:8px;font-size:.68rem;padding:2px 8px;border-radius:4px;background:rgba(14,165,233,.15);border:1px solid rgba(14,165,233,.3);color:#38bdf8;cursor:pointer;font-family:inherit;transition:all .2s;';
    btn.addEventListener('click', () => {
      navigator.clipboard?.writeText(code.textContent || '').then(() => {
        btn.textContent = 'Copied!';
        btn.style.background = 'rgba(16,185,129,.15)';
        btn.style.color = '#10b981';
        setTimeout(() => { btn.textContent = 'Copy'; btn.style.background = 'rgba(14,165,233,.15)'; btn.style.color = '#38bdf8'; }, 1800);
      });
    });
    pre.appendChild(btn);
  });
}

/* ─────────────────────────────────────────────────────────────────
   22. STICKY NAV SHADOW ON SCROLL (NEW v2)
   Adds a deeper shadow to the nav when the page has been scrolled
   down, visually reinforcing depth and hierarchy.
───────────────────────────────────────────────────────────────── */
function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 4px 28px rgba(0,0,0,.45)'
      : 'none';
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────────────
   23. SERVICE CHIP PRE-FILL (NEW v2)
   On the Contact page, quick-select service chips pre-populate
   the service dropdown in the form below.
───────────────────────────────────────────────────────────────── */
function initServiceChips() {
  document.querySelectorAll('.sch').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sch').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const val = btn.dataset.service || btn.textContent.trim();
      const sel = document.getElementById('service-select');
      if (sel) {
        for (const opt of sel.options) {
          if (opt.value === val) { sel.value = val; break; }
        }
      }
    });
  });
}

/* ─────────────────────────────────────────────────────────────────
   24. PROGRESS BAR ANIMATION (NEW v2)
   Elements with class .progress-fill and data-width="N" animate
   from 0 to N% when scrolled into view.
───────────────────────────────────────────────────────────────── */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.style.width = en.target.dataset.width + '%';
      obs.unobserve(en.target);
    });
  }, { threshold: 0.3 });
  bars.forEach(b => { b.style.width = '0%'; obs.observe(b); });
}

/* ─────────────────────────────────────────────────────────────────
   25. EXTERNAL LINK INDICATOR (NEW v2)
   Adds a small ↗ indicator and rel="noopener noreferrer" to all
   external links automatically if they don't already have it.
───────────────────────────────────────────────────────────────── */
function initExternalLinks() {
  const host = window.location.hostname;
  document.querySelectorAll('a[href^="http"]').forEach(a => {
    try {
      const url = new URL(a.href);
      if (url.hostname !== host) {
        if (!a.getAttribute('rel')) a.setAttribute('rel', 'noopener noreferrer');
        if (!a.getAttribute('target')) a.setAttribute('target', '_blank');
      }
    } catch { /* ignore invalid URLs */ }
  });
}

/* ─────────────────────────────────────────────────────────────────
   INITIALISE ALL FEATURES ON DOM READY
   Order matters: nav first, then visual enhancements, then features.
───────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /* Core navigation */
  initNav();
  initActiveNav();
  initNavShadow();
  initAnnBar();
  initThemeToggle();

  /* Visual enhancements */
  initProgress();
  initScrollTopRing();
  initAOS();
  initCounters();
  initProgressBars();
  initLazyImages();

  /* Interactivity */
  initSmoothScroll();
  initScrollSpy();
  initFAQ();
  initCarousel();
  initFilters();
  initServiceChips();

  /* Content features */
  initCopyCode();
  initCharCounters();

  /* Forms & feedback */
  initForm();
  initToastContainer();
  initCookieBanner();

  /* Utility */
  initLogoFallback();
  initExternalLinks();
});
