import { Injectable } from '@angular/core';
import { Product } from '@shared/model/product.interface';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _appService: AppService) {}

  getProducts() {
    return this._appService.Products$;
  }

  addProductToCart(product: Product) {
    return this._appService.addProductToCart(product);
  }

  getProductCountInCart(product: Product) {
    return this._appService.getProductQuantity(product);
  }

  getCartProducts() {
    return this._appService.Cart$;
  }
}
