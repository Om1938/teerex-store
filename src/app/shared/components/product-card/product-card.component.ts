import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '@shared/model/product.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'teerex-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardCComponent implements OnInit {
  @Input() product!: Product;
  @Input() quantityInCart?: number;

  @Output() addToCart = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  AddToCart(e: any) {
    this.addToCart.emit(e);
  }
}
