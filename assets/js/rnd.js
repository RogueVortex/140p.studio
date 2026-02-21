import { renderPortfolio } from './modules/portfolio.js';

async function initHome() {
    await renderPortfolio('rnd');
    document.addEventListener('languageChanged', async () => {
        await renderPortfolio('rnd');
    });
}

document.addEventListener('app:ready', initHome);