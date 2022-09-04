import { Component } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'teerex-store';
  items: MegaMenuItem[];
  constructor() {
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
