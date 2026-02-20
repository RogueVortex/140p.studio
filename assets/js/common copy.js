/**
 * 140p Portfolio - Common JavaScript
 * Shared functionality across all pages
 */

// ========================================
// Translations
// ========================================
const translations = {
    en: {
        nav: {
            works: 'Works',
            rnd: 'R&D',
            me: 'Me'
        },
        footer: {
            description: 'We create visual solutions that help brands stand out and effectively communicate with their audience.',
            contacts: 'Contacts',
            social: 'Social Media',
            copyright: '© 2026 140p Studio. All rights reserved.',
            tagline: 'Designed with passion'
        }
    },
    uk: {
        nav: {
            works: 'Роботи',
            rnd: 'R&D',
            me: 'Я'
        },
        footer: {
            description: 'Ми створюємо візуальні рішення, які допомагають брендам виділитися та ефективно комунікувати з аудиторією.',
            contacts: 'Контакти',
            social: 'Соціальні мережі',
            copyright: '© 2026 140p Studio. Всі права захищені.',
            tagline: 'Створено з пристрастю'
        }
    }
};

// Current language
let currentLang = localStorage.getItem('lang') || 'en';

// ========================================
// Theme Management
// ========================================
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

function getNextTheme(current) {
    // Cycle: light -> dark -> lime -> light
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
    // Icon shows what theme will be activated on click (next theme)
    const nextTheme = getNextTheme(currentTheme);
    
    // Update all theme icons (both header and mobile)
    document.querySelectorAll('.theme-icon').forEach(icon => {
        icon.style.display = icon.dataset.theme === nextTheme ? 'block' : 'none';
    });
}

// Initialize icons on load
updateThemeIcons(currentTheme);

// ========================================
// Language Management
// ========================================
function updateLanguage(lang) {
    currentLang = lang;

    // Update header buttons
    document.querySelectorAll('.lang-btn-header, .mobile-lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n-common]').forEach(element => {
        const key = element.dataset.i18nCommon;
        const keys = key.split('.');
        let value = translations[lang];
        for (const k of keys) {
            if (value[k]) value = value[k];
        }
        if (value) {
            element.textContent = value;
        }
    });

    // Save to localStorage
    localStorage.setItem('lang', lang);

    // Update html lang attribute
    document.documentElement.lang = lang === 'uk' ? 'uk' : 'en';
    
    // Dispatch custom event for page-specific handlers
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

    // закрытие по клику на ссылку
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    function closeMenu() {
        burgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// Scroll to Top Button
// ========================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;
    
    function toggleScrollTopBtn() {
        const scrollY = window.scrollY;
        if (scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(toggleScrollTopBtn);
    }, { passive: true });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Intersection Observer Utilities
// ========================================
function observeElements(selector, callback, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                if (callback) {
                    callback(entry.target, index);
                } else {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { ...defaultOptions, ...options });
    
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
    
    return observer;
}

// ========================================
// Initialize Common Functionality
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggles
    document.getElementById('themeToggleHeader')?.addEventListener('click', toggleTheme);
    document.getElementById('themeToggleMobile')?.addEventListener('click', toggleTheme);
    
    // Initialize language buttons
    document.querySelectorAll('.lang-btn-header, .mobile-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
    });
    
    // Initialize language
    updateLanguage(currentLang);
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll to top
    initScrollToTop();
    
    // Observe footer elements
    observeElements('#footerContent, #footerBottom');
});
