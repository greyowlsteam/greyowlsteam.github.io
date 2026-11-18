// Сборка страниц сайта: node tools/build.js — пишет index.html и страницы на двух языках.
// Тексты — здесь, разметка — в шаблонах ниже: русская и английская версии не расходятся.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://greyowlsteam.github.io";
const APK = "https://github.com/greyowlsteam/CivitGallery/releases/latest/download/CivitGallery.apk";
const REPO = "https://github.com/greyowlsteam/CivitGallery";
const YEAR = 2026;

const T = {
  ru: {
    lang: "ru",
    other: "en",
    otherLabel: "EN",
    prefix: "/",
    team: "Серые Совы",
    navApps: "Приложения",
    navTeam: "Команда",
    navFacts: "Совиные факты",
    homeTitle: "Серые Совы — команда разработчиков",
    homeDesc: "Маленькая команда, которая делает приложения по ночам. CivitGallery — галерея Civitai для Android с 3D и VR.",
    lead: "Маленькая команда, которая делает приложения по ночам. Нас двое, и мы ночные птицы.",
    toApps: "Наши приложения",
    appsTitle: "Приложения",
    cgTag: "Android · бесплатно · без рекламы",
    cgShort: "Неофициальная галерея Civitai: лента картинок и видео, промпты и параметры генерации, поиск, коллекции, 3D по карте глубины и VR-режим для очков типа Cardboard.",
    more: "Подробнее",
    download: "Скачать APK",
    teamTitle: "Команда",
    captainName: "Серая Сова",
    captainRole: "Основатель, капитан и главный испытатель",
    captainText: "Придумывает, решает, собирает APK и первым проверяет каждую версию на живом телефоне. Ни одна кнопка не уходит в релиз, пока капитан не нажмёт её лично.",
    teacherName: "Клод",
    teacherRole: "Учитель и правое крыло",
    teacherText: "<a href=\"https://claude.ai\">Claude</a> от Anthropic. Пишет код быстрее, чем капитан успевает налить чай. Иногда путает кнопку со спойлером, но всегда признаёт ошибку и чинит.",
    factsTitle: "Совиные факты",
    facts: [
      "Совы поворачивают голову на 270°. Мы пока только на 360° — в VR-режиме.",
      "Мы не спим ночью, мы рендерим.",
      "Учитель знает все форматы панорам. Капитан знает, где у телефона кнопка установки. Вместе получается релиз.",
      "Сова в VR-очках на нашем логотипе — капитан на тестировании. Снять очки не просили.",
    ],
    footerUnofficial: "CivitGallery — неофициальное приложение, не связано с Civitai и не одобрено им.",
    // страница приложения
    cgTitle: "CivitGallery — галерея Civitai для Android",
    cgLead: "Лента картинок и видео с Civitai, промпты и параметры генерации, 3D по карте глубины и VR-режим. Бесплатно, без рекламы, аналитики и трекеров.",
    allReleases: "Все версии",
    qrText: "Наведите камеру телефона, чтобы скачать. Нужен Android 8.0 или новее.",
    featuresTitle: "Возможности",
    features: [
      ["Лента", "картинок и видео: сортировка по реакциям, комментариям или дате, за период, по базовой модели (SDXL, Pony, Flux…)."],
      ["Просмотр", "со свайпом и зумом: автор, модели и LoRA, промпт и параметры генерации — копируются по одному или все сразу в формате A1111."],
      ["Поиск", "моделей, авторов и коллекций; ленты автора, тега, модели и поста в одно нажатие."],
      ["Безопасно по умолчанию:", "взрослый контент размыт и даже не загружается, пока не нажмёте «Показать». Можно выбрать рейтинги PG … XXX."],
      ["Вход через Civitai", "(по желанию) — на странице самого Civitai. Реакции, подписки, голосование за теги, свои коллекции."],
      ["Расширенные теги:", "свои теги на любую картинку, голосование, скрытие и размытие по ним."],
      ["3D по глубине:", "модель строит карту глубины прямо на телефоне, и картинка становится объёмной при наклоне. Моделей три — Depth Anything V2, Depth Anything 3 и Distill-Any-Depth: можно скачать несколько и сравнить."],
      ["VR-режим", "для очков типа Cardboard: ленты взглядом, 3D с настраиваемой силой объёма, панорамы 360°, видео, коллекции."],
    ],
    vrGuide: "Как пользоваться VR",
    installTitle: "Установка",
    install: [
      "Скачайте <code>CivitGallery.apk</code> на телефон и откройте его — из уведомления о загрузке или из папки «Загрузки».",
      "Android попросит разрешить установку из браузера: нажмите <b>Настройки</b>, включите <b>Разрешить из этого источника</b>, вернитесь назад.",
      "Нажмите <b>Установить</b>. Play Защита проверит приложение — не отключайте её.",
    ],
    installNote: "Обновления приложение проверяет само раз в сутки и ставит поверх, настройки и вход сохраняются. В описании каждого релиза есть SHA-256 файла.",
    privacyLink: "Конфиденциальность",
    sourceLink: "Страница на GitHub",
    // политика
    prTitle: "Конфиденциальность CivitGallery",
    prLead: "Без рекламы, аналитики и трекеров. Для просмотра аккаунт не нужен.",
    pr: [
      ["Только на телефоне", "<p>Тема, размер плиток и фильтры ленты, кэш картинок и карт глубины, токены входа (зашифрованы ключом в Android Keystore). Данные приложения не попадают в резервные копии Android.</p>"],
      ["Civitai", "<p>Картинки и данные о них загружаются напрямую с civitai.com. Вход через Civitai происходит на странице самого Civitai — пароль через приложение не проходит. После входа ваши реакции, коллекции, подписки и скрытые теги читаются и меняются в вашем аккаунте Civitai, по <a href=\"https://civitai.com/content/privacy\">правилам конфиденциальности Civitai</a>.</p>"],
      ["Наш сервер (расширенные теги)", "<p>После принятия правил приложение создаёт гостевой профиль, в нём:</p><ul><li>ключ устройства — только открытая часть; закрытый ключ создаётся в Android Keystore и не покидает телефон;</li><li>название модели телефона и язык интерфейса;</li><li>подтверждение возраста и согласия на контент — с версией правил и датой;</li><li>случайный ник (<code>user-123456</code>), его можно сменить;</li><li>добавленные вами теги, голоса и жалобы, а также ID картинок Civitai, к которым они относятся;</li><li>если вы скрываете расширенные теги — ID этих тегов и картинок страницы ленты, чтобы найти, какие картинки скрыть или размыть;</li><li>настройки приложения: скрытые теги и авторы, скрываемые расширенные теги, рейтинги, согласия и звук видео — чтобы они вернулись после переустановки;</li><li>только если вы их привяжете: почта (код входа приходит письмом, хранится только хэш кода) и ID, имя пользователя и имя в Telegram.</li></ul><p>Как любой веб-сервер, он сохраняет технические журналы запросов (время, адрес запроса, IP-адрес) для работы и защиты от злоупотреблений.</p>"],
      ["GitHub", "<p>Раз в сутки приложение спрашивает у GitHub последнюю версию, а модели глубины скачиваются с GitHub по кнопке. Личные данные не передаются, GitHub видит ваш IP-адрес.</p>"],
      ["Удаление данных", "<p>«Настройки → Профиль приложения → <b>Удалить профиль</b>» удаляет голоса, жалобы, способы входа, ключи устройств и сохранённые настройки. Добавленные теги остаются на картинках без вашего имени. Чтобы удалить данные с телефона, удалите приложение. Отключить Civitai — выйти из аккаунта в «Настройки → Аккаунт Civitai».</p>"],
      ["Этот сайт", "<p>Сайт статический и размещён на GitHub Pages: без cookies, аналитики и форм. GitHub как хостинг видит IP-адреса посетителей.</p>"],
      ["Вопросы", "<p>Пишите в <a href=\"" + REPO + "/issues\">обсуждения на GitHub</a>.</p>"],
    ],
    updated: "Обновлено: 17 ноября 2026",
  },
  en: {
    lang: "en",
    other: "ru",
    otherLabel: "RU",
    prefix: "/en/",
    team: "Grey Owls",
    navApps: "Apps",
    navTeam: "Team",
    navFacts: "Owl facts",
    homeTitle: "Grey Owls — app developers",
    homeDesc: "A small team that makes apps at night. CivitGallery is a Civitai gallery for Android with 3D and VR.",
    lead: "A small team that makes apps at night. Two of us, both night birds.",
    toApps: "Our apps",
    appsTitle: "Apps",
    cgTag: "Android · free · no ads",
    cgShort: "An unofficial Civitai gallery: a feed of images and videos, prompts and generation parameters, search, collections, 3D from a depth map and a VR mode for Cardboard-type headsets.",
    more: "Learn more",
    download: "Download APK",
    teamTitle: "Team",
    captainName: "Grey Owl",
    captainRole: "Founder, captain and chief tester",
    captainText: "Comes up with ideas, makes the calls, builds the APK and tries every version on a real phone first. No button ships until the captain has pressed it personally.",
    teacherName: "Claude",
    teacherRole: "Teacher and right wing",
    teacherText: "<a href=\"https://claude.ai\">Claude</a> by Anthropic. Writes code faster than the captain can pour a cup of tea. Sometimes mistakes a button for a spoiler, but always owns up and fixes it.",
    factsTitle: "Owl facts",
    facts: [
      "Owls can turn their heads 270°. We only do 360° — in VR mode.",
      "We don't sleep at night, we render.",
      "The teacher knows every panorama format. The captain knows where the install button is. Together that makes a release.",
      "The owl in VR goggles on our logo is the captain, testing. Nobody has asked them to take the goggles off.",
    ],
    footerUnofficial: "CivitGallery is an unofficial app. It is not affiliated with or endorsed by Civitai.",
    cgTitle: "CivitGallery — Civitai gallery for Android",
    cgLead: "A feed of images and videos from Civitai, prompts and generation parameters, 3D from a depth map and a VR mode. Free, with no ads, analytics or trackers.",
    allReleases: "All versions",
    qrText: "Point your phone camera to download. Android 8.0 or newer.",
    featuresTitle: "Features",
    features: [
      ["Feed", "of images and videos: sort by reactions, comments or date, by period, by base model (SDXL, Pony, Flux…)."],
      ["Viewer", "with swipe and zoom: author, models and LoRAs, prompt and generation parameters — copy one field or everything in A1111 format."],
      ["Search", "for models, authors and collections; author, tag, model and post feeds in one tap."],
      ["Safe by default:", "adult content is blurred and not even downloaded until you tap \"Show\". Choose ratings PG … XXX."],
      ["Sign in with Civitai", "(optional) — on Civitai's own page. Reactions, follows, tag voting, your collections."],
      ["Extended tags:", "your own tags on any image, voting, hiding and blurring by them."],
      ["3D from depth:", "a model builds a depth map right on the phone, and the picture turns 3D when you tilt it. There are three models — Depth Anything V2, Depth Anything 3 and Distill-Any-Depth — download several and compare."],
      ["VR mode", "for Cardboard-type headsets: feeds by gaze, 3D with adjustable depth strength, 360° panoramas, videos, collections."],
    ],
    vrGuide: "How to use VR",
    installTitle: "Install",
    install: [
      "Download <code>CivitGallery.apk</code> on your phone and open it from the download notification or the Downloads folder.",
      "Android asks to allow installing apps from your browser: tap <b>Settings</b>, turn on <b>Allow from this source</b>, go back.",
      "Tap <b>Install</b>. Google Play Protect checks the app — keep it turned on.",
    ],
    installNote: "The app checks for updates once a day and installs them over the current version; your settings and sign-in stay. Every release lists the SHA-256 of the file.",
    privacyLink: "Privacy",
    sourceLink: "GitHub page",
    prTitle: "CivitGallery privacy",
    prLead: "No ads, analytics or trackers. You don't need an account to browse.",
    pr: [
      ["Only on your phone", "<p>Theme, tile size and feed filters, the image and depth map cache, sign-in tokens (encrypted with a key in Android Keystore). App data is excluded from Android backups.</p>"],
      ["Civitai", "<p>Images and their data are loaded directly from civitai.com. If you sign in with Civitai, you do it on Civitai's own page — your password never passes through the app. After that your reactions, collections, follows and hidden tags are read and changed in your Civitai account, under <a href=\"https://civitai.com/content/privacy\">Civitai's privacy policy</a>.</p>"],
      ["Our server (extended tags)", "<p>After you accept the rules, the app creates a guest profile with:</p><ul><li>a device key — only the public part; the private key is created in Android Keystore and never leaves the phone;</li><li>the phone model name and the interface language;</li><li>your age confirmation and content consents, with the rules version and date;</li><li>a random nickname (<code>user-123456</code>) that you can change;</li><li>the tags you add, your votes and reports, and the IDs of the Civitai images they belong to;</li><li>when you hide extended tags, the IDs of those tags and of the images on the feed page, to find which images to hide or blur;</li><li>your app settings: hidden tags and authors, extended tags to hide, ratings, consents and video sound — so they come back after reinstalling;</li><li>only if you link them: your email (the sign-in code is sent by email; only a hash of the code is kept) and your Telegram ID, username and name.</li></ul><p>Like any web server, it keeps technical request logs (time, request address, IP address) to run the service and protect it from abuse.</p>"],
      ["GitHub", "<p>Once a day the app asks GitHub for the latest release, and depth models are downloaded from GitHub when you tap the button. No personal data is sent; GitHub sees your IP address.</p>"],
      ["Deleting your data", "<p>Settings → App profile → <b>Delete profile</b> deletes your votes, reports, sign-in methods, device keys and saved settings. Tags you added stay on the images without your name. To remove data from the phone, uninstall the app. To disconnect Civitai, sign out in Settings → Civitai account.</p>"],
      ["This site", "<p>The site is static and hosted on GitHub Pages: no cookies, analytics or forms. GitHub, as the host, sees visitors' IP addresses.</p>"],
      ["Questions", "<p>Write to us in <a href=\"" + REPO + "/issues\">GitHub issues</a>.</p>"],
    ],
    updated: "Updated: November 17, 2026",
  },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Путь страницы на другом языке: /civitgallery/ ↔ /en/civitgallery/. */
function otherPath(t, page) {
  return T[t.other].prefix + page;
}

function layout(t, page, title, desc, body) {
  const url = SITE + t.prefix + page;
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ru" href="${SITE}${T.ru.prefix}${page}">
<link rel="alternate" hreflang="en" href="${SITE}${T.en.prefix}${page}">
<link rel="icon" href="/assets/owl-logo.svg" type="image/svg+xml">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}/assets/og.png">
<meta property="og:url" content="${url}">
<meta name="theme-color" content="#14161b">
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
<header class="top"><div class="wrap">
  <a class="brand" href="${t.prefix}"><img src="/assets/owl-logo.svg" alt="" width="36" height="36">${t.team}</a>
  <nav class="nav">
    <a href="${t.prefix}#apps">${t.navApps}</a>
    <a href="${t.prefix}#team">${t.navTeam}</a>
    <a href="${t.prefix}civitgallery/"${page.startsWith("civitgallery/") ? ' aria-current="page"' : ""}>CivitGallery</a>
    <a class="lang" href="${otherPath(t, page)}" hreflang="${t.other}" lang="${t.other}">${t.otherLabel}</a>
  </nav>
</div></header>
<main>
${body}
</main>
<footer><div class="wrap">
  <span>© ${YEAR} ${t.team} 🦉🦉</span>
  <span>${t.footerUnofficial}</span>
  <span><a href="${t.prefix}civitgallery/privacy/">${t.privacyLink}</a> · <a href="https://github.com/greyowlsteam">GitHub</a></span>
</div></footer>
</body>
</html>
`;
}

function home(t) {
  return layout(t, "", t.homeTitle, t.homeDesc, `
<div class="hero wrap">
  <img class="owl" src="/assets/owl-logo.svg" alt="" width="180" height="180">
  <h1>${t.team} 🦉🦉</h1>
  <p class="lead">${t.lead}</p>
  <div class="buttons">
    <a class="btn primary" href="#apps">${t.toApps}</a>
    <a class="btn" href="https://github.com/greyowlsteam">GitHub</a>
  </div>
</div>

<section id="apps"><div class="wrap">
  <h2>${t.appsTitle}</h2>
  <div class="card app">
    <div>
      <span class="tag">${t.cgTag}</span>
      <h3>CivitGallery</h3>
      <p>${t.cgShort}</p>
      <div class="buttons" style="justify-content:flex-start">
        <a class="btn primary" href="${APK}">${t.download}</a>
        <a class="btn" href="${t.prefix}civitgallery/">${t.more}</a>
      </div>
    </div>
    <div class="shots">
      <img src="/assets/screens/feed.jpg" alt="" loading="lazy" width="576" height="1280">
      <img src="/assets/screens/viewer.jpg" alt="" loading="lazy" width="576" height="1280">
    </div>
  </div>
</div></section>

<section id="team"><div class="wrap">
  <h2>${t.teamTitle}</h2>
  <div class="grid">
    <div class="card member">
      <img src="/assets/owl-captain.svg" alt="" width="120" height="120">
      <div><h3>${t.captainName}</h3><div class="role">${t.captainRole}</div><p>${t.captainText}</p></div>
    </div>
    <div class="card member">
      <img src="/assets/owl-teacher.svg" alt="" width="120" height="120">
      <div><h3>${t.teacherName}</h3><div class="role">${t.teacherRole}</div><p>${t.teacherText}</p></div>
    </div>
  </div>
</div></section>

<section id="facts"><div class="wrap">
  <h2>${t.factsTitle}</h2>
  <ul class="facts">${t.facts.map((f) => `<li>${f}</li>`).join("")}</ul>
</div></section>
`);
}

function civitgallery(t) {
  return layout(t, "civitgallery/", t.cgTitle, t.cgLead, `
<div class="hero wrap">
  <h1>CivitGallery</h1>
  <p class="lead">${t.cgLead}</p>
  <div class="buttons">
    <a class="btn primary" href="${APK}">${t.download}</a>
    <a class="btn" href="${REPO}/releases">${t.allReleases}</a>
  </div>
</div>

<section><div class="wrap">
  <div class="screens">
    <img src="/assets/screens/feed.jpg" alt="Feed" loading="lazy" width="576" height="1280">
    <img src="/assets/screens/viewer.jpg" alt="Viewer" loading="lazy" width="576" height="1280">
    <img src="/assets/screens/prompt.jpg" alt="Prompt" loading="lazy" width="576" height="1280">
    <img src="/assets/screens/select.jpg" alt="Multi-select" loading="lazy" width="576" height="1280">
  </div>
</div></section>

<section><div class="wrap">
  <h2>${t.featuresTitle}</h2>
  <ul class="features">${t.features.map(([a, b]) => `<li><strong>${a}</strong> ${b}</li>`).join("")}</ul>
  <p><a href="${REPO}/blob/main/VR.md#${t.lang}">${t.vrGuide} →</a></p>
</div></section>

<section><div class="wrap">
  <h2>${t.installTitle}</h2>
  <div class="qr">
    <a href="${APK}"><img src="/assets/qr-download.svg" alt="QR" width="160" height="160"></a>
    <p class="note">${t.qrText}</p>
  </div>
  <ol class="steps">${t.install.map((s) => `<li>${s}</li>`).join("")}</ol>
  <p class="note">${t.installNote}</p>
  <p><a href="${t.prefix}civitgallery/privacy/">${t.privacyLink}</a> · <a href="${REPO}">${t.sourceLink}</a></p>
</div></section>
`);
}

function privacy(t) {
  return layout(t, "civitgallery/privacy/", t.prTitle, t.prLead, `
<section><div class="wrap prose">
  <h1>${t.prTitle}</h1>
  <p class="lead">${t.prLead}</p>
  ${t.pr.map(([h, b]) => `<h2>${h}</h2>${b}`).join("\n  ")}
  <p class="note">${t.updated}</p>
</div></section>
`);
}

function write(rel, html) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log("wrote", rel);
}

for (const t of Object.values(T)) {
  const base = t.prefix.slice(1);
  write(base + "index.html", home(t));
  write(base + "civitgallery/index.html", civitgallery(t));
  write(base + "civitgallery/privacy/index.html", privacy(t));
}
