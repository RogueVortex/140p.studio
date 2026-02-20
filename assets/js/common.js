/**
 * 140p Portfolio - Common JavaScript
 * Final stable version with app:ready architecture
 */

// ========================================
// Utilities
// ========================================

function getBasePath() {
    const path = location.pathname;
    if (path === "/" || path === "/index.html") return "";
    return "../";
}

async function loadPartial(id, path) {
    const el = document.getElementById(id);
    if (!el) return;

    const response = await fetch(path);
    if (!response.ok) {
        console.error(`Failed to load ${path}`);
        return;
    }
    el.innerHTML = await response.text();
}

// ========================================
// Translations
// ========================================

const translations = {
    en: {
        nav: { works: 'Works', rnd: 'R&D', me: 'Me' },
        footer: {
            description: 'We create visual solutions that help brands stand out and effectively communicate with their audience.',
            contacts: 'Contacts',
            social: 'Social Media',
            copyright: '© 2026 140p Studio. All rights reserved.',
            tagline: 'Designed with passion'
        }
    },
    uk: {
        nav: { works: 'Роботи', rnd: 'R&D', me: 'Я' },
        footer: {
            description: 'Ми створюємо візуальні рішення, які допомагають брендам виділитися та ефективно комунікувати з аудиторією.',
            contacts: 'Контакти',
            social: 'Соціальні мережі',
            copyright: '© 2026 140p Studio. Всі права захищені.',
            tagline: 'Створено з пристрастю'
        }
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

// ========================================
// Theme
// ========================================

const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

function getNextTheme(current) {
    return current === 'light' ? 'dark' : current === 'dark' ? 'lime' : 'light';
}

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = getNextTheme(currentTheme);
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
}

function updateThemeIcons(currentTheme) {
    const nextTheme = getNextTheme(currentTheme);
    document.querySelectorAll('.theme-icon').forEach(icon => {
        icon.style.display = icon.dataset.theme === nextTheme ? 'block' : 'none';
    });
}

// ========================================
// Language
// ========================================

function updateLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('.lang-btn-header, .mobile-lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-i18n-common]').forEach(element => {
        const key = element.dataset.i18nCommon;
        const keys = key.split('.');
        let value = translations[lang];

        for (const k of keys) {
            if (value && value[k]) value = value[k];
        }

        if (value) element.textContent = value;
    });

    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'uk' ? 'uk' : 'en';

    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// ========================================
// Mobile Menu
// ========================================

function initMobileMenu() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!burgerBtn || !mobileMenu) return;

    burgerBtn.addEventListener('click', () => {
        const isOpen = burgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========================================
// Scroll To Top
// ========================================

function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// Intersection Observer Utility
// ========================================

function observeElements(selector, callback, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                if (callback) callback(entry.target, index);
                else entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { ...defaultOptions, ...options });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

// ========================================
// Initialization
// ========================================

async function initApp() {

    const base = getBasePath();
    
    await Promise.all([
        loadPartial("header", base + "assets/partials/header.html"),
        loadPartial("mobile-menu", base + "assets/partials/mobile-menu.html"),
        loadPartial("footer", base + "assets/partials/footer.html")
    ]);

    updateThemeIcons(savedTheme);
    document.getElementById('themeToggleHeader')?.addEventListener('click', toggleTheme);
    document.getElementById('themeToggleMobile')?.addEventListener('click', toggleTheme);

    document.querySelectorAll('.lang-btn-header, .mobile-lang-btn')
        .forEach(btn => btn.addEventListener('click', () => updateLanguage(btn.dataset.lang)));

    updateLanguage(currentLang);

    initMobileMenu();
    initScrollToTop();

    document.dispatchEvent(new Event("app:ready"));
}

document.addEventListener('DOMContentLoaded', initApp);