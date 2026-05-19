// ── STUDIO 62 · main.js ─────────────────────────────

// ═══════════════════════════════════════════════════
// CURSOR
// ═══════════════════════════════════════════════════
const cur = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');
let mx=0,my=0,cx=0,cy=0;
document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
(function loop(){ cx+=(mx-cx)*.1; cy+=(my-cy)*.1; cur.style.left=cx+'px'; cur.style.top=cy+'px'; requestAnimationFrame(loop); })();

// ═══════════════════════════════════════════════════
// PRELOADER
// ═══════════════════════════════════════════════════
const pre  = document.getElementById('preloader');
const fill = document.querySelector('.pre-fill');

window.addEventListener('DOMContentLoaded', () => {
  fill.style.width = '100%';
  setTimeout(() => {
    pre.classList.add('gone');
    document.body.classList.remove('no-scroll');
    heroEntrance();
    initScrollAnimations();
  }, 2300);
});

// ═══════════════════════════════════════════════════
// HEADER SCROLL STATE
// ═══════════════════════════════════════════════════
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('solid', window.scrollY > 60);
}, { passive: true });

// ═══════════════════════════════════════════════════
// BURGER / MOBILE MENU
// ═══════════════════════════════════════════════════
const burger  = document.getElementById('burger');
const mobMenu = document.getElementById('mob-menu');
burger.addEventListener('click', () => {
  const o = mobMenu.classList.toggle('open');
  burger.classList.toggle('x', o);
  document.body.classList.toggle('no-scroll', o);
});
mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobMenu.classList.remove('open');
  burger.classList.remove('x');
  document.body.classList.remove('no-scroll');
}));

// ═══════════════════════════════════════════════════
// SMOOTH ANCHOR SCROLL
// ═══════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ═══════════════════════════════════════════════════
// HERO ENTRANCE (runs after preloader)
// ═══════════════════════════════════════════════════
function heroEntrance() {
  // eyebrow
  const eye = document.querySelector('.hero-eyebrow');
  if (eye) { eye.classList.add('a-eye'); setTimeout(() => eye.classList.add('in'), 100); }

  // h1 lines — wrap each .h1-line content in .a-line-inner
  document.querySelectorAll('.h1-line').forEach((line, i) => {
    const text = line.innerHTML;
    line.classList.add('a-line');
    line.innerHTML = `<span class="a-line-inner" style="--d:${0.3 + i * 0.14}s">${text}</span>`;
    setTimeout(() => line.querySelector('.a-line-inner').classList.add('in'), 100);
  });

  // hero bar items
  document.querySelectorAll('.hbar-item, .hbar-cta').forEach((el, i) => {
    el.classList.add('a-bar');
    el.style.setProperty('--d', `${0.9 + i * 0.12}s`);
    setTimeout(() => el.classList.add('in'), 100);
  });
}

// ═══════════════════════════════════════════════════
// SCROLL ANIMATION ENGINE
// ═══════════════════════════════════════════════════
function initScrollAnimations() {
  assignAnimClasses();

  const ALL_ANIM = '.a-up,.a-left,.a-right,.a-clip,.a-scale,.a-fade';
  const els = document.querySelectorAll(ALL_ANIM);

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        // Animate IN
        el.classList.add('in');
      } else {
        // Only reset if element is BELOW viewport (= hasn't been seen yet, or scrolled back up past it)
        if (entry.boundingClientRect.top > 0) {
          el.classList.remove('in');
        }
        // If above viewport (scrolled past) — leave it visible
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -48px 0px'
  });

  els.forEach(el => io.observe(el));

  // Counter animation
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
      } else if (entry.boundingClientRect.top > 0) {
        // reset counter
        entry.target.textContent = '0';
        entry.target._done = false;
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-n').forEach(el => counterIO.observe(el));
}

// ═══════════════════════════════════════════════════
// ASSIGN ANIMATION CLASSES DYNAMICALLY
// ═══════════════════════════════════════════════════
function assignAnimClasses() {
  // Remove old .reveal classes and assign new animation classes

  // Section tags → blur-up slow
  document.querySelectorAll('.sec-tag').forEach(el => {
    el.classList.remove('reveal');
    el.classList.add('a-up');
    el.style.setProperty('--d', '0s');
  });

  // Section h2 → clip from bottom (dramatic)
  document.querySelectorAll('.sec-h2').forEach(el => {
    el.classList.remove('reveal');
    el.classList.add('a-clip');
    el.style.setProperty('--d', '0.1s');
  });

  // Body text → blur up staggered
  document.querySelectorAll('.body-text').forEach((el, i) => {
    el.classList.remove('reveal');
    el.classList.add('a-up');
    el.style.setProperty('--d', `${0.2 + i * 0.12}s`);
  });

  // Buttons → from left
  document.querySelectorAll('.btn-sharp, .btn-submit').forEach(el => {
    el.classList.remove('reveal');
    el.classList.add('a-right');
    el.style.setProperty('--d', '0.3s');
  });

  // Stats row → scale
  document.querySelectorAll('.stat-block').forEach((el, i) => {
    el.classList.remove('reveal');
    el.classList.add('a-scale');
    el.style.setProperty('--d', `${0.15 + i * 0.15}s`);
  });

  // Service rows → staggered from left
  document.querySelectorAll('.svc-row').forEach((el, i) => {
    el.classList.remove('reveal');
    el.classList.add('a-right');
    el.style.setProperty('--d', `${i * 0.1}s`);
  });

  // Project cells → scale staggered
  document.querySelectorAll('.proj-cell').forEach((el, i) => {
    el.classList.remove('reveal');
    el.classList.add('a-scale');
    el.style.setProperty('--d', `${i * 0.12}s`);
  });

  // Manifesto → big blur fade
  const quote = document.querySelector('.manifesto');
  if (quote) { quote.classList.remove('reveal'); quote.classList.add('a-fade'); }
  const cite = document.querySelector('.manifesto-cite');
  if (cite) { cite.classList.remove('reveal'); cite.classList.add('a-up'); cite.style.setProperty('--d','0.4s'); }

  // Contact info rows → from right
  document.querySelectorAll('.ct-row').forEach((el, i) => {
    el.classList.add('a-left');
    el.style.setProperty('--d', `${i * 0.1}s`);
  });
  // Horario → blur up
  const horario = document.querySelector('.horario');
  if (horario) { horario.classList.remove('reveal'); horario.classList.add('a-up'); horario.style.setProperty('--d','0.2s'); }

  // Contact form fields → blur up staggered
  document.querySelectorAll('.fg').forEach((el, i) => {
    el.classList.add('a-up');
    el.style.setProperty('--d', `${i * 0.08}s`);
  });

  // form title
  const formTtl = document.querySelector('.form-ttl');
  if (formTtl) { formTtl.classList.add('a-clip'); formTtl.style.setProperty('--d','0s'); }

  // Remaining reveal → default blur-up
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('a-up');
  });
}

// ═══════════════════════════════════════════════════
// COUNTER
// ═══════════════════════════════════════════════════
function startCounter(el) {
  if (el._done) return;
  el._done = true;
  const target = +el.dataset.target;
  let n = 0;
  const step = target / 55;
  const t = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = Math.round(n);
    if (n >= target) clearInterval(t);
  }, 22);
}

// ═══════════════════════════════════════════════════
// FORM
// ═══════════════════════════════════════════════════
const form   = document.getElementById('ct-form');
const formOk = document.getElementById('form-ok');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.querySelector('.bs-text').textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.querySelector('.bs-text').textContent = 'Enviar Mensagem';
      btn.disabled = false;
      formOk.classList.add('show');
      setTimeout(() => formOk.classList.remove('show'), 5000);
    }, 1500);
  });
}

// ═══════════════════════════════════════════════════
// FOOTER YEAR
// ═══════════════════════════════════════════════════
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// ═══════════════════════════════════════════════════
// SERVICE ROW HOVER INDENT (premium touch)
// ═══════════════════════════════════════════════════
document.querySelectorAll('.svc-row').forEach(row => {
  row.addEventListener('mouseenter', () => { row.style.paddingLeft = '20px'; });
  row.addEventListener('mouseleave', () => { row.style.paddingLeft = '0'; });
});
