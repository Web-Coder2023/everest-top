/* Everest Digital: клиентская логика на чистом JS. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var cfg = {};
  try { cfg = JSON.parse($('#ev-config').textContent); } catch (e) { cfg = {}; }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- Аналитика: события уходят только при согласии и подключённом скрипте ---------- */
  var consent = { analytics: false };
  window.evTrack = function (name, params) {
    var detail = { name: name, params: params || {} };
    document.dispatchEvent(new CustomEvent('ev:track', { detail: detail }));
    if (consent.analytics && window.dataLayer) window.dataLayer.push(Object.assign({ event: name }, params || {}));
  };
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-track]');
    if (!t) return;
    window.evTrack(t.getAttribute('data-track'), { label: t.getAttribute('data-track-label') || t.textContent.trim().slice(0, 60), href: t.getAttribute('href') || '' });
  });

  /* ---------- Cookie ---------- */
  var ck = $('#cookie');
  function loadAnalytics() {
    if (!cfg.analytics || !cfg.analytics.scriptSrc || document.getElementById('ev-analytics')) return;
    window.dataLayer = window.dataLayer || [];
    var s = document.createElement('script');
    s.id = 'ev-analytics'; s.async = true; s.src = cfg.analytics.scriptSrc;
    document.head.appendChild(s);
  }
  function applyConsent() {
    var v = store('ev-consent');
    if (v) { try { consent = JSON.parse(v); } catch (e) {} }
    if (consent.analytics) loadAnalytics();
  }
  function saveConsent(a) {
    consent = { analytics: !!a };
    store('ev-consent', JSON.stringify(consent));
    ck.hidden = true;
    if (a) loadAnalytics();
  }
  if (ck) {
    applyConsent();
    if (!store('ev-consent')) ck.hidden = false;
    var opts = $('[data-ck-opts]', ck), saveBtn = $('[data-ck="custom"]', ck), setBtn = $('[data-ck="settings"]', ck), box = $('[data-ck-analytics]', ck);
    ck.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ck]');
      if (!b) return;
      var k = b.getAttribute('data-ck');
      if (k === 'necessary') saveConsent(false);
      else if (k === 'all') saveConsent(true);
      else if (k === 'settings') { opts.hidden = false; saveBtn.hidden = false; setBtn.hidden = true; box.checked = !!consent.analytics; box.focus(); }
      else if (k === 'custom') saveConsent(box.checked);
    });
    $$('[data-cookie-open]').forEach(function (b) {
      b.addEventListener('click', function () { ck.hidden = false; opts.hidden = false; saveBtn.hidden = false; setBtn.hidden = true; box.checked = !!consent.analytics; $('h2', ck).setAttribute('tabindex', '-1'); $('h2', ck).focus(); });
    });
  }

  /* ---------- Шапка и мобильное меню ---------- */
  var hdr = $('[data-hdr]');
  function onScroll() { if (hdr) hdr.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var mbtn = $('[data-menu-btn]'), mnav = $('[data-mnav]');
  function setMenu(open) {
    if (!mbtn || !mnav) return;
    mnav.hidden = !open;
    mbtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    mbtn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    document.body.classList.toggle('no-scroll', open);
  }
  if (mbtn) {
    mbtn.addEventListener('click', function () { setMenu(mbtn.getAttribute('aria-expanded') !== 'true'); });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mbtn.getAttribute('aria-expanded') === 'true') { setMenu(false); mbtn.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth >= 992) setMenu(false); });
    window.addEventListener('pagehide', function () { setMenu(false); });
  }

  /* выпадающее меню услуг */
  var dd = $('[data-dd]');
  if (dd) {
    var ddBtn = $('.dd-btn', dd), ddBox = $('.dd', dd);
    var ddSet = function (o) { ddBox.hidden = !o; ddBtn.setAttribute('aria-expanded', o ? 'true' : 'false'); };
    ddBtn.addEventListener('click', function () { ddSet(ddBox.hidden); });
    dd.addEventListener('mouseenter', function () { if (window.matchMedia('(hover:hover)').matches) ddSet(true); });
    dd.addEventListener('mouseleave', function () { ddSet(false); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) ddSet(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !ddBox.hidden) { ddSet(false); ddBtn.focus(); } });
  }

  /* ---------- Появление при прокрутке ---------- */
  var rv = $$('.rv');
  if (!('IntersectionObserver' in window) || reduce) { rv.forEach(function (el) { el.classList.add('in'); }); }
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rv.forEach(function (el, i) {
      var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--rd', Math.min(sib, 6) * 70 + 'ms');
      io.observe(el);
    });
    /* страховка: через 2.5 с показываем всё, что уже в зоне видимости */
    setTimeout(function () { rv.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < window.innerHeight) el.classList.add('in'); }); }, 2500);
  }

  /* ---------- Parallax в hero (только курсор + hover-устройства) ---------- */
  var fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (fine && !reduce) {
    $$('[data-parallax]').forEach(function (vis) {
      var layers = $$('[data-depth]', vis), raf = 0, tx = 0, ty = 0, visible = true;
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; vis.classList.toggle('is-live', visible); }).observe(vis);
      function apply() { raf = 0; layers.forEach(function (l) { var d = parseFloat(l.getAttribute('data-depth')) / 10; l.style.setProperty('--tx', (tx * d * 7).toFixed(1) + 'px'); l.style.setProperty('--ty', (ty * d * 5).toFixed(1) + 'px'); }); }
      vis.parentElement.addEventListener('pointermove', function (e) {
        if (!visible || window.innerWidth < 768) return;
        var r = vis.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        if (!raf) raf = requestAnimationFrame(apply);
      });
      vis.parentElement.addEventListener('pointerleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(apply); });
    });
  }

  /* ---------- FAQ ---------- */
  $$('[data-faq]').forEach(function (list) {
    list.addEventListener('click', function (e) {
      var b = e.target.closest('.faq-q'); if (!b) return;
      var item = b.closest('.faq-item'), open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      item.classList.toggle('open', open);
    });
  });

  /* ---------- Вкладки (с навигацией стрелками) ---------- */
  function initTabs(root, onChange) {
    var tabs = $$('[role="tab"]', root), panels = $$('[role="tabpanel"]', root);
    // вложенные tablist не считаем: берём только прямые для данного root
    tabs = tabs.filter(function (t) { return t.closest('[data-tabs]') === root; });
    panels = panels.filter(function (p) { return p.closest('[data-tabs]') === root; });
    function select(i, focus) {
      tabs.forEach(function (t, k) { var on = k === i; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; });
      panels.forEach(function (p, k) { p.hidden = k !== i; });
      if (focus) tabs[i].focus();
      if (onChange) onChange(i);
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, k = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') k = (i + 1) % n;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') k = (i - 1 + n) % n;
        else if (e.key === 'Home') k = 0; else if (e.key === 'End') k = n - 1;
        if (k >= 0) { e.preventDefault(); select(k, true); }
      });
    });
    return { select: select, count: tabs.length };
  }
  var demoSeen = {};
  function seenDemo(name) { if (!demoSeen[name]) { demoSeen[name] = 1; window.evTrack('demo_view', { label: name }); } }
  $$('[data-tabs]').forEach(function (root) {
    if (root.hasAttribute('data-flow-tabs')) return;
    initTabs(root, function (i) { var p = $$('[role="tabpanel"]', root).filter(function (x) { return x.closest('[data-tabs]') === root; })[i]; var d = p && $('[data-demo-name]', p); if (d) seenDemo(d.getAttribute('data-demo-name')); });
  });

  /* ---------- Интерактивная схема заявки ---------- */
  $$('[data-flow]').forEach(function (flow) {
    var tabsRoot = $('[data-flow-tabs]', flow), prog = $('[data-flow-progress]', flow), run = $('[data-flow-run]', flow), timer = null;
    var api = initTabs(tabsRoot, function (i) { if (prog) prog.style.width = (api && api.count > 1 ? (i / (api.count - 1)) * 100 : 0) + '%'; seenDemo('flow'); });
    function stop() { if (timer) { clearInterval(timer); timer = null; } run.querySelector('span').textContent = 'Запустить пример'; }
    run.addEventListener('click', function () {
      if (timer) { stop(); return; }
      var i = 0; api.select(0); run.querySelector('span').textContent = 'Остановить';
      window.evTrack('demo_run', { label: 'flow' });
      timer = setInterval(function () { i++; if (i >= api.count) { stop(); return; } api.select(i); }, reduce ? 1400 : 1700);
    });
    tabsRoot.addEventListener('click', stop);
  });

  /* ---------- «До / после» по шагам ---------- */
  $$('[data-compare]').forEach(function (cmp) {
    var btn = $('[data-compare-run]', cmp.parentElement), t = null;
    btn.addEventListener('click', function () {
      if (t) return;
      cmp.classList.add('is-playing');
      var i = 0, steps = function () { $$('.cmp-step', cmp).forEach(function (s) { s.classList.toggle('on', +s.getAttribute('data-i') === i); }); };
      steps();
      t = setInterval(function () { i++; if (i > 4) { clearInterval(t); t = null; cmp.classList.remove('is-playing'); $$('.cmp-step', cmp).forEach(function (s) { s.classList.remove('on'); }); return; } steps(); }, reduce ? 700 : 1000);
      window.evTrack('demo_run', { label: 'compare' });
    });
  });

  /* ---------- Панель обращений: фильтр ---------- */
  $$('[data-dash]').forEach(function (d) {
    var rows = $$('tbody tr', d), out = $('[data-dash-count]', d), chips = $$('[data-status]', d);
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var s = c.getAttribute('data-status'), n = 0;
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        rows.forEach(function (r) { var show = s === 'all' || r.getAttribute('data-row-status') === s; r.hidden = !show; if (show) n++; });
        out.textContent = (s === 'all' ? 'Показаны все обращения: ' : 'Найдено обращений: ') + n;
      });
    });
  });

  /* ---------- ИИ-демо ---------- */
  $$('[data-aidemo]').forEach(function (d) {
    var chips = $$('[data-sample]', d), outs = $$('[data-out]', d);
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var id = c.getAttribute('data-sample');
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        outs.forEach(function (o) {
          var on = o.getAttribute('data-out') === id; o.hidden = !on;
          if (on) { o.classList.add('is-loading'); setTimeout(function () { o.classList.remove('is-loading'); }, reduce ? 0 : 350); }
        });
        window.evTrack('demo_run', { label: 'ai_' + id });
      });
    });
  });

  /* ---------- Калькулятор-демо ---------- */
  $$('[data-calc]').forEach(function (c) {
    var a = $('[data-in-a]', c), m = $('[data-in-m]', c);
    function upd() {
      $('[data-out-a]', c).textContent = a.value; $('[data-out-m]', c).textContent = m.value;
      var h = Math.round(a.value * m.value * 22 / 60);
      $('[data-out-h]', c).textContent = h.toLocaleString('ru-RU');
    }
    a.addEventListener('input', upd); m.addEventListener('input', upd); upd();
  });

  /* ---------- Каталог: поиск + фильтр ---------- */
  $$('[data-catalog]').forEach(function (cat) {
    var cards = $$('[data-card]', cat), q = $('[data-cat-search]', cat), btns = $$('[data-cat-btn]', cat), empty = $('[data-cat-empty]', cat), count = $('[data-cat-count]', cat);
    var category = '', term = '', tm = null;
    function plural(n) { var a = n % 10, b = n % 100; return (a === 1 && b !== 11) ? 'услуга' : ((a >= 2 && a <= 4) && (b < 12 || b > 14) ? 'услуги' : 'услуг'); }
    function apply() {
      var n = 0;
      cards.forEach(function (c) {
        var ok = (!category || c.getAttribute('data-cat') === category) && (!term || c.getAttribute('data-text').indexOf(term) !== -1);
        c.hidden = !ok; if (ok) n++;
      });
      empty.hidden = n !== 0;
      count.textContent = n ? 'Найдено: ' + n + ' ' + plural(n) : 'Ничего не найдено';
    }
    q.addEventListener('input', function () {
      term = q.value.trim().toLowerCase(); apply();
      clearTimeout(tm); tm = setTimeout(function () { window.evTrack('filter_use', { label: 'search' }); }, 800);
    });
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        category = b.getAttribute('data-cat-btn');
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        apply(); window.evTrack('filter_use', { label: category || 'all' });
      });
    });
    $('[data-cat-reset]', cat).addEventListener('click', function () {
      q.value = ''; term = ''; category = '';
      btns.forEach(function (x, i) { x.setAttribute('aria-pressed', i === 0 ? 'true' : 'false'); });
      apply(); q.focus();
    });
  });

  /* ---------- Форма обращения ---------- */
  var TOPICS = { automation: 'Автоматизация бизнес-процессов', ai: 'Внедрение ИИ', web: 'Сайт или веб-приложение', products: 'Цифровой продукт', other: 'Пока не знаю, нужна консультация' };
  $$('[data-contact-form]').forEach(function (form) {
    var started = false, result = $('[data-result]', form);
    var params = new URLSearchParams(location.search), pre = params.get('topic');
    if (pre && TOPICS[pre]) form.elements.topic.value = pre;
    form.addEventListener('input', function () { if (!started) { started = true; window.evTrack('form_start'); } });
    form.elements.topic.addEventListener('change', function () { window.evTrack('topic_select', { label: form.elements.topic.value }); });

    function show(el, on) { if (el) el.hidden = !on; }
    function setErr(name, on) {
      var f = form.elements[name], e = document.getElementById(f.getAttribute('aria-describedby'));
      f.setAttribute('aria-invalid', on ? 'true' : 'false'); show(e, on);
    }
    function validate() {
      var ok = true, f = form.elements;
      ['name', 'contact', 'message'].forEach(function (n) { var bad = !f[n].value.trim(); setErr(n, bad); if (bad) ok = false; });
      var em = f.email.value.trim(), badEm = em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em); setErr('email', !!badEm); if (badEm) ok = false;
      var ag = $('[data-e-agree]', form); show(ag, !f.agree.checked); if (!f.agree.checked) ok = false;
      if (!ok) { var first = form.querySelector('[aria-invalid="true"], .check input:invalid') || f.agree; first.focus(); }
      return ok;
    }
    function composeText() {
      var f = form.elements;
      return ['Заявка с сайта Everest Digital', 'Направление: ' + (TOPICS[f.topic.value] || ''), 'Имя: ' + f.name.value.trim(), 'Контакт: ' + f.contact.value.trim(), f.email.value.trim() ? 'Email: ' + f.email.value.trim() : '', '', 'Задача:', f.message.value.trim()].filter(function (x, i) { return x !== '' || i === 5; }).join('\n');
    }
    function fallback(text, note) {
      var mail = 'mailto:' + cfg.email + '?subject=' + encodeURIComponent('Обращение с сайта Everest Digital') + '&body=' + encodeURIComponent(text);
      var tg = cfg.telegram + '?text=' + encodeURIComponent(text);
      result.innerHTML = '<p class="res-warn"><b>Обращение ещё не отправлено.</b> ' + note + '</p><pre></pre><div class="res-actions"></div>';
      $('pre', result).textContent = text;
      var act = $('.res-actions', result);
      act.innerHTML = '<a class="btn btn--primary btn--m" target="_blank" rel="noopener" data-act="tg"><span>Открыть в Telegram</span></a><a class="btn btn--secondary btn--m" data-act="mail"><span>Отправить по почте</span></a><button type="button" class="btn btn--secondary btn--m" data-act="copy"><span>Скопировать текст</span></button>';
      $('[data-act="tg"]', act).href = tg; $('[data-act="mail"]', act).href = mail;
      $('[data-act="tg"]', act).addEventListener('click', function () { window.evTrack('telegram_click', { label: 'form_fallback' }); });
      $('[data-act="copy"]', act).addEventListener('click', function (e) {
        var b = e.currentTarget, done = function (m) { b.firstChild.textContent = m; setTimeout(function () { b.firstChild.textContent = 'Скопировать текст'; }, 2000); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done('Скопировано'); }, function () { done('Выделите текст вручную'); });
        else done('Выделите текст вручную');
      });
      show(result, true); result.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      var text = composeText(), f = form.elements;
      if (!cfg.formEndpoint) { fallback(text, 'Серверная отправка на сайте пока не подключена. Выберите, как передать текст: Telegram, почта или копирование.'); return; }
      var btn = $('[type="submit"]', form); btn.disabled = true;
      fetch(cfg.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: f.name.value.trim(), contact: f.contact.value.trim(), email: f.email.value.trim(), topic: f.topic.value, message: f.message.value.trim(), page: location.pathname }) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r; })
        .then(function () { result.innerHTML = '<p class="res-ok"><b>Обращение отправлено.</b> Мы свяжемся с вами по указанному контакту.</p>'; show(result, true); form.reset(); window.evTrack('form_success', { label: f.topic.value }); })
        .catch(function () { fallback(text, 'Не удалось отправить автоматически. Передайте текст одним из способов ниже.'); })
        .then(function () { btn.disabled = false; });
    });
  });
})();
