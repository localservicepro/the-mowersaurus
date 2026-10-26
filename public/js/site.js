/* The Mowersaurus — site behaviour. No dependencies. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- header ---------------- */
  var header = $('.site-header');
  var onScroll = function () { header && header.classList.toggle('scrolled', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var dd = $('.nav-dropdown');
  if (dd) {
    var trig = $('.nav-trigger', dd);
    var openedAt = 0;
    var open = function () { if (!dd.classList.contains('open')) openedAt = Date.now(); dd.classList.add('open'); trig.setAttribute('aria-expanded', 'true'); };
    var close = function () { dd.classList.remove('open'); trig.setAttribute('aria-expanded', 'false'); };
    if (window.matchMedia('(hover: hover)').matches) {
      dd.addEventListener('mouseenter', open);
      dd.addEventListener('mouseleave', close);
    }
    trig.addEventListener('click', function (e) {
      e.preventDefault();
      // A click straight after hover-open should keep the panel open, not toggle it shut.
      if (dd.classList.contains('open') && Date.now() - openedAt > 500) close(); else open();
    });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); } });
    dd.addEventListener('focusout', function (e) { if (!dd.contains(e.relatedTarget)) close(); });
  }

  var burger = $('.nav-burger'), panel = $('#mobile-menu');
  if (burger && panel) {
    var setMenu = function (on) {
      panel.classList.toggle('open', on);
      burger.setAttribute('aria-expanded', String(on));
      burger.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
      document.body.style.overflow = on ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { setMenu(!panel.classList.contains('open')); });
    $$('a', panel).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    $$('.acc', panel).forEach(function (b) {
      b.addEventListener('click', function () { b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true')); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------------- quote form: pre-select + submit ---------------- */
  var form = $('[data-quote-form]');
  var select = form && form.querySelector('select[name="service_needed"]');
  var notes = form && form.querySelector('textarea[name="job_notes"]');
  var SERVICE_KEYS = {
    'lawn-care-programs': 'Lawn Care Programs (Good, Great & Amazing)',
    'lawn-mowing': 'Lawn Mowing & Overgrown Lawn Cuts',
    'gardening': 'Garden Tidy-Ups & General Gardening',
    'garden-maintenance-programs': 'Garden Maintenance Programs',
    'mulching-landscaping': 'Mulching & Small Landscaping',
    'lawn-renovation': 'Lawn Renovation & Aeration',
    'other': 'Other'
  };
  var preselect = function (label, tier) {
    if (!select || !label) return;
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].text === label) { select.selectedIndex = i; break; }
    }
    select.dispatchEvent(new Event('change', { bubbles: true }));
    if (tier && notes && !notes.value) notes.value = 'Interested in: ' + tier + '\n';
  };
  $$('[data-quote]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = $('#quote');
      if (!target) return; // falls through to /#quote style link
      e.preventDefault();
      preselect(a.getAttribute('data-service'), a.getAttribute('data-tier'));
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      var first = form && form.querySelector('input[name="full_name"]');
      if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, reduce ? 0 : 450);
      if (history.replaceState) history.replaceState(null, '', '#quote');
    });
  });
  try {
    var qp = new URLSearchParams(location.search).get('service');
    if (qp && SERVICE_KEYS[qp]) preselect(SERVICE_KEYS[qp]);
  } catch (e) { /* old browsers */ }

  if (form) {
    var validate = function (field) {
      var wrap = field.closest('.field');
      var ok = field.checkValidity();
      if (wrap) wrap.classList.toggle('invalid', !ok);
      return ok;
    };
    $$('input,select', form).forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value) validate(f); });
      f.addEventListener('change', function () { validate(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = $$('input[required],select[required]', form);
      var bad = fields.filter(function (f) { return !validate(f); });
      if (bad.length) { bad[0].focus(); return; }
      if (form.querySelector('input[name="website"]').value) return; // honeypot
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Sending…';
      // The GHL external tracking script listens for this submit event and captures the
      // fields. Give its request a moment to leave before moving to the thank-you page.
      setTimeout(function () { window.location.href = '/thank-you/'; }, 900);
    });
  }

  /* ---------------- before / after sliders ---------------- */
  $$('.ba-frame').forEach(function (f) {
    var r = $('input[type=range]', f);
    var set = function () { f.style.setProperty('--pos', r.value + '%'); };
    r.addEventListener('input', set); set();
  });

  /* ---------------- tabs (home programs) ---------------- */
  $$('[data-tabs]').forEach(function (wrap) {
    var tabs = $$('[role=tab]', wrap);
    var show = function (t) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', String(on)); x.setAttribute('aria-pressed', String(on));
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
          show(n); n.focus();
        }
      });
    });
  });

  /* ---------------- gallery filters ---------------- */
  var gallery = $('[data-gallery]');
  if (gallery) {
    var items = $$('.g-item', gallery);
    var count = $('[data-gallery-count]');
    var btns = $$('[data-filter]');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var cat = b.getAttribute('data-filter'), n = 0;
        btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        items.forEach(function (it) {
          var show = cat === 'all' || it.getAttribute('data-cat') === cat;
          it.hidden = !show; if (show) n++;
        });
        if (count) count.textContent = 'Showing ' + n + ' photo' + (n === 1 ? '' : 's') + (cat === 'all' ? '' : ' in ' + b.textContent);
      });
    });
  }

  /* ---------------- lightbox ---------------- */
  var lb, lbBody, lbCap, lbList = [], lbIdx = 0;
  var buildLb = function () {
    if (lb) return;
    lb = document.createElement('dialog');
    lb.className = 'lightbox';
    lb.setAttribute('aria-label', 'Enlarged media');
    lb.innerHTML = '<button class="lb-close" aria-label="Close">×</button><button class="lb-nav lb-prev" aria-label="Previous photo">‹</button><button class="lb-nav lb-next" aria-label="Next photo">›</button><div class="lb-body"></div><p class="lb-cap"></p>';
    document.body.appendChild(lb);
    lbBody = $('.lb-body', lb); lbCap = $('.lb-cap', lb);
    $('.lb-close', lb).addEventListener('click', function () { lb.close(); });
    $('.lb-prev', lb).addEventListener('click', function () { step(-1); });
    $('.lb-next', lb).addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('close', function () { lbBody.innerHTML = ''; });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
  };
  var showImg = function (btn) {
    lbBody.innerHTML = '';
    var img = new Image();
    img.src = btn.getAttribute('data-lightbox'); img.alt = btn.getAttribute('data-caption') || '';
    lbBody.appendChild(img); lbCap.textContent = img.alt;
  };
  var step = function (d) {
    if (!lbList.length) return;
    lbIdx = (lbIdx + d + lbList.length) % lbList.length; showImg(lbList[lbIdx]);
  };
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lightbox]');
    if (b) {
      buildLb();
      lbList = $$('[data-lightbox]').filter(function (x) { return !x.closest('[hidden]'); });
      lbIdx = lbList.indexOf(b);
      $$('.lb-nav', lb).forEach(function (n) { n.hidden = lbList.length < 2; });
      showImg(b); lb.showModal(); return;
    }
    var v = e.target.closest('[data-video-lightbox]');
    if (v) {
      buildLb(); lbList = [];
      $$('.lb-nav', lb).forEach(function (n) { n.hidden = true; });
      var vid = document.createElement('video');
      vid.controls = true; vid.autoplay = true; vid.playsInline = true;
      var webm = v.getAttribute('data-video-webm');
      vid.src = (webm && vid.canPlayType('video/webm; codecs="vp9, opus"')) ? webm : v.getAttribute('data-video-lightbox');
      lbBody.innerHTML = ''; lbBody.appendChild(vid);
      // pause the silent background loops while the sound version plays
      $$('video[data-reel-video]').forEach(function (r) { r.pause(); });
      lb.addEventListener('close', function resume() { lb.removeEventListener('close', resume); $$('video[data-reel-video]').forEach(function (r) { if (r.dataset.visible === '1' && r.src) r.play().catch(function () {}); }); });
      lbCap.textContent = v.getAttribute('data-caption') || '';
      lb.showModal();
    }
  });

  /* ---------------- lazy reel (muted, inline, loop; loads near viewport) ---------------- */
  $$('video[data-lazy-video]').forEach(function (v) {
    var load = function () {
      $$('source[data-src]', v).forEach(function (s) { s.src = s.getAttribute('data-src'); });
      v.load(); if (!reduce) v.play().catch(function () {});
    };
    if (!('IntersectionObserver' in window)) return load();
    var io = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { io.disconnect(); load(); }
    }, { rootMargin: '300px' });
    io.observe(v);
  });

  /* ---------------- highlight reel: silent autoplay loop ---------------- */
  var saveData = navigator.connection && navigator.connection.saveData;
  $$('video[data-reel-video]').forEach(function (v) {
    if (reduce || saveData) return; // poster image stays; "Watch with sound" still works
    var size = window.matchMedia('(min-width: 768px)').matches ? '720' : '360';
    var fmt = v.canPlayType('video/webm; codecs="vp9"') ? 'webm' : 'mp4';
    var load = function () {
      if (v.src) return;
      v.src = v.getAttribute('data-' + size + '-' + fmt);
      v.addEventListener('playing', function () { v.classList.add('playing'); });
    };
    var io = 'IntersectionObserver' in window && new IntersectionObserver(function (en) {
      var on = en[0].isIntersecting;
      v.dataset.visible = on ? '1' : '0';
      if (on) { load(); v.play().catch(function () {}); } else if (v.src) { v.pause(); }
    }, { threshold: 0.2 });
    // start after the page has loaded so the poster (LCP) isn't held up
    var start = function () { if (io) io.observe(v); else { load(); v.play().catch(function () {}); } };
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
  });

  /* ---------------- reveal on scroll ---------------- */
  var reveals = $$('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (r) { r.classList.add('in'); });
  } else {
    var rio = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting || x.boundingClientRect.top < 0) { x.target.classList.add('in'); rio.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { rio.observe(r); });
  }

  /* ---------------- animated service-area map ---------------- */
  $$('[data-area-map]').forEach(function (wrap) {
    var svg = $('svg', wrap), route = $('#route', svg), mower = $('#map-mower', svg);
    var subs = $$('.sub', svg);
    subs.forEach(function (g) {
      var toggle = function () { g.classList.toggle('show'); };
      g.addEventListener('click', toggle);
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    });
    if (!route || !mower) return;
    var L = route.getTotalLength();
    // distance along the route where the mower reaches each suburb
    var marks = subs.map(function (g) {
      var x = +g.getAttribute('data-x'), y = +g.getAttribute('data-y'), best = 0, bd = 1e9;
      for (var d = 0; d <= L; d += 4) {
        var p = route.getPointAtLength(d), dd2 = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y);
        if (dd2 < bd) { bd = dd2; best = d; }
      }
      return { g: g, at: best };
    });
    var place = function (d) {
      var p = route.getPointAtLength(d), q = route.getPointAtLength(Math.min(L, d + 2));
      var a = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
      var flip = Math.abs(a) > 90 ? -1 : 1;
      mower.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') rotate(' + a.toFixed(1) + ') scale(1 ' + flip + ')');
    };
    if (reduce) {
      marks.forEach(function (m) { if (!m.g.classList.contains('base')) m.g.classList.add('lit'); });
      place(0);
      return;
    }
    var DUR = 26000, PAUSE = 1800, start = null, running = false, raf;
    var tick = function (t) {
      if (!running) return;
      if (start === null) start = t;
      var el = t - start;
      if (el > DUR + PAUSE) { start = t; el = 0; marks.forEach(function (m) { m.g.classList.remove('lit'); }); }
      var k = Math.min(1, el / DUR);
      var e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; // ease in-out
      var d = e * L;
      place(d);
      marks.forEach(function (m) { if (!m.g.classList.contains('base') && d >= m.at - 2) m.g.classList.add('lit'); });
      raf = requestAnimationFrame(tick);
    };
    var io = new IntersectionObserver(function (en) {
      var vis = en[0].isIntersecting;
      if (vis && !running) { running = true; start = null; raf = requestAnimationFrame(tick); }
      if (!vis && running) { running = false; cancelAnimationFrame(raf); }
    }, { threshold: .15 });
    io.observe(wrap);
  });
})();
