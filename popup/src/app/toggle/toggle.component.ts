import {EventEmitter} from '@angular/core';
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
        const el = e.target as HTMLInputElement;
        this.state.emit(el.checked)
    }
}
