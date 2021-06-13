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
        if (!(this.blockAds && this.blockRedirects)) {
            // TODO: Disable Icon if both of options are off
        }

        this[`block${this.capitalizeFirstLetter(field)}`] = state;

        // @ts-ignore
        chrome.storage.sync.set({
            [field]: state
        }, () => {
        });
    }

    private capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
}
