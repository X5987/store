import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulComponent } from './formul.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Validators } from '@angular/forms';

describe('FormulComponent', () => {
  let component: FormulComponent;
  let fixture: ComponentFixture<FormulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the lib-grid', () => {
    const compiled = fixture.nativeElement;
    const libGrid = compiled.querySelector('lib-grid');
    expect(libGrid).toBeTruthy();
  });

  it('should have tilesForms variable', () => {
    expect(component.tilesForms).toBeTruthy();
  });

  it('should create an form and must contain these properties', () => {
    const formGroupSource = component.formGroupSource.controls;
    const required = Validators.required;

    expect(formGroupSource['name']).toBeDefined();
    expect(formGroupSource['email']).toBeDefined();
    expect(formGroupSource['age']).toBeDefined();
    expect(formGroupSource['country']).toBeDefined();

    expect(formGroupSource['name']?.hasValidator(required)).toBeTruthy();
    expect(formGroupSource['email'].hasValidator(required)).not.toBeTruthy();
    expect(formGroupSource['age'].hasValidator(required)).toBeDefined();
    expect(formGroupSource['country']?.hasValidator(required)).toBeDefined();
  });

  it('should have formTemplate', () => {
    expect(component.formTemplate).toBeTruthy();
  });
  it('should have formGroupSource', () => {
    expect(component.formGroupSource).toBeTruthy();
  });

  it('should have formGroupSource', () => {
    const fixture = TestBed.createComponent(FormulComponent);
    expect(fixture.componentInstance.appTodo).toBeTruthy();
  });
});
