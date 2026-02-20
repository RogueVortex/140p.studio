import { initPartials } from './core.js';
import { initTheme } from './theme.js';
import { initI18n, changeLanguage } from './i18n.js';
import {
    initMobileMenu,
    initScrollToTop,
    initScrollAnimations,
    initActiveNav } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {

    await initPartials();
    await initI18n();

    initTheme();
    initMobileMenu();
    initScrollToTop();
    initScrollAnimations();
    initActiveNav();

    document.querySelectorAll('[data-lang]')
        .forEach(btn =>
            btn.addEventListener('click',
                () => changeLanguage(btn.dataset.lang)
            )
        );

    document.dispatchEvent(new Event('app:ready'));
});