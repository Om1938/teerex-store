import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { PrimengModule } from './cart.primeng.module';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CartComponent, CartSummaryComponent],
  imports: [CommonModule, CartRoutingModule, PrimengModule, SharedModule],
})
export class CartModule {}
