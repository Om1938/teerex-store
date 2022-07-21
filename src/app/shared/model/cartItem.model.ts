import { Product } from './product.interface';

export interface ICartItem {
  product: Product;
  quantity: number;
}

export class CartItem implements ICartItem {
  product: Product;
  quantity: number;

  constructor(cartItem: ICartItem) {
    this.product = cartItem.product;
    this.quantity = cartItem.quantity;
  }

  addQuantity(quantity: number = 1) {
    if (quantity < this.product.quantity - this.quantity) {
      this.quantity += quantity;
      return true;
    }
    return false;
  }

  decreaseQuantity(quantity: number = 1) {
    if (this.quantity - quantity >= 0) {
      this.quantity -= quantity;
      return true;
    }
    return false;
  }

  get price() {
    return this.quantity * +this.product.price;
  }
}
