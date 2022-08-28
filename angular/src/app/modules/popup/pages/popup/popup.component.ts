import { Component, NgZone, OnInit } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: 'popup.component.html',
    styleUrls: ['popup.component.sass']
})
export class PopupComponent implements OnInit {
    blockAds: boolean = null;
    blockRedirects: boolean = null;

    constructor(private zone: NgZone) {
    }

    ngOnInit() {
        chrome.storage.sync.get(['ads', 'redirects'],
            (result) => {
                // * Wrap on zone since chrome API is not on AngularZONE
                this.zone.run(() => {
                    this.blockAds = result['ads'];
                    this.blockRedirects = result['redirects'];
                })
            });
    }

    onChromeUpdateSync(state: boolean, field: "ads" | "redirects") {

        const formattedField = this.capitalizeFirstLetter(field);

        this[`block${formattedField}`] = state;

        this.notifyContentScript(state, formattedField);

        PopupComponent.syncStorage(state, field);
    }

    private static syncStorage(state: boolean, field: string) {
        chrome.storage.sync.set({
            [field]: state
        }, () => {
        });
    }

    private notifyContentScript(state: boolean, field: string) {
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(tab => {
                if (tab.url.includes("filma24")) {
                    const tabId = tab.id;

                    // * action is Add if true and Remove otherwise
                    // * type is Ads or Redirects
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
