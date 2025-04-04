import { TestBed } from '@angular/core/testing';
import { FormControl, ValidatorFn } from '@angular/forms';
import { DashboardValidators } from '@stores/libs';

describe('DashboardValidators', () => {
  let service: DashboardValidators;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardValidators);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return error for only whitespace input', () => {
    const whiteSpace: ValidatorFn = service.whiteSpace();
    expect(whiteSpace(new FormControl(' '))).toEqual({ whitespace: true });
  });

  it('should pass validation for text without whitespace', () => {
    const whiteSpace: ValidatorFn = service.whiteSpace();
    expect(whiteSpace(new FormControl('ValidText'))).toBeNull();
  });

  it('should return error for text with leading or trailing whitespace', () => {
    const whiteSpace: ValidatorFn = service.whiteSpace();
    expect(whiteSpace(new FormControl(' valid Text '))).toEqual({
      whitespace: true,
    });
  });

  it('should pass validation for empty input', () => {
    const decimaleMax: ValidatorFn = service.decimaleMax(2);
    expect(decimaleMax(new FormControl(''))).toBeNull();
  });

  it('should pass validation for valid decimal number with dot', () => {
    const decimaleMax: ValidatorFn = service.decimaleMax(2);
    expect(decimaleMax(new FormControl('123.45'))).toBeNull();
  });

  it('should pass validation for valid decimal number with comma', () => {
    const decimaleMax: ValidatorFn = service.decimaleMax(2);
    decimaleMax(new FormControl('123,45'));
    expect(decimaleMax(new FormControl('123,45'))).toBeNull();
  });
});
