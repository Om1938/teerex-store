import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ToasterService } from './toastr.service';

describe('ToasterService', () => {
  let notificationService: ToasterService,
    toasterService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toasterService = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success',
      'warning',
      'info',
    ]);
    await TestBed.configureTestingModule({
      imports: [CommonModule, ToastrModule.forRoot()],
      declarations: [],
      providers: [
        ToasterService,
        { provide: ToastrService, useValue: toasterService },
      ],
    }).compileComponents();
    notificationService = TestBed.inject(ToasterService);
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should show success message', () => {
    notificationService.showSuccess('Success message');
    expect(toasterService.success).toHaveBeenCalled();
  });

  it('should show error message', () => {
    notificationService.showError('Error message');
    expect(toasterService.error).toHaveBeenCalled();
  });

  it('should show warning message', () => {
    notificationService.showWarning('Warning message');
    expect(toasterService.warning).toHaveBeenCalled();
  });

  it('should show info message', () => {
    notificationService.showInfo('Info message');
    expect(toasterService.info).toHaveBeenCalled();
  });
});
