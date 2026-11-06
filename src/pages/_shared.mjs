import { icon } from '../lib/icons.mjs';
import { btn, esc } from '../lib/ui.mjs';

export function hero({ eyebrow, h1, lead, primary, secondary = '', notes = [], visual, cls = '' }) {
  return `<section class="hero ${cls}"><div class="container hero-grid">
  <div class="hero-copy">
    ${eyebrow ? `<p class="eyebrow rv">${eyebrow}</p>` : ''}
    <h1 class="display rv">${h1}</h1>
    <p class="lead rv">${lead}</p>
    <div class="hero-actions rv">${primary}${secondary}</div>
    ${notes.length ? `<ul class="hero-notes rv">${notes.map((n) => `<li>${icon('check', 18)}<span>${n}</span></li>`).join('')}</ul>` : ''}
  </div>
  <div class="hero-vis rv">${visual}</div>
</div></section>`;
}

export const checkList = (items) => `<ul class="check-list">${items.map((t) => `<li>${icon('check', 18)}<span>${t}</span></li>`).join('')}</ul>`;

export function cardGrid(items, { cols = 3 } = {}) {
  return `<div class="grid grid--${cols}">${items.map((it) => `<div class="card ev-glass rv">
    ${it.icon ? `<span class="tile">${icon(it.icon, 24)}</span>` : ''}
    <h3 class="h4">${it.title}</h3><p>${it.text}</p>${it.href ? `<a class="more" href="${it.href}">${it.more || 'Подробнее'} ${icon('arrow', 18)}</a>` : ''}</div>`).join('')}</div>`;
}

export const cta = (label, topic, where, variant = 'primary', size = 'l') =>
  btn({ href: `/contacts/?topic=${topic}`, label, variant, size, track: 'cta_click', ico: variant === 'primary' ? 'arrow' : '', attrs: `data-track-label="${esc(where)}"` });
