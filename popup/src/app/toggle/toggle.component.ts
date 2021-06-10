import {EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {Component, Input, Output} from '@angular/core';

@Component({
    selector: 'app-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
    @Input() active = true;
    @Output() state = new EventEmitter<boolean>()

    onStateChange(e: Event): void {
        debugger;
        const el = e.target as HTMLInputElement;
        // * Update local active property
        this.active = el.checked;
        // * Emit new state
        this.state.emit(el.checked)
    }
}
