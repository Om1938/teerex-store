import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartItem } from '@shared/model/cartItem.model';
import { SharedModule } from '@shared/shared.module';
import { PrimengModule } from '@shared/shared.primeng.module';
import { ConfirmationService } from 'primeng/api';

import { CartProductCardComponent } from './cart-product-card.component';

describe('CartProductCardComponent', () => {
  let component: CartProductCardComponent;
  let fixture: ComponentFixture<CartProductCardComponent>;

  let productCart: CartItem;
  beforeEach(async () => {
    productCart = new CartItem({
      product: {
        color: 'string',
        currency: 'string',
        gender: 'string',
        id: 1,
        imageURL: 'string',
        name: 'string',
        price: 1,
        quantity: 1,
        type: 'string',
      },
      quantity: 1,
    });
    await TestBed.configureTestingModule({
      declarations: [CartProductCardComponent],
      imports: [
        CommonModule,
        SharedModule,
        BrowserAnimationsModule,
        PrimengModule,
      ],
      providers: [ConfirmationService],
    }).compileComponents();

    fixture = TestBed.createComponent(CartProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.cartItem = productCart;
    expect(component).toBeTruthy();
  });

  it('should emit delete event', () => {
    const spy = spyOn(component.delete, 'emit');
    component.cartItem = productCart;
    component.deleteFromCart(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should emit increaseQuantity event', () => {
    const spy = spyOn(component.increaseQuantity, 'emit');
    component.cartItem = productCart;
    component.increaseQuantityHandler(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });
  it('should emit decreaseQuantity event', () => {
    const spy = spyOn(component.decreaseQuantity, 'emit');
    productCart.quantity = 2;
    component.cartItem = productCart;
    component.decreaseQuantityHandler(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should emit decreaseQuantity event for 1 product', () => {
    component.cartItem = productCart;
    component.decreaseQuantityHandler(new MouseEvent('click'));
    fixture.detectChanges();

    let confirmdialog: any;

    confirmdialog = fixture.debugElement.query(
      By.css('p-confirmpopup')
    ).componentInstance;
    let accept = spyOn(confirmdialog, 'accept').and.callThrough();
    component.confirm(new MouseEvent('click'));
    fixture.detectChanges();

    let acceptBtn = fixture.debugElement.nativeElement.querySelector(
      '.p-confirm-popup-accept'
    );
    acceptBtn.click();
    expect(accept).toHaveBeenCalled();
  });
});
