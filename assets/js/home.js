// home.js

import { getCurrentLang } from './common/i18n.js';

let worksCache = [];
let observer;

// ===============================
// Load Works JSON
// ===============================

async function loadWorks() {
    if (worksCache.length) return worksCache;

    const res = await fetch('/assets/data/works.json');
    worksCache = await res.json();
    return worksCache;
}

// ===============================
// Hero animation
// ===============================

function animateHeroDescription() {
    const heroDescription = document.getElementById('heroDescription');
    if (!heroDescription) return;

    const words = heroDescription.textContent.split(' ');
    heroDescription.innerHTML = '';

    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.style.animationDelay = `${0.6 + index * 0.03}s`;
        heroDescription.appendChild(span);
    });
}

// ===============================
// Observer
// ===============================

function initObserver() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.portfolio-card')
        .forEach(card => observer.observe(card));
}

// ===============================
// Card Template
// ===============================

function createCard(work, lang) {

    const data =
        work.translations[lang] ||
        work.translations.en;

    return `
        <a href="/works/${work.id}/" class="portfolio-card-link">
            <div class="portfolio-card">
                <img src="${work.cover}" alt="${data.title}" loading="lazy" decoding="async">
                <div class="card-overlay"></div>
                <div class="card-content">
                    <div class="card-category">${data.category || ''}</div>
                    <div class="card-title">${data.title}</div>
                </div>
            </div>
        </a>
    `;
}

// ===============================
// Render Portfolio (2 columns)
// ===============================

async function renderPortfolio() {

    const left = document.getElementById('leftColumn');
    const right = document.getElementById('rightColumn');
    if (!left || !right) return;

    const works = await loadWorks();
    const lang = getCurrentLang();

    const homeWorks = works.filter(w =>
        w.sections?.includes('home')
    );

    // делим массив пополам
    const middle = Math.ceil(homeWorks.length / 2);

    const leftItems = homeWorks.slice(0, middle);
    const rightItems = homeWorks.slice(middle);

    left.innerHTML = leftItems.map(w => createCard(w, lang)).join('');
    right.innerHTML = rightItems.map(w => createCard(w, lang)).join('');

    initObserver();
}

// ===============================
// Init
// ===============================

async function initHome() {

    await renderPortfolio();
    animateHeroDescription();

    document.addEventListener('languageChanged', async () => {
        await renderPortfolio();
        setTimeout(() => animateHeroDescription(), 0);
    });
}

document.addEventListener('app:ready', initHome);