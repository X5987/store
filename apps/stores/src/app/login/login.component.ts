import {
  Component,
  computed,
  inject,
  linkedSignal, model, Signal,
  signal, WritableSignal
} from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter } from '@angular/material/card';
import { InputTextComponent, LoaderDirective } from '@stores/libs';
import {
  FormBuilder,
  FormControl,
  FormsModule, NgForm,
  ReactiveFormsModule,
  Validators
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

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value); // { username: '...', password: '...' }
    }

  }

  loginForm = inject(FormBuilder).group({
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
    const login: string | null = this.loginForm.controls.username.value;
    const pass: string | null = this.loginForm.controls.password.value;
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

  protected readonly HTMLInputElement = HTMLInputElement;
}
