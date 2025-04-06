import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LoaderDirective } from '@stores/libs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jest.Mocked<Router>;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockRouter = { navigate: jest.fn() } as any;
    mockAuthService = { login: jest.fn() } as any;

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
      ],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('creates component', () => expect(component).toBeTruthy());

    it('initializes login form', () => {
      const { loginForm } = component;
      const username = loginForm.get('username');
      const password = loginForm.get('password');

      expect(loginForm).toBeTruthy();
      expect(username).toBeTruthy();
      expect(password).toBeTruthy();
      expect(username?.value).toBe('admin');
      expect(password?.value).toBe('admin');
      expect(username?.hasValidator(Validators.required)).toBe(true);
      expect(password?.hasValidator(Validators.required)).toBe(true);
    });

    it('initializes signals with defaults', () => {
      expect(component.showPassword()).toBe(false);
      expect(component.message()).toBe('');
      expect(component.loading()).toBe(false);
      expect(component.email()).toBe('');
      expect(component.password()).toBe('');
    });

    it('computes isFormValid', () => {
      component.email.set('test@example.com');
      component.password.set('12345678');
      expect(component.isFormValid()).toBe(true);

      component.email.set('invalid');
      component.password.set('123');
      expect(component.isFormValid()).toBe(false);
    });
  });

  describe('DOM Rendering', () => {
    it('renders login form', () => {
      expect(fixture.debugElement.query(By.css('form'))).toBeDefined();
    });

    it('disables submit button when form is invalid', () => {
      component.loginForm.patchValue({ username: '', password: '' });
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('#submitLogin'));
      expect(button.nativeElement.disabled).toBe(true);
    });

    // it('enables submit button when form is valid', () => {
    //   component.loading.set(false);
    //   component.loginForm.patchValue({ username: 'admin', password: 'admin' });
    //   fixture.detectChanges();
    //   const button = fixture.debugElement.query(By.css('#submitLogin'));
    //   expect(button.nativeElement.disabled).toBe(false);
    // });

    it('shows error message when set', () => {
      component.message.set('Test message');
      fixture.detectChanges();
      const message = fixture.debugElement.query(By.css('.message-error'));
      expect(message.nativeElement.textContent).toContain('Test message');
    });

    it('shows loader when loading', () => {
      component.loading.set(true);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.directive(LoaderDirective))).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('toggles showPassword', () => {
      component.typePassword(false);
      expect(component.showPassword()).toBe(true);
      component.typePassword(true);
      expect(component.showPassword()).toBe(false);
    });

    it('changes input type based on showPassword', () => {
      component.showPassword.set(false);
      expect(component.typeInput()).toBe('password');
      component.showPassword.set(true);
      expect(component.typeInput()).toBe('text');
    });

    // it('calls login on button click', () => {
    //   jest.spyOn(component, 'login');
    //   component.loginForm.patchValue({ username: 'admin', password: 'admin' });
    //   fixture.detectChanges();
    //   fixture.debugElement.query(By.css('#submitLogin')).nativeElement.click();
    //   expect(component.login).toHaveBeenCalled();
    // });
  });

  // describe('Login Logic', () => {
  //   // it('handles successful login', () => {
  //   //   mockAuthService.login.mockReturnValue(of(true));
  //   //   component.loginForm.patchValue({ username: 'admin', password: 'admin' });
  //   //   component.login();
  //   //
  //   //   expect(mockAuthService.login).toHaveBeenCalledWith('admin', 'admin');
  //   //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  //   //   expect(component.loading()).toBe(false);
  //   // });
  //   //
  //   // it('handles failed login', () => {
  //   //   mockAuthService.login.mockReturnValue(of(false));
  //   //   component.loginForm.patchValue({ username: 'admin', password: 'admin' });
  //   //   component.login();
  //   //
  //   //   expect(mockAuthService.login).toHaveBeenCalledWith('admin', 'admin');
  //   //   expect(component.message()).toBe('Identifiants / Mot de passe incorrects.');
  //   //   expect(component.loading()).toBe(false);
  //   //   expect(component.loginForm.value).toEqual({ username: null, password: null });
  //   // });
  // });

  describe('Edge Cases', () => {
    it('handles AuthService error', () => {
      mockAuthService.login.mockReturnValue(of(false));
      component.login();
      expect(component.message()).toBe('Identifiants / Mot de passe incorrects.');
      expect(component.loading()).toBe(false);
    });
  });
});
