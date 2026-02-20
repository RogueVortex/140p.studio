// core.js
export async function loadPartial(id, path) {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(path);
    if (!res.ok) {
        console.error(`Failed to load ${path}`);
        return;
    }

    el.innerHTML = await res.text();
}

export async function initPartials() {
    await Promise.all([
        loadPartial("header", "/assets/partials/header.html"),
        loadPartial("mobile-menu", "/assets/partials/mobile-menu.html"),
        loadPartial("footer", "/assets/partials/footer.html")
    ]);
}