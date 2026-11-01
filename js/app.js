/* ════════════════════════════════════════════════════════════
   ZAZIWE MEDICAL LABORATORIES — app.js
   « La fiche d'analyse » — liste tarifaire, tampon, coda.
   ════════════════════════════════════════════════════════════ */

// Signale au CSS que le JS tourne (les états cachés des reveals
// n'existent que sous html.js — sans JS, tout reste visible).
document.documentElement.classList.add('js');

/* ===== CONFIG — À PERSONNALISER AVANT MISE EN LIGNE ===== */
const CONFIG = {
  // URL du site, utilisée par le QR code et le bouton de partage.
  // À remplacer le jour où le labo prend un nom de domaine.
  siteUrl: 'https://zaziwemedlab.com/',
  // Coordonnées officielles (confirmées par le laboratoire)
  phone: '+251908000077',
  whatsapp: '251908000077',        // wa.me — numéro principal de la société
  telegram: '+251908000077',       // t.me/+<numéro>
  email: 'zaziwemedlab@gmail.com',
  currency: 'ETB',
  // ⚠️ PIN staff par défaut — À CHANGER. (Sécurité côté navigateur uniquement :
  // la vraie authentification arrive avec la base de données, phase suivante.)
  staffPin: '1234',
  // Mode relecture : affiche les notes « ce qui manque » destinées au client.
  // ⚠️ Passer à false avant la mise en ligne publique définitive.
  reviewMode: true
};

/* ===== CATALOGUE — « OUR SERVICES » du flyer officiel du laboratoire =====
   Prix unitaires non communiqués à ce jour → « Ask for price ».
   Le staff peut ajouter les prix depuis le site (mode staff). */
const DEFAULT_TESTS = [
  { id: 'arthritis-collagen-tests', name: 'Arthritis & Collagen Tests', code: '', price: 0, available: true },
  { id: 'body-fluid-analysis', name: 'Body Fluid Analysis', code: '', price: 0, available: true },
  { id: 'cancer-markers', name: 'Cancer Markers', code: '', price: 0, available: true },
  { id: 'cd4', name: 'CD4', code: '', price: 0, available: true },
  { id: 'coagulation', name: 'Coagulation', code: '', price: 0, available: true },
  { id: 'culture', name: 'Culture', code: '', price: 0, available: true },
  { id: 'electrolytes', name: 'Electrolytes', code: '', price: 0, available: true },
  { id: 'fertility-test-for-male-and-female', name: 'Fertility Test for Male and Female', code: '', price: 0, available: true },
  { id: 'glucose-hba1c-insulin', name: 'Glucose, HbA1c, Insulin', code: '', price: 0, available: true },
  { id: 'hepatitis-a-b-c', name: 'Hepatitis A, B, C', code: '', price: 0, available: true },
  { id: 'hepatitis-b-c-viral-load', name: 'Hepatitis B, C Viral Load', code: '', price: 0, available: true },
  { id: 'hiv-hiv-viral-load-cd4', name: 'HIV, HIV Viral Load & CD4', code: '', price: 0, available: true },
  { id: 'hemoparasite', name: 'Hemoparasite', code: '', price: 0, available: true },
  { id: 'hormone-tests', name: 'Hormone Tests', code: '', price: 0, available: true },
  { id: 'iron-study', name: 'Iron Study', code: '', price: 0, available: true },
  { id: 'ogtt', name: 'OGTT', code: '', price: 0, available: true },
  { id: 'lipid-profile', name: 'Lipid Profile', code: '', price: 0, available: true },
  { id: 'liver-renal-function-test', name: 'Liver & Renal Function Test', code: '', price: 0, available: true },
  { id: 'pregnancy-test', name: 'Pregnancy Test', code: '', price: 0, available: true },
  { id: 'semen-analysis', name: 'Semen Analysis', code: '', price: 0, available: true },
  { id: 'uric-acid', name: 'Uric Acid', code: '', price: 0, available: true },
  { id: 'urinalysis-stool', name: 'Urinalysis & Stool', code: '', price: 0, available: true },
  { id: 'vdrl-tpha', name: 'VDRL & TPHA', code: '', price: 0, available: true },
  { id: 'vitamin-b-vitamin-d', name: 'Vitamin B, Vitamin D', code: '', price: 0, available: true },
  { id: 'wet-smear-gram-stains', name: 'Wet Smear & Gram Stains', code: '', price: 0, available: true },
  { id: 'others', name: 'Others', code: '', price: 0, available: true }
];

// Aucune actualité par défaut : le staff publie les siennes depuis le site.
const DEFAULT_UPDATES = [];

/* Équipe — noms et numéros directs communiqués par le laboratoire.
   Chaque membre est joignable par téléphone, WhatsApp et Telegram. */
const STAFF = [
  { name: 'Nardos Mekonnen',  role: 'Laboratory Director',   phone: '+251910990963' },
  { name: 'Tigist Anbese',    role: 'Senior Lab Technician', phone: '+251923602953' },
  { name: 'Betelhem Sisay',   role: 'Patient Coordinator',   phone: '+251978978342' }
];



/* ═══════════════════════════════════════════════════════════
   BILINGUE ENGLISH / አማርኛ
   Les textes statiques portent un attribut data-am dans le HTML.
   Ici : le contenu généré par le JS (catalogue, équipe, statuts,
   messages). Les NOMS D'ANALYSES restent en anglais dans les deux
   langues — c'est la convention des laboratoires éthiopiens, les
   patients les retrouvent tels quels sur leurs résultats.
   ═══════════════════════════════════════════════════════════ */
let LANG = localStorage.getItem('zaziwe_lang') === 'am' ? 'am' : 'en';

const AM = {
  // Catalogue
  'Ask for price': 'ዋጋ ይጠይቁ',
  'Choose': 'ይምረጡ',
  'Book': 'ይያዙ',
  'edit': 'አርትዕ',
  'Available': 'አለ',
  'Unavailable': 'የለም',
  'Choose a test or package…': 'ምርመራ ወይም ጥቅል ይምረጡ…',
  'Tests': 'ምርመራዎች',
  'Packages': 'ጥቅሎች',
  // Équipe
  'Laboratory Director': 'የላብራቶሪ ዳይሬክተር',
  'Senior Lab Technician': 'ከፍተኛ የላብራቶሪ ቴክኒሺያን',
  'Patient Coordinator': 'የታካሚ አስተባባሪ',
  'Call': 'ደውሉ',
  'WhatsApp': 'ዋትስአፕ',
  'Telegram': 'ቴሌግራም',
  // Réservations
  'No booking requests yet.': 'እስካሁን ምንም ጥያቄ የለም።',
  'pending': 'በመጠባበቅ ላይ',
  'confirmed': 'ተረጋግጧል',
  'completed': 'ተጠናቋል',
  'cancelled': 'ተሰርዟል',
  'No updates yet.': 'እስካሁን መረጃ የለም።',
  // Messages
  'Request received — the laboratory will contact you to confirm.': 'ጥያቄዎ ደርሷል — ላብራቶሪው ለማረጋገጥ ያገኝዎታል።',
  'Request saved — confirm it in WhatsApp to notify the lab.': 'ጥያቄዎ ተመዝግቧል — ላብራቶሪውን ለማሳወቅ በዋትስአፕ ያረጋግጡ።',
  'QR code downloaded — ready to print!': 'QR ኮድ ወርዷል — ለማተም ዝግጁ ነው!',
  'Link copied!': 'አገናኙ ተቀድቷል!',
  'Wrong PIN.': 'የተሳሳተ ፒን።',
  'SELECTED': 'የተመረጠ'
};
const t = (s) => LANG === 'am' ? (AM[s] || s) : s;

function applyLang(lang) {
  LANG = lang;
  localStorage.setItem('zaziwe_lang', lang);
  document.documentElement.lang = lang === 'am' ? 'am' : 'en';
  document.body.classList.toggle('lang-am', lang === 'am');

  // Textes statiques
  document.querySelectorAll('[data-am]').forEach((el) => {
    if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    el.innerHTML = lang === 'am' ? el.dataset.am : el.dataset.en;
  });
  // Champs de saisie
  document.querySelectorAll('[data-am-ph]').forEach((el) => {
    if (el.dataset.enPh === undefined) el.dataset.enPh = el.placeholder;
    el.placeholder = lang === 'am' ? el.dataset.amPh : el.dataset.enPh;
  });
  // Le bouton propose toujours l'AUTRE langue
  const btn = $('#langToggle');
  if (btn) { btn.textContent = lang === 'am' ? 'English' : 'አማርኛ'; btn.setAttribute('lang', lang === 'am' ? 'en' : 'am'); }

  // Contenu généré
  renderTariff(); renderBookings(); renderUpdates(); renderStaff();
}

/* ===== HELPERS ===== */
const $ = (sel) => document.querySelector(sel);
const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    // Navigation privée / quota plein : on continue sans persistance
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* no-op */ }
  }
};
const fmtPrice = (p) => p > 0 ? `${CONFIG.currency} ${p.toLocaleString('en-US')}` : t('Ask for price');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function toast(msg, type = '') {
  const el = $('#toast');
  el.textContent = msg;
  el.className = 'toast show ' + type;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), 4000);
}

/* ===== STATE ===== */
let tests = store.get('zaziwe_tests', DEFAULT_TESTS);
let bookings = store.get('zaziwe_bookings', []);
let updates = store.get('zaziwe_updates', DEFAULT_UPDATES);
let editingTestId = null;

/* ===== PRÉLOADER ===== */
function markLoaded() { document.documentElement.classList.add('loaded'); }
window.addEventListener('load', markLoaded);
setTimeout(markLoaded, 2500); // filet de sécurité

/* ===== HEADER / NAV ===== */
window.addEventListener('scroll', () => {
  $('#siteHeader').classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

$('#hamburger').setAttribute('aria-expanded', 'false');
$('#hamburger').addEventListener('click', () => {
  const open = $('#navLinks').classList.toggle('open');
  $('#hamburger').setAttribute('aria-expanded', String(open));
});
$('#navLinks').addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    $('#navLinks').classList.remove('open');
    $('#hamburger').setAttribute('aria-expanded', 'false');
  }
});

const sectionIds = ['home', 'about', 'tests', 'booking', 'contact', 'updates'];
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.nav-links a').forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id && !a.classList.contains('nav-cta'));
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sectionIds.forEach((id) => { const el = document.getElementById(id); if (el) navObserver.observe(el); });

/* ===== REVEALS (hiérarchisés) ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

function bindReveals(root = document) {
  root.querySelectorAll('.rv-title:not(.in), .rv-body:not(.in), .rv-row:not(.in)').forEach((el) => revealObserver.observe(el));
}

/* ===== MARQUEE (duplication pour boucle continue) ===== */
(() => {
  const track = $('#marqueeTrack');
  if (track) track.innerHTML = track.innerHTML + track.innerHTML;
})();

/* ===== CATALOGUE : LISTE TARIFAIRE ===== */
const A = (s) => t(s);   // alias : « t » est déjà le nom du paramètre test
function tariffRowHTML(t, i, inModal) {
  return `
    <div class="tariff-row rv-row" data-id="${t.id}" style="--d:${(i % 8) * 60}ms">
      <span class="name"><span class="state ${t.available ? '' : 'off'}" title="${t.available ? A('Available') : A('Unavailable')}"></span>${esc(t.name)}</span>
      <span class="price">${fmtPrice(t.price)}</span>
      <button class="select-test" data-select="${t.id}" ${t.available ? '' : 'disabled'}>${inModal ? A('Book') : A('Choose')}</button>
      ${inModal ? '' : `<button class="edit-test" data-edit="${t.id}">${A('edit')}</button>`}
    </div>`;
}

function filterTests(filter) {
  const f = filter.trim().toLowerCase();
  return f ? tests.filter((t) => (t.name + ' ' + t.code).toLowerCase().includes(f)) : tests;
}

function renderTariff() {
  const mainList = filterTests($('#catalogueSearch').value || '');
  const modalList = filterTests($('#modalSearch').value || '');
  $('#tariffList').innerHTML = mainList.map((t, i) => tariffRowHTML(t, i, false)).join('');
  $('#tariffEmpty').style.display = mainList.length ? 'none' : 'block';
  $('#modalTestGrid').innerHTML = modalList.map((t, i) => tariffRowHTML(t, i, true)).join('');
  $('#modalEmpty').style.display = modalList.length ? 'none' : 'block';
  bindReveals($('#tariffList'));
  // Dans la modale (déjà visible), pas de reveal différé
  $('#modalTestGrid').querySelectorAll('.rv-row').forEach((el) => el.classList.add('in'));
  renderBookingSelect();
}

function renderBookingSelect() {
  const sel = $('#bkTest');
  const current = sel.value;
  // Les 5 formules officielles, avec leurs prix confirmés par le laboratoire
  const packages = [
    ['Diabetes Care Package', 3400], ['Liver & Kidney Health Package', 4100],
    ['Fertility Assessment Package', 6500], ['HIV Care & Monitoring Package', 6000],
    ['Full Body Check-up Package', 5000]
  ];
  const optTests = tests.filter((x) => x.available)
    .map((x) => `<option value="${esc(x.name)}">${esc(x.name)} — ${fmtPrice(x.price)}</option>`).join('');
  const optPacks = packages
    .map(([p, pr]) => `<option value="${esc(p)}">${esc(t(p))} — ${CONFIG.currency} ${pr.toLocaleString('en-US')}</option>`).join('');
  sel.innerHTML =
    `<option value="" disabled selected>${t('Choose a test or package…')}</option>` +
    `<optgroup label="${t('Tests')}">${optTests}</optgroup>` +
    `<optgroup label="${t('Packages')}">${optPacks}</optgroup>`;
  if (current) sel.value = current;
}

$('#catalogueSearch').addEventListener('input', renderTariff);

document.addEventListener('click', (e) => {
  const selectBtn = e.target.closest('[data-select]');
  if (selectBtn) {
    const t = tests.find((x) => x.id === selectBtn.dataset.select);
    if (!t) return;
    closeTestsModal();
    $('#bkTest').value = t.name;
    const disp = $('#selectedTestDisplay');
    disp.style.display = 'block';
    disp.textContent = `${t('SELECTED')} — ${t.name.toUpperCase()} · ${fmtPrice(t.price).toUpperCase()}`;
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    $('#bkName').focus({ preventScroll: true });
    return;
  }
  const editBtn = e.target.closest('[data-edit]');
  if (editBtn) startEditTest(editBtn.dataset.edit);
});

document.querySelectorAll('[data-package]').forEach((btn) => {
  btn.addEventListener('click', () => {
    $('#bkTest').value = btn.dataset.package;
    const disp = $('#selectedTestDisplay');
    disp.style.display = 'block';
    disp.textContent = `${t('SELECTED')} — ${btn.dataset.package.toUpperCase()}`;
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    $('#bkName').focus({ preventScroll: true });
  });
});

/* ===== MODALE TESTS ===== */
const PAGE_REGIONS = ['header', 'main', 'footer', '#mobileBar'];
let modalTrigger = null;

function openTestsModal(trigger) {
  modalTrigger = trigger || document.activeElement;
  $('#testsModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  PAGE_REGIONS.forEach((sel) => document.querySelector(sel)?.setAttribute('inert', ''));
  $('#modalSearch').value = '';
  renderTariff();
  clearTimeout(openTestsModal._t);
  openTestsModal._t = setTimeout(() => {
    if ($('#testsModal').classList.contains('open')) $('#modalSearch').focus();
  }, 300);
}
function closeTestsModal() {
  if (!$('#testsModal').classList.contains('open')) return;
  $('#testsModal').classList.remove('open');
  document.body.style.overflow = '';
  PAGE_REGIONS.forEach((sel) => document.querySelector(sel)?.removeAttribute('inert'));
  const target = modalTrigger?.offsetParent !== null ? modalTrigger : $('#hamburger');
  if (target?.offsetParent !== null) target.focus({ preventScroll: true });
  modalTrigger = null;
}

$('#navTests').addEventListener('click', (e) => { e.preventDefault(); openTestsModal(e.currentTarget); });
document.querySelectorAll('[data-open-tests]').forEach((el) =>
  el.addEventListener('click', (e) => { e.preventDefault(); openTestsModal(el); }));
$('#testsModalClose').addEventListener('click', closeTestsModal);
$('#testsModal').addEventListener('click', (e) => { if (e.target === $('#testsModal')) closeTestsModal(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeTestsModal(); return; }
  if (e.key !== 'Tab' || !$('#testsModal').classList.contains('open')) return;
  const focusables = [...$('#testsModal').querySelectorAll('button:not(:disabled), input, [href]')]
    .filter((el) => el.offsetParent !== null);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
$('#modalSearch').addEventListener('input', renderTariff);

/* ===== RÉSERVATIONS + LE TAMPON ===== */
function renderBookings() {
  const el = $('#bookingList');
  if (!bookings.length) {
    el.innerHTML = `<p class="booking-empty">${t('No booking requests yet.')}</p>`;
    return;
  }
  el.innerHTML = bookings.slice(-4).reverse().map((b) => `
    <div class="booking-item">
      <div class="info">
        <strong>${esc(b.test)}</strong>
        <span class="detail">${esc(b.name)} · ${esc(b.date)}</span>
      </div>
      <span class="status ${b.status}">${t(b.status)}</span>
    </div>`).join('');
}

function slamStamp() {
  const stamp = $('#stamp');
  stamp.classList.remove('stamped');
  void stamp.offsetWidth; // force le redémarrage de l'animation
  stamp.classList.add('stamped');
}

$('#bookingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const booking = {
    name: $('#bkName').value.trim(),
    phone: $('#bkPhone').value.trim(),
    test: $('#bkTest').value,
    date: $('#bkDate').value,
    notes: $('#bkNotes').value.trim(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  bookings.push(booking);
  store.set('zaziwe_bookings', bookings);
  renderBookings();
  e.target.reset();
  $('#selectedTestDisplay').style.display = 'none';
  slamStamp(); // le moment signature

  const msg = `New booking request%0A- Name: ${encodeURIComponent(booking.name)}%0A- Phone: ${encodeURIComponent(booking.phone)}%0A- Test: ${encodeURIComponent(booking.test)}%0A- Date: ${encodeURIComponent(booking.date)}%0A- Notes: ${encodeURIComponent(booking.notes || '-')}`;
  if (CONFIG.whatsapp) {
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, '_blank');
    toast(t('Request saved — confirm it in WhatsApp to notify the lab.'), 'success');
  } else {
    toast(t('Request received — the laboratory will contact you to confirm.'), 'success');
    // Option email : décommenter quand l'adresse est confirmée
    // window.location.href = `mailto:${CONFIG.email}?subject=Booking request&body=${msg}`;
  }
});

$('#bkDate').min = new Date().toISOString().split('T')[0];

/* ===== NEWS ===== */
function renderUpdates() {
  if (!updates.length) {
    $('#updateFeed').innerHTML = `<p class="booking-empty" style="padding:1.2rem 0.4rem;">${t('No updates yet.')}</p>`;
    return;
  }
  $('#updateFeed').innerHTML = updates.slice(-8).reverse().map((u, i) => `
    <div class="update-item rv-row" style="--d:${i * 80}ms">
      <span class="dot ${u.type}"></span>
      <div>
        <div class="text">${u.title ? `<strong>${esc(u.title)}</strong> — ` : ''}${esc(u.text)}</div>
        <div class="time">${esc(u.time)}</div>
      </div>
    </div>`).join('');
  bindReveals($('#updateFeed'));
}

/* ===== ÉQUIPE : LA LISTE-SIGNATURES ===== */
function renderStaff() {
  $('#staffList').innerHTML = STAFF.map((s, i) => {
    const num = s.phone.replace(/[^0-9]/g, '');   // wa.me veut le numéro sans « + »
    return `
      <div class="team-row rv-row" style="--d:${i * 100}ms">
        <span class="name">${esc(s.name)}</span>
        <span class="role">${esc(t(s.role))}</span>
        <span class="links">
          <a href="tel:${esc(s.phone)}">${t('Call')}</a>
          <a href="https://wa.me/${num}" target="_blank" rel="noopener">${t('WhatsApp')}</a>
          <a href="https://t.me/${esc(s.phone)}" target="_blank" rel="noopener">${t('Telegram')}</a>
        </span>
      </div>`;
  }).join('');
  bindReveals($('#staffList'));
}

/* Bouton "Chat" de la barre mobile : WhatsApp/Telegram si configuré */
(() => {
  const chat = $('#mobileChat');
  if (!chat) return;
  if (CONFIG.whatsapp) { chat.href = `https://wa.me/${CONFIG.whatsapp}`; chat.target = '_blank'; }
  else if (CONFIG.telegram) { chat.href = `https://t.me/${CONFIG.telegram}`; chat.target = '_blank'; }
})();


/* ===== FAQ ACCORDÉON ===== */
document.querySelectorAll('.faq-item').forEach((item, i) => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  a.id = 'faq-answer-' + i;
  q.setAttribute('aria-controls', a.id);
  q.setAttribute('aria-expanded', 'false');
});
document.querySelectorAll('.faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((o) => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
      o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ===== MODE STAFF ===== */
function setStaffMode(on) {
  document.body.classList.toggle('staff-mode', on);
  sessionStorage.setItem('zaziwe_staff', on ? '1' : '');
}

$('#staffLoginLink').addEventListener('click', () => {
  if (document.body.classList.contains('staff-mode')) {
    document.getElementById('tests').scrollIntoView({ behavior: 'smooth' });
    return;
  }
  const pin = prompt('Staff PIN:');
  if (pin === CONFIG.staffPin) {
    setStaffMode(true);
    toast('Staff mode ON — you can now edit tests and post updates.', 'success');
    document.getElementById('tests').scrollIntoView({ behavior: 'smooth' });
  } else if (pin !== null) {
    toast(t('Wrong PIN.'));
  }
});

$('#staffLogout').addEventListener('click', () => {
  setStaffMode(false);
  cancelEditTest();
  toast('Staff mode OFF.');
});

function startEditTest(id) {
  const t = tests.find((x) => x.id === id);
  if (!t) return;
  editingTestId = id;
  $('#staffTestName').value = t.name;
  $('#staffTestCode').value = t.code;
  $('#staffTestPrice').value = t.price || '';
  $('#staffTestAvailable').value = t.available ? 'yes' : 'no';
  $('#staffSaveLabel').textContent = 'Save changes';
  $('#staffDeleteTest').style.display = 'inline-flex';
  $('#staffPanel').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function cancelEditTest() {
  editingTestId = null;
  $('#staffTestName').value = '';
  $('#staffTestCode').value = '';
  $('#staffTestPrice').value = '';
  $('#staffTestAvailable').value = 'yes';
  $('#staffSaveLabel').textContent = 'Add test';
  $('#staffDeleteTest').style.display = 'none';
}

$('#staffSaveTest').addEventListener('click', () => {
  const name = $('#staffTestName').value.trim();
  if (!name) { toast('Please enter a test name.'); return; }
  const data = {
    name,
    code: $('#staffTestCode').value.trim() || 'GEN-00',
    price: Number($('#staffTestPrice').value) || 0,
    available: $('#staffTestAvailable').value === 'yes'
  };
  if (editingTestId) {
    Object.assign(tests.find((x) => x.id === editingTestId), data);
    toast('Test updated.', 'success');
  } else {
    tests.push({ id: 'custom-' + Date.now(), ...data });
    toast('Test added.', 'success');
  }
  store.set('zaziwe_tests', tests);
  cancelEditTest();
  renderTariff();
});

$('#staffDeleteTest').addEventListener('click', () => {
  if (!editingTestId) return;
  if (!confirm('Delete this test?')) return;
  tests = tests.filter((x) => x.id !== editingTestId);
  store.set('zaziwe_tests', tests);
  cancelEditTest();
  renderTariff();
  toast('Test deleted.');
});

$('#staffPostUpdate').addEventListener('click', () => {
  const text = $('#staffUpdateText').value.trim();
  if (!text) { toast('Please write an update first.'); return; }
  updates.push({
    type: $('#staffUpdateType').value,
    text,
    time: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  });
  store.set('zaziwe_updates', updates);
  $('#staffUpdateText').value = '';
  renderUpdates();
  toast('Update posted.', 'success');
});

/* ===== QR CODE + PARTAGE ===== */
function initQR() {
  const box = $('#qrBox');
  const url = CONFIG.siteUrl || window.location.href;
  if (typeof QRCode === 'undefined') {
    box.innerHTML = '<p style="color:var(--ink);font-size:0.72rem;max-width:130px;">QR unavailable offline</p>';
    return;
  }
  new QRCode(box, {
    text: url,
    width: 128,
    height: 128,
    colorDark: '#0A1B3C',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });
}

$('#qrDownload').addEventListener('click', () => {
  const canvas = $('#qrBox canvas');
  const img = $('#qrBox img');
  const dataUrl = canvas ? canvas.toDataURL('image/png') : (img ? img.src : null);
  if (!dataUrl) { toast('QR not ready yet.'); return; }
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = 'zaziwe-labs-qr.png';
  a.click();
  toast(t('QR code downloaded — ready to print!'), 'success');
});

$('#shareBtn').addEventListener('click', async () => {
  const url = CONFIG.siteUrl || window.location.href;
  if (navigator.share) {
    try { await navigator.share({ title: 'Zaziwe Medical Laboratories', url }); } catch { /* annulé */ }
  } else {
    try { await navigator.clipboard.writeText(url); toast(t('Link copied!'), 'success'); }
    catch { toast(url); }
  }
});

/* ===== MODE RELECTURE (notes « ce qui manque » pour le client) ===== */
(() => {
  if (!CONFIG.reviewMode) return;
  const hidden = localStorage.getItem('zaziwe_review_hidden') === '1';
  document.body.classList.add('review');
  document.body.classList.toggle('review-hidden', hidden);
  if (hidden) document.body.classList.remove('review');

  const show = () => {
    document.body.classList.add('review');
    document.body.classList.remove('review-hidden');
    store.set('zaziwe_review_hidden', 0);
    localStorage.setItem('zaziwe_review_hidden', '0');
  };
  const hide = () => {
    document.body.classList.remove('review');
    document.body.classList.add('review-hidden');
    localStorage.setItem('zaziwe_review_hidden', '1');
  };
  $('#reviewToggle')?.addEventListener('click', hide);
  $('#reviewShow')?.addEventListener('click', show);
})();

/* ===== INIT ===== */
$('#langToggle')?.addEventListener('click', () => applyLang(LANG === 'am' ? 'en' : 'am'));

$('#year').textContent = new Date().getFullYear();
if (sessionStorage.getItem('zaziwe_staff') === '1') setStaffMode(true);
renderTariff();
renderBookings();
renderUpdates();
renderStaff();
initQR();
bindReveals();
applyLang(LANG);   // applique la langue mémorisée
