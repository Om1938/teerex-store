import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardCComponent } from './product-card.component';

describe('ProductCardCComponent', () => {
  let component: ProductCardCComponent;
  let fixture: ComponentFixture<ProductCardCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
