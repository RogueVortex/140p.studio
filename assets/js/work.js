import { getCurrentLang } from './common/i18n.js';

let worksCache = [];

async function loadWorks() {
    if (worksCache.length) return worksCache;

    const res = await fetch('/assets/data/works.json');
    worksCache = await res.json();
    return worksCache;
}

function getIdFromURL() {
    const parts = location.pathname.split('/').filter(Boolean);
    return Number(parts[1]);
}

function setText(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
}

function updateSEO(data) {
    document.title = `${data.title} — 140p`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = data.seoDescription || data.description;
    }
}

async function renderWork() {

    const works = await loadWorks();
    const lang = getCurrentLang();
    const id = getIdFromURL();

    const index = works.findIndex(w => w.id === id);
    const work = works[index];

    if (!work) return;

    const data = work.translations[lang] || work.translations.en;

    setText('[data-work-title]', data.title);
    setText('[data-work-category]', data.category);
    setText('[data-work-description]', data.description);

    const gallery = document.querySelector('[data-work-gallery]');
    if (gallery && work.gallery?.length) {
        gallery.innerHTML = work.gallery
            .map(img => `<img src="${img}" loading="lazy" decoding="async">`)
            .join('');
    }

    // Breadcrumbs
    const breadcrumbs = document.querySelector('[data-breadcrumbs]');
    if (breadcrumbs) {
        breadcrumbs.innerHTML = `
            <a href="/">Home</a> /
            <a href="/works/">Works</a> /
            <span>${data.title}</span>
        `;
    }

    // Prev / Next
    const prev = works[index - 1];
    const next = works[index + 1];

    const prevBtn = document.querySelector('[data-prev]');
    const nextBtn = document.querySelector('[data-next]');

    if (prev && prevBtn) {
        const prevData = prev.translations[lang] || prev.translations.en;
        prevBtn.href = `/works/${prev.id}/`;
        prevBtn.textContent = `← ${prevData.title}`;
    }

    if (next && nextBtn) {
        const nextData = next.translations[lang] || next.translations.en;
        nextBtn.href = `/works/${next.id}/`;
        nextBtn.textContent = `${nextData.title} →`;
    }

    // Related (3 первых кроме текущей)
    const relatedContainer = document.querySelector('[data-related]');
    if (relatedContainer) {
        relatedContainer.innerHTML = works
            .filter(w => w.id !== id)
            .slice(0, 3)
            .map(w => {
                const rd = w.translations[lang] || w.translations.en;
                return `
                    <a href="/works/${w.id}/" class="related-card">
                        <img src="${w.cover}" loading="lazy">
                        <div>${rd.title}</div>
                    </a>
                `;
            })
            .join('');
    }

    updateSEO(data);
}

async function initWork() {

    await renderWork();

    document.addEventListener('languageChanged', async () => {
        await renderWork();
    });
}

document.addEventListener('app:ready', initWork);