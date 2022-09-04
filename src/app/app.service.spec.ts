import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AppService } from './app.service';
import { Product } from '@shared/model/product.interface';
import { CartItem } from '@shared/model/cartItem.model';

const product: Product = {
  id: 1,
  name: 'Product 1',
  price: 100,
  type: 'Product 1 type',
  quantity: 100,
  color: 'color 1',
  currency: 'inr',
  gender: 'Male',
  imageURL: '',
};
describe('AppService', () => {
  let service: AppService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService],
    });
    service = TestBed.inject(AppService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    let req = httpTestingController.expectOne(
      'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
    );
    req.flush([]);
    httpTestingController.verify();
  });
  it('should send a get request', () => {
    let req = httpTestingController.expectOne(
      'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
    );

    req.flush([]);
    httpTestingController.verify();
  });
  describe('addProductToCart', () => {
    it('should add a product to cart', () => {
      service
        .addProductToCart(product)
        .subscribe((res) => {
          expect(res).toBe('Added Product to cart Successfully');
        })
        .unsubscribe();
    });
    it('should not add a duplicate product to cart', () => {
      const product: Product = {
        id: 1,
        name: 'Product 1',
        price: 100,
        type: 'Product 1 type',
        quantity: 1,
        color: 'color 1',
        currency: 'inr',
        gender: 'Male',
        imageURL: '',
      };
      service
        .addProductToCart(product)
        .subscribe((res) => {
          expect(res).toBe('Added Product to cart Successfully');
        })
        .unsubscribe();

      service
        .addProductToCart(product)
        .subscribe({
          error: (err) => {
            expect(err.message).toBe('Product Already Exists in the cart');
          },
        })
        .unsubscribe();
    });
  });
  describe('addQuantity', () => {
    let cart: CartItem[];
    let cartObj: CartItem;
    beforeEach(() => {
      service.clearCart();
      service.addProductToCart(product).subscribe().unsubscribe();
      service.Cart$.subscribe((res) => {
        cart = res;
      }).unsubscribe();
      cartObj = cart[0];
    });

    it('should add quantity to product', () => {
      service
        .addQuantity(cartObj)
        .subscribe((res) => {
          expect(res).toBe('Quantity Increased');
        })
        .unsubscribe();
    });
    it('should not add quantity to product if quantity is greater than available quantity', () => {
      service
        .addQuantity(cartObj, 100)
        .subscribe({
          error: (err) => {
            expect(err.message).toBe(
              'Could Not Increase quantity, Max Quantity Exceeded'
            );
          },
        })
        .unsubscribe();
    });

    it('should return error if product is not in cart', () => {
      service
        .addQuantity(
          new CartItem({ ...cartObj, product: { ...cartObj.product, id: 10 } }),
          1
        )
        .subscribe({
          error: (err) => {
            expect(err.message).toBe('Product not found in cart');
          },
        })
        .unsubscribe();
    });
  });
  describe('decreaseQuantity', () => {
    let cart: CartItem[];
    let cartObj: CartItem;
    beforeEach(() => {
      service.clearCart();
      service.addProductToCart(product).subscribe().unsubscribe();
      service.Cart$.subscribe((res) => {
        cart = res;
      }).unsubscribe();
      cartObj = cart[0];
    });

    it('should decrease quantity to product', () => {
      service
        .decreaseQuantity(cartObj)
        .subscribe((res) => {
          expect(res).toBe('Quantity Decreased');
        })
        .unsubscribe();
    });

    it('should not decrease quantity to product if quantity is less than 1', () => {
      service
        .decreaseQuantity(cartObj, 100)
        .subscribe({
          error: (err) => {
            expect(err.message).toBe(
              'Could Not Decrease quantity lower than 0'
            );
          },
        })
        .unsubscribe();
    });

    it('should return error if product is not in cart', () => {
      service
        .decreaseQuantity(
          new CartItem({ ...cartObj, product: { ...cartObj.product, id: 10 } }),
          1
        )
        .subscribe({
          error: (err) => {
            expect(err.message).toBe('Product not found in cart');
          },
        })
        .unsubscribe();
    });
  });
  describe('getProductQuantity', () => {
    let cart: CartItem[];
    let cartObj: CartItem;
    beforeEach(() => {
      service.clearCart();
      service.addProductToCart(product).subscribe().unsubscribe();
      service.Cart$.subscribe((res) => {
        cart = res;
      }).unsubscribe();
      cartObj = cart[0];
    });
    it('should return product quantity', () => {
      service
        .getProductQuantity({ ...product })
        .subscribe((res) => {
          expect(res).toBe(cartObj.quantity);
        })
        .unsubscribe();
    });

    it('should return 0 if product is not in cart', () => {
      service
        .getProductQuantity({ ...product, id: 10 })
        .subscribe((res) => {
          expect(res).toBe(0);
        })
        .unsubscribe();
    });
  });
  describe('deleteFromCart', () => {
    beforeEach(() => {
      service.clearCart();
      service.addProductToCart(product).subscribe().unsubscribe();
    });
    it('should delete product from cart', () => {
      service
        .deleteFromCart(product)
        .subscribe((res) => {
          expect(res.product.id).toBe(product.id);
        })
        .unsubscribe();
    });

    it('should return error if product is not in cart', () => {
      service
        .deleteFromCart({ ...product, id: 10 })
        .subscribe({
          error: (err) => {
            expect(err.message).toBe('Product not found in cart.');
          },
        })
        .unsubscribe();
    });
  });
});
