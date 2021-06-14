import {Component, NgZone, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
    blockAds: boolean = null;
    blockRedirects: boolean = null;

    constructor(private zone: NgZone) {
    }

    ngOnInit() {
        // @ts-ignore
        chrome.storage.sync.get(['ads', 'redirects'],
            (result) => {
                // * Wrap on zone since chrome API is not on AngularZONE
                this.zone.run(() => {
                    this.blockAds = result.ads;
                    this.blockRedirects = result.redirects;
                })
            });
    }

    onChromeUpdateSync(state: boolean, field: "ads" | "redirects") {

        const formattedField = this.capitalizeFirstLetter(field);

        this[`block${formattedField}`] = state;

        this.notifyContentScript(state, formattedField);

        this.syncStorage(state, field);
    }

    private syncStorage(state: boolean, field: string) {
        // @ts-ignore
        chrome.storage.sync.set({
            [field]: state
        }, () => {
        });
    }

    private notifyContentScript(state: boolean, field: string) {
        // @ts-ignore
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(tab => {
                if (tab.url.includes("filma24")) {
                    const tabId = tab.id;

                    // * action is Add if true and Remove otherwise
                    // * type is Ads or Redirects
                    // @ts-ignore
                    chrome.tabs.sendMessage(tabId, {
                        state,
                        field
                    }, () => {
                    })
                }
            })
        });
    }

    private capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
}
