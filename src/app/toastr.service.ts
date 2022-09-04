import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
