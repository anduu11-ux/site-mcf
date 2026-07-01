// ================================================================
//  MC Fiduciaire – Language Switcher Engine
//
//  You do not need to edit this file.
//  All text lives in shared/config.js.
// ================================================================

/**
 * Apply a language to the page.
 * Called by the NL / EN / RO buttons via onclick="setLang('nl')".
 */
function setLang(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Text content (no HTML tags)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t[el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });

  // Inner HTML (allows <em>, <strong>, <br/>, <span> etc.)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = t[el.dataset.i18nHtml];
    if (val !== undefined) el.innerHTML = val;
  });

  // Input / textarea placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const val = t[el.dataset.i18nPh];
    if (val !== undefined) el.placeholder = val;
  });

  // Highlight active button
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const active = document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`);
  if (active) active.classList.add('active');

  // Update <html lang="...">
  document.documentElement.lang = lang;

  // Remember choice across page loads
  try { localStorage.setItem('mc-lang', lang); } catch (e) {}
}

// On page load: restore the visitor's last chosen language (default: nl)
document.addEventListener('DOMContentLoaded', () => {
  let saved = 'nl';
  try { saved = localStorage.getItem('mc-lang') || 'nl'; } catch (e) {}
  setLang(saved);
});
