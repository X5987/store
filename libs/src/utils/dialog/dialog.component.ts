import { Component, Input } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'lib-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ]
})
export class DialogComponent {
  @Input() title: string = '';
  @Input() texte: string = '';
  @Input() close: string = 'Close';
  @Input() valide: string = 'Valide';
}
