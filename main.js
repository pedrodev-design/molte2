// ── MOLTE. · main.js ────────────────────────

// ═══════════════════════════════════
// PRELOADER
// ═══════════════════════════════════
const pre  = document.getElementById('preloader');

if (pre) {
  window.addEventListener('DOMContentLoaded', () => {
    const fill = document.getElementById('pre-fill');
    if (fill) requestAnimationFrame(() => { fill.style.width = '100%'; });

    setTimeout(() => {
      pre.classList.add('gone');
      document.body.classList.remove('no-scroll');
      heroEntrance();
      initScrollAnimations();
    }, 2400);
  });
} else {
  window.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
  });
}

// ═══════════════════════════════════
// HEADER
// ═══════════════════════════════════
const hd = document.getElementById('hd');
if (hd) {
  window.addEventListener('scroll', () => {
    hd.classList.toggle('solid', window.scrollY > 50);
  }, { passive: true });
}

// ═══════════════════════════════════
// BURGER
// ═══════════════════════════════════
const burger = document.getElementById('burger');
const mob    = document.getElementById('mob');
if (burger && mob) {
  burger.addEventListener('click', () => {
    const o = mob.classList.toggle('open');
    burger.classList.toggle('x', o);
    document.body.classList.toggle('no-scroll', o);
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mob.classList.remove('open');
    burger.classList.remove('x');
    document.body.classList.remove('no-scroll');
  }));
}

// ═══════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ═══════════════════════════════════
// HERO ENTRANCE
// ═══════════════════════════════════
function heroEntrance() {
  const eye = document.querySelector('.hero-eye');
  if (eye) {
    eye.classList.add('hero-eye-anim');
    setTimeout(() => eye.classList.add('in'), 80);
  }
  document.querySelectorAll('.hl').forEach((line, i) => {
    const html = line.innerHTML;
    line.classList.add('hl-wrap');
    line.innerHTML = `<span class="hl-inner" style="--d:${0.25 + i * 0.14}s">${html}</span>`;
    setTimeout(() => line.querySelector('.hl-inner').classList.add('in'), 80);
  });
}

// ═══════════════════════════════════
// SCROLL ANIMATIONS
// ═══════════════════════════════════
function initScrollAnimations() {
  document.querySelectorAll('.proj-grid .rv').forEach((el, i) => {
    el.style.setProperty('--d', `${i * 0.08}s`);
  });
  document.querySelectorAll('.svc-list .rv').forEach((el, i) => {
    el.style.setProperty('--d', `${i * 0.07}s`);
  });
  document.querySelectorAll('.diff-grid .rv').forEach((el, i) => {
    el.style.setProperty('--d', `${i * 0.1}s`);
  });

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      } else if (entry.boundingClientRect.top > 0) {
        entry.target.classList.remove('in');
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.rv').forEach(el => io.observe(el));
}

// ═══════════════════════════════════
// FOOTER YEAR
// ═══════════════════════════════════
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();
