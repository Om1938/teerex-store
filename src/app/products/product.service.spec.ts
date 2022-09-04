import { TestBed } from '@angular/core/testing';
import { Product } from '@shared/model/product.interface';
import { of } from 'rxjs';
import { AppService } from '../app.service';

import { ProductService } from './product.service';

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
describe('ProductService', () => {
  let service: ProductService;
  let appService: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        {
          provide: AppService,
          useValue: {
            Products$: of([]),
            Cart$: of([]),
            addProductToCart: jasmine.createSpy('addProductToCart'),
            getProductQuantity: jasmine.createSpy('getProductQuantity'),
          },
        },
      ],
    });
    service = TestBed.inject(ProductService);
    appService = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    service
      .getProducts()
      .subscribe((products) => {
        expect(products.length).toBe(0);
      })
      .unsubscribe();
  });
  it('should add product to cart', () => {
    service.addProductToCart(product);
    expect(appService.addProductToCart).toHaveBeenCalled();
  });

  it('should get product count in cart', () => {
    service.getProductCountInCart(product);
    expect(appService.getProductQuantity).toHaveBeenCalled();
  });

  it('should get cart products', () => {
    service
      .getCartProducts()
      .subscribe((products) => {
        expect(products.length).toBe(0);
      })
      .unsubscribe();
  });
});
