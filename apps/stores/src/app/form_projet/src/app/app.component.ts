import { Component } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@stores/libs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, AppRoutingModule, HeaderComponent],
  template: ` <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'form_projet';
}
