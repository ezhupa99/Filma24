chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, currentTab => {
        if (/^https:\/\/www\.filma24/.test(currentTab.url)) {
            chrome.tabs.executeScript(null, {file: './foreground.js'}, () => {
            })
        }
    })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (/^https:\/\/www\.filma24/.test(tab.url)) {
            chrome.tabs.executeScript(null, {file: './foreground.js'}, () => {
            })
        }
    }
)
