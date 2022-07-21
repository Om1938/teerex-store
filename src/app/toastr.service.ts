import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '@shared/model/cartItem.model';
import { Product } from '@shared/model/product.interface';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}
  showSuccess(message: string, head: string = 'Success') {
    this.toastr.success(message, head);
  }
  showError(message: string, head: string = 'Error') {
    this.toastr.error(message, head);
  }
  showWarning(message: string, head: string = 'Warning') {
    this.toastr.warning(message, head);
  }
  showInfo(message: string, head: string = 'Info') {
    this.toastr.info(message, head);
  }
}
