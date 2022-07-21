import { Component, OnInit } from '@angular/core';
import { CartItem } from '@shared/model/cartItem.model';
import { Product } from '@shared/model/product.interface';
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
  ) {
    // let prods: Product[] = [
    //   {
    //     id: 1,
    //     imageURL:
    //       'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png',
    //     name: 'Black Polo',
    //     type: 'Polo',
    //     price: 250,
    //     currency: 'INR',
    //     color: 'Black',
    //     gender: 'Men',
    //     quantity: 3,
    //   },
    //   {
    //     id: 2,
    //     imageURL:
    //       'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png',
    //     name: 'Blue Polo',
    //     type: 'Polo',
    //     price: 350,
    //     currency: 'INR',
    //     color: 'Blue',
    //     gender: 'Women',
    //     quantity: 3,
    //   },
    //   {
    //     id: 3,
    //     imageURL:
    //       'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png',
    //     name: 'Pink Polo',
    //     type: 'Polo',
    //     price: 350,
    //     currency: 'INR',
    //     color: 'Pink',
    //     gender: 'Women',
    //     quantity: 6,
    //   },
    // ];
    // this.cart = prods.map((product) => new CartItem({ product, quantity: 2 }));
  }

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
