import { site } from '../../site.config.mjs';
import { icon, logoMark } from './icons.mjs';
import { SERVICES, FLOW, DASH_ROWS, AI_SAMPLES } from '../data/content.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
let uidN = 0;
export const uid = (p = 'u') => `${p}${++uidN}`;

/* ---------- Базовые элементы ---------- */
export function btn({ href, label, variant = 'primary', size = 'm', track = '', ico = '', attrs = '', cls = '' }) {
  const tag = href ? 'a' : 'button';
  const h = href ? ` href="${esc(href)}"` : (/\btype=/.test(attrs) ? '' : ' type="button"');
  const t = track ? ` data-track="${esc(track)}"` : '';
  const i = ico ? icon(ico, 18) : '';
  return `<${tag} class="btn btn--${variant} btn--${size} ${cls}"${h}${t} ${attrs}><span>${label}</span>${i}</${tag}>`;
}
/* Картинка из public/images: <имя>-800.webp и <имя>-1600.webp (16:9). priority — для первого экрана. */
export function shot(name, alt, { priority = false, sizes = '(min-width:1024px) 640px, 100vw', cls = '' } = {}) {
  const load = priority ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
  return `<figure class="shot ${cls}"><picture><source type="image/webp" srcset="/images/${name}-800.webp 800w, /images/${name}-1600.webp 1600w" sizes="${sizes}"><img src="/images/${name}-1600.webp" width="1600" height="900" alt="${esc(alt)}" ${load} decoding="async"></picture></figure>`;
}
export const badge = (text, kind = 'accent') => `<span class="badge badge--${kind}">${text}</span>`;
export const demoBadge = () => badge('Демонстрационный проект', 'neutral');

export function section({ id = '', cls = '', eyebrow = '', title = '', lead = '', content = '', head = 'left' }) {
  const idAttr = id ? ` id="${id}"` : '';
  const hd = (eyebrow || title || lead) ? `<header class="sec-head sec-head--${head} rv">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}${title ? `<h2 class="h2">${title}</h2>` : ''}${lead ? `<p class="lead">${lead}</p>` : ''}</header>` : '';
  return `<section class="section ${cls}"${idAttr}><div class="container">${hd}${content}</div></section>`;
}

export function breadcrumbs(crumbs) {
  if (!crumbs || crumbs.length < 2) return '';
  const items = crumbs.map((c, i) => i === crumbs.length - 1
    ? `<li aria-current="page">${esc(c.name)}</li>`
    : `<li><a href="${c.path}">${esc(c.name)}</a></li>`).join('');
  return `<nav class="crumbs" aria-label="Хлебные крошки"><ol>${items}</ol></nav>`;
}

export function faq(items, { id = uid('faq') } = {}) {
  return `<div class="faq" data-faq>${items.map((it, i) => `
  <div class="faq-item rv">
    <h3 class="faq-h"><button class="faq-q" type="button" aria-expanded="false" aria-controls="${id}-a${i}" id="${id}-q${i}" data-track="faq_open" data-track-label="${esc(it.q)}"><span>${esc(it.q)}</span>${icon('plus', 22)}</button></h3>
    <div class="faq-a" id="${id}-a${i}" role="region" aria-labelledby="${id}-q${i}"><div><p>${esc(it.a)}</p></div></div>
  </div>`).join('')}</div>`;
}

export function tabs(items, { label = 'Разделы', cls = '' } = {}) {
  const id = uid('tb');
  return `<div class="tabs ${cls}" data-tabs>
  <div class="tabs-list" role="tablist" aria-label="${esc(label)}">${items.map((it, i) => `<button class="tab" role="tab" type="button" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${it.icon ? icon(it.icon, 18) : ''}<span>${it.label}</span></button>`).join('')}</div>
  ${items.map((it, i) => `<div class="tab-panel" role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}"${i === 0 ? '' : ' hidden'}>${it.content}</div>`).join('')}
</div>`;
}

export function ctaBand({ title, text = '', primary, secondary = true, id = 'cta' }) {
  return `<section class="section cta-band" id="${id}"><div class="container"><div class="cta-box ev-glass rv">
    <div class="cta-copy"><h2 class="h2">${title}</h2>${text ? `<p class="lead">${text}</p>` : ''}</div>
    <div class="cta-actions">${primary}${secondary ? `<a class="link-inline" href="${site.telegram}" data-track="telegram_click" rel="noopener" target="_blank">${icon('send', 18)} Написать в Telegram</a><a class="link-inline" href="${site.phoneHref}" data-track="phone_click">${icon('phone', 18)} ${site.phone}</a>` : ''}</div>
  </div></div></section>`;
}

export function serviceCard(s, { cls = '' } = {}) {
  return `<a class="svc-card ev-glass ${s.priority ? 'is-priority' : ''} ${cls}" href="${s.href}" data-card data-cat="${esc(s.category)}" data-text="${esc((s.title + ' ' + s.text + ' ' + s.category).toLowerCase())}">
    <span class="tile">${icon(s.icon, 26)}</span>
    ${s.priority ? badge('Главное направление') : `<span class="svc-cat">${esc(s.category)}</span>`}
    <h3 class="h4">${esc(s.title)}</h3>
    <p>${esc(s.text)}</p>
    <span class="more">Подробнее ${icon('arrow', 18)}</span>
  </a>`;
}

export function processSteps(steps) {
  return `<ol class="steps">${steps.map((s, i) => `<li class="step ev-glass rv"><span class="step-n">${String(i + 1).padStart(2, '0')}</span><span class="tile">${icon(s.icon, 24)}</span><h3 class="h4">${s.title}</h3><p>${s.text}</p></li>`).join('')}</ol>`;
}

/* ---------- Мини-интерфейсы для проектов и демонстраций ---------- */
export function miniUI(kind) {
  const dot = (c) => `<i class="dot dot--${c}"></i>`;
  const row = (a, b, c) => `<div class="mu-row">${dot(c)}<span class="sk w${a}"></span><span class="sk w${b} sk--s"></span></div>`;
  const kinds = {
    requests: `<div class="mu mu--requests"><div class="mu-top"><b>Заявки</b><span class="sk w30"></span></div>${row(60, 30, 'g')}${row(50, 40, 'b')}${row(70, 25, 'b')}${row(45, 35, 'g')}<div class="mu-tabs"><i class="on"></i><i></i><i></i></div></div>`,
    calc: `<div class="mu mu--calc"><div class="mu-top"><b>Расчёт</b></div><div class="mu-range"><span class="sk w40"></span><i style="--p:62%"></i></div><div class="mu-range"><span class="sk w50"></span><i style="--p:35%"></i></div><div class="mu-range"><span class="sk w30"></span><i style="--p:80%"></i></div><div class="mu-total"><span class="sk w40"></span><b>— ₽</b></div></div>`,
    bot: `<div class="mu mu--bot"><div class="msg l"><span class="sk w70"></span></div><div class="msg r"><span class="sk w50"></span></div><div class="msg l"><span class="sk w60"></span><span class="sk w40 sk--s"></span></div><div class="mu-chips"><i></i><i></i><i></i></div><div class="msg r"><span class="sk w30"></span></div></div>`,
    panel: `<div class="mu mu--panel"><div class="mu-kpis"><i></i><i></i><i></i></div><div class="mu-bars"><i style="--h:45%"></i><i style="--h:70%"></i><i style="--h:55%"></i><i style="--h:85%"></i><i style="--h:60%"></i><i style="--h:92%"></i></div><div class="mu-prog"><i style="--p:80%"></i><i style="--p:55%"></i><i style="--p:30%"></i></div></div>`,
    docs: `<div class="mu mu--docs"><div class="mu-doc"><span class="sk w80"></span><span class="sk w60"></span><span class="sk w90 hl"></span><span class="sk w50"></span><span class="sk w70 hl"></span><span class="sk w40"></span></div><div class="mu-fields"><span class="sk w60"></span><span class="sk w45"></span><span class="sk w55"></span>${icon('check', 18)}</div></div>`,
  };
  return kinds[kind] || '';
}

export function projectCard(p, { big = false } = {}) {
  return `<article class="prj ev-glass rv ${big ? 'prj--big' : ''}" id="${p.id}">
    <div class="prj-vis" aria-hidden="true">${miniUI(p.ui)}</div>
    <div class="prj-body">
      <div class="prj-tags">${demoBadge()}<span class="svc-cat">${esc(p.type)}</span></div>
      <h3 class="h4">${esc(p.title)}</h3>
      <p>${esc(p.text)}</p>
      ${big ? `<ul class="check-list">${p.features.map((f) => `<li>${icon('check', 18)}<span>${esc(f)}</span></li>`).join('')}</ul>` : ''}
      <a class="more" href="/contacts/?topic=${p.topic}" data-track="cta_click" data-track-label="project_${p.id}">Обсудить похожую задачу ${icon('arrow', 18)}</a>
    </div>
  </article>`;
}

/* ---------- Интерактивные демонстрации ---------- */
export function flowDemo() {
  const id = uid('fl');
  return `<div class="demo ev-glass" data-flow data-demo-name="flow">
  <div class="demo-head">${badge('Демонстрация', 'neutral')}<span class="demo-title">Как заявка проходит путь от обращения до контроля</span>${btn({ label: 'Запустить пример', variant: 'secondary', size: 's', ico: 'bolt', attrs: 'data-flow-run' })}</div>
  <div class="flow" data-tabs data-flow-tabs>
    <div class="flow-line" aria-hidden="true"><i data-flow-progress></i></div>
    <div class="flow-stages tabs-list" role="tablist" aria-label="Этапы обработки заявки">${FLOW.map((f, i) => `<button class="flow-stage tab" role="tab" type="button" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="tile">${icon(f.icon, 22)}</span><span class="flow-n">${i + 1}</span><span class="flow-name">${f.name}</span></button>`).join('')}</div>
    ${FLOW.map((f, i) => `<div class="tab-panel flow-detail" role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}"${i === 0 ? '' : ' hidden'}>
      <div class="flow-text"><h3 class="h4">${f.name}</h3><p><span class="lbl">Автоматически</span>${f.auto}</p><p><span class="lbl lbl--h">Сотрудник</span>${f.human}</p></div>
      <div class="flow-card" aria-label="Пример данных на этом этапе">${f.card.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('')}<small>Условные данные для примера</small></div>
    </div>`).join('')}
  </div>
</div>`;
}

export function dashDemo() {
  const filters = [['all', 'Все'], ['new', 'Новые'], ['work', 'В работе'], ['done', 'Завершены']];
  return `<div class="demo ev-glass" data-dash data-demo-name="dashboard">
  <div class="demo-head">${badge('Демонстрация', 'neutral')}<span class="demo-title">Пример панели обращений (данные условные)</span></div>
  <div class="chips" role="group" aria-label="Фильтр по статусу">${filters.map(([k, l], i) => `<button class="chip" type="button" data-status="${k}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">№</th><th scope="col">Клиент</th><th scope="col">Тема</th><th scope="col">Ответственный</th><th scope="col">Статус</th></tr></thead>
  <tbody>${DASH_ROWS.map((r) => `<tr data-row-status="${r.status}"><td>${r.id}</td><td>${r.client}</td><td>${r.topic}</td><td>${r.owner}</td><td><span class="st st--${r.status}">${r.label}</span></td></tr>`).join('')}</tbody></table></div>
  <p class="demo-note" data-dash-count aria-live="polite">Показаны все обращения: ${DASH_ROWS.length}</p>
</div>`;
}

export function aiDemo() {
  return `<div class="demo ev-glass" data-aidemo data-demo-name="ai">
  <div class="demo-head">${badge('Демонстрация', 'neutral')}<span class="demo-title">Как ИИ помогает с обращением: пример разбора</span></div>
  <p class="demo-note">Выберите пример обращения. Это заранее подготовленная иллюстрация, а не работа реальной модели.</p>
  <div class="chips" role="group" aria-label="Пример обращения">${AI_SAMPLES.map((s, i) => `<button class="chip" type="button" data-sample="${s.id}" aria-pressed="${i === 0}">${s.label}</button>`).join('')}</div>
  ${AI_SAMPLES.map((s, i) => `<div class="ai-out" data-out="${s.id}"${i === 0 ? '' : ' hidden'}>
    <div class="ai-msg"><span class="lbl">Входящее обращение</span><p>${esc(s.text)}</p></div>
    <div class="ai-res">
      <div class="ai-box"><span class="lbl">Классификация</span><p><b>${s.cls}</b> · срочность: ${s.urgency}</p></div>
      <div class="ai-box"><span class="lbl">Извлечённые данные</span><dl>${s.fields.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div>
      <div class="ai-box"><span class="lbl">Черновик ответа</span><p>${esc(s.draft)}</p></div>
      <div class="ai-check">${icon('shield', 20)}<span><b>Передано сотруднику на проверку.</b> Ответ клиенту уходит только после подтверждения человеком.</span></div>
    </div></div>`).join('')}
</div>`;
}

export function calcDemo() {
  return `<div class="demo ev-glass" data-calc data-demo-name="calc">
  <div class="demo-head">${badge('Демонстрация', 'neutral')}<span class="demo-title">Пример цифрового инструмента: сколько времени уходит на ручную обработку</span></div>
  <div class="calc-grid">
    <div class="calc-in">
      <label class="field"><span class="field-l">Заявок в день: <b data-out-a>20</b></span><input type="range" min="1" max="200" value="20" data-in-a aria-label="Заявок в день"></label>
      <label class="field"><span class="field-l">Минут на ручную обработку одной заявки: <b data-out-m>5</b></span><input type="range" min="1" max="30" value="5" data-in-m aria-label="Минут на одну заявку"></label>
    </div>
    <div class="calc-res"><span class="lbl">Время на ручную обработку</span><b class="calc-big"><span data-out-h>36</span> ч</b><span class="calc-sub">в месяц при 22 рабочих днях</span></div>
  </div>
  <p class="demo-note">Это простой подсчёт по введённым вами числам. Он показывает, сколько времени занимает рутина сейчас, и не является оценкой эффекта или стоимости проекта.</p>
</div>`;
}

export function compareBlock() {
  const before = ['Поступление сообщения', 'Ручной перенос', 'Поиск ответственного', 'Ручное уведомление', 'Ручной контроль'];
  const after = ['Поступление заявки', 'Автоматическая фиксация', 'Распределение', 'Уведомление', 'Контроль статуса'];
  const col = (items, kind, title, ico) => `<div class="cmp-col cmp-col--${kind}"><h3 class="h4">${icon(ico, 22)} ${title}</h3><ol>${items.map((t, i) => `<li class="cmp-step" data-i="${i}"><span class="cmp-n">${i + 1}</span><span>${t}</span></li>`).join('')}</ol></div>`;
  return `<div class="compare" data-compare>
    ${col(before, 'before', 'Без автоматизации', 'warn')}
    ${col(after, 'after', 'С автоматизацией', 'bolt')}
  </div>
  <div class="compare-foot rv">${btn({ label: 'Показать по шагам', variant: 'secondary', size: 's', ico: 'arrow', attrs: 'data-compare-run' })}<p class="demo-note">Иллюстрация процесса. Мы не называем сроки и экономию заранее: они зависят от вашей ситуации.</p></div>`;
}

/* ---------- Форма обращения ---------- */
export function contactForm({ compact = false } = {}) {
  const id = uid('cf');
  return `<form class="cform ev-glass" data-contact-form novalidate aria-labelledby="${id}-h">
  <h2 class="h3" id="${id}-h">Опишите задачу</h2>
  <p class="form-lead">Готовое техническое задание не нужно. Достаточно пары предложений.</p>
  <div class="form-grid">
    <label class="field"><span class="field-l">Имя</span><input class="input" name="name" autocomplete="name" required aria-describedby="${id}-e-name"><span class="err" id="${id}-e-name" hidden>Укажите, как к вам обращаться</span></label>
    <label class="field"><span class="field-l">Телефон или мессенджер</span><input class="input" name="contact" autocomplete="tel" placeholder="+7… или @username" required aria-describedby="${id}-e-contact"><span class="err" id="${id}-e-contact" hidden>Укажите телефон или ник в мессенджере</span></label>
    <label class="field"><span class="field-l">Email <i class="opt">необязательно</i></span><input class="input" type="email" name="email" autocomplete="email" aria-describedby="${id}-e-email"><span class="err" id="${id}-e-email" hidden>Проверьте адрес почты</span></label>
    <label class="field"><span class="field-l">Направление</span><select class="input" name="topic"><option value="automation">Автоматизация бизнес-процессов</option><option value="ai">Внедрение ИИ</option><option value="web">Сайт или веб-приложение</option><option value="products">Цифровой продукт</option><option value="other">Пока не знаю, нужна консультация</option></select></label>
    <label class="field field--wide"><span class="field-l">Описание задачи</span><textarea class="input" name="message" rows="${compact ? 3 : 5}" placeholder="Например: заявки приходят в Telegram и на почту, мы вручную переносим их в таблицу" required aria-describedby="${id}-e-message"></textarea><span class="err" id="${id}-e-message" hidden>Опишите задачу в нескольких словах</span></label>
  </div>
  <label class="check"><input type="checkbox" name="agree" required><span>Я ознакомился с <a href="/privacy/">политикой конфиденциальности</a> и согласен на обработку данных для ответа на обращение</span></label>
  <span class="err" data-e-agree hidden>Нужно согласие, чтобы подготовить обращение</span>
  <div class="form-actions">${btn({ label: 'Подготовить обращение', variant: 'primary', size: 'l', ico: 'arrow', attrs: 'type="submit"' })}</div>
  <div class="form-result" data-result hidden aria-live="polite"></div>
</form>`;
}

/* ---------- Каркас страницы ---------- */
const NAV = [
  { href: '/', label: 'Главная' },
  { href: '/services/', label: 'Услуги', menu: true },
  { href: '/projects/', label: 'Проекты' },
  { href: '/about/', label: 'О студии' },
  { href: '/contacts/', label: 'Контакты' },
];
const SVC_MENU = [
  { href: '/services/business-automation/', label: 'Автоматизация бизнеса', note: 'Главное направление', icon: 'gear', main: true },
  { href: '/services/ai-integration/', label: 'Внедрение ИИ', icon: 'chip' },
  { href: '/services/web-development/', label: 'Сайты и веб-приложения', icon: 'monitor' },
  { href: '/services/digital-products/', label: 'Цифровые продукты', icon: 'layers' },
];

function header(path) {
  const cur = (href) => (href === '/' ? path === '/' : path.startsWith(href)) ? ' aria-current="page"' : '';
  return `<a class="skip" href="#main">Перейти к содержимому</a>
<header class="hdr" data-hdr><div class="container hdr-in">
  <a class="brand" href="/" aria-label="Everest Digital, на главную">${logoMark(34)}<span>Everest <b>Digital</b></span></a>
  <nav class="nav" aria-label="Основная навигация"><ul>
    ${NAV.map((n) => n.menu ? `<li class="has-dd" data-dd><a href="${n.href}"${cur(n.href)}>${n.label}</a><button class="dd-btn" type="button" aria-expanded="false" aria-controls="dd-svc" aria-label="Показать направления услуг">${icon('arrow', 14, 'dd-i')}</button>
      <div class="dd ev-glass" id="dd-svc" hidden>${SVC_MENU.map((m) => `<a class="dd-item ${m.main ? 'is-main' : ''}" href="${m.href}"><span class="tile tile--s">${icon(m.icon, 20)}</span><span><b>${m.label}</b>${m.note ? `<em>${m.note}</em>` : ''}</span></a>`).join('')}<a class="dd-all" href="/services/">Все услуги ${icon('arrow', 16)}</a></div></li>` : `<li><a href="${n.href}"${cur(n.href)}>${n.label}</a></li>`).join('')}
  </ul></nav>
  <div class="hdr-cta">${btn({ href: '/contacts/', label: 'Обсудить задачу', size: 's', track: 'cta_click', attrs: 'data-track-label="header"' })}</div>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-btn aria-label="Открыть меню">${icon('menu', 24, 'i-open')}${icon('close', 24, 'i-close')}</button>
</div>
<div class="mnav" id="mobile-menu" hidden data-mnav><div class="container"><nav aria-label="Мобильная навигация">
  <a href="/"${cur('/')}>Главная</a>
  <a href="/services/"${cur('/services/')}>Услуги</a>
  <div class="mnav-sub">${SVC_MENU.map((m) => `<a href="${m.href}">${icon(m.icon, 20)}<span>${m.label}</span>${m.main ? badge('Главное') : ''}</a>`).join('')}</div>
  <a href="/projects/"${cur('/projects/')}>Проекты</a><a href="/about/"${cur('/about/')}>О студии</a><a href="/contacts/"${cur('/contacts/')}>Контакты</a>
  ${btn({ href: '/contacts/', label: 'Обсудить задачу', size: 'l', track: 'cta_click', attrs: 'data-track-label="mobile_menu"' })}
</nav></div></div></header>`;
}

function footer() {
  return `<footer class="ftr"><div class="container">
  <div class="ftr-grid">
    <div class="ftr-brand"><a class="brand" href="/">${logoMark(34)}<span>Everest <b>Digital</b></span></a>
      <p>Разработка и внедрение цифровых систем для бизнеса. Автоматизируем процессы, объединяем инструменты и создаём решения, которые помогают сократить рутинную работу.</p></div>
    <nav aria-label="Разделы сайта"><h2 class="ftr-h">Разделы</h2><ul><li><a href="/">Главная</a></li><li><a href="/services/">Все услуги</a></li><li><a href="/projects/">Проекты</a></li><li><a href="/about/">О студии</a></li><li><a href="/contacts/">Контакты</a></li></ul></nav>
    <nav aria-label="Направления услуг"><h2 class="ftr-h">Направления</h2><ul>${SVC_MENU.map((m) => `<li><a href="${m.href}">${m.label}</a></li>`).join('')}</ul></nav>
    <div><h2 class="ftr-h">Контакты</h2><ul class="ftr-contacts">
      <li><a href="${site.phoneHref}" data-track="phone_click">${icon('phone', 18)} ${site.phone}</a></li>
      <li><a href="mailto:${site.email}" data-track="email_click">${icon('mail', 18)} ${site.email}</a></li>
      <li><a href="${site.telegram}" data-track="telegram_click" target="_blank" rel="noopener">${icon('send', 18)} Telegram ${site.telegramHandle}</a></li></ul></div>
  </div>
  <div class="ftr-bottom"><p>© ${new Date().getFullYear()} Everest Digital</p><p><a href="/privacy/">Политика конфиденциальности</a> · <button class="linkbtn" type="button" data-cookie-open>Настройки cookie</button></p></div>
</div></footer>`;
}

function cookieBanner() {
  return `<div class="cookie ev-glass" id="cookie" role="dialog" aria-modal="false" aria-labelledby="ck-h" hidden>
  <h2 class="h4" id="ck-h">Файлы cookie</h2>
  <p>Нужные для работы сайта файлы используются всегда. Аналитику мы включаем только с вашего согласия. Подробнее в <a href="/privacy/">политике конфиденциальности</a>.</p>
  <div class="ck-opts" data-ck-opts hidden>
    <label class="ck-row"><span><b>Необходимые</b><small>Хранят ваш выбор и работу интерфейса</small></span><input type="checkbox" checked disabled aria-label="Необходимые cookie, всегда включены"></label>
    <label class="ck-row"><span><b>Аналитика</b><small>Помогает понять, что на сайте можно улучшить</small></span><input type="checkbox" data-ck-analytics aria-label="Аналитические cookie"></label>
  </div>
  <div class="ck-actions"><button class="btn btn--secondary btn--s" type="button" data-ck="necessary"><span>Только необходимые</span></button><button class="btn btn--secondary btn--s" type="button" data-ck="custom" hidden><span>Сохранить выбор</span></button><button class="btn btn--secondary btn--s" type="button" data-ck="settings"><span>Настроить</span></button><button class="btn btn--primary btn--s" type="button" data-ck="all"><span>Принять все</span></button></div>
</div>`;
}

export function jsonLd(path, { title, description }, crumbs, extra = []) {
  const url = site.url + path;
  const org = { '@type': 'Organization', '@id': site.url + '/#org', name: site.name, url: site.url + '/', email: site.email, telephone: '+7 914 449-07-05', sameAs: [site.telegram], description: 'Цифровая студия: автоматизация бизнес-процессов, внедрение ИИ, разработка сайтов и цифровых продуктов.' };
  const web = { '@type': 'WebSite', '@id': site.url + '/#website', url: site.url + '/', name: site.name, inLanguage: 'ru-RU', publisher: { '@id': site.url + '/#org' } };
  const pageType = path === '/contacts/' ? 'ContactPage' : 'WebPage';
  const page = { '@type': pageType, '@id': url + '#webpage', url, name: title, description, inLanguage: 'ru-RU', isPartOf: { '@id': site.url + '/#website' } };
  const graph = [org, web, page];
  if (crumbs && crumbs.length > 1) graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: site.url + c.path })) });
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [...graph, ...extra] });
}

export function serviceSchema(path, name, description) {
  return { '@type': 'Service', '@id': site.url + path + '#service', name, description, serviceType: name, provider: { '@id': site.url + '/#org' }, areaServed: { '@type': 'Country', name: 'Россия' }, url: site.url + path };
}

export function layout({ path, seo, crumbs, body, schema = [], noindex = false }) {
  const url = site.url + path;
  const ogImage = site.url + '/images/og.jpg';
  const clientCfg = JSON.stringify({ formEndpoint: site.formEndpoint, analytics: site.analytics, telegram: site.telegram, email: site.email });
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(seo.title)}</title>
<meta name="description" content="${esc(seo.description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}
<meta property="og:type" content="website"><meta property="og:site_name" content="${site.name}"><meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(seo.title)}"><meta property="og:description" content="${esc(seo.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(seo.title)}"><meta name="twitter:description" content="${esc(seo.description)}"><meta name="twitter:image" content="${ogImage}">
<meta name="theme-color" content="#E6F0FF">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script>document.documentElement.classList.add('js')</script>
<link rel="stylesheet" href="/assets/styles.css">
<script type="application/ld+json">${jsonLd(path, seo, crumbs, schema)}</script>
</head>
<body>
${header(path)}
<main id="main">
${breadcrumbs(crumbs)}
${body}
</main>
${footer()}
${cookieBanner()}
<script id="ev-config" type="application/json">${clientCfg}</script>
<script src="/assets/main.js" defer></script>
</body>
</html>`;
}
