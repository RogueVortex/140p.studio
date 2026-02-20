/**
 * 140p Portfolio - Home Page JavaScript
 */

// Portfolio Data
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

const pageTranslations = {
    en: {
        hero: {
            description: "140p is a team of experts in 3D visualization, graphic design, and web development. We create visual solutions that help brands stand out and effectively communicate with their audience.",
            scroll: 'Scroll'
        }
    },
    uk: {
        hero: {
            description: "140p — це команда експертів у галузі 3D-візуалізації, графічного дизайну та веб-розробки. Ми створюємо візуальні рішення, які допомагають брендам виділитися та ефективно комунікувати з аудиторією.",
            scroll: 'Гортай'
        }
    }
};

function updateHeroDescription(lang) {
    const heroDescription = document.getElementById('heroDescription');
    if (!heroDescription) return;
    
    heroDescription.innerHTML = '';
    const text = pageTranslations[lang].hero.description;

    text.split(' ').forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.style.animationDelay = `${0.6 + index * 0.03}s`;
        heroDescription.appendChild(span);
    });
}

// Global card observer variable
let cardObserver = null;

function createCard(item, index) {
    return `
        <a href="works/${item.id}" class="portfolio-card-link">
            <div class="portfolio-card" data-index="${index}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="card-overlay"></div>
                <div class="card-content">
                    <div class="card-category">${item.category}</div>
                    <div class="card-title">${item.title}</div>
                </div>
                <div class="card-dot top"></div>
                <div class="card-dot bottom"></div>
            </div>
        </a>
    `;
}

function initCardObserver() {
    if (cardObserver) {
        cardObserver.disconnect();
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = parseInt(card.dataset.index);
                card.style.animationDelay = `${index * 0.08}s`;
                card.classList.add('visible');
                cardObserver.unobserve(card);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.portfolio-card').forEach(card => {
        cardObserver.observe(card);
    });
}

function updatePortfolioCards(lang) {
    const leftColumn = document.getElementById('leftColumn');
    const rightColumn = document.getElementById('rightColumn');
    if (!leftColumn || !rightColumn) return;
    
    const data = portfolioData[lang];
    const leftItems = data.slice(0, 7);
    const rightItems = data.slice(7);

    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';

    leftItems.forEach((item, index) => {
        leftColumn.innerHTML += createCard(item, index);
    });

    rightItems.forEach((item, index) => {
        rightColumn.innerHTML += createCard(item, index + 4);
    });

    initCardObserver();
}

function updatePageLanguage(lang) {

    updateHeroDescription(lang);
    updatePortfolioCards(lang);

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const keys = key.split('.');
        let value = pageTranslations[lang];
        for (const k of keys) {
            if (value[k]) value = value[k];
        }
        if (value) {
            element.textContent = value;
        }
    });
}

// Initialize on DOM ready
document.addEventListener('app:ready', () => {
    updatePageLanguage(currentLang);

    document.addEventListener('languageChanged', (e) => {
        updatePageLanguage(e.detail.lang);
    });

    observeElements('#portfolioHeader');
});
