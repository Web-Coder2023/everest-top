// Двухтональные иконки: контур + светлая заливка (класс "t"). Сетка 24x24.
const S = {
  gear: '<circle class="t" cx="12" cy="12" r="6.4"/><circle cx="12" cy="12" r="2.6"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.9 1.9M16.6 16.6l1.9 1.9M18.5 5.5l-1.9 1.9M7.4 16.6l-1.9 1.9"/>',
  check: '<rect class="t" x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M8.2 12.4l2.6 2.6 5-5.8"/>',
  users: '<circle class="t" cx="9" cy="8" r="3.2"/><path d="M3.2 19c0-3.2 2.6-5.2 5.8-5.2s5.8 2 5.8 5.2"/><circle cx="17.2" cy="9" r="2.3"/><path d="M16.6 14c2.6.1 4.6 1.9 4.6 4.8"/>',
  chart: '<rect class="t" x="4" y="12" width="3.6" height="8" rx="1.2"/><rect class="t" x="10.2" y="5" width="3.6" height="15" rx="1.2"/><rect class="t" x="16.4" y="9" width="3.6" height="11" rx="1.2"/>',
  chip: '<rect class="t" x="6" y="6" width="12" height="12" rx="2.8"/><rect x="9.6" y="9.6" width="4.8" height="4.8" rx="1"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  link: '<circle class="t" cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.7 10.8l6.6-3.6M8.7 13.2l6.6 3.6"/>',
  send: '<path class="t" d="M20.5 3.5L3.5 10.4l6.3 2.4 2.4 6.3 8.3-15.6z"/><path d="M9.8 12.8l10.7-9.3"/>',
  mail: '<rect class="t" x="3" y="5" width="18" height="14" rx="3.2"/><path d="M4.2 7.6l7.8 6 7.8-6"/>',
  cloud: '<path class="t" d="M7 18.2a4.1 4.1 0 01-.6-8.15A5.6 5.6 0 0117 9.6a4.3 4.3 0 01.5 8.6H7z"/>',
  db: '<ellipse class="t" cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
  doc: '<path class="t" d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9.2 13h6M9.2 17h4"/>',
  bolt: '<path class="t" d="M13.2 2.5L5 13.6h6l-1 7.9 8.2-11.1h-6l1-7.9z"/>',
  search: '<circle class="t" cx="11" cy="11" r="6.6"/><path d="M16 16l4.8 4.8"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  phone: '<path class="t" d="M5.2 3.8h3.6l1.8 4.6-2.3 1.5a10.6 10.6 0 004.9 4.9l1.5-2.3 4.6 1.8v3.6a2 2 0 01-2.2 2A15.4 15.4 0 013.2 6a2 2 0 012-2.2z"/>',
  monitor: '<rect class="t" x="3" y="4" width="18" height="12" rx="2.6"/><path d="M9 20h6M12 16v4"/>',
  mobile: '<rect class="t" x="7" y="2.6" width="10" height="18.8" rx="2.8"/><path d="M10.8 18.4h2.4"/>',
  tablet: '<rect class="t" x="4.4" y="3" width="15.2" height="18" rx="2.8"/><path d="M11 18h2"/>',
  layers: '<path class="t" d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12.6l9 5 9-5M3 16.8l9 5 9-5"/>',
  code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  shield: '<path class="t" d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z"/><path d="M8.6 12l2.4 2.4 4.4-5"/>',
  clock: '<circle class="t" cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/>',
  list: '<circle class="t" cx="4.8" cy="6" r="1.6"/><circle class="t" cx="4.8" cy="12" r="1.6"/><circle class="t" cx="4.8" cy="18" r="1.6"/><path d="M9.5 6H20M9.5 12H20M9.5 18H20"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  copy: '<rect class="t" x="8" y="8" width="12" height="12" rx="2.6"/><path d="M16 8V6.4A2.4 2.4 0 0013.6 4H6.4A2.4 2.4 0 004 6.4v7.2A2.4 2.4 0 006.4 16H8"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  bell: '<path class="t" d="M6 16v-5a6 6 0 1112 0v5l1.6 2.4H4.4L6 16z"/><path d="M10 21h4"/>',
  sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle class="t" cx="15" cy="7" r="2"/><circle class="t" cx="9" cy="17" r="2"/>',
  cart: '<path class="t" d="M5.5 7h14l-1.6 8H7.4L5.5 7z"/><path d="M3 4h2.2l.6 3M9 20h.01M16 20h.01"/>',
  globe: '<circle class="t" cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  target: '<circle class="t" cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
  rocket: '<path class="t" d="M12 3c3.5 2 5 5.5 4.5 10l-2.2 2.2h-4.6L7.5 13C7 8.5 8.5 5 12 3z"/><circle cx="12" cy="9.5" r="1.5"/><path d="M8 16l-3 3M16 16l3 3M10 18.5l-.6 2.5M14 18.5l.6 2.5"/>',
  warn: '<path class="t" d="M12 3.5l9.5 16.5h-19L12 3.5z"/><path d="M12 10v4.5M12 17.4v.1"/>',
  wallet: '<rect class="t" x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M16.5 14.5h.01"/>',
  book: '<path class="t" d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5v-15z"/><path d="M4 20.5A2.5 2.5 0 016.5 18H20v3H6.5A2.5 2.5 0 014 20.5z"/>',
  message: '<path class="t" d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v8a2.5 2.5 0 01-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 014 13.5v-8z"/><path d="M8 8h8M8 11.2h5"/>',
};

export function icon(name, size = 24, cls = '') {
  const body = S[name];
  if (!body) throw new Error('Неизвестная иконка: ' + name);
  return `<svg class="ev-i ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

// Знак Everest: гора с двумя вершинами. id нужен, чтобы градиенты не конфликтовали.
let n = 0;
export function logoMark(size = 32) {
  const id = 'lg' + n++;
  return `<svg class="ev-logo" width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3B82F6"/><stop offset="1" stop-color="#1749B8"/></linearGradient><linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8DB8FF"/><stop offset="1" stop-color="#1F5FE0"/></linearGradient></defs><path d="M20 4l16 28H4L20 4z" fill="url(#${id}a)"/><path d="M20 15l9 17H11l9-17z" fill="url(#${id}b)" opacity=".92"/><path d="M20 4l5.2 9.1L20 11l-5.2 2.1L20 4z" fill="#fff" opacity=".85"/></svg>`;
}
