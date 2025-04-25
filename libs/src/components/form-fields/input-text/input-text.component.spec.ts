import { ComponentFixture, TestBed } from '@angular/core/testing';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { InputTextComponent } from '@stores/libs';
import { ReactiveFormsModule, FormControl, Validators, NgControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { input } from '@angular/core';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {

    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl('');
        viewToModelUpdate() {}
      },
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule,
        InputTextComponent,
      ],
      providers: [{ provide: NgControl}]
    })
      .overrideComponent(InputTextComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] },
      }).compileComponents();

    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;

    // Simuler les inputs
    component.label = input('Test Label');
    component.placeholder = input('Test Placeholder');
    component.typePassword = input(false);
    component.control.setValue(
      input(new FormControl('test', [Validators.required, Validators.minLength(3)]))
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display label and placeholder', () => {
    const label = fixture.nativeElement.querySelector('mat-label');
    const input = fixture.nativeElement.querySelector('input');
    expect(label.textContent).toBe('Test Label');
    expect(input.placeholder).toBe('Test Placeholder');
  });

  it('should transform input to uppercase when upperCaseActive is true', () => {
    component.upperCaseActive = input(true);
    component.control.setValue('test');
    fixture.detectChanges();
    expect(component.control.value).toBe('TEST');
  });

  it('should show clear button when there is a value and typePassword is false', () => {
    component.control.setValue('test');
    fixture.detectChanges();
    const clearButton = fixture.nativeElement.querySelector(
      'button[aria-label="Clear input"]'
    );
    expect(clearButton).toBeTruthy();
  });

  it('should toggle password visibility when typePassword is true', () => {
    component.typePassword = input(true);
    component.control.setValue('test');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      'button[mat-icon-button]'
    );
    button.click();
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelector('input');
    expect(inputs.type).toBe('text');
    expect(component.stateShowText()).toBe(true);
  });

  it('should display error message when control is invalid', () => {
    component.control.markAsTouched();
    component.control.setValue('');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('mat-error');
    expect(error.textContent).toContain('Test Label est requis');
  });
});
