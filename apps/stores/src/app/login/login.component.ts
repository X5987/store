import {
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter } from '@angular/material/card';
import { InputTextComponent, LoaderDirective } from '@stores/libs';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatCardContent,
    InputTextComponent,
    ReactiveFormsModule,
    MatButton,
    RouterModule,
    LoaderDirective,
    MatCardFooter,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  typeInput = linkedSignal(() => {
    return this.showPassword() ? 'text' : 'password';
  });
  showPassword = signal(false);
  message = signal('');
  loading = signal(false);
  // Vous êtes déconnecté. todo a implementer pour le logout

  email = signal('');
  password = signal('');
  isFormValid = computed(
    () => this.email().includes('@') && this.password().length >= 8,
  );

  loginForm = this.fb.group({
    username: new FormControl('admin', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    password: new FormControl('admin', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  login() {
    const login: string = this.loginForm.controls.username.value!;
    const pass: string = this.loginForm.controls.password.value!;
    this.message.set('Tentative de connexion.');
    this.loading.set(true);

    this.authService.login(login, pass).subscribe((isLoggednIn) => {
      if (isLoggednIn) {
        this.router.navigate(['/dashboard']);
      } else {
        this.loginForm.reset();
        this.loading.set(false);
        this.message.set('Identifiants / Mot de passe incorrects.');
      }
    });
  }

  typePassword(showPassword: boolean) {
    this.showPassword.set(!showPassword);
  }
}
