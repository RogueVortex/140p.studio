import { renderPortfolio } from './modules/portfolio.js';

async function initHome() {
    await renderPortfolio('home');
    document.addEventListener('languageChanged', async () => {
        await renderPortfolio('home');
    });
}

document.addEventListener('app:ready', initHome);