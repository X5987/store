import { Component, computed, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MenuSidebarComponent } from './components/menu/menu-sidebar.component';
import { MatIconButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app.routes';
import { HeaderComponent } from '@stores/libs';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatToolbar,
    MatSidenavModule,
    MatIconModule,
    MenuSidebarComponent,
    MatIconButton,
    HeaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  collapse: WritableSignal<boolean> = signal(false);
  sidenavWidth = computed(() => (this.collapse() ? '65px' : '240px'));
}
