/* =============================================
   Aishwarya Kirana & General Store — JS
   ============================================= */

// ---------- Navbar Scroll Effect ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ---------- Hamburger Menu ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ---------- Active Nav Link on Scroll ----------
function updateActiveNav() {
  const sections = ['home', 'about', 'products', 'services', 'reviews', 'contact'];
  const scrollPos = window.scrollY + 100;

  sections.forEach(id => {
    const el = document.getElementById(id);
    const navEl = document.getElementById('nav-' + id);
    if (!el || !navEl) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      navEl.classList.add('active');
    }
  });
}

// ---------- Intersection Observer – Animate on Scroll ----------
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply fade-up animation to cards and sections
document.querySelectorAll(
  '.info-card, .product-card, .service-card, .review-card, .contact-detail, .about-text-col, .about-image-col, .bar'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
  observer.observe(el);
});

// Observer callback adds visible class
const visibleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      visibleObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.info-card, .product-card, .service-card, .review-card, .contact-detail, .about-text-col, .about-image-col, .bar'
).forEach(el => visibleObserver.observe(el));

// ---------- Bar Chart Animation ----------
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.bar');
      bars.forEach((bar, i) => {
        const targetH = bar.style.getPropertyValue('--h');
        bar.style.setProperty('--h', '0%');
        setTimeout(() => {
          bar.style.setProperty('--h', targetH);
        }, 150 + i * 80);
      });
      chartObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const chartEl = document.getElementById('popular-times-chart');
if (chartEl) chartObserver.observe(chartEl);

// ---------- Rating Bars Animation ----------
const ratingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.rating-bar-fill').forEach((fill, i) => {
        const target = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => { fill.style.width = target; }, 200 + i * 100);
      });
      ratingObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const reviewsSummary = document.querySelector('.reviews-summary');
if (reviewsSummary) ratingObserver.observe(reviewsSummary);

// ---------- Smooth Section Reveal on Section Headers ----------
const sectionHeaderObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      sectionHeaderObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section-header, .times-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  sectionHeaderObserver.observe(el);
});

// =========================================================
// LANGUAGE TOGGLE  — English ↔ Telugu (తెలుగు)
// =========================================================
const TRANSLATIONS = {
  // ---- Navigation ----
  'nav-home':    { en: 'Home',     te: 'హోమ్' },
  'nav-about':   { en: 'About',    te: 'మా గురించి' },
  'nav-products':{ en: 'Products', te: 'ఉత్పత్తులు' },
  'nav-services':{ en: 'Services', te: 'సేవలు' },
  'nav-reviews': { en: 'Reviews',  te: 'సమీక్షలు' },
  'nav-order':   { en: 'Order',    te: 'ఆర్డర్' },
  'nav-contact': { en: 'Contact',  te: 'సంప్రదించండి' },
  'nav-call-btn': { en: 'Call Now', te: 'ఇప్పుడు కాల్ చేయండి', navBtn: true },

  // ---- Hero ----
  'hero-badge-text': { en: 'Open Now · Closes 9:30 PM', te: 'తెరిచి ఉంది · రాత్రి 9:30 కి మూసివేయబడుతుంది' },
  'hero-sub-text':   { en: 'Your trusted neighborhood store in Annanagar, Pocharam.<br />Everything you need, every day — right at your doorstep.',
                       te: 'అన్నానగర్, పోచారంలో మీ విశ్వసనీయ పరిసర దుకాణం.<br/>మీకు అవసరమైనది ప్రతిరోజూ — మీ ఇంటి వాకిట్లో.' },
  'rating-count':    { en: '(6 Reviews)', te: '(6 సమీక్షలు)' },
  'hero-call-btn':   { en: 'Call Us',       te: 'కాల్ చేయండి' },
  'hero-whatsapp-btn':{ en: 'WhatsApp',     te: 'వాట్సాప్' },
  'hero-directions-btn':{ en: 'Get Directions', te: 'మార్గం చూపించండి' },

  // ---- Info Strip ----
  'info-hours-label': { en: 'Store Hours',                 te: 'దుకాణం సమయం' },
  'info-hours-value': { en: 'Open · Closes 9:30 PM',      te: 'తెరిచి ఉంది · రాత్రి 9:30 వరకు' },
  'info-phone-label': { en: 'Phone',                       te: 'ఫోన్' },
  'info-location-label':{ en: 'Location',                  te: 'స్థానం' },
  'info-location-value':{ en: 'Annanagar, Pocharam, Secunderabad', te: 'అన్నానగర్, పోచారం, సికింద్రాబాద్' },
  'info-rating-label':  { en: 'Rating',                    te: 'రేటింగ్' },

  // ---- About ----
  'about-eyebrow':  { en: 'About Us',                te: 'మా గురించి' },
  'about-title-1':  { en: 'Your Trusted',            te: 'మీ విశ్వసనీయ' },
  'about-title-2':  { en: 'Neighborhood Store',      te: 'పరిసర దుకాణం' },
  'about-desc-1':   { en: 'Aishwarya Kirana and General Store has been the heart of Annanagar Colony for years, serving families in Pocharam and Secunderabad with warmth, reliability, and a wide range of daily essentials.',
                      te: 'అయిశ్వర్య కిరాణా అండ్ జనరల్ స్టోర్ సంవత్సరాలుగా అన్నానగర్ కాలనీకి గుండె వంటిది. పోచారం మరియు సికింద్రాబాద్‌లోని కుటుంబాలకు ప్రేమతో, విశ్వసనీయంగా రోజువారీ అవసరాలు అందిస్తోంది.' },
  'about-desc-2':   { en: 'From fresh groceries and household supplies to special services like LPG gas filling and Xerox — we\'ve got everything your family needs, all under one roof.',
                      te: 'తాజా కిరాణా సరుకుల నుండి LPG గ్యాస్ నింపడం, జెరాక్స్ వరకు — మీ కుటుంబానికి అవసరమైన అన్నీ ఒకే చోట అందిస్తున్నాం.' },
  'highlight-1': { en: 'Wide selection of daily essentials',    te: 'రోజువారీ అవసరాల విస్తృత ఎంపిక' },
  'highlight-2': { en: 'Friendly and helpful staff',            te: 'స్నేహపూర్వక మరియు సహాయకారి సిబ్బంది' },
  'highlight-3': { en: 'LPG Gas Filling & Xerox services',     te: 'LPG గ్యాస్ & జెరాక్స్ సౌకర్యాలు' },
  'highlight-4': { en: 'Open 7 days a week till 9:30 PM',      te: 'వారానికి 7 రోజులు రాత్రి 9:30 వరకు తెరిచి ఉంటుంది' },
  'badge-label-text': { en: 'Years\nServing', te: 'సంవత్సరాలు\nసేవలో' },

  // ---- Products ----
  'prod-eyebrow':    { en: 'What We Offer',   te: 'మేము అందించేది' },
  'prod-title':      { en: 'Our Products',    te: 'మా ఉత్పత్తులు', html: true,
    enHTML: 'Our <span class="text-gradient">Products</span>',
    teHTML: 'మా <span class="text-gradient">ఉత్పత్తులు</span>' },
  'prod-sub':        { en: 'We stock everything your household needs — fresh, quality products at fair prices.',
                       te: 'మీ ఇంటికి అవసరమైన ప్రతిదీ మా దగ్గర ఉంది — తాజా, నాణ్యమైన ఉత్పత్తులు న్యాయమైన ధరలకు.' },
  'product-groceries-title': { en: 'Grains & Pulses',          te: 'ధాన్యాలు & పప్పులు' },
  'product-groceries-desc':  { en: 'Rice, wheat, dal, flour, and all cooking staples in bulk and packaged sizes.', te: 'అన్నం, గోధుమ, పప్పు, పిండి మరియు అన్ని వంట వస్తువులు బల్క్ మరియు ప్యాకేజ్ సైజ్‌లో.' },
  'product-spices-title':    { en: 'Spices & Masalas',         te: 'మసాలాలు & మిక్స్చర్లు' },
  'product-spices-desc':     { en: 'Fresh and aromatic Indian spices, masala blends, salt, turmeric, and more.', te: 'తాజా సువాసన గల భారతీయ మసాలాలు, ఉప్పు, పసుపు మరియు మరిన్ని.' },
  'product-oils-title':      { en: 'Oils & Ghee',              te: 'నూనెలు & నెయ్యి' },
  'product-oils-desc':       { en: 'Cooking oils, refined oils, sunflower oil, groundnut oil, and desi ghee.', te: 'వంట నూనెలు, పొద్దుతిరుగుడు, వేరుశెనగ నూనె మరియు దేశీ నెయ్యి.' },
  'product-snacks-title':    { en: 'Snacks & Biscuits',        te: 'స్నాక్స్ & బిస్కెట్లు' },
  'product-snacks-desc':     { en: 'Popular biscuit brands, namkeen, chips, and snacks for all occasions.', te: 'ప్రముఖ బిస్కెట్ బ్రాండ్లు, నమ్కీన్, చిప్స్ మరియు అన్ని సందర్భాలకు స్నాక్స్.' },
  'product-beverages-title': { en: 'Beverages & Tea',          te: 'పానీయాలు & టీ' },
  'product-beverages-desc':  { en: 'Tea, coffee, health drinks, cold drinks, juices, and energy drinks.', te: 'టీ, కాఫీ, హెల్త్ డ్రింక్స్, కోల్డ్ డ్రింక్స్, జ్యూసులు మరియు ఎనర్జీ డ్రింక్స్.' },
  'product-household-title': { en: 'Household & Personal Care', te: 'గృహావసరాలు & వ్యక్తిగత సంరక్షణ' },
  'product-household-desc':  { en: 'Soaps, shampoos, detergents, cleaning supplies, and personal hygiene products.', te: 'సోప్‌లు, షాంపూలు, డిటర్జెంట్లు, క్లీనింగ్ సరుకులు మరియు వ్యక్తిగత పరిశుభ్రత ఉత్పత్తులు.' },
  'product-dairy-title':     { en: 'Dairy Products',           te: 'పాల ఉత్పత్తులు' },
  'product-dairy-desc':      { en: 'Milk packets, curd, paneer, butter, and other daily dairy essentials.', te: 'పాల ప్యాకెట్లు, పెరుగు, పనీర్, వెన్న మరియు ఇతర పాల ఉత్పత్తులు.' },
  'product-more-title':      { en: 'And Much More',            te: 'మరిన్ని వస్తువులు' },
  'product-more-desc':       { en: 'Stationery, candles, matchboxes, medicines, and all home essentials. If you need it, we have it!', te: 'స్టేషనరీ, కొవ్వొత్తులు, అగ్గిపెట్టెలు, మందులు మరియు అన్ని ఇంటి అవసరాలు. మీకు కావాల్సిందేదైనా మా దగ్గర ఉంటుంది!' },

  // ---- Services ----
  'svc-eyebrow':   { en: 'Extra Services',    te: 'అదనపు సేవలు' },
  'svc-title':     { en: 'More Than Just Groceries', te: 'కేవలం కిరాణా కంటే మరిన్ని', html: true,
    enHTML: 'More Than Just <span class="text-gradient">Groceries</span>',
    teHTML: 'కేవలం కిరాణా కంటే <span class="text-gradient">మరిన్ని</span>' },
  'svc-sub':       { en: 'We go beyond a typical kirana store with special services for your convenience.', te: 'మీ సౌకర్యం కోసం మేము సాధారణ కిరాణా కంటే మిన్నగా సేవలు అందిస్తున్నాం.' },
  'service-gas-title':   { en: 'LPG Gas Filling',    te: 'LPG గ్యాస్ నింపడం' },
  'service-gas-desc':    { en: 'Convenient LPG gas cylinder filling service available right at our store. No need to travel far — we\'ve got your cooking fuel covered.', te: 'మా దుకాణంలోనే LPG గ్యాస్ సిలిండర్ నింపే సౌకర్యం అందుబాటులో ఉంది. దూరంగా ప్రయాణించాల్సిన అవసరం లేదు.' },
  'service-xerox-title': { en: 'Xerox / Photocopy',  te: 'జెరాక్స్ / ఫోటోకాపీ' },
  'service-xerox-desc':  { en: 'Get your documents photocopied quickly and affordably right in your neighborhood. No more traveling to a dedicated print shop!', te: 'మీ పత్రాలను త్వరగా మరియు తక్కువ ధరకు మీ పరిసరాల్లోనే ఫోటోకాపీ చేయించుకోండి!' },
  'service-home-title':  { en: 'Home Essentials',    te: 'ఇంటి అవసరాలు' },
  'service-home-desc':   { en: 'Everything your home needs, from cleaning supplies to personal care products — all available in one convenient location.', te: 'క్లీనింగ్ సరుకుల నుండి వ్యక్తిగత సంరక్షణ ఉత్పత్తుల వరకు — అన్నీ ఒకే చోట.' },

  // ---- Popular Times ----
  'times-eyebrow': { en: 'Plan Your Visit',      te: 'మీ సందర్శన ప్లాన్ చేయండి' },
  'times-title':   { en: 'Popular Times',        te: 'ప్రముఖ సమయాలు', html: true,
    enHTML: 'Popular <span class="text-gradient">Times</span>',
    teHTML: 'ప్రముఖ <span class="text-gradient">సమయాలు</span>' },
  'times-desc':    { en: 'Saturdays tend to be the busiest. Visit us early in the morning or late evening for the best experience.', te: 'శనివారాలు అత్యంత రద్దీగా ఉంటుంది. ఉత్తమ అనుభవం కోసం తెల్లవారుఝామున లేదా సాయంత్రం మాకు వినండి.' },

  // ---- Reviews ----
  'reviews-eyebrow':  { en: 'Customer Voices',  te: 'కస్టమర్ అభిప్రాయాలు' },
  'reviews-title':    { en: 'What People Say',  te: 'జనులు ఏమి చెప్తారు', html: true,
    enHTML: 'What People <span class="text-gradient">Say</span>',
    teHTML: 'జనులు ఏమి <span class="text-gradient">చెప్తారు</span>' },
  'write-review-btn': { en: 'Write a Review on Google', te: 'గూగుల్‌లో సమీక్ష రాయండి' },
  'rating-label-sm-text': { en: 'Based on 6 Google reviews', te: '6 గూగుల్ సమీక్షల ఆధారంగా' },

  // ---- Order ----
  'order-eyebrow':  { en: 'Place Your Order',   te: 'మీ ఆర్డర్ చేయండి' },
  'order-title':    { en: 'Order Online',       te: 'ఆన్‌లైన్ ఆర్డర్', html: true,
    enHTML: 'Order <span class="text-gradient">Online</span>',
    teHTML: 'ఆన్‌లైన్ <span class="text-gradient">ఆర్డర్</span>' },
  'order-sub':      { en: 'Fill out the form below and your order will be sent directly to us on WhatsApp. We\'ll confirm and get it ready for you!',
                      te: 'దిగువ ఫారం నింపండి, మీ ఆర్డర్ నేరుగా వాట్సాప్‌లో మాకు వస్తుంది. మేము నిర్ధారించి సిద్ధం చేస్తాం!' },
  'order-submit-btn': { en: 'Send Order on WhatsApp', te: 'వాట్సాప్‌లో ఆర్డర్ పంపండి' },

  // ---- Contact ----
  'contact-eyebrow':    { en: 'Find Us',           te: 'మాను కనుగొనండి' },
  'contact-title':      { en: 'Visit Our Store',   te: 'మా దుకాణాన్ని సందర్శించండి', html: true,
    enHTML: 'Visit <span class="text-gradient">Our Store</span>',
    teHTML: 'మా <span class="text-gradient">దుకాణాన్ని సందర్శించండి</span>' },
  'contact-whatsapp-btn': { en: 'Chat on WhatsApp',    te: 'వాట్సాప్‌లో చాట్ చేయండి' },
  'directions-btn':       { en: 'Open in Google Maps', te: 'గూగుల్ మ్యాప్స్‌లో తెరవండి' },
  'contact-address-label':{ en: 'Address',             te: 'చిరునామా' },
  'contact-phone-label':  { en: 'Phone',               te: 'ఫోన్' },
  'contact-hours-label':  { en: 'Store Hours',         te: 'దుకాణం సమయాలు' },
  'contact-maps-label':   { en: 'Google Maps Code',    te: 'గూగుల్ మ్యాప్స్ కోడ్' },
};

// Elements targeted by their p/span/h selector inside an ID — [parentId, childSelector, key]
const CHILD_TARGETS = [
  ['info-hours',    '.info-label', 'info-hours-label'],
  ['info-hours',    '.info-value', 'info-hours-value'],
  ['info-phone',    '.info-label', 'info-phone-label'],
  ['info-location', '.info-label', 'info-location-label'],
  ['info-location', '.info-value', 'info-location-value'],
  ['info-rating',   '.info-label', 'info-rating-label'],
  ['contact-address', '.contact-detail-label', 'contact-address-label'],
  ['contact-phone',   '.contact-detail-label', 'contact-phone-label'],
  ['contact-hours',   '.contact-detail-label', 'contact-hours-label'],
  ['contact-maps',    '.contact-detail-label', 'contact-maps-label'],
];

// Section headers: [sectionId, eyebrowKey, titleKey, subKey, titleType]
const SECTION_HEADERS = [
  { section: 'about',    eyebrow: 'about-eyebrow',  titleId: null, subId: null },
  { section: 'products', eyebrow: 'prod-eyebrow',   titleDataKey: 'prod-title',  subKey: 'prod-sub' },
  { section: 'services', eyebrow: 'svc-eyebrow',    titleDataKey: 'svc-title',   subKey: 'svc-sub' },
  { section: 'reviews',  eyebrow: 'reviews-eyebrow' },
  { section: 'order',    eyebrow: 'order-eyebrow' },
  { section: 'contact',  eyebrow: 'contact-eyebrow' },
];

let currentLang = localStorage.getItem('aishwarya-lang') || 'en';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('aishwarya-lang', lang);

  // Toggle body class for Telugu font
  document.body.classList.toggle('te-lang', lang === 'te');

  // Update toggle button
  const langLabel = document.getElementById('langLabel');
  const langOther = document.getElementById('langOther');
  if (langLabel && langOther) {
    if (lang === 'te') {
      langLabel.textContent = 'తె';
      langOther.textContent = 'EN';
    } else {
      langLabel.textContent = 'EN';
      langOther.textContent = 'తె';
    }
  }

  // Apply all element-by-ID translations
  Object.entries(TRANSLATIONS).forEach(([id, t]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (t.navBtn) {
      // Only update the text span inside the button (preserve the SVG icon)
      const span = el.querySelector('span[data-i18n]') || el.querySelector('span');
      if (span) span.textContent = lang === 'te' ? t.te : t.en;
    } else if (t.html) {
      el.innerHTML = lang === 'te' ? t.teHTML : t.enHTML;
    } else {
      el.textContent = lang === 'te' ? t.te : t.en;
    }
  });

  // Apply child-selector targets
  CHILD_TARGETS.forEach(([parentId, selector, key]) => {
    const parent = document.getElementById(parentId);
    if (!parent) return;
    const el = parent.querySelector(selector);
    if (!el || !TRANSLATIONS[key]) return;
    el.textContent = lang === 'te' ? TRANSLATIONS[key].te : TRANSLATIONS[key].en;
  });

  // Hero badge (it has a dot + text node)
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    const dot = heroBadge.querySelector('.badge-dot');
    const t = TRANSLATIONS['hero-badge-text'];
    heroBadge.innerHTML = '';
    if (dot) heroBadge.appendChild(dot);
    heroBadge.append(` ${lang === 'te' ? t.te : t.en}`);
  }

  // Hero subtitle (has <br/>)
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) heroSub.innerHTML = lang === 'te' ? TRANSLATIONS['hero-sub-text'].te : TRANSLATIONS['hero-sub-text'].en;

  // Rating count span
  const ratingCount = document.querySelector('.rating-count');
  if (ratingCount) ratingCount.textContent = lang === 'te' ? TRANSLATIONS['rating-count'].te : TRANSLATIONS['rating-count'].en;

  // Rating label sm
  const ratingLabelSm = document.querySelector('.rating-label-sm');
  if (ratingLabelSm) ratingLabelSm.textContent = lang === 'te' ? TRANSLATIONS['rating-label-sm-text'].te : TRANSLATIONS['rating-label-sm-text'].en;

  // About section headers (children of about-text-col)
  const aboutEyebrow = document.querySelector('#about .section-eyebrow');
  if (aboutEyebrow) aboutEyebrow.textContent = lang === 'te' ? TRANSLATIONS['about-eyebrow'].te : TRANSLATIONS['about-eyebrow'].en;
  const aboutTitle = document.querySelector('#about .section-title');
  if (aboutTitle) aboutTitle.innerHTML = lang === 'te'
    ? `${TRANSLATIONS['about-title-1'].te}<br/><span class="text-gradient">${TRANSLATIONS['about-title-2'].te}</span>`
    : `${TRANSLATIONS['about-title-1'].en}<br/><span class="text-gradient">${TRANSLATIONS['about-title-2'].en}</span>`;
  const aboutDescs = document.querySelectorAll('#about .about-desc');
  if (aboutDescs[0]) aboutDescs[0].textContent = lang === 'te' ? TRANSLATIONS['about-desc-1'].te : TRANSLATIONS['about-desc-1'].en;
  if (aboutDescs[1]) aboutDescs[1].textContent = lang === 'te' ? TRANSLATIONS['about-desc-2'].te : TRANSLATIONS['about-desc-2'].en;

  // About highlights
  const highlights = document.querySelectorAll('#about .highlight-item span');
  ['highlight-1','highlight-2','highlight-3','highlight-4'].forEach((key, i) => {
    if (highlights[i]) highlights[i].textContent = lang === 'te' ? TRANSLATIONS[key].te : TRANSLATIONS[key].en;
  });

  // Badge label (years serving)
  const badgeLabelEl = document.querySelector('.badge-label');
  if (badgeLabelEl) badgeLabelEl.innerHTML = lang === 'te' ? TRANSLATIONS['badge-label-text'].te.replace('\n','<br/>') : TRANSLATIONS['badge-label-text'].en.replace('\n','<br/>');

  // Products section header
  const prodEyebrow = document.querySelector('#products .section-eyebrow');
  if (prodEyebrow) prodEyebrow.textContent = lang === 'te' ? TRANSLATIONS['prod-eyebrow'].te : TRANSLATIONS['prod-eyebrow'].en;
  const prodTitle = document.querySelector('#products .section-title');
  if (prodTitle) prodTitle.innerHTML = lang === 'te' ? TRANSLATIONS['prod-title'].teHTML : TRANSLATIONS['prod-title'].enHTML;
  const prodSub = document.querySelector('#products .section-sub');
  if (prodSub) prodSub.textContent = lang === 'te' ? TRANSLATIONS['prod-sub'].te : TRANSLATIONS['prod-sub'].en;

  // Product cards
  const productMap = [
    ['product-groceries', 'product-groceries-title', 'product-groceries-desc'],
    ['product-spices',    'product-spices-title',    'product-spices-desc'],
    ['product-oils',      'product-oils-title',      'product-oils-desc'],
    ['product-snacks',    'product-snacks-title',    'product-snacks-desc'],
    ['product-beverages', 'product-beverages-title', 'product-beverages-desc'],
    ['product-household', 'product-household-title', 'product-household-desc'],
    ['product-dairy',     'product-dairy-title',     'product-dairy-desc'],
    ['product-more',      'product-more-title',      'product-more-desc'],
  ];
  productMap.forEach(([cardId, titleKey, descKey]) => {
    const card = document.getElementById(cardId);
    if (!card) return;
    const h3 = card.querySelector('h3');
    const p  = card.querySelector('p');
    if (h3) h3.textContent = lang === 'te' ? TRANSLATIONS[titleKey].te : TRANSLATIONS[titleKey].en;
    if (p)  p.textContent  = lang === 'te' ? TRANSLATIONS[descKey].te  : TRANSLATIONS[descKey].en;
  });

  // Services section header
  const svcEyebrow = document.querySelector('#services .section-eyebrow');
  if (svcEyebrow) svcEyebrow.textContent = lang === 'te' ? TRANSLATIONS['svc-eyebrow'].te : TRANSLATIONS['svc-eyebrow'].en;
  const svcTitle = document.querySelector('#services .section-title');
  if (svcTitle) svcTitle.innerHTML = lang === 'te' ? TRANSLATIONS['svc-title'].teHTML : TRANSLATIONS['svc-title'].enHTML;
  const svcSub = document.querySelector('#services .section-sub');
  if (svcSub) svcSub.textContent = lang === 'te' ? TRANSLATIONS['svc-sub'].te : TRANSLATIONS['svc-sub'].en;

  // Service cards
  [
    ['service-gas',   'service-gas-title',   'service-gas-desc'],
    ['service-xerox', 'service-xerox-title', 'service-xerox-desc'],
    ['service-home',  'service-home-title',  'service-home-desc'],
  ].forEach(([cardId, titleKey, descKey]) => {
    const card = document.getElementById(cardId);
    if (!card) return;
    const h3 = card.querySelector('h3');
    const p  = card.querySelector('p');
    if (h3) h3.textContent = lang === 'te' ? TRANSLATIONS[titleKey].te : TRANSLATIONS[titleKey].en;
    if (p)  p.textContent  = lang === 'te' ? TRANSLATIONS[descKey].te  : TRANSLATIONS[descKey].en;
  });

  // Popular Times
  const timesEyebrow = document.querySelector('.times-header .section-eyebrow');
  if (timesEyebrow) timesEyebrow.textContent = lang === 'te' ? TRANSLATIONS['times-eyebrow'].te : TRANSLATIONS['times-eyebrow'].en;
  const timesTitle = document.querySelector('.times-header .section-title');
  if (timesTitle) timesTitle.innerHTML = lang === 'te' ? TRANSLATIONS['times-title'].teHTML : TRANSLATIONS['times-title'].enHTML;
  const timesDesc = document.querySelector('.times-header p:last-child');
  if (timesDesc) timesDesc.textContent = lang === 'te' ? TRANSLATIONS['times-desc'].te : TRANSLATIONS['times-desc'].en;

  // Reviews
  const revEyebrow = document.querySelector('#reviews .section-eyebrow');
  if (revEyebrow) revEyebrow.textContent = lang === 'te' ? TRANSLATIONS['reviews-eyebrow'].te : TRANSLATIONS['reviews-eyebrow'].en;
  const revTitle = document.querySelector('#reviews .section-title');
  if (revTitle) revTitle.innerHTML = lang === 'te' ? TRANSLATIONS['reviews-title'].teHTML : TRANSLATIONS['reviews-title'].enHTML;

  // Order section
  const orderEyebrow = document.querySelector('#order .section-eyebrow');
  if (orderEyebrow) orderEyebrow.textContent = lang === 'te' ? TRANSLATIONS['order-eyebrow'].te : TRANSLATIONS['order-eyebrow'].en;
  const orderTitle = document.querySelector('#order .section-title');
  if (orderTitle) orderTitle.innerHTML = lang === 'te' ? TRANSLATIONS['order-title'].teHTML : TRANSLATIONS['order-title'].enHTML;
  const orderSub = document.querySelector('#order .section-sub');
  if (orderSub) orderSub.textContent = lang === 'te' ? TRANSLATIONS['order-sub'].te : TRANSLATIONS['order-sub'].en;

  // Contact
  const contactEyebrow = document.querySelector('#contact .section-eyebrow');
  if (contactEyebrow) contactEyebrow.textContent = lang === 'te' ? TRANSLATIONS['contact-eyebrow'].te : TRANSLATIONS['contact-eyebrow'].en;
  const contactTitle = document.querySelector('#contact .section-title');
  if (contactTitle) contactTitle.innerHTML = lang === 'te' ? TRANSLATIONS['contact-title'].teHTML : TRANSLATIONS['contact-title'].enHTML;
}

// Toggle button click
document.getElementById('langToggle').addEventListener('click', () => {
  const newLang = currentLang === 'en' ? 'te' : 'en';
  // Animate toggle
  const toggle = document.getElementById('langToggle');
  toggle.style.transform = 'scale(0.92)';
  setTimeout(() => { toggle.style.transform = ''; }, 200);
  applyLanguage(newLang);
});

// Apply on load (respects saved preference)
applyLanguage(currentLang);


function animateCounter(el, target, suffix) {
  let current = 0;
  const step = Math.ceil(target / 30);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(interval);
  }, 45);
}

const badgeNumEl = document.querySelector('.badge-num');
if (badgeNumEl) {
  const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(badgeNumEl, 15, '+');
        badgeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  badgeObserver.observe(badgeNumEl);
  badgeNumEl.textContent = '0+';
}

// ---------- Hamburger Icon Animation ----------
hamburger.addEventListener('click', () => {
  const spans = hamburger.querySelectorAll('span');
  if (hamburger.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// ---------- Floating Buttons Visibility ----------
const floatButtons = document.getElementById('float-buttons');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    floatButtons.classList.add('visible');
  } else {
    floatButtons.classList.remove('visible');
  }
});

// ---------- Order Form: WhatsApp Submission ----------
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  function showError(fieldId, errId, show) {
    const field = document.getElementById(fieldId);
    const err   = document.getElementById(errId);
    if (show) { field.classList.add('error');    if (err) err.classList.add('show');    }
    else       { field.classList.remove('error'); if (err) err.classList.remove('show'); }
  }

  ['order-name', 'order-phone', 'order-address', 'order-items'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => {
      el.classList.remove('error');
      const errEl = document.getElementById('err-' + id.replace('order-', ''));
      if (errEl) errEl.classList.remove('show');
    });
  });

  orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name     = document.getElementById('order-name').value.trim();
    const phone    = document.getElementById('order-phone').value.trim();
    const address  = document.getElementById('order-address').value.trim();
    const items    = document.getElementById('order-items').value.trim();
    const category = document.getElementById('order-category').value;
    const time     = document.getElementById('order-time').value;
    const notes    = document.getElementById('order-notes').value.trim();

    let valid = true;
    if (!name)    { showError('order-name',    'err-name',    true); valid = false; } else showError('order-name',    'err-name',    false);
    if (!phone || phone.replace(/\D/g,'').length < 10) { showError('order-phone', 'err-phone', true); valid = false; } else showError('order-phone', 'err-phone', false);
    if (!address) { showError('order-address', 'err-address', true); valid = false; } else showError('order-address', 'err-address', false);
    if (!items)   { showError('order-items',   'err-items',   true); valid = false; } else showError('order-items',   'err-items',   false);

    if (!valid) {
      const firstErr = orderForm.querySelector('.error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Build WhatsApp message
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    let msg = `🛒 *New Order — Aishwarya Kirana Store*\n\n`;
    msg += `👤 *Name:* ${name}\n`;
    msg += `📞 *Phone:* ${phone}\n`;
    msg += `📍 *Address:* ${address}\n`;
    if (category) msg += `🏷️ *Category:* ${category}\n`;
    if (time)     msg += `⏰ *Preferred Time:* ${time}\n`;
    msg += `\n📦 *Order Items:*\n${items}\n`;
    if (notes)    msg += `\n📝 *Special Instructions:*\n${notes}\n`;
    msg += `\n🕐 Ordered at: ${now}`;

    const waUrl = `https://wa.me/919866520727?text=${encodeURIComponent(msg)}`;

    const btn = document.getElementById('order-submit-btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="animation:orderSpin 0.8s linear infinite"><path d="M21 12a9 9 0 11-18 0" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>&nbsp; Opening WhatsApp...`;
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      window.open(waUrl, '_blank');
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.pointerEvents = 'auto';
        orderForm.reset();
      }, 2500);
    }, 400);
  });
}

// Inject spinner keyframe
const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes orderSpin { to { transform: rotate(360deg); } }';
document.head.appendChild(spinStyle);



console.log('%cAishwarya Kirana & General Store 🏪', 'font-size:18px;color:#FF6B35;font-weight:bold;');
console.log('%cPocharam, Secunderabad, Telangana | 📞 098665 20727', 'color:#A0A0C0;');
