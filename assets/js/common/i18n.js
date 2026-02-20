// i18n.js

let dictionary = {};
let fallbackDictionary = {};
let currentLang = localStorage.getItem('lang') || 'en';

async function loadJSON(lang) {
    const res = await fetch(`/assets/i18n/${lang}.json`);
    if (!res.ok) throw new Error(`Cannot load ${lang}.json`);
    return res.json();
}

export async function initI18n() {

    // Загружаем fallback (en)
    fallbackDictionary = await loadJSON('en');

    // Загружаем текущий язык
    dictionary = await loadJSON(currentLang)
        .catch(() => fallbackDictionary);

    applyTranslations();

    document.dispatchEvent(
        new CustomEvent('languageChanged', { detail: { lang: currentLang } })
    );
}

export async function changeLanguage(lang) {

    dictionary = await loadJSON(lang)
        .catch(() => fallbackDictionary);

    currentLang = lang;
    localStorage.setItem('lang', lang);

    applyTranslations();

    document.dispatchEvent(
        new CustomEvent('languageChanged', { detail: { lang } })
    );
}

export function getCurrentLang() {
    return currentLang;
}

export function t(path, vars = {}) {

    const value =
        resolve(path, dictionary) ??
        resolve(path, fallbackDictionary) ??
        path;

    return interpolate(value, vars);
}

function resolve(path, obj) {
    return path.split('.')
        .reduce((acc, key) => acc?.[key], obj);
}

function interpolate(str, vars) {
    if (typeof str !== 'string') return str;

    return str.replace(/\{\{(.*?)\}\}/g, (_, key) => {
        return vars[key.trim()] ?? '';
    });
}

function updateLanguageButtons() {
    document.querySelectorAll('[data-lang]')
        .forEach(btn => {
            btn.classList.toggle(
                'active',
                btn.dataset.lang === currentLang
            );
        });
}

export function applyTranslations() {

    document.querySelectorAll('[data-i18n]')
        .forEach(el => {

            const key = el.dataset.i18n;
            const translation = t(key);

            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        });

    updateLanguageButtons(); 

    document.documentElement.lang = currentLang;
}