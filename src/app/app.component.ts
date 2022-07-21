import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MegaMenuItem } from 'primeng/api';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'teerex-store';
  items: MegaMenuItem[];
  constructor(private _service: AppService, private _toast: ToastrService) {
    this.items = [
      {
        label: 'Products',
        icon: 'pi pi-fw pi-users',
        routerLink: 'products',
      },
      {
        label: 'Cart',
        icon: 'pi pi-shopping-cart',
        routerLink: 'cart',
      },
    ];
  }
}
