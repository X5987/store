import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  subItems?: MenuItem[];
};

@Component({
  selector: 'app-menu-sidebar',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <div class="sidenav-header">
      <img
        class="sidenav-header-picture"
        [height]="profilePictureSize()"
        [width]="profilePictureSize()"
        [src]="pictureSession()"
        [alt]="'avatar'"
      />
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h2>{{ nameSession() }}</h2>
        <p>{{ surnameSession() }}</p>
      </div>
    </div>

    <mat-nav-list>
      @for (item of menuItems(); track item) {
      <a
        mat-list-item
        [routerLink]="item.route"
        routerLinkActive
        #link="routerLinkActive"
        [activated]="link.isActive"
      >
        <mat-icon
          [fontSet]="
            link.isActive ? 'material-icons' : 'material-icons-outlined'
          "
          matListItemIcon
          [class.icon-color-activ]="link.isActive"
          [class.icon-color-inactiv]="!link.isActive"
          >{{ item.icon }}
        </mat-icon>
        <span
          [class.text-inactiv]="!link.isActive"
          [class.text-activ]="link.isActive"
          matListItemTitle
          >{{ item.label }}</span
        >
      </a>
      }
    </mat-nav-list>
  `,
  styleUrl: './menu-sidebar.component.scss',
})
export class MenuSidebarComponent {
  sideNavCollapsed = signal(false);
  pictureSession = signal('https://picsum.photos/seed/picsum/200/300');
  nameSession = signal('John');
  surnameSession = signal('Lorem Ipsum');
  menuItems = signal<MenuItem[]>([
    {
      icon: 'toc',
      label: 'Contenu',
      route: 'content',
    },
    {
      icon: 'monitoring',
      label: 'Analyse',
      route: 'analyse',
    },
    {
      icon: 'chat',
      label: 'Commentaires',
      route: 'comments',
    },
    {
      icon: 'memory',
      label: 'Souvenir calendar',
      route: 'memorizing',
    },
  ]);
  profilePictureSize = signal(100);

  constructor() {}

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
    this.profilePictureSize.set(value ? 32 : 100);
  }
}
