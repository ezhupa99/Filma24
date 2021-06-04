"use strict";

const checkForAdWord = (script) =>
    script.src.toLowerCase().includes("ads") ||
    script.src.toLowerCase().includes("trackad") &&
    script.src.toLowerCase().indexOf("uploads") === -1;

(function () {
    if (location.host.includes("filma24")) {
        // // * Add a new event listener on the main div and stopping the bubble
        // document.querySelector(".main")
        //     .addEventListener("click", (e) => {
        //         e.stopPropagation();
        //         console.log(`test`);
        //     });
        //
        // // * Remove all IFrames
        // document.querySelectorAll("iframe")
        //     .forEach(frame => {
        //         frame.remove();
        //     })
        //
        // // * Remove all scripts that contains ads on their src
        //
        // document.querySelectorAll("script").forEach(
        //     script => {
        //         // if (checkForAdWord(script)) {
        //         //     script.remove();
        //         // }
        //         script.remove();
        //     }
        // )

        const body = document.querySelector("body");
        const new_element = body.cloneNode(true);
        body.parentNode.replaceChild(new_element, body);
    }
})()
