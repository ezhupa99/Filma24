import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupComponent } from './pages/popup/popup.component';
import { PopupRoutingModule } from './popup-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { ToggleComponent } from './components/toggle/toggle.component';

@NgModule({
  declarations: [PopupComponent, FooterComponent, ToggleComponent],
  imports: [CommonModule, PopupRoutingModule]
})
export class PopupModule {}
