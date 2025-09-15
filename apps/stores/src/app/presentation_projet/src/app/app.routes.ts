import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TableDataResolver } from './form/services/table-data.resolver';
import { FormulService } from '../../../home/services/formul.service';
import { AuthGuard } from '../../../core/auth/auth.guard';

export const routesPresentationProjet: Routes = [
  {
    path: 'presentation',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('../app/form/form.component').then(
        (m) => m.FormComponent,
      ),
    providers: [FormulService],
    resolve: {
      data: TableDataResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesPresentationProjet)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
