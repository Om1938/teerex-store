import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterItem } from '@shared/model/filter-item.interface';

@Component({
  selector: 'teerex-product-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() header = '';
  @Input() options: FilterItem[] = [];

  @Output() change = new EventEmitter();

  selectedOptions: string[] = [];

  constructor() {}

  ngOnInit(): void {}
  checkChange(e: any) {
    this.change.emit(e);
  }
}
