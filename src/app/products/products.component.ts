import { Component, OnInit } from '@angular/core';
import { FilterItem } from '@shared/model/filter-item.interface';
import { Product } from '@shared/model/product.interface';
import { ToasterService } from '../toastr.service';
import { ProductService } from './product.service';
import { CartItem } from '@shared/model/cartItem.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  colors: string[] = ['red', 'Green', 'Blue'];
  colorFilterOptions: FilterItem[] = [];
  genderFilterOptions: FilterItem[] = [];
  typeFilterOptions: FilterItem[] = [];
  priceFilterOptions: FilterItem[] = [];
  filters = {
    type: [] as string[],
    color: [] as string[],
    gender: [] as string[],
    price: [] as {
      starting: number;
      ending: number;
    }[],
    txtSearch: '',
  };
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cartItems: CartItem[] = [];

  constructor(
    public _service: ProductService,
    private toastr: ToasterService
  ) {}

  ngOnInit() {
    this._service.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products;
      this.setFilters();
    });

    this._service.getCartProducts().subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
    });
  }

  getCartQuantity(product: Product) {
    return this.cartItems.find((p) => p.product.id == product.id)?.quantity;
  }

  setFilters(): void {
    let keys: ('color' | 'gender' | 'type')[] = ['color', 'gender', 'type'];
    [
      this.colorFilterOptions,
      this.genderFilterOptions,
      this.typeFilterOptions,
    ] = keys.map((key) => groupBy(key, this.products).map(makeFilterLabel));
    this.priceFilterOptions = [
      {
        label: '0 - 250 Rs',
        value: {
          starting: 0,
          ending: 250,
        },
      },
      {
        label: '251 - 450',
        value: {
          starting: 251,
          ending: 450,
        },
      },
      {
        label: 'above 450',
        value: {
          starting: 451,
          ending: Infinity,
        },
      },
    ];
  }

  addToCart(product: Product) {
    this._service.addProductToCart(product).subscribe({
      next: (res: any) => {
        this.toastr.showSuccess(res);
      },
      error: (err) => {
        this.toastr.showError(err.message);
      },
    });
  }

  typeFilterChange(e: { checked: string[]; originalEvent: any }) {
    this.filters.type = e.checked;
    this.updateFilter();
  }

  genderFilterChange(e: { checked: string[]; originalEvent: any }) {
    this.filters.gender = e.checked;
    this.updateFilter();
  }

  colorFilterChange(e: { checked: string[]; originalEvent: any }) {
    this.filters.color = e.checked;
    this.updateFilter();
  }
  priceFilterChange(e: {
    checked: {
      starting: number;
      ending: number;
    }[];
    originalEvent: any;
  }) {
    this.filters.price = e.checked;
    this.updateFilter();
  }

  updateFilter() {
    let searchKey = this.filters.txtSearch.toLocaleLowerCase();

    this.filteredProducts = this.products.filter(
      (product: Product) =>
        (this.filters.type.includes(product.type) ||
          this.filters.type.length <= 0) &&
        (this.filters.gender.includes(product.gender) ||
          this.filters.gender.length <= 0) &&
        (this.filters.color.includes(product.color) ||
          this.filters.color.length <= 0) &&
        (this.filters.price.findIndex((ele) => {
          return ele.starting <= +product.price && ele.ending >= +product.price;
        }) != -1 ||
          this.filters.price.length <= 0) &&
        (!searchKey ||
          searchKey == '' ||
          product.color.toLocaleLowerCase().includes(searchKey) ||
          product.type.toLocaleLowerCase().includes(searchKey) ||
          product.name.toLocaleLowerCase().includes(searchKey))
    );
  }
}

function groupBy(key: 'color' | 'gender' | 'type', arr: Product[]): string[] {
  let set = new Set<string>();
  for (const product of arr) {
    if (!set.has(product[key])) {
      set.add(product[key]);
    }
  }
  return Array.from(set);
}

function makeFilterLabel(key: string): FilterItem {
  return { label: key, value: key };
}
