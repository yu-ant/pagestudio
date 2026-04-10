/* ============================================================
   PAGE STUDIO — main.js
   역할: 네비게이션, 스크롤 애니메이션, 라이트박스,
         아코디언, 갤러리 필터, 예약 폼, 공통 유틸
   ============================================================ */

/* ─── 네비게이션 ────────────────────────────────────────────── */
(function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const drawer = document.querySelector('.nav__drawer');
  const drawerLinks = document.querySelectorAll('.nav__drawer .nav__link');

  // 스크롤 시 배경 추가
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // 햄버거
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      drawer.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 현재 페이지 active
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ─── 스크롤 페이드인 ───────────────────────────────────────── */
(function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

/* ─── 스크롤 유도 버튼 ──────────────────────────────────────── */
(function initScrollCue() {
  const btn = document.querySelector('.hero__scroll');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const target = document.querySelector('#about') || document.querySelector('.section');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
})();

/* ─── 아코디언 ──────────────────────────────────────────────── */
(function initAccordion() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const isOpen = item.classList.contains('open');
      // 같은 아코디언 내 모두 닫기
      item.closest('.accordion').querySelectorAll('.accordion__item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ─── 라이트박스 ────────────────────────────────────────────── */
(function initLightbox() {
  const lb = document.querySelector('.lightbox');
  if (!lb) return;

  const img = lb.querySelector('.lightbox__img');
  const counter = lb.querySelector('.lightbox__counter');
  let items = [];
  let current = 0;

  function open(index) {
    current = index;
    img.src = items[current].src;
    img.alt = items[current].alt || '';
    if (counter) counter.textContent = `${current + 1} / ${items.length}`;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prev() { open((current - 1 + items.length) % items.length); }
  function next() { open((current + 1) % items.length); }

  // 갤러리 아이템 클릭
  function attachItems() {
    items = [];
    document.querySelectorAll('.gallery__item[data-src]').forEach((el, i) => {
      items.push({ src: el.dataset.src, alt: el.dataset.alt || '' });
      el.addEventListener('click', () => open(i));
    });
  }

  lb.querySelector('.lightbox__close')?.addEventListener('click', close);
  lb.querySelector('.lightbox__nav--prev')?.addEventListener('click', prev);
  lb.querySelector('.lightbox__nav--next')?.addEventListener('click', next);

  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // DOM 준비 후 attach
  window.addEventListener('galleryReady', attachItems);
  attachItems();
})();

/* ─── 갤러리 필터 탭 ────────────────────────────────────────── */
(function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery__filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.gallery__item').forEach(item => {
        const show = cat === 'all' || item.dataset.category === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  });
})();

/* ─── 예약 폼 ───────────────────────────────────────────────── */
(function initReservationForm() {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  const success = document.querySelector('.form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = '전송 중...';

    // 로컬 환경 — localStorage 저장 시뮬레이션
    const data = Object.fromEntries(new FormData(form));
    data.id = Date.now();
    data.submittedAt = new Date().toISOString();

    const existing = JSON.parse(localStorage.getItem('ps_reservations') || '[]');
    existing.push(data);
    localStorage.setItem('ps_reservations', JSON.stringify(existing));

    await new Promise(r => setTimeout(r, 600)); // UX 딜레이

    form.style.display = 'none';
    if (success) success.classList.add('show');
    btn.disabled = false;
  });
})();

/* ─── 날짜 최솟값 설정 (예약 폼) ───────────────────────────── */
(function setMinDate() {
  const dateInput = document.getElementById('date');
  if (!dateInput) return;
  const today = new Date();
  today.setDate(today.getDate() + 1); // 최소 하루 뒤
  dateInput.min = today.toISOString().split('T')[0];
})();
