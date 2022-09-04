import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '@shared/model/cartItem.model';
import { Product } from '@shared/model/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public url =
    'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json';
  private Products = new BehaviorSubject<Product[]>([]);
  Products$ = this.Products.asObservable();

  private Cart = new BehaviorSubject<CartItem[]>([]);
  Cart$ = this.Cart.asObservable();

  constructor(private http: HttpClient) {
    this.getProducts();
  }

  getProducts() {
    this.http.get(this.url).subscribe((res: any) => {
      this.Products.next(res);
    });
  }

  addProductToCart(product: Product, quantity: number = 1) {
    //Return an Observable to emulate a http call
    return new Observable<string>((observer) => {
      let currentCart = this.Cart.value;
      let index = currentCart.findIndex((cartItem) => {
        return cartItem.product.id == product.id;
      });

      if (index == -1) {
        currentCart = [
          ...currentCart,
          new CartItem({ product: { ...product }, quantity }),
        ];
        this.Cart.next(currentCart);
        observer.next('Added Product to cart Successfully');
      } else {
        observer.error(new Error('Product Already Exists in the cart'));
      }
    });
  }

  addQuantity(cartItem: CartItem, quantity: number = 1) {
    return new Observable((observable) => {
      let cart = this.Cart.value;

      let index = cart.findIndex((c) => c.product.id == cartItem.product.id);
      if (index == -1) {
        observable.error(new Error('Product not found in cart'));
      } else {
        if (!cart[index].addQuantity(quantity)) {
          observable.error(
            new Error('Could Not Increase quantity, Max Quantity Exceeded')
          );
        } else {
          this.Cart.next([...cart]);
          observable.next('Quantity Increased');
        }
      }
    });
  }

  decreaseQuantity(cartItem: CartItem, quantity: number = 1) {
    return new Observable((observable) => {
      let cart = this.Cart.value;
      let index = cart.find((c) => c.product.id == cartItem.product.id);
      if (!index) {
        observable.error(new Error('Product not found in cart'));
      } else {
        if (!index.decreaseQuantity(quantity)) {
          observable.error(
            new Error('Could Not Decrease quantity lower than 0')
          );
        } else {
          this.Cart.next([...cart]);
          observable.next('Quantity Decreased');
        }
      }
    });
  }

  getProductQuantity(product: Product): Observable<number> {
    return new Observable((observable) => {
      let cart = this.Cart.value;
      let prod = cart.find((cartItem) => cartItem.product.id == product.id);
      if (!prod) observable.next(0);
      else observable.next(prod.quantity);
    });
  }

  deleteFromCart(cartItem: Product): Observable<CartItem> {
    return new Observable((observable) => {
      let cart = this.Cart.value;
      let ci = cart.find((ci) => ci.product.id == cartItem.id);
      if (ci) {
        cart = cart.filter((cart) => cart.product.id != cartItem.id);
        this.Cart.next(cart);
        observable.next(ci);
      } else {
        observable.error(new Error('Product not found in cart.'));
      }
    });
  }
  clearCart() {
    this.Cart.next([]);
  }
}
