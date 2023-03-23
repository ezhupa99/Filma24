import {
	ChangeDetectionStrategy,
	Component,
	NgZone,
	OnInit,
} from '@angular/core';

@Component({
	selector: 'app-popup',
	templateUrl: 'popup.component.html',
	styleUrls: ['popup.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit {
	blockRedirects: boolean = null;

	constructor(private zone: NgZone) {}

	ngOnInit() {
		chrome.storage.sync.get(['redirects'], result => {
			console.log('result', result);
			// * Wrap on zone since chrome API is not on AngularZONE
			this.zone.run(() => {
				this.blockRedirects = result['redirects'];
			});
		});
	}

	onChromeUpdateSync(state: boolean) {
		this.blockRedirects = state;

		this.notifyContentScript(state);

		this.syncStorage(state);
	}

	private syncStorage(state: boolean) {
		chrome.storage.sync.set(
			{
				'redirects': state,
			},
			() => {}
		);
	}

	private notifyContentScript(state: boolean) {
		chrome.tabs.query(null, function (tabs) {
			tabs.forEach(tab => {
				if (tab.url.includes('filma24')) {
					const tabId = tab.id;

					// * action is Add if true and Remove otherwise
					// * type is redirects
					chrome.tabs.sendMessage(
						tabId,
						{
							state,
							field: 'redirects',
						},
						() => {}
					);
				}
			});
		});
	}
}
