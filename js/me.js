/**
 * 140p Portfolio - Me Page JavaScript
 */

// Animate stats numbers
const pageTranslations = {
    en: {
        contact: {
            header: "Let's Work Together",
            description: "Have a project in mind? Let's discuss how we can help bring your vision to life."
        },
        about: {
            header: 'Creative Designer & Developer',
            description: "I'm a multidisciplinary designer with over 8 years of experience in creating compelling visual experiences. My work spans across brand identity, 3D visualization and interactive media.",
            description2: "I believe in the power of thoughtful design to transform businesses and connect with audiences on a deeper level. Every project is an opportunity to push boundaries and create something meaningful.",
            exp: "Years Experience",
            projects: "Projects Completed",
            clients: "Happy Clients"
        },
        services: {
            header: "Services",
            brand: "Brand Identity Design",
            visualisation: "3D Visualization",
            motion: "Motion Graphics",
            art: "Art Direction",
        },
        skills: {
            header: "Skills & Tools",
        }
    },
    uk: {
        contact: {
            header: "Давайте работать вместе",
            description: "У вас есть проект? Давайте обсудим, как мы можем помочь воплотить вашу идею в жизнь."
        },
        about: {
            header: 'Креативный дизайнер и разработчик',
            description: "Я — междисциплинарный дизайнер с более чем 8-летним опытом создания впечатляющих визуальных образов. Моя работа охватывает фирменный стиль, 3D-визуализацию и интерактивные медиа.",
            description2: "Я верю в силу продуманного дизайна, способного преобразовывать бизнес и устанавливать более глубокую связь с аудиторией. Каждый проект — это возможность расширить границы возможного и создать нечто значимое.",
            exp: "Лет опыта",
            projects: "Завершенных проектов",
            clients: "Счастливых клиентов"
        },
        services: {
            header: "Услуги",
            brand: "Разработка фирменного стиля",
            visualisation: "3D-визуализация",
            motion: "Моушн-графика",
            art: "Художественное оформление",
        },
        skills: {
            header: "Навыки и инструменты",
        }
    }
};

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue);
                const suffix = finalValue.replace(/[0-9]/g, '');
                
                if (!isNaN(numericValue)) {
                    animateNumber(target, 0, numericValue, 1500, suffix);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
}

function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end + suffix;
        }
    }
    
    requestAnimationFrame(update);
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.textContent;
        
        // Show success state
        btn.textContent = currentLang === 'uk' ? 'Надіслано!' : 'Sent!';
        btn.style.background = 'var(--accent-green)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            this.reset();
        }, 3000);
    });
}

// Animate skill tags
function animateSkills() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 30);
            }
        });
    }, {
        threshold: 0.2
    });
    
    skillTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        tag.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        skillsObserver.observe(tag);
    });
}

// Animate service items
function animateServices() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 80);
            }
        });
    }, {
        threshold: 0.2
    });
    
    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        servicesObserver.observe(item);
    });
}

function updatePageLanguage(lang) {
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
document.addEventListener('DOMContentLoaded', () => {
    // Initial render with current language
    updatePageLanguage(currentLang);

    // Listen for language changes
    document.addEventListener('languageChanged', (e) => {
        // Update hero description with animation
        updatePageLanguage(e.detail.lang);
    });

    // Initialize animations
    animateStats();
    animateSkills();
    animateServices();
    
    // Initialize contact form
    initContactForm();
});
