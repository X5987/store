import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  NotifComponent,
  SnackBarStats,
} from '../../utils/notif/notif.component';

@Injectable({
  providedIn: 'root',
})
export class NotifService {
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  defautConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    data: {
      message: 'Lorem Ipsum',
      action: 'close',
      classe: SnackBarStats.success,
    },
    panelClass: SnackBarStats.success,
  };

  openNotif(
    data: object = this.defautConfig.data,
    config: MatSnackBarConfig = this.defautConfig,
  ) {
    const defaultConfig: MatSnackBarConfig = {
      data: data,
      duration: 3000,
    };

    this._snackBar.openFromComponent(NotifComponent, {
      ...defaultConfig,
      ...config,
    });
  }
}
