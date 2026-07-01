// ================================================================
//  MC Fiduciaire – Language Switcher Engine
//  You do not need to edit this file.
//  All text lives in translations.js.
// ================================================================

function setLang(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t[el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = t[el.dataset.i18nHtml];
    if (val !== undefined) el.innerHTML = val;
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const val = t[el.dataset.i18nPh];
    if (val !== undefined) el.placeholder = val;
  });

  // Sync the dropdown to the chosen language
  const sel = document.getElementById('lang-select');
  if (sel) sel.value = lang;

  document.documentElement.lang = lang;
  try { localStorage.setItem('mc-lang', lang); } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  let saved = 'ro';
  try { saved = localStorage.getItem('mc-lang') || 'ro'; } catch (e) {}
  if (!TRANSLATIONS[saved]) saved = 'ro';
  setLang(saved);
});
