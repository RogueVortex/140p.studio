// theme.js

const html = document.documentElement;

export function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateIcons(savedTheme);

    document.getElementById('themeToggleHeader')
        ?.addEventListener('click', toggleTheme);

    document.getElementById('themeToggleMobile')
        ?.addEventListener('click', toggleTheme);
}

function getNextTheme(current) {
    return current === 'light' ? 'dark'
        : current === 'dark' ? 'lime'
        : 'light';
}

function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = getNextTheme(current);
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcons(next);
}

function updateIcons(currentTheme) {
    const next = getNextTheme(currentTheme);
    document.querySelectorAll('.theme-icon').forEach(icon => {
        icon.style.display =
            icon.dataset.theme === next ? 'block' : 'none';
    });
}