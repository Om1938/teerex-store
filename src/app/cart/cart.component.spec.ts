import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItem } from '@shared/model/cartItem.model';
import { SharedModule } from '@shared/shared.module';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { of, throwError } from 'rxjs';
import { ToasterService } from '../toastr.service';

import { CartComponent } from './cart.component';
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
describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;
  let toasterService: ToasterService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [SharedModule, DialogModule, CardModule],
      providers: [
        {
          provide: CartService,
          useValue: {
            getCart: () => {
              return of([]);
            },
            clearCart: jasmine.createSpy('clearCart'),
            deleteFromCart: jasmine
              .createSpy('deleteFromCart')
              .and.returnValue(of([])),
            decreaseQuantity: jasmine
              .createSpy('decreaseQuantity')
              .and.returnValue(of([])),
            addQuantity: jasmine
              .createSpy('addQuantity')
              .and.returnValue(of([])),
          },
        },
        {
          provide: ToasterService,
          useValue: {
            showError: jasmine.createSpy('showError'),
            showSuccess: jasmine.createSpy('showSuccess'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    toasterService = TestBed.inject(ToasterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call clearCart', () => {
    component.displayThankyou();
    expect(cartService.clearCart).toHaveBeenCalled();
  });

  it('should call deleteFromCart', () => {
    component.deleteFromCart(cartItem);
    expect(cartService.deleteFromCart).toHaveBeenCalled();
  });

  it('should call decreaseQuantity', () => {
    component.decreaseQuantity(cartItem);
    expect(cartService.decreaseQuantity).toHaveBeenCalled();
  });

  it('should call addQuantity', () => {
    component.addQuantity(cartItem);
    expect(cartService.addQuantity).toHaveBeenCalled();
  });

  it('should call deleteFromCart', () => {
    cartService.deleteFromCart = jasmine
      .createSpy('deleteFromCart')
      .and.returnValue(throwError(() => new Error('error')));
    component.deleteFromCart(cartItem);
    expect(cartService.deleteFromCart).toHaveBeenCalled();
    expect(toasterService.showError).toHaveBeenCalled();
  });

  it('should call decreaseQuantity', () => {
    cartService.decreaseQuantity = jasmine
      .createSpy('decreaseQuantity')
      .and.returnValue(throwError(() => new Error('error')));
    component.decreaseQuantity(cartItem);
    expect(cartService.decreaseQuantity).toHaveBeenCalled();
    expect(toasterService.showError).toHaveBeenCalled();
  });

  it('should call addQuantity', () => {
    cartService.addQuantity = jasmine
      .createSpy('addQuantity')
      .and.returnValue(throwError(() => new Error('error')));
    component.addQuantity(cartItem);
    expect(cartService.addQuantity).toHaveBeenCalled();
    expect(toasterService.showError).toHaveBeenCalled();
  });
});
