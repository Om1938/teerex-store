import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CartItem } from '@shared/model/cartItem.model';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnChanges {
  @Input() cartItems: CartItem[] = [];
  @Output() displayThankyou = new EventEmitter();
  totalPrice = 0;
  display = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.totalPrice = this.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.price,
      0
    );
  }

  displayThankyouHandler(e: MouseEvent) {
    this.displayThankyou.emit(e);
  }
}
