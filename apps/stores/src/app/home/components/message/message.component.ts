import { Component, inject } from '@angular/core';
import { DialogService, NotifService, SnackBarStats } from '@stores/libs';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardModule,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  imports: [
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatButton,
  ],
})
export class MessageComponent {
  title: string = 'Test Notification';
  readonly dialogService: DialogService = inject(DialogService);
  notifService: NotifService = inject(NotifService);
  fauxText: string =
    '    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin\n' +
    '      literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney\n' +
    '      College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and\n' +
    '      going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes\n' +
    '      from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,\n' +
    '      written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first\n' +
    '      line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n' +
    '\n' +
    '      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32\n' +
    '      and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,\n' +
    '      accompanied by English versions from the 1914 translation by H. Rackham.';

  showAlert() {
    alert('');
  }

  openDialog() {
    this.dialogService.openDialog();
  }

  showNotif() {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      data: {
        message: 'Lorem CACA',
        action: 'close',
        classe: SnackBarStats.success,
      },
      panelClass: SnackBarStats.success,
    };
    this.notifService.openNotif(config.data, config);
  }

  showSuccessNotification() {
    this.notifService.openNotif(
      {
        message: 'Opération réussie!',
        action: 'Fermer',
        classe: SnackBarStats.success,
      },
      {
        panelClass: SnackBarStats.success,
      },
    );
  }

  showErrorNotification() {
    this.notifService.openNotif(
      {
        message: 'Erreur survenue!',
        action: 'Fermer',
        classe: SnackBarStats.error,
      },
      {
        panelClass: SnackBarStats.error,
      },
    );
  }

  showWarningNotification() {
    this.notifService.openNotif(
      { message: 'Info !', action: 'Fermer', classe: SnackBarStats.info },
      {
        panelClass: SnackBarStats.warning,
        duration: 5000,
      },
    );
  }
}
