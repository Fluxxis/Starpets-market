const cfg = window.APP_CONFIG || {};
const rates = { EUR: 1, USD: 1.08, RUB: 96 };
const state = {
  game: cfg.defaultGame || 'mm2',
  lang: cfg.defaultLanguage || 'en',
  currency: cfg.defaultCurrency || 'EUR',
  banner: 0,
  hiddenBanner: false,
  pricesReady: false
};

const icons = {
  cart: '<svg class="svg-icon cart-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.2 8.2h3.05l1.85 11.05a2.6 2.6 0 0 0 2.57 2.17h8.12a2.6 2.6 0 0 0 2.5-1.9l1.58-5.75H11.05"/><path d="M13.7 25.5a1.25 1.25 0 1 0 0 .02M24 25.5a1.25 1.25 0 1 0 0 .02"/><path d="M15.35 17.55h8.15"/></svg>',
  box: '<svg class="svg-icon box-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 5.4 7.1 10.55 16 15.72l8.9-5.17L16 5.4Z"/><path d="M7.1 10.75v10.1L16 26l8.9-5.15v-10.1"/><path d="M16 15.72V26"/><path d="m11.55 8 8.9 5.15"/></svg>',
  bolt: '<svg class="svg-icon bolt-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M18.3 3.7 8.6 17.6h7.15l-1.9 10.7 9.7-14.35h-7.1L18.3 3.7Z"/></svg>',
  robux: '<svg class="svg-icon robux-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4.8 27.2 16 16 27.2 4.8 16 16 4.8Z"/><path d="M13.55 13.55h4.9v4.9h-4.9z"/></svg>',
  help: '<svg class="svg-icon help-svg" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11.2"/><path d="M12.7 13.3a3.55 3.55 0 1 1 5.6 2.9c-1.45 1-2.3 1.8-2.3 3.75"/><path d="M16 24.2h.02"/></svg>',
  profile: '<svg class="svg-icon profile-svg" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="11.6" r="4.7"/><path d="M8.55 25.4c.85-4.15 3.58-6.35 7.45-6.35s6.6 2.2 7.45 6.35"/></svg>',
  close: '<svg class="svg-icon close-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.4 9.4 22.6 22.6M22.6 9.4 9.4 22.6"/></svg>',
  chevron: '<svg class="svg-icon chevron-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="m10.4 13.2 5.6 5.6 5.6-5.6"/></svg>',
  arrow: '<svg class="svg-icon arrow-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 16h16.8M17.9 9.6l6.4 6.4-6.4 6.4"/></svg>',
  prev: '<svg class="svg-icon prev-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M19.4 24 11.4 16l8-8"/></svg>',
  next: '<svg class="svg-icon next-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="m12.6 24 8-8-8-8"/></svg>',
  filter: '<svg class="svg-icon filter-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M5.5 10.1h12.2M22.5 10.1h4"/><circle cx="20.1" cy="10.1" r="2.35"/><path d="M5.5 21.9h4M14.3 21.9h12.2"/><circle cx="11.9" cy="21.9" r="2.35"/><path d="M5.5 16h7M17.1 16h9.4"/><circle cx="14.75" cy="16" r="2.35"/></svg>',
  search: '<svg class="svg-icon search-svg" viewBox="0 0 32 32" aria-hidden="true"><circle cx="14.2" cy="14.2" r="8.35"/><path d="m20.35 20.35 5.15 5.15"/></svg>',
  star: '<svg class="svg-icon star-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="m16 5.1 3.25 6.58 7.27 1.06-5.26 5.1 1.24 7.22L16 21.64 9.5 25.06l1.24-7.22-5.26-5.1 7.27-1.06L16 5.1Z"/></svg>',
  fire: '<svg class="svg-icon flame-svg svg-fill" viewBox="0 0 32 32" aria-hidden="true"><path d="M17.8 3.2c.92 4.73-1.85 6.42-3.8 8.48-1.66 1.76-2.27 4.07-.62 6.4.55-2.83 2.45-4.48 4.63-6.1 2.82 2.52 5.02 5.32 5.02 9.02 0 4-3.08 6.8-6.82 6.8-4.43 0-8.62-3.27-8.62-8.9 0-6.35 6.5-8.55 10.2-15.7Zm.15 15.28c-1.52 1.25-3.12 2.53-3.12 4.25 0 1.42 1 2.45 2.42 2.45 1.45 0 2.6-1 2.6-2.52 0-1.38-.78-2.7-1.9-4.18Z"/></svg>',
  cookie: '<svg class="svg-icon cookie-svg svg-fill" viewBox="0 0 32 32" aria-hidden="true"><path d="M27.7 16.9A11.7 11.7 0 1 1 15.1 4.25a4.2 4.2 0 0 0 4.82 5.35 4.15 4.15 0 0 0 5.52 5.28c.67.02 1.37-.08 2.25-.22Z"/><circle cx="10.3" cy="12" r="1.55" fill="#8c5a28"/><circle cx="15.8" cy="20.4" r="1.5" fill="#8c5a28"/><circle cx="9.8" cy="20.7" r="1.25" fill="#8c5a28"/><circle cx="21" cy="23.25" r="1.16" fill="#8c5a28"/></svg>',
  info: '<svg class="svg-icon info-svg" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11"/><path d="M16 14.2v7"/><path d="M16 10.4h.02"/></svg>',
  circleCheck: '<svg class="svg-icon circle-check-svg" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="9.3"/><path d="m11.4 16.2 3.1 3.1 6.1-6.4"/></svg>',
  circleClose: '<svg class="svg-icon circle-close-svg" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="9.3"/><path d="m12.7 12.7 6.6 6.6M19.3 12.7l-6.6 6.6"/></svg>',
  chart: '<svg class="svg-icon chart-svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M6 25h20"/><path d="M10.2 21.5v-8.8"/><path d="M16 21.5V7.4"/><path d="M21.8 21.5v-5.7"/><path d="m22.1 7.4 3.7 3.7 3.7-3.7"/></svg>',
  godly: '<svg class="godly-svg" viewBox="0 0 96 74" aria-hidden="true"><defs><linearGradient id="godlyCleanG" x1="8" y1="4" x2="88" y2="70" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff4aa9"/><stop offset=".55" stop-color="#a63dff"/><stop offset="1" stop-color="#6d5cff"/></linearGradient><filter id="godlyCleanS" x="-20%" y="-20%" width="140%" height="145%"><feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#7b4dff" flood-opacity=".22"/></filter></defs><path filter="url(#godlyCleanS)" fill="url(#godlyCleanG)" d="M48 3.5 59.8 14.4 76 8.6 71.5 25.2 91.5 36.8 71.5 48.3 76 65.1 59.8 59.2 48 70.5 36.2 59.2 20 65.1 24.5 48.3 4.5 36.8 24.5 25.2 20 8.6 36.2 14.4 48 3.5Z"/><path fill="#fff" opacity=".22" d="M35 19 48 10.5 61 19 56.7 34 69.5 44 53.7 44.5 48 59.8 42.3 44.5 26.5 44 39.3 34Z"/><path fill="#fff" d="M48 24.2 51.8 32.1 60.5 33.4 54.2 39.5 55.7 48.1 48 44 40.3 48.1 41.8 39.5 35.5 33.4 44.2 32.1 48 24.2Z"/></svg>'
};

const flagSvg = {
  en: '<svg class="flag-svg" viewBox="0 0 36 36"><clipPath id="fUS"><circle cx="18" cy="18" r="18"/></clipPath><g clip-path="url(#fUS)"><rect width="36" height="36" fill="#fff"/><g fill="#d92736"><rect y="0" width="36" height="3"/><rect y="6" width="36" height="3"/><rect y="12" width="36" height="3"/><rect y="18" width="36" height="3"/><rect y="24" width="36" height="3"/><rect y="30" width="36" height="3"/></g><rect width="16" height="19" fill="#244b9b"/></g></svg>',
  ru: '<svg class="flag-svg" viewBox="0 0 36 36"><clipPath id="fRU"><circle cx="18" cy="18" r="18"/></clipPath><g clip-path="url(#fRU)"><rect width="36" height="12" fill="#fff"/><rect y="12" width="36" height="12" fill="#2454b8"/><rect y="24" width="36" height="12" fill="#e22a35"/></g></svg>',
  tr: '<svg class="flag-svg" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#e3242d"/><circle cx="15" cy="18" r="7" fill="#fff"/><circle cx="17.4" cy="18" r="5.4" fill="#e3242d"/><path d="M24 13.7 25.2 17h3.4l-2.8 2 1.1 3.3-2.9-2-2.8 2 1.1-3.3-2.8-2h3.4L24 13.7Z" fill="#fff"/></svg>',
  pt: '<svg class="flag-svg" viewBox="0 0 36 36"><clipPath id="fPT"><circle cx="18" cy="18" r="18"/></clipPath><g clip-path="url(#fPT)"><rect width="15" height="36" fill="#169b62"/><rect x="15" width="21" height="36" fill="#ff2938"/><circle cx="15" cy="18" r="5" fill="#ffd33d"/></g></svg>',
  fr: '<svg class="flag-svg" viewBox="0 0 36 36"><clipPath id="fFR"><circle cx="18" cy="18" r="18"/></clipPath><g clip-path="url(#fFR)"><rect width="12" height="36" fill="#21468b"/><rect x="12" width="12" height="36" fill="#fff"/><rect x="24" width="12" height="36" fill="#ed2939"/></g></svg>',
  es: '<svg class="flag-svg" viewBox="0 0 36 36"><clipPath id="fES"><circle cx="18" cy="18" r="18"/></clipPath><g clip-path="url(#fES)"><rect width="36" height="36" fill="#c60b1e"/><rect y="9" width="36" height="18" fill="#ffc400"/></g></svg>',
  it: '<svg class="flag-svg" viewBox="0 0 36 36"><clipPath id="fIT"><circle cx="18" cy="18" r="18"/></clipPath><g clip-path="url(#fIT)"><rect width="12" height="36" fill="#009246"/><rect x="12" width="12" height="36" fill="#fff"/><rect x="24" width="12" height="36" fill="#ce2b37"/></g></svg>'
};

const languages = [
  { id:'en', label:'English' },
  { id:'ru', label:'Русский' },
  { id:'tr', label:'Türkçe' },
  { id:'pt', label:'Português' },
  { id:'fr', label:'Français' },
  { id:'es', label:'Español' },
  { id:'it', label:'Italiana' }
];

const games = [
  { id:'adopt', label:'Adopt Me', fast:true, enabled:true, icon:'Games/adopt-me.svg' },
  { id:'mm2', label:'MM2', fast:true, enabled:true, icon:'Games/mm2.svg' },
  { id:'brainrot', label:'Steal a Brainrot', fast:false, enabled:false, icon:'Games/steal-a-brainrot.svg' },
  { id:'sailor', label:'Sailor Piece', fast:false, enabled:false, icon:'Games/sailor-piece.svg' },
  { id:'garden', label:'Grow a Garden', fast:false, enabled:false, icon:'Games/grow-a-garden.svg' },
  { id:'blade', label:'Blade Ball', fast:false, enabled:false, icon:'Games/blade-ball.svg' }
];

const i18n = {
  en: { market:'Market', items:'Items', sale:'Sale', help:'Help', profile:'Profile', buySell:'Buy & Sell Game Items', sideCopy:'Static interface. No payment, no auth form, no real marketplace connection.', quick:'Quick delivery', login:'Login', registration:'Registration', checkout:'For checkout', search:'Quick search', popularity:'Popularity', cookieTitle:'Consent to Site Rules', cookieText:'StarPets is an independent platform not affiliated with Roblox Corporation. By using the site, you agree to the use of cookies.', accept:'ACCEPT', decline:'DECLINE', stats:'Statistics', addToCart:'Add to cart', itemsForSale:'Items for sale', minPrice:'Min. price', bannerAdopt:'NEW SUMMER PETS HERE', bannerAdoptSub:'PLAY MORE. GRIND LESS.', bannerMM2:'ALL MM2 ITEMS ARE HERE', bannerMM2Sub:'The event starts here' },
  ru: { market:'Маркет', items:'Предметы', sale:'Скидки', help:'Помощь', profile:'Профиль', buySell:'Покупка и продажа игровых предметов', sideCopy:'Статичный интерфейс. Без оплаты, авторизации и реального магазина.', quick:'Быстрая доставка', login:'Войти', registration:'Регистрация', checkout:'К оплате', search:'Быстрый поиск', popularity:'Популярность', cookieTitle:'Согласие с правилами сайта', cookieText:'StarPets является независимой платформой и не связана с Roblox Corporation. Используя сайт, ты соглашаешься с cookies.', accept:'ПРИНЯТЬ', decline:'ОТКЛОНИТЬ', stats:'Статистика', addToCart:'В корзину', itemsForSale:'Объявлений', minPrice:'Мин. цена', bannerAdopt:'НОВЫЕ ЛЕТНИЕ ПИТОМЦЫ', bannerAdoptSub:'ИГРАЙ БОЛЬШЕ. ФАРМИ МЕНЬШЕ.', bannerMM2:'ВСЕ MM2 ПРЕДМЕТЫ ТУТ', bannerMM2Sub:'Ивент начинается здесь' },
  tr: { market:'Market', items:'Eşyalar', sale:'İndirim', help:'Yardım', profile:'Profil', buySell:'Oyun eşyaları al ve sat', sideCopy:'Statik arayüz. Ödeme ve gerçek mağaza bağlantısı yok.', quick:'Hızlı teslimat', login:'Giriş', registration:'Kayıt', checkout:'Ödeme', search:'Hızlı arama', popularity:'Popülerlik', cookieTitle:'Site kurallarına onay', cookieText:'StarPets, Roblox Corporation ile bağlantılı değildir.', accept:'KABUL', decline:'REDDET', stats:'İstatistik', addToCart:'Sepete ekle', itemsForSale:'Satıştaki ürünler', minPrice:'Min. fiyat', bannerAdopt:'YENİ YAZ PETLERİ', bannerAdoptSub:'DAHA ÇOK OYNA.', bannerMM2:'TÜM MM2 EŞYALARI BURADA', bannerMM2Sub:'Etkinlik burada başlar' },
  pt: { market:'Mercado', items:'Itens', sale:'Oferta', help:'Ajuda', profile:'Perfil', buySell:'Compre e venda itens', sideCopy:'Interface estática. Sem pagamento ou loja real.', quick:'Entrega rápida', login:'Login', registration:'Registro', checkout:'Carrinho', search:'Busca rápida', popularity:'Popularidade', cookieTitle:'Consentimento das regras', cookieText:'StarPets não é afiliado à Roblox Corporation.', accept:'ACEITAR', decline:'RECUSAR', stats:'Estatísticas', addToCart:'Adicionar', itemsForSale:'Itens à venda', minPrice:'Preço mín.', bannerAdopt:'NOVOS PETS DE VERÃO', bannerAdoptSub:'JOGUE MAIS.', bannerMM2:'TODOS OS ITENS MM2 AQUI', bannerMM2Sub:'Evento começa aqui' },
  fr: { market:'Marché', items:'Objets', sale:'Promo', help:'Aide', profile:'Profil', buySell:'Acheter et vendre des objets', sideCopy:'Interface statique. Aucun paiement ni magasin réel.', quick:'Livraison rapide', login:'Connexion', registration:'Inscription', checkout:'Panier', search:'Recherche rapide', popularity:'Popularité', cookieTitle:'Accord aux règles', cookieText:'StarPets n’est pas affilié à Roblox Corporation.', accept:'ACCEPTER', decline:'REFUSER', stats:'Statistiques', addToCart:'Ajouter', itemsForSale:'Objets en vente', minPrice:'Prix min.', bannerAdopt:'NOUVEAUX PETS D’ÉTÉ', bannerAdoptSub:'JOUE PLUS.', bannerMM2:'TOUS LES OBJETS MM2 ICI', bannerMM2Sub:'Événement ici' },
  es: { market:'Mercado', items:'Artículos', sale:'Oferta', help:'Ayuda', profile:'Perfil', buySell:'Compra y venta de objetos', sideCopy:'Interfaz estática. Sin pago ni tienda real.', quick:'Entrega rápida', login:'Entrar', registration:'Registro', checkout:'Carrito', search:'Búsqueda rápida', popularity:'Popularidad', cookieTitle:'Consentimiento de reglas', cookieText:'StarPets no está afiliado a Roblox Corporation.', accept:'ACEPTAR', decline:'RECHAZAR', stats:'Estadísticas', addToCart:'Agregar', itemsForSale:'Artículos en venta', minPrice:'Precio mín.', bannerAdopt:'NUEVAS MASCOTAS', bannerAdoptSub:'JUEGA MÁS.', bannerMM2:'TODOS LOS OBJETOS MM2 AQUÍ', bannerMM2Sub:'Evento aquí' },
  it: { market:'Mercato', items:'Oggetti', sale:'Sconto', help:'Aiuto', profile:'Profilo', buySell:'Compra e vendi oggetti', sideCopy:'Interfaccia statica. Nessun pagamento o negozio reale.', quick:'Consegna rapida', login:'Login', registration:'Registrazione', checkout:'Checkout', search:'Ricerca rapida', popularity:'Popolarità', cookieTitle:'Consenso alle regole', cookieText:'StarPets non è affiliato a Roblox Corporation.', accept:'ACCETTA', decline:'RIFIUTA', stats:'Statistiche', addToCart:'Aggiungi', itemsForSale:'Oggetti in vendita', minPrice:'Prezzo min.', bannerAdopt:'NUOVI PET ESTIVI', bannerAdoptSub:'GIOCA DI PIÙ.', bannerMM2:'TUTTI GLI OGGETTI MM2 QUI', bannerMM2Sub:'Evento qui' }
};

const categories = {
  adopt: {
    en:['Transport','Pet','Egg','Potion','Strollers','Toys','Accessories','Gifts'],
    ru:['Транспорт','Питомцы','Яйца','Зелья','Коляски','Игрушки','Аксессуары','Подарки']
  },
  mm2: {
    en:['Knife','Gun','Pet','Miscellaneous'],
    ru:['Ножи','Пушки','Петы','Разное']
  }
};

const rawProducts = {
  adopt: [
    ['Crystal Egg', .04, '', 'orange'], ['Ride Potion', .40, '', 'orange'], ['Tealwood Snake', .09, 'Newborn', 'orange'], ['Pilot Gull', .07, '', 'blue', 'M'], ['Admin Abuse Egg', .04, '', 'orange'], ['Rainbow Trout', .07, 'Newborn', 'pink'], ['Fly Potion', .72, '', 'orange'],
    ['Unicorn Duckling', .11, '', 'pink', 'M'], ['Tealwood Snake', .23, 'Reborn', 'orange', 'N'], ['Mochi Meow', .35, '', 'orange', 'M'], ['Retired Egg', .04, '', 'blue'], ['Tealwood Snake', .18, '', 'orange', 'M'], ['Aestus', .51, 'Newborn', 'orange'], ['Aztec Egg', .04, '', 'orange'],
    ['Nurse Shark', .11, '', 'blue', 'M'], ['Glyptodon', .05, '', 'blue', 'M'], ['Tealwood Snake', .12, 'Full-Grown', 'orange'], ['River Otter', 1.06, '', 'blue', 'M'], ['Black-Footed Ferret', .09, 'Reborn', 'pink', 'N'], ['Royal Egg', .04, '', 'orange'], ['Moon Egg', .09, '', 'orange'],
    ['Solaris', 1.83, 'Newborn', 'orange'], ['Paint Sealer', .04, '', 'orange'], ['Dragonfruit Butterfly', .69, 'Newborn', 'orange'], ['Sushi Penguin', .60, 'Newborn', 'orange'], ['Alicorn', .13, 'Reborn', 'pink', 'N'], ['Rainbow Trout', .11, 'Reborn', 'pink', 'N'], ['Dango Penguin', .54, 'Newborn', 'orange'],
    ['Garden Egg', .11, '', 'orange'], ['Strawberry Bat Dragon', .11, 'Newborn', 'orange'], ['Sea Turtle', .33, '', 'orange', 'M'], ['Rainbow Trout', .66, '', 'pink', 'M'], ['Purrowl', .09, 'Reborn', 'orange', 'N'], ['Purrowl', .34, '', 'orange', 'M'], ['Unicorn', 2.00, '', 'pink', 'M']
  ],
  mm2: [
    ['Icewing', .39, '2018', 'purple', '+2'], ['Bat', 2.17, '2022', 'pink', '+12'], ['Candies', .04, '2017', 'gray'], ['Candy', 1.58, '2015', 'pink', '+9'], ['Harvester', 4.47, '2021', 'purple', '+25'], ['Icepiercer', 3.54, '2022', 'purple', '+20'], ['Heartblade', 1.23, '2021', 'pink', '+7'],
    ['Elderwood Revolver', .69, '2018', 'pink', '+3'], ['Batwing', .89, '2018', 'purple', '+5'], ['Sugar', .66, '2015', 'pink', '+3'], ['Strawberries', .04, '2026', 'gray'], ['Amerilaser', .61, '2016', 'pink', '+3'], ['Elderwood Scythe', .68, '2019', 'purple', '+3'], ['Icebreaker', 1.26, '2020', 'pink', '+7'],
    ['Strawberries', .04, '2026', 'gray'], ['Yummy', .04, '2026', 'green'], ['Vampire\'s Edge', .40, '2020', 'pink', '+2'], ['Treat', 3.34, '2026', 'pink', '+19'], ['Plaid', .04, '2026', 'gray'], ['Iceblaster', .69, '2020', 'pink', '+3'], ['Old Glory', .34, '2016', 'pink', '+1'],
    ['Hallowscythe', .63, '2020', 'purple', '+3'], ['Hearts', .04, '2026', 'gray'], ['Leaf', .04, '', 'gray'], ['Nightblade', .50, '2016', 'pink', '+2'], ['Sweet', 3.32, '2026', 'pink', '+19'], ['Swirly Gun', .35, '2021', 'pink', '+2'], ['Frozen', .07, '2025', 'gray'],
    ['Lovely', .04, '', 'gray'], ['Paws', .04, '2026', 'blue'], ['Clown', .04, '', 'gray'], ['Hallowgun', .39, '2020', 'pink', '+2'], ['Balloons', .04, '2024', 'gray'], ['Luger', .86, '', 'pink', '+4'], ['Clownfish', .04, '2024', 'gray'],
    ['Lightbringer', .63, '', 'pink', '+3'], ['Sandy', .04, '2024', 'gray'], ['Wavy', .04, '2024', 'gray'], ['Plasmabeam', .41, '2022', 'pink', '+2'], ['Darkbringer', .79, '', 'pink', '+4'], ['Clownfish', .04, '2024', 'gray'], ['Luger', .89, '', 'pink', '+5'],
    ['Starfish', .04, '2024', 'gray'], ['Lightbringer', 1.18, '', 'green', '+6'], ['Candleflame', .86, '2021', 'pink', '+4'], ['BattleAxe II', .39, '2018', 'pink', '+2'], ['Shaded', .04, '', 'gray'], ['Pixel', .38, '2016', 'pink', '+2'], ['Elderwood Blade', .93, '2022', 'pink', '+5'],
    ['Iceflake', .29, '2021', 'pink', '+1'], ['Candies', .04, '2016', 'gray'], ['BattleAxe', .44, '2017', 'gray', '+2'], ['Shark', .46, '', 'pink', '+2'], ['Clockwork', .79, '', 'pink', '+3'], ['Blaster', .59, '', 'pink', '+1'], ['Icebeam', .75, '', 'pink', '+3']
  ]
};



const productImages = {
  adopt: {
    0: 'adopt/crystal-egg.webp',
    1: 'adopt/ride-potion.webp',
    2: 'adopt/tealwood-snake.webp',
    3: 'adopt/pilot-gull.webp',
    4: 'adopt/admin-abuse-egg.webp',
    5: 'adopt/rainbow-trout.webp',
    6: 'adopt/fly-potion.webp',
    7: 'adopt/unicorn-duckling.webp',
    8: 'adopt/tealwood-snake.webp',
    9: 'adopt/mochi-meow.webp',
    10: 'adopt/retired-egg.webp',
    11: 'adopt/tealwood-snake.webp',
    13: 'adopt/aztec-egg.webp',
    16: 'adopt/tealwood-snake.webp',
    17: 'adopt/river-otter.webp',
    26: 'adopt/rainbow-trout.webp'
  },
  mm2: {
    0: 'mm2/icewing.webp',
    1: 'mm2/bat.webp',
    2: 'mm2/candies.webp',
    3: 'mm2/candy.webp',
    4: 'mm2/harvester.webp',
    5: 'mm2/icepiercer.webp',
    6: 'mm2/heartblade.webp',
    7: 'mm2/elderwood-revolver.webp',
    8: 'mm2/batwing.webp',
    9: 'mm2/sugar.webp',
    10: 'mm2/strawberries.webp',
    11: 'mm2/amerilaser.webp',
    12: 'mm2/elderwood-scythe.webp',
    13: 'mm2/icebreaker.webp',
    14: 'mm2/floral-knife.webp'
  }
};

const rarityColor = { orange:'#ffab1c', blue:'#4b82ff', pink:'#f42fb8', purple:'#8f22df', gray:'#8f9097', green:'#40cd38' };
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));
const t = key => (i18n[state.lang] && i18n[state.lang][key]) || i18n.en[key] || key;

function injectStaticIcons(){
  $$('[data-icon]').forEach(node => {
    const name = node.dataset.icon;
    if (icons[name]) node.innerHTML = icons[name];
  });
}

function money(value){
  const n = value * (rates[state.currency] || 1);
  if (state.currency === 'USD') return '$' + clean(n);
  if (state.currency === 'RUB') return Math.round(n) + ' ₽';
  return clean(n) + ' €';
}
function clean(n){
  const s = n >= 10 ? n.toFixed(0) : n.toFixed(2);
  return s.replace(/\.00$/,'').replace(/(\.\d)0$/,'$1');
}
function stableNumber(text,min,max){
  let x = 0;
  for (let i = 0; i < text.length; i++) x = (x * 33 + text.charCodeAt(i)) >>> 0;
  return min + (x % (max - min + 1));
}
function productObject(arr,index){ return { name:arr[0], price:arr[1], note:arr[2] || '', color:arr[3] || 'orange', mark:arr[4] || '', index, image: getProductImage(state.game, index) }; }
function getProductImage(game,index){ return (productImages[game] && productImages[game][index]) || ''; }
function closeDrops(except){ $$('.dropdown.open').forEach(drop => { if (drop !== except) drop.classList.remove('open'); }); }
function toggleDrop(selector){ const drop = $(selector); const open = drop.classList.contains('open'); closeDrops(drop); drop.classList.toggle('open', !open); }

function renderText(){
  document.documentElement.lang = state.lang;
  $('#loginBtn').textContent = t('login');
  $('#registrationBtn').innerHTML = `${t('registration')} <span data-icon="arrow"></span>`;
  $('#checkoutText').textContent = t('checkout');
  $('#searchInput').placeholder = t('search');
  $('#sortText').textContent = t('popularity');
  $('#cookieTitle').textContent = t('cookieTitle');
  $('#cookieText').textContent = t('cookieText');
  $('#acceptText').textContent = t('accept');
  $('#declineText').textContent = t('decline');
  $('#statsText').textContent = t('stats');
  $('#itemsForSaleLabel').textContent = t('itemsForSale');
  $('#minPriceLabel').textContent = t('minPrice');
  $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  injectStaticIcons();
}
function renderHeader(){
  const mobileLogo = cfg.mobileLogo || 'mobile-logo.png';
  const desktopLogo = cfg.logo || 'Logo.svg';
  $('#brandLogo').src = window.matchMedia('(max-width: 700px)').matches ? mobileLogo : desktopLogo;
  const game = games.find(g => g.id === state.game) || games[0];
  $('#gameBtn').setAttribute('title', game.label);
  const gameAvatar = $('#gameAvatar');
  if (gameAvatar) {
    gameAvatar.src = game.icon;
    gameAvatar.alt = game.label;
  }
  $('#flagNow').innerHTML = flagSvg[state.lang] || flagSvg.en;
  $('#currencyNow').textContent = state.currency === 'USD' ? '$' : state.currency === 'RUB' ? '₽' : '€';
}
function renderGameMenu(){
  $('#gameDropdown').innerHTML = games.map(g => {
    const quick = g.fast ? `<b class="quick">${icons.bolt}<span>${t('quick')}</span></b>` : `<b class="quick icon-only">${icons.bolt}</b>`;
    return `<button class="drop-row ${state.game === g.id ? 'active' : ''} ${g.enabled ? '' : 'disabled'}" data-game="${g.id}" type="button"><img class="drop-icon" src="${g.icon}" alt="${g.label}" /><span>${g.label}</span>${quick}</button>`;
  }).join('');
}
function renderLangMenu(){
  $('#langDropdown').innerHTML = languages.map(l => `<button class="drop-row ${state.lang === l.id ? 'active' : ''}" data-lang="${l.id}" type="button"><span>${flagSvg[l.id] || flagSvg.en}</span><span>${l.label}</span></button>`).join('');
}
function renderCurrencyMenu(){
  $('#currencyDropdown').innerHTML = ['EUR','RUB','USD'].map(c => `<button class="drop-row ${state.currency === c ? 'active' : ''}" data-currency="${c}" type="button">${c}</button>`).join('');
}
function renderCategories(){
  const group = categories[state.game] || categories.adopt;
  const list = group[state.lang] || group.en;
  $('#categories').innerHTML = list.map((label,index) => `<button class="cat ${index === 0 ? 'active' : ''}" type="button">${label}</button>`).join('');
}
function renderBanner(){
  const hero = $('#hero');
  if (state.hiddenBanner) { hero.style.display = 'none'; return; }
  const banners = cfg.banners || ['Images/1.png','Images/2.png','Images/3.png'];
  hero.style.display = 'flex';
  hero.style.backgroundImage = `url('${banners[state.banner % banners.length]}')`;
  $('#heroTitle').textContent = '';
  $('#heroSub').textContent = '';
  $('#heroDots').innerHTML = banners.map((_,index) => `<span class="${index === state.banner ? 'active' : ''}"></span>`).join('');
}
function renderProducts(){
  const items = (rawProducts[state.game] || rawProducts.adopt).map(productObject);
  $('#products').innerHTML = items.map(p => {
    const mark = String(p.mark || '');
    const badge = mark.startsWith('+') ? `<span class="boost">${mark}${icons.fire}</span>` : mark ? `<span class="badge ${mark === 'N' ? 'green' : ''}">${mark}</span>` : '';
    const price = state.pricesReady ? money(p.price) : '';
    const art = p.image ? `<div class="art has-image"><img src="${p.image}" alt="${p.name}" loading="lazy" /></div>` : `<div class="art skeleton"></div>`;
    return `<article class="card" data-product="${p.index}"><span class="rarity" style="background:${rarityColor[p.color] || rarityColor.orange}"></span>${badge}${art}<div class="note">${p.note || ''}</div><div class="name" title="${p.name}">${p.name}</div><div class="price ${state.pricesReady ? '' : 'loading'}">${price}</div><button class="card-cart" aria-label="Add to cart" type="button">${icons.cart}</button></article>`;
  }).join('');
}
function renderAll(){ renderText(); renderHeader(); renderGameMenu(); renderLangMenu(); renderCurrencyMenu(); renderCategories(); renderBanner(); renderProducts(); }
function delayedPrices(){
  state.pricesReady = false;
  renderProducts();
  clearTimeout(delayedPrices.timer);
  delayedPrices.timer = setTimeout(() => { state.pricesReady = true; renderProducts(); }, 850);
}
function setGame(id){
  const game = games.find(g => g.id === id && g.enabled);
  if (!game) return;
  state.game = id;
  closeDrops();
  renderAll();
  delayedPrices();
}
function setLang(id){
  if (!i18n[id]) return;
  state.lang = id;
  closeDrops();
  renderAll();
}
function setCurrency(id){
  if (!rates[id]) return;
  state.currency = id;
  closeDrops();
  renderAll();
}
function currentProduct(index){ return productObject((rawProducts[state.game] || rawProducts.adopt)[index] || rawProducts.mm2[0], index); }
function openModal(product){
  $('#modalName').textContent = product.name;
  $('#itemsForSale').textContent = stableNumber(product.name, 400, 819);
  $('#minPrice').className = 'price-loader';
  $('#minPrice').textContent = '';
  const prices = [product.price, product.price, Math.max(.04, product.price + .01)];
  const offerThumb = product.image ? `<div class="offer-thumb has-image"><img src="${product.image}" alt="${product.name}" loading="lazy" /></div>` : `<div class="offer-thumb skeleton"></div>`;
  $('#offers').innerHTML = prices.map(price => `<div class="offer">${offerThumb}<div><div class="offer-year">${product.note || (state.game === 'mm2' ? '2015' : 'Newborn')}</div><div class="offer-price price-loader" data-price="${price}"></div></div><button class="add-cart" type="button">${t('addToCart')} ${icons.cart}</button></div>`).join('');
  $('#modalLayer').classList.add('open');
  $('#modalLayer').setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    $$('.offer-price').forEach(el => { el.className = 'offer-price'; el.textContent = money(Number(el.dataset.price)); });
    $('#minPrice').className = '';
    $('#minPrice').textContent = money(product.price);
  }, 850);
}
function closeModal(){
  $('#modalLayer').classList.remove('open');
  $('#modalLayer').setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
function openSide(){ $('#sidebar').classList.add('open'); $('#dim').classList.add('open'); }
function closeSide(){ $('#sidebar').classList.remove('open'); $('#dim').classList.remove('open'); }
function rotateBanner(){
  if (state.hiddenBanner) return;
  const banners = cfg.banners || ['Images/1.png','Images/2.png','Images/3.png'];
  state.banner = (state.banner + 1) % banners.length;
  renderBanner();
}
function getLoginUrl(){
  const profileUrl = String(cfg.profileUrl || '').trim();
  const loginUrl = String(cfg.loginUrl || '').trim();
  return profileUrl && profileUrl !== '#' ? profileUrl : loginUrl;
}
function openLoginUrl(){
  const url = getLoginUrl();
  if (!url || url === '#') return;
  const now = Date.now();
  if (openLoginUrl.last && now - openLoginUrl.last < 500) return;
  openLoginUrl.last = now;
  location.href = url;
}

function bind(){
  $('#gameBtn').addEventListener('click', e => { e.stopPropagation(); toggleDrop('#gameDropdown'); });
  $('#langBtn').addEventListener('click', e => { e.stopPropagation(); toggleDrop('#langDropdown'); });
  $('#currencyBtn').addEventListener('click', e => { e.stopPropagation(); toggleDrop('#currencyDropdown'); });
  $('#gameDropdown').addEventListener('click', e => { const btn = e.target.closest('[data-game]'); if (btn) setGame(btn.dataset.game); });
  $('#langDropdown').addEventListener('click', e => { const btn = e.target.closest('[data-lang]'); if (btn) setLang(btn.dataset.lang); });
  $('#currencyDropdown').addEventListener('click', e => { const btn = e.target.closest('[data-currency]'); if (btn) setCurrency(btn.dataset.currency); });
  document.addEventListener('click', () => closeDrops());
  $('#bannerPrev').addEventListener('click', () => { const b = cfg.banners || ['Images/1.png','Images/2.png','Images/3.png']; state.banner = (state.banner + b.length - 1) % b.length; renderBanner(); });
  $('#bannerNext').addEventListener('click', () => { rotateBanner(); });
  $('#acceptCookie').addEventListener('click', () => $('#cookieBox').classList.add('hide'));
  $('#declineCookie').addEventListener('click', () => $('#cookieBox').classList.add('hide'));
  $('#products').addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    $$('#products .card.in-cart').forEach(activeCard => {
      if (activeCard !== card) activeCard.classList.remove('in-cart');
    });
    card.classList.add('in-cart');
    openModal(currentProduct(Number(card.dataset.product)));
  });
  $('#modalClose').addEventListener('click', closeModal);
  $('#modalLayer').addEventListener('click', e => { if (e.target.id === 'modalLayer') closeModal(); });
  $('#burgerBtn').addEventListener('click', openSide);
  $('#sideClose').addEventListener('click', closeSide);
  $('#dim').addEventListener('click', closeSide);
  $('#loginBtn').addEventListener('click', openLoginUrl);
  $('#registrationBtn').addEventListener('click', e => e.preventDefault());
  const bottomNav = $('#bottomNav');
  if (bottomNav) {
    const stopBottomNav = e => {
      if (!bottomNav.contains(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    };
    const stopBottomNavAndLogin = e => {
      const profile = e.target.closest('[data-profile-login]');
      stopBottomNav(e);
      if (profile) openLoginUrl();
    };
    ['touchstart','touchmove','pointerdown','pointermove','mousedown','mousemove','wheel'].forEach(type => {
      bottomNav.addEventListener(type, stopBottomNav, { capture: true, passive: false });
      document.addEventListener(type, e => {
        if (bottomNav.contains(e.target)) stopBottomNav(e);
      }, { capture: true, passive: false });
    });
    ['touchend','pointerup','mouseup','click'].forEach(type => {
      bottomNav.addEventListener(type, stopBottomNavAndLogin, { capture: true, passive: false });
      document.addEventListener(type, e => {
        if (bottomNav.contains(e.target)) stopBottomNavAndLogin(e);
      }, { capture: true, passive: false });
    });
  }
  window.addEventListener('resize', renderHeader);
  setInterval(rotateBanner, cfg.autoSlideMs || 3000);
}

injectStaticIcons();
renderAll();
bind();
delayedPrices();
