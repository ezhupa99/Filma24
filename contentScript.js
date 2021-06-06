"use strict";

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

    main.classList.add("custom-overlay");

    wrapperDiv.classList.add("spinner-wrapper")

    wrapperDiv.append(prepareLoadingDiv())

    body.append(wrapperDiv)
}

function removeLoading() {
    const wrapperDiv = document.querySelector(".spinner-wrapper");
    const main = document.querySelector(".main");

    main.classList.remove("custom-overlay");
    wrapperDiv.remove();
}

function prepareLoadingDiv() {
    const rollerDiv = document.createElement("div");
    rollerDiv.classList.add("lds-roller");
    // * Populate wrapper div with simple divs to create the effect of loading
    rollerDiv.innerHTML = `
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    `;

    return rollerDiv;
}

function addBackFunctionalityToScrollToTop() {
    const scroller = document.querySelector("#scroller");

    scroller.addEventListener("click", function () {
        window.scroll({top: 0})
    })
}

function removeYouTubeVideoFromPlayer() {
    document.querySelector("#vidad").remove();
}

function getAllRedirectsFromHeader() {
    const header = document.querySelector('.head-menu');
    const links = header.querySelectorAll('a');
    return Array.from(links)
        .filter(
            el =>
                !(
                    el.href.includes('bit.ly') ||
                    el.href.includes('javascript') ||
                    el.href.length === 23
                )
        ).map(el => {
            return el.href;
        })
}

function onClearance() {
    document.addEventListener('readystatechange', () => {
        if (document.readyState === "complete") {
            removeAllScripts();
            replaceWholeHtmlToRemoveEvents();
            removeLoading();
            addBackFunctionalityToScrollToTop();

            // const goodLinks = getAllRedirectsFromHeader();
            // goodLinks.push("https://www.filma24.ai/")
            //
            // if (goodLinks.includes(window.location.href)) {
            removeAllAdsAppearance();
            // }
        }
    })
}

function removeAllAdsAppearance() {
    removeBitLyAds();
    removeRealAds();
}

/**
 * Remove all ads connected with bit.ly
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

// * Main Function
(function () {
    if (location.host.includes("filma24")) {
        removeAllIFrames();

        addLoadingScreenTillAdsAreRemoved();

        onClearance();
    }
})()



