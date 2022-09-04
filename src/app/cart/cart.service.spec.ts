import { TestBed } from '@angular/core/testing';
import { CartItem } from '@shared/model/cartItem.model';
import { of } from 'rxjs';
import { AppService } from '../app.service';

import { CartService } from './cart.service';
const cartItem: CartItem = new CartItem({
  product: {
    id: 1,
    name: 'Product 1',
    price: 100,
    type: 'Product 1 type',
    quantity: 1,
    color: 'color 1',
    currency: 'inr',
    gender: 'Male',
    imageURL: '',
  },
  quantity: 1,
});
describe('CartService', () => {
  let service: CartService;
  let appService: AppService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        {
          provide: AppService,
          useValue: {
            Cart$: of([]),
            decreaseQuantity: jasmine.createSpy('decreaseQuantity'),
            addQuantity: jasmine.createSpy('addQuantity'),
            deleteFromCart: jasmine.createSpy('deleteFromCart'),
            clearCart: jasmine.createSpy('clearCart'),
          },
        },
      ],
    });
    service = TestBed.inject(CartService);
    appService = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cart', () => {
    service
      .getCart()
      .subscribe((cart) => {
        expect(cart.length).toBe(0);
      })
      .unsubscribe();
  });

  it('should decrease quantity', () => {
    service.decreaseQuantity(cartItem, 1);
    expect(appService.decreaseQuantity).toHaveBeenCalled();
  });

  it('should add quantity', () => {
    service.addQuantity(cartItem, 1);
    expect(appService.addQuantity).toHaveBeenCalled();
  });
  it('should decrease quantity without params', () => {
    service.decreaseQuantity(cartItem);
    expect(appService.decreaseQuantity).toHaveBeenCalled();
  });

  it('should add quantity without params', () => {
    service.addQuantity(cartItem);
    expect(appService.addQuantity).toHaveBeenCalled();
  });

  it('should delete from cart', () => {
    service.deleteFromCart(cartItem);
    expect(appService.deleteFromCart).toHaveBeenCalled();
  });
  it('should clear cart', () => {
    service.clearCart();
    expect(appService.clearCart).toHaveBeenCalled();
  });
});
