function checkIfGoodLinkAndWork(result, details) {
    const isGoodLink = result.goodLinks.some(link => {
        return link.includes(details.url);
    })

    if (!isGoodLink) {
        chrome.tabs.executeScript(details.tabId, {file: './removeAddsAndShowFromSource.js'}, () => {
        })
    }
}

chrome.webRequest.onCompleted.addListener(
    function (details) {
        console.log(details);

        if (details.url === "https://www.filma24.ai/") {
            chrome.tabs.executeScript(details.tabId, {file: './removeAddsFromHome.js'}, () => {
            })
            return {cancel: false};
        }

        chrome.storage.sync.get(['goodLinks'], function (result) {

            if (!result?.goodLinks?.length) {
                chrome.tabs.executeScript(details.tabId, {file: './fillGoodLinks.js'}, () => {
                })

                chrome.storage.sync.get('goodLinks', function (res){
                    checkIfGoodLinkAndWork(res, details);
                })
            }

            checkIfGoodLinkAndWork(result, details);
        })

        return {cancel: false};
    },
    {urls: ["*://www.filma24.ai/*"], types: ["main_frame"]},
);
