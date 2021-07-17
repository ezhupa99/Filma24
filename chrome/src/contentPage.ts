function getAllRedirectsFromHeader() {
    const header = document.querySelector('.head-menu');
    const links = header.querySelectorAll('a');
    return Array.from(links)
        .filter(
            el =>
                !(
                    el.href.includes('bit.ly') ||
                    el.href.includes('javascript')
                )
        ).map(el => {
            return el.href;
        })
}

const functionObject = {
    removeAdsFromOthers,
    removeAdsFromPlayer,
    addAdsFromOthers,
    addAdsFromPlayer,
    removeRedirectsFromOthers,
    removeRedirectsFromPlayer,
    addRedirectsFromOthers,
    addRedirectsFromPlayer
}

addLoadingScreenTillAdsAreRemoved();

chrome.runtime.onMessage.addListener(
    function (request: {
        field: 'Ads' | 'Redirects',
        state: boolean
    }) {

        const links = getAllRedirectsFromHeader();

        if (links.includes(window.location.href) ||
            window.location.href.includes("page/")) {

            console.log("Field: ", request.field, "; State: ", request.state);
            // console.log("This:", this);
            // * Remove/Add Ads on other pages
            request.state ?
                functionObject[`remove${request.field}FromOthers`]() :
                functionObject[`add${request.field}FromOthers`]();
        } else {
            request.state ?
                functionObject[`remove${request.field}FromPlayer`]() :
                functionObject[`add${request.field}FromPlayer`]();
        }
    }
);

function removeAdsFromOthers() {
    // console.warn("NotImplemented@%cAdsFromOthers", "color: salmon;");

    onOthersAdsClearance();

    removeLoading();
}

function removeAdsFromPlayer() {
    // console.warn("NotImplemented@%cAdsFromPlayer", "color: salmon;");

    onPlayerAdsClearance();

    removeLoading();
}

function addAdsFromOthers() {
    console.warn("NotImplemented@%cAdsFromOthers", "color:lawngreen;");

    // const headers = new Headers();
    // headers.set("Content-Type", "text/html");
    //
    // fetch(window.location.href, {
    //     headers
    // })
    //     .then(
    //         res => {
    //             return res.text();
    //         }
    //     )
    //     .then(data => {
    //         const html = document.querySelector("html");
    //         html.innerHTML = data.slice(41, data.length-11);
    //     })

    removeLoading();
}

function addAdsFromPlayer() {
    console.warn("NotImplemented@%cAdsFromPlayer", "color:lawngreen;");

    window.location.reload();

    removeLoading();
}

// * Redirects

function removeRedirectsFromOthers() {
    // console.warn("NotImplemented@%cRedirectsFromOthers", "color: salmon;");

    replaceWholeHtmlToRemoveEvents();
    addBackFunctionalityToScrollToTop();
    addBackFunctionalityToSearch();

    removeLoading();
}

function removeRedirectsFromPlayer() {
    // console.warn("NotImplemented@%cRedirectsFromPlayer", "color: salmon;");

    replaceWholeHtmlToRemoveEvents();
    addBackFunctionalityToScrollToTop();
    addBackFunctionalityToSearch();

    removeLoading();
}

function addRedirectsFromOthers() {
    console.warn("NotImplemented@%cRedirectsFromOthers", "color:lawngreen;");

    // window.location.reload();

    removeLoading();
}

function addRedirectsFromPlayer() {
    console.warn("NotImplemented@%cRedirectsFromPlayer", "color:lawngreen;");

    // window.location.reload();

    removeLoading();
}

// !SPLIT

document.addEventListener('readystatechange', () => {
    if (document.readyState === "complete")
        addLoadingScreenTillAdsAreRemoved();
});

function removeAllScripts() {
    document.querySelectorAll("script").forEach(
        script => {
            script.remove();
        }
    )
}

function removeAllIFrames() {
    document.querySelectorAll("iframe")
        .forEach(frame => {
            frame.remove();
        })
}

function replaceWholeHtmlToRemoveEvents() {
    const html = document.querySelector("html");
    const new_element = html.cloneNode(true);
    html.parentNode.replaceChild(new_element, html);
}

function addLoadingScreenTillAdsAreRemoved() {
    const wrapperDiv = document.createElement("div");
    const body = document.querySelector("body");
    const main = document.querySelector(".main");
    const movie = document.querySelector(".watch-movie");

    main.classList.add("custom-overlay");

    main.addEventListener("click", listener)

    // * Check if movie element exist because this function will be running on both others and movie urls
    if (movie) {
        movie.classList.add("custom-overlay");
        movie.addEventListener("click", listener)
    }

    wrapperDiv.classList.add("spinner-wrapper")

    wrapperDiv.append(prepareLoadingDiv())

    body.append(wrapperDiv)
}

function removeLoading() {
    const wrapperDiv = document.querySelectorAll(".spinner-wrapper");
    const main = document.querySelector(".main");
    const movie = document.querySelector(".watch-movie");

    main.classList.remove("custom-overlay");
    main.removeEventListener("click", listener);

    // * Check if movie element exist because this function will be running on both others and movie urls
    if (movie) {
        movie.classList.remove("custom-overlay");
        movie.removeEventListener("click", listener);
    }


    if (wrapperDiv.length > 0) {
        wrapperDiv.forEach(el => {
            el.remove()
        })
    }
}

function listener(event) {
    event.stopPropagation();
}

function prepareLoadingDiv() {
    const rollerDiv = document.createElement("div");
    rollerDiv.classList.add("lds-roller");
    // * Populate wrapper div with simple divs to create the effect of loading
    rollerDiv.innerHTML = `<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>`;

    return rollerDiv;
}

function addBackFunctionalityToScrollToTop() {
    const scroller = document.querySelector("#scroller");

    scroller.addEventListener("click", function () {
        window.scroll({top: 0})
    })
}

function addBackFunctionalityToSearch() {
    const button = document.querySelector(".search2 button.sbtn") as HTMLButtonElement,
        input = document.querySelector(".search2 input.sinput") as HTMLInputElement;

    button.addEventListener("click", function (e) {
        const target = e.target as HTMLButtonElement;

        // * Input is active
        if (target.classList.contains("close")) {
            input.placeholder = "";
            input.classList.remove("inclicked");
            target.classList.remove("close");
        } else {
            input.placeholder = "Kërko ...";
            input.classList.add("inclicked");
            target.classList.add("close");
        }
    })
}

function removeYouTubeVideoFromPlayer() {
    const ytVideo = document.querySelector("#vidad");
    if (ytVideo) {
        ytVideo.remove();
    }
}

function closeNotification() {
    const btn: HTMLButtonElement = document.querySelector(".mbyllnjoftim");

    if (btn) {
        btn.click();
    }
}

function onOthersAdsClearance() {
    removeAllIFrames();
    removeAllScripts();
    addBackFunctionalityToScrollToTop();
    addBackFunctionalityToSearch();
    removeAllAdsAppearance();
}

function onPlayerAdsClearance() {
    removeYouTubeVideoFromPlayer();
    removeWidgetAd();
    removeBitLyAds();
    // getIframeFromMoviePlayer();
}

function removeAllAdsAppearance() {
    removeBitLyAds();
    removeRealAds();
    closeNotification();
}

/**
 * Remove all ads associated with bit.ly
 */
function removeBitLyAds() {
    const centers = document.querySelectorAll("center");

    if (centers && centers.length !== 0) {
        centers.forEach(cnt => {
            cnt.remove();
        })
    }
}

/**
 * Remove all ads from Adskeeper
 */
function removeRealAds() {
    const allAds = document.querySelectorAll('[id^="Ads"]');

    if (allAds && allAds.length !== 0) {
        allAds.forEach(ad => {
            ad.remove();
        })
    }
}

function removeWidgetAd() {
    const widget = document.querySelector('.widgets');

    if (widget) widget.remove();
}

/**
 * Get the frame
 */
function getIframeFromMoviePlayer() {
    const moviePlayer = document.querySelector(".movie-player");
    const frame = moviePlayer.querySelector("iframe");
    window.open(frame.src, "_blank").focus();
}
