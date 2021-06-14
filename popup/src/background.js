"use strict";

chrome.runtime.onInstalled.addListener(() => {

    // * Set default values of the extension
    chrome.storage.sync.set({
        ads: true,
        redirects: true
    });


    // * Reload all tabs to make sure popup and content script message API works
    chrome.tabs.query({}, function (tabs) {
        tabs.forEach(
            (tab) => {
                if (tab.url.includes("filma24")) {
                    chrome.tabs.reload(tab.id);
                }
            }
        )
    })
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {

        chrome.storage.sync.get(
            ["ads", "redirects"],
            function (res) {
                chrome.tabs.sendMessage(tabId, {
                    state: res.ads,
                    field: "Ads"
                })

                chrome.tabs.sendMessage(tabId, {
                    state: res.redirects,
                    field: "Redirects"
                })
            })


    }
})


// chrome.storage.onChanged.addListener(async (changes, namespace) => {
//     for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
//
//         if (namespace === "sync") {
//             // * Set the local variables the new value
//             if (key === "ads") {
//                 ads = newValue;
//             } else if (key === "redirects") {
//                 redirects = newValue;
//             }
//         }
//     }
// });
