function getAllRedirectsFromHeader() {
    console.log("ca ke ba mir");
    const header = document.querySelector('.head-menu');
    const links = header.querySelectorAll('a');
    return Array.from(links).filter(el => {
        return !(el.href.includes('bit.ly') ||
            el.href.includes('javascript') ||
            el.href.length === 23);

    }).map(el => {
        return el.href;
    })
}

const links = getAllRedirectsFromHeader();
console.log(links);

chrome.storage.sync.set({'goodLinks': links});
