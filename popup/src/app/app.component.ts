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

    onChromeUpdateSync(state: boolean, field: string) {
        // @ts-ignore
        chrome.storage.sync.set({
            [field]: state
        }, () => {
            console.log("Updated " + field + " with state: " + state)
        });
    }
}
