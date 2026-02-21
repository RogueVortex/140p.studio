// ui.js
// ======================================================
// UI MODULE – Production Version
// ======================================================

// ========================================
// Mobile Menu
// ========================================

export function initMobileMenu() {
    const burger = document.getElementById('burgerBtn');
    const menu = document.getElementById('mobileMenu');
    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
        const open = burger.classList.toggle('active');
        menu.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });
}

// ========================================
// Scroll To Top
// ========================================

export function initScrollToTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// Universal Scroll Observer
// ========================================

let globalObserver;

function createObserver() {
    return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // Обычная анимация появления
            if (entry.target.classList.contains('animate-on-scroll')) {
                entry.target.classList.add('visible');
            }

            // Word animation
            if (entry.target.hasAttribute('data-animate-words')) {
                animateWords(entry.target);
            }

            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
}

export function initScrollAnimations() {

    if (!globalObserver) {
        globalObserver = createObserver();
    }

    document.querySelectorAll('.animate-on-scroll, [data-animate-words]')
        .forEach(el => globalObserver.observe(el));
}

// ========================================
// Word Animation
// ========================================

function animateWords(element) {

    const text = element.textContent.trim();
    if (!text) return;

    const words = text.split(' ');
    element.innerHTML = '';

    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.style.animationDelay = `${0.6 + index * 0.03}s`;
        element.appendChild(span);
    });
}

// ========================================
// Active Navigation (Nested Support)
// ========================================

export function initActiveNav() {

    const currentPath = normalizePath(location.pathname);

    document.querySelectorAll('.nav-link').forEach(link => {

        const linkPath = normalizePath(link.getAttribute('href'));

        if (linkPath === '/' && currentPath === '/') {
            link.classList.add('active');
            return;
        }

        if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function normalizePath(path) {

    if (!path) return '/';

    path = path.replace(location.origin, '');
    path = path.replace('index.html', '');

    if (!path.endsWith('/')) path += '/';

    return path;
}