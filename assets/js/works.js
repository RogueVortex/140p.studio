import { renderPortfolio } from './modules/portfolio.js';

async function initHome() {
    await renderPortfolio('works');
    document.addEventListener('languageChanged', async () => {
        await renderPortfolio('works');
    });
}

document.addEventListener('app:ready', initHome);