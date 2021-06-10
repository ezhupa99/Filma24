chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        ads: true,
        redirects: true
    });
});

let ads = true,
    redirects = true;

chrome.storage.sync.get(['ads', 'redirects'], (result) => {
    ads = result.ads;
    redirects = result.redirects;
});

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {

        if (namespace === "sync") {
            // * Set the local variables the new value
            this[key] = changes[key].newValue;
            const tab = await getTab();

            // switch (key) {
            //     case "ads":
            //         // chrome.scripting.executeScript({
            //         //     target: {tabId: tab.id},
            //         //     function: removeRealAds,
            //         // });
            //         // chrome.scripting.executeScript({
            //         //     target: {tabId: tab}
            //         // })
            //         break;
            //
            // }
        }
    }
});

getTab =
    async () => {
        const [tab] =
            await chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                });

        console.log("Inside GetTab: ", tab)
        return tab;
    }
