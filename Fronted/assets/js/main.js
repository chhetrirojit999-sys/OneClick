// OneClick — main.js
// Landing page interactivity: mobile nav toggle, search form, header shadow on scroll.

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Smooth-scroll for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          mainNav?.classList.remove('nav-open');
        }
      }
    });
  });

  // Search form — placeholder submit handler until backend is wired up
  const searchForm = document.querySelector('.search-panel');
  const searchSubmit = document.querySelector('.search-submit');

  if (searchSubmit && searchForm) {
    searchSubmit.addEventListener('click', () => {
      const serviceInput = document.querySelector('#search-service');
      const locationInput = document.querySelector('#search-location');
      const service = serviceInput ? serviceInput.value.trim() : '';
      const location = locationInput ? locationInput.value.trim() : '';

      if (!service) {
        serviceInput?.focus();
        return;
      }
      // TODO: wire up to /pages/services.html once backend search endpoint exists
      window.location.href = `pages/services.html?service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`;
    });
  }

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 8 ? '0 4px 16px rgba(15,23,42,0.06)' : 'none';
    });
  }
});