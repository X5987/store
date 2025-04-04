import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

export const SnackBarStats = {
  success: 'snackbar-success',
  error: 'snackbar-error',
  warning: 'snackbar-warning',
  info: 'snackbar-info',
};

export interface SnackBar {
  message: string;
  action: string;
  classe: keyof typeof SnackBarStats; // Utilise les clés de SnackBarStats comme type
}

@Component({
  selector: 'lib-notif',
  templateUrl: './notif.component.html',
  styleUrl: './notif.component.scss',
  imports: [MatFormFieldModule, NgClass, MatIcon],
})
export class NotifComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBar) {}

  action() {}
}
