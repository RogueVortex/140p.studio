// Translations
const translations = {
    en: {
        nav: {
            works: 'Works',
            rnd: 'R&D',
            me: 'Me'
        },
        hero: {
            description: "140p is a team of experts in 3D visualization, graphic design, and web development. We create visual solutions that help brands stand out and effectively communicate with their audience.",
            scroll: 'Scroll'
        },
        portfolio: {
            title: 'Works',
            description: 'A collection of our best projects in 3D visualization and product design.'
        },
        about: {
            title: 'About',
            description: 'Колекція наших найкращих проєктів у галузі 3D-візуалізації та продуктового дизайну.'
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
        hero: {
            description: "140p — це команда експертів у галузі 3D-візуалізації, графічного дизайну та веб-розробки. Ми створюємо візуальні рішення, які допомагають брендам виділитися та ефективно комунікувати з аудиторією.",
            scroll: 'Гортай'
        },
        portfolio: {
            title: 'Роботи',
            description: 'Колекція наших найкращих проєктів у галузі 3D-візуалізації та продуктового дизайну.'
        },
        about: {
            title: 'Обо мне',
            description: 'Ми — 140p — креативна студія, що спеціалізується на 3D-візуалізації, графічному дизайні та веб-розробці. Заснована у 2020 році, ми виросли з невеликої команди ентузіастів у повноцінне цифрове агентство. Наш підхід поєднує художнє бачення з технічною досконалістю. Ми вважаємо, що чудовий дизайн повинен не лише виглядати красиво, але й вирішувати реальні бізнес-проблеми та створювати змістовні зв\'язки з аудиторією. Кожен проект, за який ми беремося, — це можливість розширити межі та дослідити нові можливості. Ми тісно співпрацюємо з нашими клієнтами, щоб зрозуміти їхні цілі та пропонувати рішення, які перевершують очікування.'
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

// Portfolio Data
const portfolioData = {
    en: [
        { id: 1, image: 'assets/images2/honey.jpg', title: 'Honey', category: 'Food' },
        { id: 2, image: 'assets/images2/perfume.jpg', title: 'Essence', category: 'Beauty' },
        { id: 3, image: 'assets/images2/ring.jpg', title: 'Eternity', category: 'Jewelry' },
        { id: 4, image: 'assets/images2/water.jpg', title: 'Pure', category: 'Beverage' },
        { id: 5, image: 'assets/images2/chair.jpg', title: 'Comfort', category: 'Furniture' },
        { id: 6, image: 'assets/images2/bag.jpg', title: 'Elegance', category: 'Fashion' },
        { id: 7, image: 'assets/images2/glasses.jpg', title: 'Vision', category: 'Accessories' },
        { id: 8, image: 'assets/images2/cpu.jpg', title: 'Power', category: 'Tech' },
        { id: 9, image: 'assets/images2/cloud.jpg', title: 'Dream', category: 'Concept' },
        { id: 10, image: 'assets/images2/headphones.jpg', title: 'Sound', category: 'Audio' },
        { id: 11, image: 'assets/images2/brake.jpg', title: 'Speed', category: 'Automotive' },
        { id: 12, image: 'assets/images2/sneaker.jpg', title: 'Stride', category: 'Footwear' },
        { id: 13, image: 'assets/images2/soda.jpg', title: 'Fizz', category: 'Beverage' },
        { id: 14, image: 'assets/images2/watch.jpg', title: 'Time', category: 'Luxury' }
    ],
    uk: [
        { id: 1, image: 'assets/images2/honey.jpg', title: 'Мед', category: 'Їжа' },
        { id: 2, image: 'assets/images2/perfume.jpg', title: 'Есенція', category: 'Краса' },
        { id: 3, image: 'assets/images2/ring.jpg', title: 'Вічність', category: 'Прикраси' },
        { id: 4, image: 'assets/images2/water.jpg', title: 'Чистота', category: 'Напої' },
        { id: 5, image: 'assets/images2/chair.jpg', title: 'Комфорт', category: 'Меблі' },
        { id: 6, image: 'assets/images2/bag.jpg', title: 'Елегантність', category: 'Мода' },
        { id: 7, image: 'assets/images2/glasses.jpg', title: 'Бачення', category: 'Аксесуари' },
        { id: 8, image: 'assets/images2/cpu.jpg', title: 'Потужність', category: 'Техніка' },
        { id: 9, image: 'assets/images2/cloud.jpg', title: 'Мрія', category: 'Концепт' },
        { id: 10, image: 'assets/images2/headphones.jpg', title: 'Звук', category: 'Аудіо' },
        { id: 11, image: 'assets/images2/brake.jpg', title: 'Швидкість', category: 'Авто' },
        { id: 12, image: 'assets/images2/sneaker.jpg', title: 'Крок', category: 'Взуття' },
        { id: 13, image: 'assets/images2/soda.jpg', title: 'Бульбашки', category: 'Напої' },
        { id: 14, image: 'assets/images2/watch.jpg', title: 'Час', category: 'Люкс' }
    ]
};

// Current language
let currentLang = localStorage.getItem('lang') || 'en';

// Global card observer variable
let cardObserver = null;

// Language Switcher Functionality
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
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const keys = key.split('.');
        let value = translations[lang];
        for (const k of keys) {
            value = value[k];
        }
        if (value) {
            element.textContent = value;
        }
    });

    // Update hero description with animation
    updateHeroDescription(lang);

    // Update portfolio cards
    updatePortfolioCards(lang);

    // Save to localStorage
    localStorage.setItem('lang', lang);

    // Update html lang attribute
    document.documentElement.lang = lang === 'uk' ? 'uk' : 'en';
}

function updateHeroDescription(lang) {
    const heroDescription = document.getElementById('heroDescription');
    heroDescription.innerHTML = '';
    const text = translations[lang].hero.description;

    text.split(' ').forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.style.animationDelay = `${0.6 + index * 0.03}s`;
        heroDescription.appendChild(span);
    });
}

function createCard(item, index) {
    return `
        <a href="works/${item.id}.html" class="portfolio-card-link">
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
        rightColumn.innerHTML += createCard(item, index + 7);
    });

    initCardObserver();
}

// Event listeners for language buttons (header and mobile)
document.querySelectorAll('.lang-btn-header, .mobile-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        updateLanguage(lang);
    });
});

// Initialize language
updateLanguage(currentLang);

// Theme Toggle Functionality - 3 themes: light, dark, lime
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

function getNextTheme(current) {
    // Cycle: lime -> dark -> light -> lime
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

// Event listeners
document.getElementById('themeToggleHeader').addEventListener('click', toggleTheme);
document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);

// Event listeners for theme toggles (header and mobile)
document.getElementById('themeToggleHeader').addEventListener('click', toggleTheme);
document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);

// Scroll to Top Button Functionality
const scrollTopBtn = document.getElementById('scrollTopBtn');

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

// Header Scroll Effect
const header = document.getElementById('header');
let lastScrollY = 0;
let ticking = false;

//function updateHeader() {
//    const scrollY = window.scrollY;

//    if (scrollY > 150) {
//        header.classList.add('scrolled');
//    } else {
//        header.classList.remove('scrolled');
//    }

//    if (scrollY > lastScrollY && scrollY > 350) {
//        header.classList.add('hidden');
//    } else {
//        header.classList.remove('hidden');
//    }

//    lastScrollY = scrollY;
//    ticking = false;
//}

//window.addEventListener('scroll', () => {
//    if (!ticking) {
//        requestAnimationFrame(updateHeader);
//        ticking = true;
//    }
//}, { passive: true });

// Mobile Menu
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Intersection Observer for other elements (header, footer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe static elements
const portfolioHeader = document.getElementById('portfolioHeader');
const footerContent = document.getElementById('footerContent');
const footerBottom = document.getElementById('footerBottom');

if (portfolioHeader) observer.observe(portfolioHeader);
if (footerContent) observer.observe(footerContent);
if (footerBottom) observer.observe(footerBottom);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});