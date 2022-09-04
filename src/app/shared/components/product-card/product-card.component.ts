import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@shared/model/product.interface';

@Component({
  selector: 'teerex-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardCComponent {
  @Input() product!: Product;
  @Input() quantityInCart?: number;

  @Output() addToCart = new EventEmitter();

  AddToCart(e: any) {
    this.addToCart.emit(e);
  }
}
