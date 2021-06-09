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

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {

        if (namespace === "sync") {
            // * Set the local variables the new value
            this[key] = changes[key].newValue;

            console.log(
                `Storage key "${key}" in namespace "${namespace}" changed.`,
                `Old value was "${oldValue}", new value is "${newValue}".`
            );
        }
    }
});

