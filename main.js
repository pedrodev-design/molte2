// ── STUDIO SAMBA · main.js ────────────────────────

// ═══════════════════════════════════
// PRELOADER
// ═══════════════════════════════════
const pre  = document.getElementById('preloader');
const fill = document.querySelector('.pre-fill');

if (pre) {
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => { fill.style.width = '100%'; });
    setTimeout(() => {
      pre.classList.add('gone');
      document.body.classList.remove('no-scroll');
      heroEntrance();
      initScrollAnimations();
      initServiceAccordion();
    }, 2400);
  });
} else {
  window.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initServiceAccordion();
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
  // Stagger project cards
  document.querySelectorAll('.proj-grid .rv').forEach((el, i) => {
    el.style.setProperty('--d', `${i * 0.08}s`);
  });
  // Stagger service rows
  document.querySelectorAll('.svc-list .rv').forEach((el, i) => {
    el.style.setProperty('--d', `${i * 0.07}s`);
  });
  // Stagger socias
  document.querySelectorAll('.socias .socia').forEach((el, i) => {
    el.classList.add('rv');
    el.style.setProperty('--d', `${i * 0.08}s`);
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
// SERVICE ACCORDION
// ═══════════════════════════════════
function initServiceAccordion() {
  const rows = document.querySelectorAll('.svc-row[data-svc]');
  rows.forEach(btn => {
    const panelId = 'svc-' + btn.dataset.svc;
    const panel   = document.getElementById(panelId);
    if (!panel) return;

    btn.addEventListener('click', () => {
      const isOpen = panel.classList.contains('open');

      // Close all first
      document.querySelectorAll('.svc-panel.open').forEach(p => {
        p.classList.remove('open');
        const b = document.querySelector(`.svc-row[data-svc="${p.id.replace('svc-','')}"]`);
        if (b) b.setAttribute('aria-expanded','false');
      });

      // Toggle clicked
      if (!isOpen) {
        panel.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        // Smooth scroll so panel is visible
        setTimeout(() => {
          btn.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    });
  });
}

// ═══════════════════════════════════
// FORM
// ═══════════════════════════════════
const form   = document.getElementById('ct-form');
const formOk = document.getElementById('form-ok');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.querySelector('.bs-t').textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.querySelector('.bs-t').textContent = 'Enviar Mensagem';
      btn.disabled = false;
      formOk.classList.add('show');
      setTimeout(() => formOk.classList.remove('show'), 5000);
    }, 1500);
  });
}

// ═══════════════════════════════════
// FOOTER YEAR
// ═══════════════════════════════════
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();
