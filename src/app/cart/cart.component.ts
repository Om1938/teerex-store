import { Component, OnInit } from '@angular/core';
import { CartItem } from '@shared/model/cartItem.model';
import { ToasterService } from '../toastr.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  display: boolean = false;
  constructor(
    public _service: CartService,
    private toastrService: ToasterService
  ) {}

  ngOnInit(): void {
    this._service.getCart().subscribe((res) => {
      this.cart = res;
    });
  }

  decreaseQuantity(cartItem: CartItem) {
    this._service.decreaseQuantity(cartItem).subscribe({
      next: () => {},
      error: (err) => {
        this.toastrService.showError(err.message);
      },
    });
  }

  addQuantity(cartItem: CartItem) {
    this._service.addQuantity(cartItem).subscribe({
      next: () => {},
      error: (err) => {
        this.toastrService.showError(err.message);
      },
    });
  }

  deleteFromCart(cartItem: CartItem) {
    this._service.deleteFromCart(cartItem).subscribe({
      next: () => {},
      error: (err) => {
        this.toastrService.showError(err.message);
      },
    });
  }
  displayThankyou() {
    this.display = true;
    this._service.clearCart();
  }
}
