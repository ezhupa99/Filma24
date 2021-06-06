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

// * Main Function
(function () {
    if (location.host.includes("filma24")) {
        removeAllIFrames();

        addLoadingScreenTillAdsAreRemoved();

        onClearance();
    }
})()

function onClearance() {
    document.addEventListener('readystatechange', () => {
        if (document.readyState === "complete") {
            removeAllScripts();
            replaceWholeHtmlToRemoveEvents();
            removeLoading();
            addBackFunctionalityToScrollToTop();
        }
    })
}



