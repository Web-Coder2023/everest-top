// Уникальные hero-композиции для каждой страницы (SVG + HTML + CSS, без растровых картинок).
import { icon } from './icons.mjs';
import { miniUI } from './ui.mjs';

let gid = 0;
const G = () => 'g' + ++gid;

/* ---- общие детали ---- */
function vp({ l, t, w, d = 10, cls = '', ico = '', label = '', extra = '', tag = '' }) {
  return `<div class="vp ${cls}" data-depth="${d}" style="--l:${l}%;--t:${t}%;--w:${w}%"><div class="vp-in fl" style="--fd:${(d % 7) * 0.6}s">
    ${(ico || label) ? `<div class="vp-head">${ico ? `<span class="vp-i">${icon(ico, 22)}</span>` : ''}${label ? `<span class="vp-l">${label}</span>` : ''}${tag}</div>` : ''}${extra}</div></div>`;
}
const sk = (w, s = '') => `<span class="sk w${w} ${s}"></span>`;
const dotG = '<i class="dot dot--g" aria-hidden="true"></i>';
function lines(paths, nodes = []) {
  return `<svg class="vlines" viewBox="0 0 160 100" aria-hidden="true" focusable="false">${paths.map((d) => `<path class="ln" d="${d}"/>`).join('')}${nodes.map(([x, y]) => `<circle class="nd" cx="${x}" cy="${y}" r="1.1"/>`).join('')}</svg>`;
}
function cubes(list) {
  return list.map(([l, t, s, d]) => `<i class="mc" data-depth="${d}" style="--l:${l}%;--t:${t}%;--s:${s}px"></i>`).join('');
}
const bg = () => '<div class="vglow" aria-hidden="true"></div><div class="vgrid" aria-hidden="true"></div>';
const wrap = (name, inner) => `<div class="vis vis--${name}" data-parallax aria-hidden="true">${bg()}${inner}</div>`;

/* ---- изометрический стеклянный куб с логотипом ---- */
function cube(size = 100) {
  const a = G(), b = G(), c = G(), d = G(), e = G(), f = G();
  return `<svg class="cube" viewBox="0 0 320 400" style="width:${size}%" focusable="false">
  <defs>
    <linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#CFE2FF" stop-opacity=".7"/></linearGradient>
    <linearGradient id="${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6F0FF" stop-opacity=".9"/><stop offset="1" stop-color="#A9CBFF" stop-opacity=".55"/></linearGradient>
    <linearGradient id="${c}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8DB8FF" stop-opacity=".8"/><stop offset="1" stop-color="#3B82F6" stop-opacity=".6"/></linearGradient>
    <linearGradient id="${d}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3B82F6"/><stop offset="1" stop-color="#1749B8"/></linearGradient>
    <linearGradient id="${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F2F7FF"/><stop offset="1" stop-color="#BFD7FF"/></linearGradient>
    <linearGradient id="${f}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6FA4FF" stop-opacity="0"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#6FA4FF" stop-opacity="0"/></linearGradient>
  </defs>
  <ellipse class="orbit o1" cx="160" cy="205" rx="152" ry="54" fill="none" stroke="#6FA4FF" stroke-opacity=".55" stroke-width="1.4"/>
  <ellipse class="orbit o2" cx="160" cy="215" rx="124" ry="42" fill="none" stroke="#A9CBFF" stroke-opacity=".8" stroke-width="1.2"/>
  <polygon points="40,285 160,345 280,285 160,225" fill="url(#${e})" stroke="#fff" stroke-opacity=".9"/>
  <polygon points="40,285 160,345 160,365 40,305" fill="#6FA4FF" fill-opacity=".75"/>
  <polygon points="160,345 280,285 280,305 160,365" fill="#3B82F6" fill-opacity=".8"/>
  <polygon points="85,277 160,239 235,277 160,315" fill="#fff" fill-opacity=".7" stroke="#A9CBFF"/>
  <rect x="115" y="352" width="90" height="5" rx="2.5" fill="url(#${f})"/>
  <ellipse cx="160" cy="268" rx="62" ry="16" fill="#1F5FE0" fill-opacity=".18"/>
  <g class="cube-body">
    <polygon points="70,80 160,130 160,240 70,190" fill="url(#${b})" stroke="#fff" stroke-opacity=".95" stroke-width="1.4"/>
    <polygon points="160,130 250,80 250,190 160,240" fill="url(#${c})" stroke="#fff" stroke-opacity=".7" stroke-width="1.4"/>
    <polygon points="160,30 250,80 160,130 70,80" fill="url(#${a})" stroke="#fff" stroke-width="1.6"/>
    <polygon points="160,52 218,80 160,108 102,80" fill="none" stroke="#fff" stroke-opacity=".8"/>
    <g transform="translate(78 96) matrix(1 .5556 0 1 0 0)">
      <path d="M37 8l30 52H7L37 8z" fill="url(#${d})"/>
      <path d="M37 30l17 30H20l17-30z" fill="#8DB8FF" opacity=".9"/>
      <path d="M37 8l9.6 17L37 21l-9.6 4L37 8z" fill="#fff" opacity=".9"/>
    </g>
  </g>
</svg>`;
}

/* ---- 1. Главная: цифровая экосистема ---- */
export function HomeVisual() {
  const bars = '<span class="mini-bars"><i style="--h:40%"></i><i style="--h:70%"></i><i style="--h:55%"></i><i style="--h:90%"></i></span>';
  const spark = '<svg class="spark" viewBox="0 0 80 28" aria-hidden="true"><path d="M2 22l14-8 12 5 14-12 12 7 22-12" fill="none" stroke="#1F5FE0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ring = '<svg class="ring" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="13" fill="none" stroke="#CFE2FF" stroke-width="6"/><circle cx="18" cy="18" r="13" fill="none" stroke="#1F5FE0" stroke-width="6" stroke-dasharray="52 82" stroke-linecap="round" transform="rotate(-90 18 18)"/></svg>';
  const toggle = '<span class="tgl"><i></i></span>';
  const avatars = '<span class="avs"><i></i><i></i><i></i></span>';
  const ints = `<span class="ints"><i>${icon('send', 20)}</i><i>${icon('mail', 20)}</i><i class="t-crm">CRM</i><i>${icon('db', 20)}</i></span>`;
  return wrap('home', `
  ${lines(['M54 14C70 14 70 30 80 40', 'M45 46C60 46 66 50 74 50', 'M58 76C70 76 74 64 80 60', 'M109 12C95 12 92 30 84 40', 'M115 46C100 46 94 50 86 50', 'M102 76C90 76 86 64 82 60'], [[54, 14], [45, 46], [58, 76], [109, 12], [115, 46], [102, 76]])}
  <div class="vcore" data-depth="6">${cube(100)}</div>
  ${vp({ l: 4, t: 5, w: 31, d: 14, ico: 'chart', label: 'Аналитика и отчёты', extra: `<div class="vp-row">${spark}${ring}</div>` })}
  ${vp({ l: 0, t: 38, w: 28, d: 18, ico: 'users', label: 'Клиенты', tag: dotG, extra: avatars })}
  ${vp({ l: 8, t: 69, w: 29, d: 12, ico: 'check', label: 'Заявки', tag: dotG, extra: `<div class="vp-row">${sk(50)}${spark}</div>` })}
  ${vp({ l: 66, t: 3, w: 31, d: 16, ico: 'gear', label: 'Автоматизация процессов', extra: `<div class="vp-row">${sk(50, 'sk--s')}${toggle}</div>` })}
  ${vp({ l: 71, t: 38, w: 28, d: 20, ico: 'chip', label: 'ИИ ассистент', tag: dotG, extra: sk(70, 'sk--s') })}
  ${vp({ l: 64, t: 68, w: 33, d: 12, ico: 'link', label: 'Интеграции', extra: ints })}
  ${cubes([[14, 30, 18, 24], [90, 28, 14, 20], [3, 62, 22, 26], [48, 4, 14, 10], [93, 66, 16, 22], [52, 88, 14, 18]])}
  `);
}

/* ---- 2. Услуги: карта цифровых возможностей ---- */
export function ServicesVisual() {
  return wrap('services', `
  ${lines(['M62 38C70 30 74 26 82 24', 'M62 62C68 70 72 72 80 74', 'M98 38C92 30 88 26 80 24', 'M98 62C94 70 90 72 80 74'].map((d) => d), [[62, 38], [98, 38], [62, 62], [98, 62]])}
  <div class="vcore hub" data-depth="6"><div class="hub-in fl"><svg viewBox="0 0 200 200" class="hub-rings" focusable="false"><circle cx="100" cy="100" r="92" fill="none" stroke="#6FA4FF" stroke-opacity=".45" stroke-dasharray="3 7"/><circle cx="100" cy="100" r="68" fill="none" stroke="#A9CBFF" stroke-opacity=".9"/><circle cx="100" cy="100" r="44" fill="#fff" fill-opacity=".7" stroke="#fff"/><g transform="translate(76 76) scale(1.2)"><path d="M20 4l16 28H4L20 4z" fill="#1F5FE0"/><path d="M20 15l9 17H11l9-17z" fill="#8DB8FF"/></g></svg><b>Цифровые возможности</b></div></div>
  ${vp({ l: 2, t: 8, w: 36, d: 18, cls: 'is-main', ico: 'gear', label: 'Автоматизация', tag: '<span class="badge badge--accent">Главное</span>', extra: `<div class="vp-row">${sk(60, 'sk--s')}<span class="tgl"><i></i></span></div>` })}
  ${vp({ l: 62, t: 8, w: 32, d: 14, ico: 'chip', label: 'ИИ', tag: dotG, extra: sk(55, 'sk--s') })}
  ${vp({ l: 4, t: 70, w: 32, d: 12, ico: 'monitor', label: 'Разработка', extra: sk(65, 'sk--s') })}
  ${vp({ l: 62, t: 70, w: 34, d: 16, ico: 'layers', label: 'Цифровые продукты', extra: sk(60, 'sk--s') })}
  ${cubes([[44, 4, 14, 22], [92, 46, 16, 18], [2, 46, 16, 26], [50, 90, 12, 14]])}`);
}

/* ---- 3. Автоматизация: поток данных ---- */
export function AutomationVisual() {
  const card = (n, ico, label, extra, l, t, d, cls = '') => vp({ l, t, w: 29, d, cls: 'flowc ' + cls, ico, label, tag: `<span class="vp-n">${n}</span>`, extra });
  return wrap('automation', `
  ${lines(['M48 25H57.6', 'M102.4 25H112', 'M134 40V57', 'M112 74H102.4', 'M57.6 74H48'], [[48, 25], [112, 25], [134, 40], [134, 57], [112, 74], [48, 74]])}
  ${card(1, 'mail', 'Входящая заявка', `<div class="vp-msg">${sk(80)}${sk(55, 'sk--s')}</div>`, 2, 8, 12)}
  ${card(2, 'gear', 'Обработка', `<div class="vp-row">${sk(55, 'sk--s')}<span class="spin">${icon('gear', 20)}</span></div>`, 36, 8, 18)}
  ${card(3, 'users', 'Раздача', '<span class="avs"><i></i><i></i><i></i></span>', 70, 8, 10)}
  ${card(4, 'bell', 'Уведомление', `<div class="toast">${sk(70, 'sk--s')}</div>`, 70, 56, 16)}
  ${card(5, 'list', 'Задача', `<div class="vp-row">${sk(45, 'sk--s')}${icon('check', 20, 'ok')}</div>`, 36, 56, 12)}
  ${card(6, 'chart', 'Контроль статуса', '<div class="mu-prog"><i style="--p:75%"></i><i style="--p:45%"></i></div>', 2, 56, 20, 'is-end')}
  <div class="packet pk1" aria-hidden="true"></div><div class="packet pk2" aria-hidden="true"></div>
  ${cubes([[40, 42, 14, 22], [92, 90, 16, 18], [4, 40, 12, 14]])}`);
}

/* ---- 4. ИИ: интеллектуальная обработка ---- */
export function AIVisual() {
  const a = G(), b = G(), c = G();
  const gem = `<svg class="gem" viewBox="0 0 240 260" focusable="false"><defs>
    <linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#A9CBFF"/></linearGradient>
    <linearGradient id="${b}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8DB8FF"/><stop offset="1" stop-color="#1F5FE0"/></linearGradient>
    <linearGradient id="${c}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3B82F6"/><stop offset="1" stop-color="#123A91"/></linearGradient></defs>
    <ellipse class="orbit o1" cx="120" cy="140" rx="116" ry="40" fill="none" stroke="#6FA4FF" stroke-opacity=".55"/>
    <polygon points="120,20 190,70 120,110 50,70" fill="url(#${a})" stroke="#fff"/>
    <polygon points="50,70 120,110 120,230 40,150" fill="url(#${b})" fill-opacity=".85" stroke="#fff" stroke-opacity=".8"/>
    <polygon points="190,70 200,150 120,230 120,110" fill="url(#${c})" fill-opacity=".9" stroke="#fff" stroke-opacity=".6"/>
    <polygon points="120,20 120,110 50,70" fill="#fff" fill-opacity=".35"/>
    <polyline points="120,110 120,230" stroke="#fff" stroke-opacity=".6" fill="none"/>
    <circle cx="120" cy="110" r="5" fill="#fff"/></svg>`;
  return wrap('ai', `
  ${lines(['M42 24C56 28 66 38 74 44', 'M44 64C58 62 66 56 74 54', 'M118 24C104 28 94 38 86 44', 'M116 64C102 62 94 56 86 54', 'M80 76V62'], [[42, 24], [44, 64], [118, 24], [116, 64], [80, 76]])}
  <div class="vcore" data-depth="6" style="--cw:30%">${gem}</div>
  ${vp({ l: 2, t: 8, w: 26, d: 14, ico: 'doc', label: 'Документ', extra: `<div class="mu-doc">${sk(80)}${sk(60)}${sk(90, 'hl')}${sk(50)}</div>` })}
  ${vp({ l: 2, t: 54, w: 28, d: 18, ico: 'message', label: 'Сообщение', extra: `<div class="vp-msg">${sk(85)}${sk(55, 'sk--s')}</div>` })}
  ${vp({ l: 71, t: 8, w: 27, d: 16, ico: 'db', label: 'Структура данных', extra: `<div class="kv"><span>${sk(30, 'sk--s')}<b></b></span><span>${sk(40, 'sk--s')}<b></b></span><span>${sk(25, 'sk--s')}<b></b></span></div>` })}
  ${vp({ l: 72, t: 54, w: 26, d: 12, ico: 'chart', label: 'Аналитика', extra: '<span class="mini-bars"><i style="--h:50%"></i><i style="--h:80%"></i><i style="--h:60%"></i><i style="--h:95%"></i></span>' })}
  ${vp({ l: 35, t: 78, w: 30, d: 10, ico: 'shield', label: 'Проверка человеком', tag: dotG, extra: sk(60, 'sk--s') })}
  ${cubes([[48, 2, 14, 20], [92, 40, 14, 26], [4, 90, 14, 12]])}`);
}

/* ---- 5. Разработка сайтов: адаптивные экраны ---- */
export function WebDevelopmentVisual() {
  const site = (kind) => `<div class="site site--${kind}"><div class="site-nav"><i></i><span>${sk(18, 'sk--s')}${sk(18, 'sk--s')}${sk(18, 'sk--s')}</span><b></b></div><div class="site-hero">${sk(60)}${sk(80, 'sk--s')}<b class="site-btn"></b></div><div class="site-cards"><i></i><i></i><i></i></div></div>`;
  return wrap('web', `
  <div class="layer layer-a" aria-hidden="true"></div><div class="layer layer-b" aria-hidden="true"></div>
  <div class="dev dev-monitor" data-depth="10"><div class="fl"><div class="dev-bar"><i></i><i></i><i></i><span></span></div>${site('desk')}<div class="stand"></div></div></div>
  <div class="dev dev-tablet" data-depth="18"><div class="fl" style="--fd:.8s">${site('tab')}</div></div>
  <div class="dev dev-phone" data-depth="26"><div class="fl" style="--fd:1.6s"><div class="notch"></div>${site('mob')}</div></div>
  ${vp({ l: 2, t: 70, w: 26, d: 14, ico: 'bolt', label: 'Быстрая загрузка', extra: '<div class="mu-prog"><i style="--p:90%"></i></div>' })}
  ${vp({ l: 40, t: 2, w: 24, d: 20, cls: 'vp--s', ico: 'globe', label: 'Поиск и SEO' })}
  ${cubes([[1, 8, 16, 22], [94, 8, 14, 18], [64, 88, 16, 26]])}`);
}

/* ---- 6. Цифровые продукты: интерфейс продукта ---- */
export function DigitalProductsVisual() {
  return wrap('products', `
  <div class="dash dash-main" data-depth="10"><div class="fl">
    <div class="dash-side"><i class="on"></i><i></i><i></i><i></i></div>
    <div class="dash-body"><div class="dash-top">${sk(25)}<span class="avs"><i></i><i></i></span></div>
      <div class="mu-kpis"><i></i><i></i><i></i></div>
      <div class="dash-chart"><svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 48L28 38 56 42 84 24 112 30 140 12 170 18 200 4" fill="none" stroke="#1F5FE0" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><path d="M0 48L28 38 56 42 84 24 112 30 140 12 170 18 200 4V60H0z" fill="#3B82F6" fill-opacity=".14"/></svg></div>
      <div class="dash-tbl">${[70, 55, 80].map((w) => `<div class="mu-row"><i class="dot dot--b"></i>${sk(w)}${sk(20, 'sk--s')}</div>`).join('')}</div></div>
  </div></div>
  <div class="phone-s" data-depth="24"><div class="fl" style="--fd:1s"><div class="notch"></div><div class="mu-kpis"><i></i><i></i></div><div class="mu-bars"><i style="--h:50%"></i><i style="--h:80%"></i><i style="--h:60%"></i><i style="--h:90%"></i></div>${sk(70)}${sk(50, 'sk--s')}</div></div>
  ${vp({ l: 52, t: 3, w: 26, d: 18, ico: 'list', label: 'Задачи', extra: `<div class="tasks"><span>${icon('check', 16, 'ok')}${sk(60, 'sk--s')}</span><span>${icon('check', 16, 'ok')}${sk(45, 'sk--s')}</span><span><i class="box"></i>${sk(55, 'sk--s')}</span></div>` })}
  ${vp({ l: 2, t: 78, w: 30, d: 14, ico: 'layers', label: 'Модули', extra: sk(60, 'sk--s') })}
  ${cubes([[48, 90, 14, 22], [2, 6, 16, 26], [95, 80, 14, 16]])}`);
}

/* ---- 7. Проекты: витрина экранов ---- */
export function ProjectsVisual() {
  const scr = (kind, l, t, w, d, title) => `<div class="scr" data-depth="${d}" style="--l:${l}%;--t:${t}%;--w:${w}%"><div class="fl" style="--fd:${d % 5 * 0.5}s"><div class="scr-bar"><i></i><i></i><i></i><span>${title}</span></div><div class="scr-body">${miniUI(kind)}</div></div></div>`;
  return wrap('projects', `
  ${scr('docs', 3, 8, 28, 10, 'Документы')}
  ${scr('bot', 70, 0, 26, 14, 'Бот')}
  ${scr('panel', 33, 14, 34, 22, 'Панель')}
  ${scr('requests', 6, 56, 28, 16, 'Заявки')}
  ${scr('calc', 68, 62, 28, 12, 'Расчёт')}
  ${cubes([[34, 2, 14, 24], [94, 40, 14, 18], [2, 44, 12, 20], [50, 92, 16, 14]])}`);
}

/* ---- 8. О студии: путь от анализа к внедрению ---- */
export function AboutVisual() {
  const step = (n, ico, label, l, t, d) => vp({ l, t, w: 26, d, cls: 'stair', ico, label, tag: `<span class="vp-n">${n}</span>`, extra: sk(70, 'sk--s') });
  return wrap('about', `
  <svg class="mount" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><polygon points="0,100 40,62 62,78 100,26 130,58 160,40 160,100" fill="#CFE2FF" fill-opacity=".45"/><polygon points="40,100 100,26 160,100" fill="#A9CBFF" fill-opacity=".3"/></svg>
  ${lines(['M32 82C38 82 40 70 44 68', 'M70 66C76 66 78 54 82 52', 'M108 50C114 50 116 38 120 36'], [[32, 82], [70, 66], [108, 50]])}
  ${step(1, 'search', 'Анализ', 2, 62, 10)}
  ${step(2, 'layers', 'Проектирование', 27, 46, 16)}
  ${step(3, 'code', 'Разработка', 52, 30, 12)}
  ${step(4, 'rocket', 'Внедрение', 73, 10, 20)}
  ${cubes([[8, 14, 18, 22], [60, 4, 14, 14], [92, 70, 16, 24]])}`);
}

/* ---- 9. Контакты: связь ---- */
export function ContactsVisual() {
  return wrap('contacts', `
  ${lines(['M56 30C66 30 66 40 72 44', 'M56 52H72', 'M56 74C66 74 66 62 72 58'], [[56, 30], [56, 52], [56, 74]])}
  <div class="chat" data-depth="12"><div class="fl"><div class="scr-bar"><i></i><i></i><i></i><span>Новое обращение</span></div>
    <div class="chat-body"><div class="msg l">${sk(70)}</div><div class="msg r">${sk(55)}${sk(35, 'sk--s')}</div><div class="msg l">${sk(60)}</div><div class="chat-in">${sk(55, 'sk--s')}<span class="send">${icon('send', 18)}</span></div></div></div></div>
  ${vp({ l: 4, t: 14, w: 33, d: 16, ico: 'phone', label: 'Телефон', extra: sk(60, 'sk--s') })}
  ${vp({ l: 2, t: 42, w: 34, d: 20, ico: 'mail', label: 'Email', extra: sk(70, 'sk--s') })}
  ${vp({ l: 4, t: 70, w: 33, d: 12, ico: 'send', label: 'Telegram', tag: dotG, extra: sk(55, 'sk--s') })}
  ${cubes([[44, 4, 14, 22], [92, 12, 16, 18], [92, 84, 14, 26]])}`);
}
