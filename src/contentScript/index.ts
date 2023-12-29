import { getElement, getElements, openLinkInNewTab, reloadWindowWithoutScripts } from "../helpers/helper";

function addScrollOnPage() {
    const body = getElement('body') as HTMLElement;

    if (body) {
        body.style.overflow = 'auto';
    }
}

function getFrames() {
    return getElements('iframe');
}

function getOtherBanners() {
    return getElements('a[rel="noopener"]');
}

if (window.location.href.includes('filma24.click')) {
    const moviePlayer = getElement('.movieplay iframe') as HTMLIFrameElement | null;

    if (moviePlayer) {
        const src = moviePlayer.src;

        openLinkInNewTab(src);
    }

    reloadWindowWithoutScripts();

    const intervalId = setInterval(function () {
        let html = document.documentElement;

        const problematicElements = Array.from(html.childNodes).filter(node => {
            return node.nodeType === Node.ELEMENT_NODE && (node as any).tagName !== 'HEAD' && (node as any).tagName !== 'BODY'
        })

        if (problematicElements.length) {
            problematicElements.forEach(element => element.remove());
        } else {
            clearInterval(intervalId);
        }

    }, 1000)

} else {
    const frames = getFrames();
    const otherBanners = getOtherBanners();

    frames.forEach(frame => frame.remove());

    otherBanners.forEach(element => element.remove());

    const moviePlayer = getElement('.movie-player iframe') as HTMLIFrameElement | null;

    if (moviePlayer) {
        const src = moviePlayer.src;

        openLinkInNewTab(src);
    }

    const intervalId = setInterval(function () {
        const boostPlayer = getElement('b-int');
        const boostGrid = getElement('b-hgrid')

        if (!boostPlayer && !boostGrid) {
            clearInterval(intervalId);
        }

        if (boostPlayer) {
            boostPlayer.remove();

            addScrollOnPage();
        };

        if (boostGrid) boostGrid.remove();
    }, 1000);
}




