import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from '@shared/icons/cart/cart.component';
import { Product } from '@shared/model/product.interface';

import { ProductCardCComponent } from './product-card.component';

describe('ProductCardCComponent', () => {
  let component: ProductCardCComponent;
  let fixture: ComponentFixture<ProductCardCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardCComponent, CartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const product: Product = {
    color: 'string',
    currency: 'string',
    gender: 'string',
    id: 1000,
    imageURL: 'string',
    name: 'string',
    price: 1000,
    quantity: 100,
    type: 'string',
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create with product', () => {
    component.product = product;
    fixture.detectChanges();
    let nameDiv = fixture.nativeElement.querySelector('div.name');
    expect(nameDiv).toBeTruthy();
  });

  it('should create with quantityInCart', () => {
    component.quantityInCart = 1;
    fixture.detectChanges();
    let cartDiv = fixture.nativeElement.querySelector('span.count');
    expect(cartDiv).toBeTruthy();
  });

  it('should emit addToCart event', () => {
    const spy = spyOn(component.addToCart, 'emit');
    component.product = product;
    component.quantityInCart = 0;
    fixture.detectChanges();
    let addToCartButton = fixture.nativeElement.querySelector(
      'button.add-to-cart-button'
    );
    addToCartButton.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
