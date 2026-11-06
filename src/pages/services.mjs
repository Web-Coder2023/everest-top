import { icon } from '../lib/icons.mjs';
import { btn, shot, section, ctaBand, serviceCard } from '../lib/ui.mjs';
import { SERVICES, CATEGORIES, SITUATIONS } from '../data/content.mjs';
import { hero, cta } from './_shared.mjs';

export default {
  path: '/services/',
  crumbs: [{ name: 'Главная', path: '/' }, { name: 'Услуги', path: '/services/' }],
  body() {
    const catalog = `<div class="catalog" data-catalog>
      <div class="cat-tools ev-glass">
        <label class="search"><span class="sr">Поиск по услугам</span>${icon('search', 20)}<input type="search" class="input" placeholder="Поиск: например, заявки, ИИ, сайт" data-cat-search autocomplete="off"></label>
        <div class="chips" role="group" aria-label="Категории услуг">
          <button class="chip" type="button" data-cat-btn="" aria-pressed="true">Все</button>
          ${CATEGORIES.map((c) => `<button class="chip" type="button" data-cat-btn="${c}" aria-pressed="false">${c}</button>`).join('')}
        </div>
        <p class="demo-note" data-cat-count aria-live="polite">Показано услуг: ${SERVICES.length}</p>
      </div>
      <div class="grid grid--3 cat-grid">${SERVICES.map((s) => serviceCard(s)).join('')}</div>
      <div class="empty ev-glass" data-cat-empty hidden>
        <span class="tile">${icon('search', 24)}</span>
        <h3 class="h4">Ничего не найдено</h3>
        <p>Попробуйте другой запрос или сбросьте фильтры. Если нужной услуги нет в списке, опишите задачу: мы подскажем, подходит ли она.</p>
        <div class="empty-actions">${btn({ label: 'Сбросить фильтры', variant: 'secondary', size: 's', attrs: 'data-cat-reset' })}${btn({ href: '/contacts/?topic=other', label: 'Описать задачу', size: 's', track: 'cta_click', attrs: 'data-track-label="catalog_empty"' })}</div>
      </div>
    </div>`;

    const helper = `<div class="grid grid--3">${SITUATIONS.map((s) => `<a class="sit ev-glass rv" href="${s.href}" data-track="cta_click" data-track-label="situation"><span class="sit-p">${s.problem}</span><span class="sit-a">${icon('arrow', 18)}</span><span class="sit-s">${s.solution}</span></a>`).join('')}</div>`;

    return [
      hero({
        eyebrow: 'Все услуги',
        h1: 'Цифровые решения для бизнеса: от автоматизации до собственных продуктов',
        lead: 'Начните с проблемы, которую хотите решить. Каталог помогает найти подходящее направление, а если не уверены, подскажем сами.',
        primary: cta('Подобрать решение для бизнеса', 'other', 'services_hero'),
        secondary: btn({ href: '#catalog', label: 'Перейти к каталогу', variant: 'secondary', size: 'l', track: 'cta_secondary', attrs: 'data-track-label="services_catalog"' }),
        visual: shot('services-hero', 'Панель управления на стеклянном мониторе, к которой подключены облако, шестерёнка, пазл, команда, аналитика и база данных', { priority: true }),
      }),
      section({ id: 'catalog', eyebrow: 'Каталог', title: 'Что мы делаем', lead: 'Автоматизация бизнес-процессов остаётся главным направлением. Остальные услуги дополняют её или решают отдельные задачи.', content: catalog }),
      section({ id: 'helper', cls: 'section--tint', eyebrow: 'Не знаете, что выбрать?', title: 'Найдите свою ситуацию', lead: 'Каждая карточка ведёт к решению, которое подходит к такой задаче.', content: helper }),
      ctaBand({ title: 'Не нашли нужное? Опишите задачу', text: 'Мы подскажем, подходит ли она под наши направления и с чего лучше начать.', primary: cta('Задать вопрос', 'other', 'services_final') }),
    ].join('\n');
  },
};
