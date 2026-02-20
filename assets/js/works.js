/**
 * 140p Portfolio - Works Page JavaScript
 */

// All Works Data
const allWorksData = {
    en: [
        { id: 1, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=800&fit=crop', title: 'Honey', category: 'Food' },
        { id: 2, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=750&fit=crop', title: 'Essence', category: 'Beauty' },
        { id: 3, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=700&fit=crop', title: 'Eternity', category: 'Jewelry' },
        { id: 4, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=800&fit=crop', title: 'Pure', category: 'Food' },
        { id: 5, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=650&fit=crop', title: 'Comfort', category: 'Furniture' },
        { id: 6, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=750&fit=crop', title: 'Elegance', category: 'Fashion' },
        { id: 7, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=700&fit=crop', title: 'Vision', category: 'Fashion' },
        { id: 8, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&h=800&fit=crop', title: 'Power', category: 'Tech' },
        { id: 9, image: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=600&h=650&fit=crop', title: 'Dream', category: 'Beauty' },
        { id: 10, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=750&fit=crop', title: 'Sound', category: 'Tech' },
        { id: 11, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=700&fit=crop', title: 'Speed', category: 'Tech' },
        { id: 12, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop', title: 'Stride', category: 'Fashion' }
    ],
    uk: [
        { id: 1, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=800&fit=crop', title: 'Мед', category: 'Food' },
        { id: 2, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=750&fit=crop', title: 'Есенція', category: 'Beauty' },
        { id: 3, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=700&fit=crop', title: 'Вічність', category: 'Jewelry' },
        { id: 4, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=800&fit=crop', title: 'Чистота', category: 'Food' },
        { id: 5, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=650&fit=crop', title: 'Комфорт', category: 'Furniture' },
        { id: 6, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=750&fit=crop', title: 'Елегантність', category: 'Fashion' },
        { id: 7, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=700&fit=crop', title: 'Бачення', category: 'Fashion' },
        { id: 8, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&h=800&fit=crop', title: 'Потужність', category: 'Tech' },
        { id: 9, image: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=600&h=650&fit=crop', title: 'Мрія', category: 'Beauty' },
        { id: 10, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=750&fit=crop', title: 'Звук', category: 'Tech' },
        { id: 11, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=700&fit=crop', title: 'Швидкість', category: 'Tech' },
        { id: 12, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop', title: 'Крок', category: 'Fashion' }
    ]
};

let cardObserver = null;

function createWorkCard(item, index) {
    return `
        <a href="#" class="portfolio-card-link" data-category="${item.category}">
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
                card.style.animationDelay = `${index * 0.05}s`;
                card.classList.add('visible');
                cardObserver.unobserve(card);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.portfolio-card').forEach(card => {
        cardObserver.observe(card);
    });
}

function renderWorks(lang, filter = 'all') {
    const col1 = document.getElementById('column1');
    const col2 = document.getElementById('column2');
    const col3 = document.getElementById('column3');
    
    if (!col1 || !col2 || !col3) return;

    const data = allWorksData[lang];
    const filteredData = filter === 'all' ? data : data.filter(item => item.category === filter);

    col1.innerHTML = '';
    col2.innerHTML = '';
    col3.innerHTML = '';

    filteredData.forEach((item, index) => {
        const card = createWorkCard(item, index);
        if (index % 3 === 0) col1.innerHTML += card;
        else if (index % 3 === 1) col2.innerHTML += card;
        else col3.innerHTML += card;
    });

    initCardObserver();
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Get filter and re-render
            const filter = btn.dataset.filter;
            renderWorks(currentLang, filter);
        });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderWorks(currentLang);
    
    // Initialize filters
    initFilters();
    
    // Listen for language changes
    document.addEventListener('languageChanged', (e) => {
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        renderWorks(e.detail.lang, activeFilter);
    });
});
