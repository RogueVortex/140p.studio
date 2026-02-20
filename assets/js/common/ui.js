// ui.js

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
// Scroll Animation Observer
// ========================================

let scrollObserver;

function createObserver() {
    return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
}

export function initScrollAnimations() {

    if (!scrollObserver) {
        scrollObserver = createObserver();
    }

    document.querySelectorAll('.animate-on-scroll')
        .forEach(el => scrollObserver.observe(el));
}

// ========================================
// Active Navigation
// ========================================

export function initActiveNav() {

    const currentPath = normalizePath(location.pathname);

    document.querySelectorAll('.nav-link').forEach(link => {

        const linkPath = normalizePath(link.getAttribute('href'));

        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function normalizePath(path) {

    if (!path) return '/';

    // Убираем домен если есть
    path = path.replace(location.origin, '');

    // Убираем index.html
    path = path.replace('index.html', '');

    // Гарантируем слеш в конце
    if (!path.endsWith('/')) path += '/';

    return path;
}