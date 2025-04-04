// import { TestBed } from '@angular/core/testing';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { of } from 'rxjs';
// import { DialogComponent, DialogService } from '@stores/libs';

describe('DialogService', () => {
  // let service: DialogService;
  // let dialogSpy: jest.Mocked<MatDialog>;
  //
  // beforeEach(() => {
  //   // Utilisation de jest.fn() pour mocker le service MatDialog
  //   const spy = {
  //     open: jest.fn(), // Mock de la méthode `open` du MatDialog
  //   };
  //
  //   // Configuration du TestBed avec le service DialogService et le MatDialog mocké
  //   TestBed.configureTestingModule({
  //     providers: [DialogService, { provide: MatDialog, useValue: spy }],
  //   });
  //
  //   service = TestBed.inject(DialogService); // Injecte le service à tester
  //   dialogSpy = TestBed.inject(MatDialog) as jest.Mocked<MatDialog>; // Injecte et cast MatDialog en jest.Mocked
  // });
  //
  // it('should be created', () => {
  //   expect(service).toBeTruthy(); // Vérifie que le service est bien créé
  // });
  //
  // // it('should open a dialog', () => {
  // //   // Créer un mock pour `MatDialogRef` avec une méthode `afterClosed` retournant un observable
  // //   const dialogRefSpyObj: MatDialogRef<any> = {
  // //     afterClosed: jest.fn().mockReturnValue(of('result')), // Mock de afterClosed
  // //   } as jest.Mocked<MatDialogRef<any>>;
  // //
  // //   // Configurer `dialogSpy.open` pour retourner `dialogRefSpyObj` lorsqu'il est appelé
  // //   dialogSpy.open.mockReturnValue(dialogRefSpyObj);
  // //
  // //   // Appeler la méthode `openDialog` de `DialogService`
  // //   service.openDialog();
  // //
  // //   // Vérifie que `dialogSpy.open` a été appelé avec le bon composant (DialogComponent)
  // //   expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent);
  // // });
});
