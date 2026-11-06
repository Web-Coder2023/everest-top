import { icon } from '../lib/icons.mjs';
import { btn, shot, section, faq, tabs, ctaBand, projectCard, processSteps, flowDemo, dashDemo, aiDemo, calcDemo, compareBlock, badge } from '../lib/ui.mjs';
import { PROBLEMS, SCENARIOS, PROJECTS, PROCESS, WHY, FAQ_GENERAL } from '../data/content.mjs';
import { hero, checkList, cta } from './_shared.mjs';

const chain = (items, kind) => `<ol class="chain chain--${kind}">${items.map((t) => `<li>${t}</li>`).join('')}</ol>`;

function scenarioPanel(s) {
  return `<div class="scn">
    <div class="scn-main">
      <p class="scn-problem"><span class="lbl lbl--h">Проблема</span>${s.problem}</p>
      <div class="scn-flow">
        <div><span class="lbl">Как часто бывает сейчас</span>${chain(s.before, 'before')}</div>
        <div><span class="lbl lbl--a">Как может выглядеть после</span>${chain(s.after, 'after')}</div>
      </div>
    </div>
    <div class="scn-side ev-glass">
      <h3 class="h5">Инструменты</h3><p>${s.tools}</p>
      <h3 class="h5">Что входит в реализацию</h3>${checkList(s.includes)}
      <h3 class="h5">Что важно учесть</h3><p class="limit">${icon('warn', 18)}<span>${s.limits}</span></p>
      ${cta('Обсудить этот сценарий', 'automation', 'scenario_' + s.id, 'secondary', 'm')}
    </div>
  </div>`;
}

export default {
  path: '/',
  crumbs: [{ name: 'Главная', path: '/' }],
  body() {
    const solutions = `<div class="sol-grid">
      <article class="sol ev-glass is-priority rv"><div class="sol-top">${badge('Главное направление')}<span class="tile tile--l">${icon('gear', 30)}</span></div>
        <h3 class="h3">Автоматизация бизнес-процессов</h3>
        <p>Собираем заявки в одном месте, распределяем их между сотрудниками, напоминаем о задачах и объединяем используемые сервисы, чтобы данные не приходилось переносить вручную.</p>
        ${checkList(['Единая система обращений со статусами', 'Уведомления и контроль выполнения', 'Интеграции с CRM, почтой, таблицами, мессенджерами'])}
        ${btn({ href: '/services/business-automation/', label: 'Узнать про автоматизацию', size: 'm', track: 'cta_click', ico: 'arrow', attrs: 'data-track-label="solutions_automation"' })}</article>
      <article class="sol ev-glass rv"><span class="tile">${icon('chip', 24)}</span><h3 class="h4">Внедрение искусственного интеллекта</h3>
        <p>Подключаем ИИ для обработки информации и помощи сотрудникам: разбор обращений, поиск по базе знаний, черновики ответов. Результат проверяет человек.</p>
        <a class="more" href="/services/ai-integration/">Подробнее ${icon('arrow', 18)}</a></article>
      <article class="sol ev-glass rv"><span class="tile">${icon('monitor', 24)}</span><h3 class="h4">Сайты и веб-приложения</h3>
        <p>Сайт как часть системы: он принимает обращения и передаёт их в работу. Лендинги, корпоративные сайты, кабинеты, калькуляторы.</p>
        <a class="more" href="/services/web-development/">Подробнее ${icon('arrow', 18)}</a></article>
      <article class="sol ev-glass rv"><span class="tile">${icon('layers', 24)}</span><h3 class="h4">Цифровые продукты</h3>
        <p>Индивидуальные системы, когда готовые сервисы не подходят: внутренние панели, SaaS, MVP, мобильные приложения.</p>
        <a class="more" href="/services/digital-products/">Подробнее ${icon('arrow', 18)}</a></article>
    </div>
    <div class="center rv">${btn({ href: '/services/', label: 'Посмотреть все услуги', variant: 'secondary', size: 'm', ico: 'arrow', track: 'cta_click', attrs: 'data-track-label="all_services"' })}</div>`;

    const demos = tabs([
      { label: 'Схема заявки', icon: 'link', content: flowDemo() },
      { label: 'Панель управления', icon: 'chart', content: dashDemo() },
      { label: 'Обработка ИИ', icon: 'chip', content: aiDemo() },
      { label: 'Цифровой инструмент', icon: 'sliders', content: calcDemo() },
    ], { label: 'Демонстрации возможностей', cls: 'tabs--demo' });

    const why = `<div class="grid grid--5 why">${WHY.map((w) => `<div class="why-i rv"><span class="tile">${icon(w.icon, 24)}</span><h3 class="h5">${w.title}</h3><p>${w.text}</p></div>`).join('')}</div>`;

    return [
      hero({
        eyebrow: 'Автоматизация бизнес-процессов',
        h1: '<em>Автоматизируем процессы,</em> которые тормозят развитие бизнеса',
        lead: 'Создаём цифровые системы, объединяем сервисы и внедряем интеллектуальные инструменты, чтобы сократить рутинную работу, упорядочить процессы и упростить взаимодействие с клиентами.',
        primary: cta('Обсудить автоматизацию', 'automation', 'hero'),
        secondary: btn({ href: '#solutions', label: 'Посмотреть решения', variant: 'secondary', size: 'l', track: 'cta_secondary', attrs: 'data-track-label="hero_solutions"' }),
        notes: ['Можно начать с одного процесса', 'Сначала анализ, потом решение', 'Сопровождение по необходимости'],
        visual: shot('home-hero', 'Схема цифровой системы бизнеса: в центре стеклянный куб с логотипом Everest, вокруг панели «Аналитика и отчёты», «Автоматизация процессов», «Клиенты», «Заявки», «ИИ ассистент» и «Интеграции»', { priority: true }),
      }),
      section({ id: 'problems', eyebrow: 'Узнаёте ситуацию?', title: 'Что обычно тормозит работу компании', lead: 'Это не вопрос размера бизнеса: такие ситуации встречаются и у небольших команд, и у крупных организаций.',
        content: `<div class="prob-grid">${PROBLEMS.map((p, i) => `<div class="prob ev-glass rv ${i === 0 ? 'prob--wide' : ''}"><span class="tile">${icon(p.icon, 24)}</span><h3 class="h4">${p.title}</h3><p>${p.text}</p></div>`).join('')}
        <div class="prob prob--cta rv"><p class="h4">Если узнали себя хотя бы в одной ситуации, процесс можно разобрать и упорядочить.</p>${cta('Разобрать мой процесс', 'automation', 'problems', 'primary', 'm')}</div></div>` }),
      section({ id: 'solutions', cls: 'section--tint', eyebrow: 'Решения Everest Digital', title: 'Четыре направления, одна цель: чтобы работа шла проще', lead: 'Мы не продаём технологии ради технологий. Сначала выясняем задачу, затем подбираем то, что действительно нужно.', content: solutions }),
      section({ id: 'scenarios', eyebrow: 'Сценарии автоматизации', title: 'Понятные ситуации, которые можно узнать в своей компании', lead: 'Выберите сценарий, чтобы увидеть, как выглядит процесс до и после, что входит в работу и какие у решения ограничения.',
        content: tabs(SCENARIOS.map((s) => ({ label: s.title, icon: s.icon, content: scenarioPanel(s) })), { label: 'Сценарии автоматизации', cls: 'tabs--scn' }) }),
      section({ id: 'compare', cls: 'section--tint', eyebrow: 'Как меняется процесс', title: 'Обработка заявки: без автоматизации и с ней', lead: 'Тот же процесс, но без ручных переносов и потерянных сообщений.', content: compareBlock() }),
      section({ id: 'process', cls: 'section--sticky', eyebrow: 'Как мы работаем', title: 'От анализа до развития решения', lead: 'Работа идёт шагами, и после каждого шага вы понимаете, что дальше. Начать можно с небольшого процесса.',
        content: `<div class="split"><div class="split-side">${cta('Обсудить задачу', 'other', 'process', 'primary', 'm')}</div>${processSteps(PROCESS)}</div>` }),
      section({ id: 'demo', cls: 'section--tint', eyebrow: 'Демонстрации', title: 'Посмотрите, как это может работать', lead: 'Это демонстрационные интерфейсы с условными данными. Они не являются реальными внедрениями клиентов, а показывают, как выглядят и работают такие решения.', content: demos }),
      section({ id: 'projects', eyebrow: 'Проекты', title: 'Демонстрационные проекты', lead: 'Подтверждённых клиентских кейсов на сайте пока нет, поэтому показываем концепции, которые отражают уровень разработки. Каждая подписана как демонстрационная.',
        content: `<div class="grid grid--3">${PROJECTS.slice(0, 3).map((p) => projectCard(p)).join('')}</div><div class="center rv">${btn({ href: '/projects/', label: 'Все демонстрации', variant: 'secondary', size: 'm', ico: 'arrow', track: 'cta_click', attrs: 'data-track-label="all_projects"' })}</div>` }),
      section({ id: 'why', cls: 'section--tint', eyebrow: 'Почему такой подход', title: 'Решение под задачу, а не задача под решение', content: why }),
      section({ id: 'faq', eyebrow: 'Вопросы и ответы', title: 'Частые вопросы', lead: 'Если вашего вопроса здесь нет, напишите, и мы ответим.', content: faq(FAQ_GENERAL, { id: 'hf' }) }),
      ctaBand({ title: 'Давайте разберёмся, что в вашем бизнесе можно упростить', text: 'Опишите задачу в нескольких словах. Мы подскажем, с чего начать, без обязательств.', primary: cta('Обсудить задачу', 'other', 'final') }),
    ].join('\n');
  },
};
