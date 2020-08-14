import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UiPhoneInputComponent } from './ui-phone-input/ui-phone-input.component';
import { CountrySelectComponent } from './ui-phone-input/country-select/country-select.component';
const components = [UiPhoneInputComponent, CountrySelectComponent];

@NgModule({
  declarations: [...components],
  imports: [IonicModule, CommonModule],
  exports: [...components],
  entryComponents: [],
})
export class UiPhoneInputModule {}
