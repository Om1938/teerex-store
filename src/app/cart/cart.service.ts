import { Injectable } from '@angular/core';
import { CartItem } from '@shared/model/cartItem.model';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _appService: AppService) {}

  getCart() {
    return this._appService.Cart$;
  }
  decreaseQuantity(cartItem: CartItem, quantity: number = 1) {
    return this._appService.decreaseQuantity(cartItem, quantity);
  }
  addQuantity(cartItem: CartItem, quantity: number = 1) {
    return this._appService.addQuantity(cartItem, quantity);
  }
  deleteFromCart(cartItem: CartItem) {
    return this._appService.deleteFromCart(cartItem.product);
  }
  clearCart() {
    this._appService.clearCart();
  }
}
