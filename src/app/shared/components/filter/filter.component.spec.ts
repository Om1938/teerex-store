import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from '@shared/shared.primeng.module';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],

      imports: [FormsModule, PrimengModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit change event', () => {
    const spy = spyOn(component.change, 'emit');
    component.options = [{ label: 'label', value: 'test' }];
    fixture.detectChanges();
    let checkbox = fixture.nativeElement.querySelector('input');
    checkbox.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
