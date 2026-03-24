/* ======= HOLYFAITH — Main JS ======= */
(function () {
  'use strict';

  /* ---------- DOM ready ---------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    headerScroll();
    mobileNav();
    counterAnim();
    aosCustom();
    flashDismiss();
    smoothScroll();
    formSubmit();
    parallaxDoodles();
    explorePanel();
    faqAccordion();
    admissionStepToggle();
    contactQuickLinks();
  }

  /* ---------- 1. Header Scroll ---------- */
  function headerScroll() {
    const hdr = document.querySelector('.header');
    if (!hdr) return;
    const check = () => hdr.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  /* ---------- 2. Mobile Navigation ---------- */
  function mobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const center = document.querySelector('.nav__center');
    const overlay = document.querySelector('.nav__overlay');
    const closeBtn = document.querySelector('.nav__close');
    if (!toggle || !center) return;

    function open() {
      center.classList.add('open');
      toggle.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      center.classList.remove('open');
      toggle.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => center.classList.contains('open') ? close() : open());
    if (overlay) overlay.addEventListener('click', close);
    if (closeBtn) closeBtn.addEventListener('click', close);

    center.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  /* ---------- 3. Counter Animation ---------- */
  function counterAnim() {
    const nums = document.querySelectorAll('.stat__num[data-count]');
    if (!nums.length) return;

    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;
      const dur = 2000;
      const step = Math.max(1, Math.floor(dur / target));
      let current = 0;
      const timer = setInterval(() => {
        current += Math.ceil(target / (dur / 16));
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 16);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    nums.forEach(n => io.observe(n));
  }

  /* ---------- 4. Custom AOS (Animate on Scroll) ---------- */
  function aosCustom() {
    const els = document.querySelectorAll('[data-aos]');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = parseInt(e.target.dataset.aosDelay || 0, 10);
          setTimeout(() => e.target.classList.add('aos-animate'), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    els.forEach(el => io.observe(el));
  }

  /* ---------- 5. Flash Message Dismiss ---------- */
  function flashDismiss() {
    document.querySelectorAll('.flash-close, .flash__close').forEach(btn => {
      btn.addEventListener('click', () => {
        const flash = btn.closest('.flash-message, .flash');
        if (flash) { flash.style.opacity = '0'; setTimeout(() => flash.remove(), 300); }
      });
    });

    // Auto dismiss after 5s
    document.querySelectorAll('.flash-message, .flash').forEach(f => {
      setTimeout(() => { f.style.opacity = '0'; setTimeout(() => f.remove(), 300); }, 5000);
    });
  }

  /* ---------- 6. Smooth Scroll ---------- */
  function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const offset = 100;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- 7. Form Submission Feedback ---------- */
  function formSubmit() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function () {
        const btn = this.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = true;
          const orig = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
          setTimeout(() => { btn.disabled = false; btn.innerHTML = orig; }, 6000);
        }
      });
    });
  }

  /* ---------- 8. Parallax Doodles ---------- */
  function parallaxDoodles() {
    const doodles = document.querySelectorAll('.hero__doodle');
    if (!doodles.length || window.matchMedia('(max-width:768px)').matches) return;

    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      doodles.forEach((d, i) => {
        const speed = (i + 1) * 8;
        d.style.transform = `translate(${dx * speed}px, ${dy * speed}px)`;
      });
    }, { passive: true });
  }

  /* ---------- 9. Explore Side Panel ---------- */
  function explorePanel() {
    const btn = document.querySelector('.nav__explore');
    if (!btn) return;

    // Create side panel
    const panel = document.createElement('div');
    panel.className = 'explore-panel';
    panel.innerHTML = `
      <div class="explore-panel__inner">
        <button class="explore-panel__close" aria-label="Close"><i class="fas fa-times"></i></button>
        <div class="explore-panel__logo">
          <img src="/static/images/logo.png" alt="Logo" style="height:50px">
        </div>
        <h3 class="explore-panel__title">Explore HOLYFAITH</h3>
        <nav class="explore-panel__nav">
          <a href="/"><i class="fas fa-home"></i> Home</a>
          <a href="/about"><i class="fas fa-school"></i> About Us</a>
          <a href="/academics"><i class="fas fa-graduation-cap"></i> Academics</a>
          <a href="/admissions"><i class="fas fa-user-plus"></i> Admissions</a>
          <a href="/contact"><i class="fas fa-envelope"></i> Contact Us</a>
        </nav>
        <div class="explore-panel__info">
          <p><i class="fas fa-phone"></i> +91 9923873374 / 7058522522</p>
          <p><i class="fas fa-marker"></i> holyfaithenglishschool2007@gmail.com</p>
        </div>
        <div class="explore-panel__social">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          <a href="https://wa.me/919923873374" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    const overlay2 = document.createElement('div');
    overlay2.className = 'explore-overlay';
    document.body.appendChild(overlay2);

    function openPanel() {
      panel.classList.add('active');
      overlay2.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closePanel() {
      panel.classList.remove('active');
      overlay2.classList.remove('active');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', openPanel);
    overlay2.addEventListener('click', closePanel);
    panel.querySelector('.explore-panel__close').addEventListener('click', closePanel);
  }

  /* ---------- 10. FAQ Accordion ---------- */
  function faqAccordion() {
    const items = document.querySelectorAll('.faq-accordion .accordion__item');
    if (!items.length) return;

    const closeItem = (item) => {
      const body = item.querySelector('.accordion__body');
      const header = item.querySelector('.accordion__header');
      if (!body || !header) return;
      item.classList.remove('active');
      header.setAttribute('aria-expanded', 'false');
      body.style.maxHeight = '0px';
    };

    const openItem = (item) => {
      const body = item.querySelector('.accordion__body');
      const header = item.querySelector('.accordion__header');
      if (!body || !header) return;
      item.classList.add('active');
      header.setAttribute('aria-expanded', 'true');
      body.style.maxHeight = body.scrollHeight + 'px';
    };

    items.forEach(item => {
      const header = item.querySelector('.accordion__header');
      if (!header) return;

      header.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
      const body = item.querySelector('.accordion__body');
      if (body) {
        body.style.maxHeight = item.classList.contains('active') ? body.scrollHeight + 'px' : '0px';
      }

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        items.forEach(closeItem);
        if (!isActive) openItem(item);
      });
    });

    window.addEventListener('resize', () => {
      const activeItem = document.querySelector('.faq-accordion .accordion__item.active');
      if (!activeItem) return;
      const activeBody = activeItem.querySelector('.accordion__body');
      if (activeBody) activeBody.style.maxHeight = activeBody.scrollHeight + 'px';
    });
  }

  /* ---------- 11. Admission Step Toggle ---------- */
  function admissionStepToggle() {
    const steps = document.querySelectorAll('.js-info-step');
    if (!steps.length) return;

    // Initialize details with smooth height animation support.
    steps.forEach(step => {
      const detail = step.querySelector('.info-step-detail');
      const toggle = step.querySelector('.info-step-toggle');
      if (!detail || !toggle) return;

      if (step.classList.contains('is-open')) {
        detail.style.maxHeight = detail.scrollHeight + 'px';
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        detail.style.maxHeight = '0px';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    steps.forEach(step => {
      const toggle = step.querySelector('.info-step-toggle');
      const detail = step.querySelector('.info-step-detail');
      if (!toggle) return;

      toggle.addEventListener('click', () => {
        const isOpen = step.classList.contains('is-open');

        // Close all steps first to create an accordion effect.
        steps.forEach(otherStep => {
          const otherToggle = otherStep.querySelector('.info-step-toggle');
          const otherDetail = otherStep.querySelector('.info-step-detail');
          otherStep.classList.remove('is-open');
          if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
          if (otherDetail) otherDetail.style.maxHeight = '0px';
        });

        // If clicked step was closed, open it with animation.
        if (!isOpen) {
          step.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
          if (detail) detail.style.maxHeight = detail.scrollHeight + 'px';
        }
      });
    });

    window.addEventListener('resize', () => {
      const openStep = document.querySelector('.js-info-step.is-open .info-step-detail');
      if (openStep) {
        openStep.style.maxHeight = openStep.scrollHeight + 'px';
      }
    });
  }

  /* ---------- 12. Contact Quick Links ---------- */
  function contactQuickLinks() {
    const whatsappLinks = document.querySelectorAll('.js-whatsapp-link');
    whatsappLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const phone = link.dataset.phone;
        if (!phone) return;

        const pageName = (document.title || 'HOLYFAITH English School').split('–')[0].trim();
        const msg = `Dear HOLYFAITH Admissions Team, I would like to request information regarding the admission process. I am contacting you from the ${pageName} page. Kindly share the next steps and required documents. Thank you.`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank', 'noopener');
      });
    });

    const emailLinks = document.querySelectorAll('.js-email-link');
    emailLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const email = link.dataset.email;
        if (!email) return;

        const pageName = (document.title || 'HOLYFAITH English School').split('–')[0].trim();
        const subject = 'Admission Enquiry | HOLYFAITH English School';
        const body = [
          'Dear HOLYFAITH Admissions Team,',
          '',
          'I hope you are doing well.',
          'I would like to request detailed information regarding the admission process, eligibility, fee structure, and required documents.',
          `I am contacting you from the ${pageName} page.`,
          '',
          'Kindly share the next steps at your convenience.',
          '',
          'Thank you.',
          'Regards,'
        ].join('\n');

        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
    });
  }

  /* ---------- 12. Scroll to Top ---------- */
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('active', window.scrollY > 400);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 13. Testimonials Slider ---------- */
  const testiTrack = document.getElementById('testiTrack');
  const testiPrev = document.getElementById('testiPrev');
  const testiNext = document.getElementById('testiNext');
  const testiDotsWrap = document.getElementById('testiDots');

  if (testiTrack && testiPrev && testiNext && testiDotsWrap) {
    const cards = testiTrack.querySelectorAll('.testi-card');
    let currentSlide = 0;
    let autoPlayTimer;

    function getVisibleCount() {
      const w = window.innerWidth;
      if (w <= 768) return 1;
      if (w <= 1024) return 2;
      return 3;
    }

    function getMaxSlide() {
      return Math.max(0, cards.length - getVisibleCount());
    }

    function buildDots() {
      testiDotsWrap.innerHTML = '';
      const total = getMaxSlide() + 1;
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'testi-dot' + (i === currentSlide ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        testiDotsWrap.appendChild(dot);
      }
    }

    function updateSlider() {
      const card = cards[0];
      const gap = 24;
      const cardWidth = card.offsetWidth + gap;
      testiTrack.style.transform = 'translateX(-' + (currentSlide * cardWidth) + 'px)';
      // Update dots
      testiDotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    function goTo(index) {
      currentSlide = Math.max(0, Math.min(index, getMaxSlide()));
      updateSlider();
      resetAutoPlay();
    }

    function nextSlide() {
      goTo(currentSlide >= getMaxSlide() ? 0 : currentSlide + 1);
    }

    function prevSlide() {
      goTo(currentSlide <= 0 ? getMaxSlide() : currentSlide - 1);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(nextSlide, 5000);
    }

    testiNext.addEventListener('click', nextSlide);
    testiPrev.addEventListener('click', prevSlide);

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    testiTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    testiTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
      }
    }, { passive: true });

    // Init
    buildDots();
    updateSlider();
    resetAutoPlay();

    // Rebuild on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (currentSlide > getMaxSlide()) currentSlide = getMaxSlide();
        buildDots();
        updateSlider();
      }, 200);
    });
  }

})();
