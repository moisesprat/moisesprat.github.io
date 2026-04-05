/* moisesprat.dev — main.js
   Vanilla JS only. No modules, no build step.
   ---------------------------------------------------------------- */

// ---- Utilities ----

function fireEvent(eventName, params) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, params || {});
  }
  if (typeof sa_event !== 'undefined') {
    sa_event(eventName, params || {});
  }
}

// ---- Copyright year ----

function insertYear() {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// ---- Cookie consent banner ----

function initCookieBanner() {
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  var consent = localStorage.getItem('mp_cookie_consent');
  if (!consent) banner.style.display = 'flex';
}

function acceptCookies() {
  localStorage.setItem('mp_cookie_consent', 'accepted');
  var banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
}

function declineCookies() {
  localStorage.setItem('mp_cookie_consent', 'declined');
  var banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
}

// Expose to inline onclick handlers in HTML
window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;

// ---- Scroll-reveal animations ----

function initScrollReveal() {
  var els = document.querySelectorAll('.reveal, .stagger');
  if (!els.length || !('IntersectionObserver' in window)) {
    // Fallback: just show everything
    els.forEach(function(el) { el.classList.add('visible'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
  els.forEach(function(el) { obs.observe(el); });
}

// ---- Mobile nav hamburger ----

function initNavHamburger() {
  var btn = document.querySelector('.nav-hamburger');
  var nav = document.querySelector('nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', function() {
    var isOpen = nav.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.textContent = isOpen ? '✕' : '☰';
  });

  // Close drawer on link click
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = '☰';
    });
  });

  // Close drawer on outside click
  document.addEventListener('click', function(e) {
    if (nav.classList.contains('nav-open') && !nav.contains(e.target)) {
      nav.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = '☰';
    }
  });
}

// ---- Section-view tracking (fires once per section per page load) ----

function initSectionTracking() {
  if (!('IntersectionObserver' in window)) return;
  var seen = new Set();
  var sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !seen.has(entry.target.id)) {
        seen.add(entry.target.id);
        fireEvent('section_view', { section_id: entry.target.id });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(function(s) { obs.observe(s); });
}

// ---- Generic link click tracking via data-track attribute ----
// Usage: data-track="event_name:label"
// Example: data-track="project_link:roadmapsnap_github"

function initLinkTracking() {
  document.querySelectorAll('[data-track]').forEach(function(el) {
    el.addEventListener('click', function() {
      var raw = el.dataset.track || '';
      var parts = raw.split(':');
      var eventName = parts[0];
      var label = parts[1] || el.getAttribute('href') || '';
      if (eventName) fireEvent(eventName, { event_label: label });
    });
  });
}

// ---- Active nav link on scroll ----

function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function(s) { obs.observe(s); });
}

// ---- Bootstrap ----

document.addEventListener('DOMContentLoaded', function() {
  insertYear();
  initCookieBanner();
  initScrollReveal();
  initNavHamburger();
  initSectionTracking();
  initLinkTracking();
  initActiveNav();
});
