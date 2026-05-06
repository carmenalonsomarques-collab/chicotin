/* ==========================================================
   CHICOTÍN — main.js
   ========================================================== */

// ----------------------------------------------------------
// Reseñas — carrusel
// ----------------------------------------------------------
(function () {
  const slider   = document.getElementById('reseñasSlider');
  if (!slider) return;

  const track    = slider.querySelector('.slider__track');
  const slides   = slider.querySelectorAll('.slider__slide');
  const prevBtn  = slider.querySelector('.slider__btn--prev');
  const nextBtn  = slider.querySelector('.slider__btn--next');
  const dots     = Array.from(slider.querySelectorAll('.slider__dot'));
  const total    = slides.length;
  let   current  = 0;
  let   timer;

  function goTo(i) {
    current = ((i % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === current));
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetAuto(); }));

  slider.querySelector('.slider__viewport').addEventListener('mouseenter', () => clearInterval(timer));
  slider.querySelector('.slider__viewport').addEventListener('mouseleave', startAuto);

  goTo(0);
  startAuto();
})();

// ----------------------------------------------------------
// Carta — tabs
// ----------------------------------------------------------
const cartaTabs   = document.querySelectorAll('.carta__tab');
const cartaPanels = document.querySelectorAll('.carta__panel');

cartaTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    cartaTabs.forEach(t   => t.classList.remove('is-active'));
    cartaPanels.forEach(p => p.classList.remove('is-active'));
    tab.classList.add('is-active');
    const panel = document.getElementById('panel-' + tab.dataset.panel);
    if (panel) panel.classList.add('is-active');
  });
});

// ----------------------------------------------------------
// Sticky navigation
// ----------------------------------------------------------
const nav = document.getElementById('nav');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ----------------------------------------------------------
// Mobile drawer
// ----------------------------------------------------------
const burger    = document.getElementById('navBurger');
const drawer    = document.getElementById('drawer');
const overlay   = document.getElementById('overlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
  drawer.classList.add('open');
  overlay.classList.add('open');
  burger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  burger.classList.remove('open');
  document.body.style.overflow = '';
}

burger.addEventListener('click', openDrawer);
overlay.addEventListener('click', closeDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

// ----------------------------------------------------------
// Fade-up animations
// ----------------------------------------------------------
const fadeEls = Array.from(document.querySelectorAll('.fade-up'));

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Elementos ya visibles al cargar la página → mostrar inmediatamente
fadeEls.forEach(el => {
  if (isInViewport(el)) el.classList.add('visible');
});

// Resto → animar al hacer scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.filter(el => !el.classList.contains('visible'))
       .forEach(el => observer.observe(el));

// Fallback: si algo sigue oculto a los 800ms, mostrarlo
setTimeout(() => {
  document.querySelectorAll('.fade-up:not(.visible)')
          .forEach(el => el.classList.add('visible'));
}, 800);

// ----------------------------------------------------------
// Today's opening hours
// ----------------------------------------------------------
const schedule = {
  // 0 = Sunday … 6 = Saturday
  0: { open: true,  label: '11:30 – 16:00 · 19:30 – 23:00' }, // domingo
  1: { open: false, label: 'Hoy cerramos' },                    // lunes
  2: { open: true,  label: '11:30 – 15:30' },                  // martes
  3: { open: true,  label: '11:30 – 15:30' },                  // miércoles
  4: { open: true,  label: '11:30 – 15:30 · 19:30 – 23:00' }, // jueves
  5: { open: true,  label: '11:30 – 15:30 · 19:30 – 23:00' }, // viernes
  6: { open: true,  label: '11:30 – 15:30 · 19:30 – 23:00' }, // sábado
};

const hoursEl = document.getElementById('hoursToday');
if (hoursEl) {
  const today = new Date().getDay();
  const info  = schedule[today];
  hoursEl.textContent = info.label;
  hoursEl.classList.add(info.open ? 'open' : 'closed');
}
