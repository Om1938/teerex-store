import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './icons/cart/cart.component';
import { FilterComponent } from './components/filter/filter.component';
import { PrimengModule } from './shared.primeng.module';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductCardCComponent } from './components/product-card/product-card.component';
import { CartProductCardComponent } from './components/cart-product-card/cart-product-card.component';
import { DeleteComponent } from './icons/delete/delete.component';
@NgModule({
  declarations: [
    CartComponent,
    FilterComponent,
    ProductCardCComponent,
    CartProductCardComponent,
    DeleteComponent,
  ],
  imports: [CommonModule, PrimengModule, FormsModule],
  exports: [
    CartComponent,
    FilterComponent,
    ProductCardCComponent,
    CartProductCardComponent,
    DeleteComponent,
  ],
  providers: [MessageService, ConfirmationService],
})
export class SharedModule {}
