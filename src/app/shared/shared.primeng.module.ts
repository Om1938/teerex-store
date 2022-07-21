import { NgModule } from '@angular/core';

import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

const components = [
  CheckboxModule,
  CardModule,
  ButtonModule,
  ConfirmPopupModule,
];

@NgModule({
  declarations: [],
  imports: [...components],
  exports: [...components],
})
export class PrimengModule {}
