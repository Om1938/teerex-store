import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '@shared/model/cartItem.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'teerex-cart-product-card',
  templateUrl: './cart-product-card.component.html',
  styleUrls: ['./cart-product-card.component.scss'],
})
export class CartProductCardComponent {
  @Input() cartItem!: CartItem;

  @Output() decreaseQuantity = new EventEmitter();
  @Output() increaseQuantity = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor(private confirmationService: ConfirmationService) {}
  decreaseQuantityHandler(e: MouseEvent) {
    if (this.cartItem.quantity == 1) {
      this.confirm(e, 'This will remove product from cart, Are you sure');
    } else this.decreaseQuantity.emit(e);
  }
  increaseQuantityHandler(e: MouseEvent) {
    this.increaseQuantity.emit(e);
  }

  deleteFromCart(e: MouseEvent) {
    this.delete.emit(e);
  }

  confirm(event: MouseEvent, confirmMessage?: string) {
    this.confirmationService.confirm({
      target: event.target as any,
      message: confirmMessage || 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        this.deleteFromCart(event);
      },
      reject: () => {
        //reject action
      },
    });
  }
}
