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
// Alérgenos — tabs
// ----------------------------------------------------------
const alergTabs   = document.querySelectorAll('.alerg__tab');
const alergPanels = document.querySelectorAll('.alerg__panel');

alergTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    alergTabs.forEach(t   => t.classList.remove('is-active'));
    alergPanels.forEach(p => p.classList.remove('is-active'));
    tab.classList.add('is-active');
    const panel = document.getElementById('alergp-' + tab.dataset.alerg);
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
// Today's opening hours — real time
// ----------------------------------------------------------
const schedule = {
  // 0 = Sunday … 6 = Saturday  (slots: [open HHMM, close HHMM])
  0: { slots: [[1130, 1600], [1930, 2300]] }, // domingo
  1: { slots: [] },                             // lunes (cerrado)
  2: { slots: [[1130, 1530]] },                 // martes
  3: { slots: [[1130, 1530]] },                 // miércoles
  4: { slots: [[1130, 1530], [1930, 2300]] },   // jueves
  5: { slots: [[1130, 1530], [1930, 2300]] },   // viernes
  6: { slots: [[1130, 1530], [1930, 2300]] },   // sábado
};

// ----------------------------------------------------------
// Dropdown en flujo — Menú del día (hero)
// ----------------------------------------------------------
(function () {
  const btn      = document.getElementById('heroMenuBtn');
  const dropdown = document.getElementById('heroMenuDropdown');
  if (!btn || !dropdown) return;

  let parsed = false;

  btn.addEventListener('click', () => {
    const open = dropdown.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      if (!parsed && window.FB) { window.FB.XFBML.parse(); parsed = true; }
      setTimeout(() => {
        dropdown.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  });
})();

// ----------------------------------------------------------
// Cookie banner
// ----------------------------------------------------------
const cookieBanner = document.getElementById('cookieBanner');
if (cookieBanner && !localStorage.getItem('chicotin-cookies')) {
  cookieBanner.removeAttribute('hidden');
}
document.getElementById('cookieAccept')?.addEventListener('click', () => {
  localStorage.setItem('chicotin-cookies', '1');
  document.getElementById('cookieBanner').setAttribute('hidden', '');
});

// ----------------------------------------------------------
// Real-time opening hours widget
// ----------------------------------------------------------
(function () {
  const widget     = document.getElementById('hoursWidget');
  const statusEl   = document.getElementById('hoursStatusText');
  const scheduleEl = document.getElementById('hoursToday');
  const nextEl     = document.getElementById('hoursNext');
  if (!widget) return;

  const DAY_NAMES   = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const MONTH_NAMES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  function hhmm(t) {
    return Math.floor(t / 100) + ':' + String(t % 100).padStart(2, '0');
  }

  function slotsLabel(slots) {
    return slots.map(([a, b]) => hhmm(a) + ' – ' + hhmm(b)).join(' · ');
  }

  function update() {
    const now   = new Date();
    const day   = now.getDay();
    const nowT  = now.getHours() * 100 + now.getMinutes();
    const slots = schedule[day].slots;

    let isOpen = false, closesAt = null;
    for (const [o, c] of slots) {
      if (nowT >= o && nowT < c) { isOpen = true; closesAt = c; break; }
    }

    widget.classList.toggle('is-open',   isOpen);
    widget.classList.toggle('is-closed', !isOpen);

    const dayName  = DAY_NAMES[day].charAt(0).toUpperCase() + DAY_NAMES[day].slice(1);
    const dateLabel = dayName + ' ' + now.getDate() + ' de ' + MONTH_NAMES[now.getMonth()];

    if (isOpen) {
      statusEl.textContent   = 'Abierto ahora';
      scheduleEl.textContent = dateLabel + ': ' + slotsLabel(slots);
      nextEl.textContent     = 'Cierra a las ' + hhmm(closesAt);
      nextEl.removeAttribute('hidden');
    } else {
      statusEl.textContent   = slots.length ? 'Cerrado ahora' : 'Hoy cerramos';
      scheduleEl.textContent = slots.length ? dateLabel + ': ' + slotsLabel(slots) : '';

      // Next opening: remaining slot today, or first slot of next open day
      const upcoming = slots.find(([o]) => nowT < o);
      let nextMsg = '';
      if (upcoming) {
        nextMsg = 'Abre hoy a las ' + hhmm(upcoming[0]);
      } else {
        for (let d = 1; d <= 7; d++) {
          const nd = (day + d) % 7;
          if (schedule[nd].slots.length) {
            const when = d === 1 ? 'mañana' : 'el ' + DAY_NAMES[nd];
            nextMsg = 'Abre ' + when + ' a las ' + hhmm(schedule[nd].slots[0][0]);
            break;
          }
        }
      }
      if (nextMsg) { nextEl.textContent = nextMsg; nextEl.removeAttribute('hidden'); }
      else nextEl.setAttribute('hidden', '');
    }
  }

  update();
  setInterval(update, 60000); // refresca cada minuto
})();
