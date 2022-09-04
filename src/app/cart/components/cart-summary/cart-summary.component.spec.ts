import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItem } from '@shared/model/cartItem.model';
import { Product } from '@shared/model/product.interface';

import { CartSummaryComponent } from './cart-summary.component';

describe('CartSummaryComponent', () => {
  let component: CartSummaryComponent;
  let fixture: ComponentFixture<CartSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit displayThankyou event', () => {
    const displayThankyou = spyOn(component.displayThankyou, 'emit');
    component.displayThankyouHandler({} as MouseEvent);
    expect(displayThankyou).toHaveBeenCalled();
  });

  it('should update total price', () => {
    component.cartItems = [
      new CartItem({ product: { price: 100 } as Product, quantity: 1 }),
      new CartItem({ product: { price: 200 } as Product, quantity: 1 }),
    ];
    component.ngOnChanges({} as SimpleChanges);
    expect(component.totalPrice).toBe(300);
  });
});
