// ===== iTemSpot Main JS =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initI18n();

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Mobile menu
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  menuBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', navLinks?.classList.contains('open'));
  });

  // Close mobile menu on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Language toggle
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Theme toggle
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  });

  // Scroll-to-top button
  const scrollBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    scrollBtn?.classList.toggle('visible', window.scrollY > 400);
  });
  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// ===== Theme =====
function initTheme() {
  const saved = localStorage.getItem('itemspot-theme') || 'light';
  setTheme(saved);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('itemspot-theme', theme);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.setAttribute('aria-checked', theme === 'dark');
    btn.querySelectorAll('.theme-toggle-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.themeValue === theme);
    });
  });
  // Update meta theme-color
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#111827' : '#0D9488';
}
