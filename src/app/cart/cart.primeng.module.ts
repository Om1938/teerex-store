import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

const components = [CardModule, ButtonModule, DialogModule];

@NgModule({
  declarations: [],
  imports: [...components],
  exports: [...components],
})
export class PrimengModule {}
