import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CartItem } from '@shared/model/cartItem.model';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit, OnChanges {
  @Input() cartItems: CartItem[] = [];
  @Output() displayThankyou = new EventEmitter();
  totalPrice = 0;
  display = false;
  constructor(private _cartService: CartService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.totalPrice = this.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
      0
    );
  }

  displayThankyouHandler(e: MouseEvent) {
    this.displayThankyou.emit(e);
  }
}
