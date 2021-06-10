import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
    blockAds = true;
    blockRedirects = true;

    ngOnInit() {
        // @ts-ignore
        chrome.storage.sync.get(['ads', 'redirects'], (result) => {
            this.blockAds = result.ads;
            this.blockRedirects = result.redirects;
        });
    }

    onChromeUpdateSync(state: boolean, field: "ads" | "redirects") {

        if (!(this.blockAds && this.blockRedirects)) {
            // @ts-ignore
            // chrome.action.setIcon()
        }

        debugger;

        this[`block${this.capitalizeFirstLetter(field)}`] = state;

        // @ts-ignore
        chrome.storage.sync.set({
            [field]: state
        }, () => {
        });
    }

    private capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
}
