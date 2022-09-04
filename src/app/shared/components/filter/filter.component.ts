import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterItem } from '@shared/model/filter-item.interface';

@Component({
  selector: 'teerex-product-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() header = '';
  @Input() options: FilterItem[] = [];

  @Output() change = new EventEmitter();

  selectedOptions: string[] = [];

  checkChange(e: any) {
    this.change.emit(e);
  }
}
