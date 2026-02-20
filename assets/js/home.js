// home.js (production i18n version)

import { getCurrentLang } from './common/i18n.js';

// ===============================
// Portfolio Data
// ===============================

const portfolioData = {
    en: [
        { id: 1, image: '/assets/images/works/honey.jpg', title: 'Honey', category: 'Food' },
        { id: 2, image: '/assets/images/works/essence.jpg', title: 'Essence', category: 'Beauty' },
        { id: 3, image: '/assets/images/works/ring.jpg', title: 'Eternity', category: 'Jewelry' },
        { id: 4, image: '/assets/images/works/tech.jpg', title: 'Tech', category: 'Tech' },
        { id: 5, image: '/assets/images/works/chair.jpg', title: 'Comfort', category: 'Furniture' },
        { id: 6, image: '/assets/images/works/bag.jpg', title: 'Elegance', category: 'Fashion' },
        { id: 7, image: '/assets/images/works/glasses.jpg', title: 'Vision', category: 'Accessories' },
        { id: 8, image: '/assets/images/works/cpu.jpg', title: 'Power', category: 'Tech' },
        { id: 9, image: '/assets/images/works/cloud.jpg', title: 'Dream', category: 'Concept' },
        { id: 10, image: '/assets/images/works/headphones.jpg', title: 'Sound', category: 'Audio' },
        { id: 11, image: '/assets/images/works/brake.jpg', title: 'Speed', category: 'Automotive' },
        { id: 12, image: '/assets/images/works/sneaker.jpg', title: 'Stride', category: 'Footwear' },
        { id: 13, image: '/assets/images/works/soda.jpg', title: 'Fizz', category: 'Beverage' },
        { id: 14, image: '/assets/images/works/watch.jpg', title: 'Time', category: 'Luxury' }
    ],
    uk: [
        { id: 1, image: '/assets/images/works/honey.jpg', title: 'Мед', category: 'Їжа' },
        { id: 2, image: '/assets/images/works/essence.jpg', title: 'Есенція', category: 'Краса' },
        { id: 3, image: '/assets/images/works/ring.jpg', title: 'Вічність', category: 'Прикраси' },
        { id: 4, image: '/assets/images/works/tech.jpg', title: 'Техніка', category: 'Техніка' },
        { id: 5, image: '/assets/images/works/chair.jpg', title: 'Комфорт', category: 'Меблі' },
        { id: 6, image: '/assets/images/works/bag.jpg', title: 'Елегантність', category: 'Мода' },
        { id: 7, image: '/assets/images/works/glasses.jpg', title: 'Бачення', category: 'Аксесуари' },
        { id: 8, image: '/assets/images/works/cpu.jpg', title: 'Потужність', category: 'Техніка' },
        { id: 9, image: '/assets/images/works/cloud.jpg', title: 'Мрія', category: 'Концепт' },
        { id: 10, image: 'assets/images/works/headphones.jpg', title: 'Звук', category: 'Аудіо' },
        { id: 11, image: '/assets/images/works/brake.jpg', title: 'Швидкість', category: 'Авто' },
        { id: 12, image: '/assets/images/works/sneaker.jpg', title: 'Крок', category: 'Взуття' },
        { id: 13, image: '/assets/images/works/soda.jpg', title: 'Бульбашки', category: 'Напої' },
        { id: 14, image: '/assets/images/works/watch.jpg', title: 'Час', category: 'Люкс' }
    ]
};

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
// Portfolio rendering
// ===============================

let observer;

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

function createCard(item) {
    return `
    <a href="works/${item.id}" class="portfolio-card-link">
        <div class="portfolio-card">
            <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
            <div class="card-overlay"></div>
            <div class="card-content">
                <div class="card-category">${item.category}</div>
                <div class="card-title">${item.title}</div>
            </div>
        </div>
    </a>      
    `;
}

function renderPortfolio(lang) {
    const left = document.getElementById('leftColumn');
    const right = document.getElementById('rightColumn');
    if (!left || !right) return;

    const data = portfolioData[lang];
    const leftItems = data.slice(0, 7);
    const rightItems = data.slice(7);

    left.innerHTML = leftItems.map(createCard).join('');
    right.innerHTML = rightItems.map(createCard).join('');

    initObserver();
}

// ===============================
// Init
// ===============================

function initHome() {

    const lang = getCurrentLang();

    renderPortfolio(lang);
    animateHeroDescription();
    document.addEventListener('languageChanged', (e) => {
        renderPortfolio(e.detail.lang);
        // Даем переводу примениться, затем перезапускаем анимацию
        setTimeout(() => animateHeroDescription(), 0);
    });
}

document.addEventListener('app:ready', initHome);