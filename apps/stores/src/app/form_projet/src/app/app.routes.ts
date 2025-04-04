import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { routesDashboardPersonal } from './dashboard/dashboard.routes';
import { MoviesStore } from './dashboard/components/content/components/stores/movies.store';
import { AuthGuard } from '../../../core/auth/auth.guard';

export const routesFormProjet: Routes = [
  {
    providers: [MoviesStore],
    canActivate: [AuthGuard],
    path: 'personal',
    loadComponent: () =>
      import('../app/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
    children: [...routesDashboardPersonal],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesFormProjet)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
