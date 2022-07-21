import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

const components = [
  MenuModule,
  RippleModule,
  ButtonModule,
  CheckboxModule,
  CardModule,
  InputTextModule,
];

@NgModule({
  declarations: [],
  imports: [...components],
  exports: [...components],
})
export class PrimengModule {}
