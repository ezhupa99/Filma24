import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-toggle',
	templateUrl: './toggle.component.html',
	styleUrls: ['./toggle.component.sass'],
})
export class ToggleComponent {
	@Input() active = null;
	@Output() state = new EventEmitter<boolean>(false);

	onStateChange(e: Event): void {
		const el = e.target as HTMLInputElement;
		// * Emit new state
		this.state.emit(el.checked);
	}
}
