// Unirise Barcode Solutions — main.js v2

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL EFFECT ─────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── MOBILE MENU ──────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    };
    mobileClose?.addEventListener('click', closeMenu);
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ── SCROLL TO TOP ────────────────────────── */
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── COUNTER ANIMATION ────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseInt(entry.target.dataset.count);
          const suffix = entry.target.dataset.suffix || '';
          const duration = 1800;
          const steps = 60;
          const stepTime = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            entry.target.textContent = current + suffix;
            if (step >= steps) {
              entry.target.textContent = target + suffix;
              clearInterval(timer);
            }
          }, stepTime);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

  /* ── PRODUCT FILTER ───────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        productCards.forEach((card, i) => {
          const show = cat === 'all' || card.dataset.category === cat;
          if (show) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            setTimeout(() => {
              card.style.transition = 'opacity .35s ease, transform .35s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 40);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── SCROLL FADE-IN ───────────────────────── */
  const fadeEls = document.querySelectorAll(
    '.product-card, .feature-card, .industry-card, .testimonial-card, .solution-card, .product-detail-card, .brand-logo, .contact-info-card'
  );
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity 0.5s ease ${(i % 6) * 60}ms, transform 0.5s ease ${(i % 6) * 60}ms`;
    fadeObserver.observe(el);
  });

  /* ── ACTIVE NAV LINK ──────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── CONTACT FORM ─────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg,#16a34a,#15803d)';
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 3500);
      }, 1400);
    });
  }

});
