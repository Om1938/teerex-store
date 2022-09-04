import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CartItem } from '@shared/model/cartItem.model';
import { Product } from '@shared/model/product.interface';
import { SharedModule } from '@shared/shared.module';
import { of, throwError } from 'rxjs';
import { ToasterService } from '../toastr.service';
import { ProductService } from './product.service';

import { ProductsComponent } from './products.component';
import { PrimengModule } from './products.primeng.module';

const products: Product[] = [
  {
    color: 'string1',
    currency: 'string1',
    gender: 'string1',
    id: 1,
    imageURL: 'string1',
    name: 'string1',
    price: 1,
    quantity: 1,
    type: 'string1',
  },
  {
    color: 'string2',
    currency: 'string2',
    gender: 'string2',
    id: 2,
    imageURL: 'string2',
    name: 'string2',
    price: 2,
    quantity: 2,
    type: 'string2',
  },
  {
    color: 'string3',
    currency: 'string3',
    gender: 'string3',
    id: 3,
    imageURL: 'string3',
    name: 'string3',
    price: 3,
    quantity: 3,
    type: 'string2',
  },
  {
    color: 'string4',
    currency: 'string4',
    gender: 'string4',
    id: 4,
    imageURL: 'string4',
    name: 'string4',
    price: 4,
    quantity: 4,
    type: 'string2',
  },
  {
    color: 'string5',
    currency: 'string5',
    gender: 'string5',
    id: 5,
    imageURL: 'string5',
    name: 'string5',
    price: 5,
    quantity: 5,
    type: 'string5',
  },
];
const cartProds = products
  .slice(0, 3)
  .map((prod) => new CartItem({ product: prod, quantity: 1 }));

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [PrimengModule, SharedModule, FormsModule],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProducts: () => {
              return of([...products]);
            },
            getCartProducts: () => {
              return of([...cartProds]);
            },
            addProductToCart: () => {
              return of(true);
            },
            getProductCountInCart: (product: Product) => {
              return of(
                cartProds.find(
                  (productInCart) => productInCart.product.id === product.id
                )?.quantity || 0
              );
            },
          },
        },
        {
          provide: ToasterService,
          useValue: {
            showSuccess: () => {},
            showError: jasmine.createSpy('showError'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('addProductToCart', () => {
    it('should call proper method in service', () => {
      const productService = TestBed.inject(ProductService);
      const spy = spyOn(productService, 'addProductToCart').and.callThrough();
      component.addToCart(products[0]);
      expect(spy).toHaveBeenCalled();
    });

    it('should show error toastr if product is not added', () => {
      const toasterService = TestBed.inject(ToasterService);
      const productService = TestBed.inject(ProductService);
      productService.addProductToCart = jasmine
        .createSpy('addProductToCart')
        .and.returnValue(throwError(() => new Error('error')));
      component.addToCart(products[0]);
      expect(toasterService.showError).toHaveBeenCalled();
    });
  });

  describe('searchFilter', () => {
    it('should set the search filter to specified empty value', () => {
      component.filters.txtSearch = 'a';
      component.updateFilter();
      expect(component.filters.txtSearch).toEqual('a');
    });
  });
  describe('typeFilterChange', () => {
    it('should set type to specified empty value', () => {
      component.typeFilterChange({ checked: [], originalEvent: {} as Event });
      expect(component.filters.type).toEqual([]);
    });
    it('should set type to specified value', () => {
      component.typeFilterChange({
        checked: ['a'],
        originalEvent: {} as Event,
      });
      expect(component.filters.type).toEqual(['a']);
    });
  });

  describe('genderFilterChange', () => {
    it('should set the gender filter to specified empty value', () => {
      component.genderFilterChange({
        checked: [],
        originalEvent: {} as Event,
      });
      expect(component.filters.gender).toEqual([]);
    });
    it('should set the gender filter to specified value', () => {
      component.genderFilterChange({
        checked: ['a'],
        originalEvent: {} as Event,
      });
      expect(component.filters.gender).toEqual(['a']);
    });
  });

  describe('colorFilterChange', () => {
    it('should set the color filter to specified empty value', () => {
      component.colorFilterChange({
        checked: [],
        originalEvent: {} as Event,
      });
      expect(component.filters.color).toEqual([]);
    });
    it('should set the color filter to specified value', () => {
      component.colorFilterChange({
        checked: ['a'],
        originalEvent: {} as Event,
      });
      expect(component.filters.color).toEqual(['a']);
    });
    it('should set the color filter to specified value', () => {
      component.colorFilterChange({
        checked: ['a', 'b'],
        originalEvent: {} as Event,
      });
      expect(component.filters.color).toEqual(['a', 'b']);
    });
  });

  describe('priceFilterChange', () => {
    it('should set the price filter to specified empty value', () => {
      component.priceFilterChange({
        checked: [],
        originalEvent: {} as Event,
      });
      expect(component.filters.price).toEqual([]);
    });
    it('should set the price filter to specified value', () => {
      component.priceFilterChange({
        checked: [
          {
            starting: 2,
            ending: 2000,
          },
        ],
        originalEvent: {} as Event,
      });
      expect(component.filters.price).toEqual([
        {
          starting: 2,
          ending: 2000,
        },
      ]);
    });
  });
});
