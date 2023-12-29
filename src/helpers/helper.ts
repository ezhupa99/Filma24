export function getElement(pattern: string) {
    return document.querySelector(pattern);
}

export function getElements(pattern: string) {
    return document.querySelectorAll(pattern);
}

export function reloadWindowWithoutScripts() {
    const html = document.querySelector('html');

    if (!html) return null;

    const new_element = html.cloneNode(true);

    if (!html.parentNode) return null

    html.parentNode.replaceChild(new_element, html);
}

export function isAtRoot() {
    return window.location.pathname === '/';
}

export function openLinkInNewTab(link: string) {
    window.open(link, '_blank')?.focus();
}
