// Единая точка настройки сайта. Меняйте значения здесь, а не в страницах.
export const site = {
  name: 'Everest Digital',
  // Production-домен задаётся переменной окружения SITE_URL (например, в настройках Vercel).
  // Значение по умолчанию — заглушка: замените его до публикации.
  url: (process.env.SITE_URL || 'https://your-domain.example').replace(/\/+$/, ''),
  domainConfigured: Boolean(process.env.SITE_URL),
  locale: 'ru_RU',
  phone: '8 (914) 449-07-05',
  phoneHref: 'tel:+79144490705',
  email: 'digital.everest.info@yandex.ru',
  telegram: 'https://t.me/everest_digital',
  telegramHandle: '@everest_digital',
  tagline: 'Автоматизация бизнес-процессов, внедрение ИИ, сайты и цифровые продукты',
  // Отправка формы. Пока endpoint пустой, форма НЕ имитирует отправку:
  // она готовит сообщение для Telegram, почты или копирования.
  // Для подключения укажите URL своего API (POST, JSON) — см. ADMIN_GUIDE.md.
  formEndpoint: process.env.FORM_ENDPOINT || '',
  // Аналитика: ничего не подключается, пока не заданы значения и нет согласия посетителя.
  analytics: { scriptSrc: process.env.ANALYTICS_SRC || '', id: process.env.ANALYTICS_ID || '' },
};
