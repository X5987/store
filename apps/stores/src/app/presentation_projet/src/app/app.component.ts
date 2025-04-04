import { Component } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, AppRoutingModule],
  template: ` <router-outlet></router-outlet>`,
})
export class AppComponent {}
