(function () {
    const allAnchors = document.querySelectorAll("a:not([class^=\"play-video\"])");
    for (const anchor of allAnchors) {
        if (anchor.href.includes("bit.ly")) {
            anchor.remove();
        }
    }
})()
