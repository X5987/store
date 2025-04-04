import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// import { DetailsDataResolver } from './components/content/components/list-pokemon/services/details.resolver';

export const routesDashboardPersonal: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/content/content.component').then(
        (m) => m.ContentComponent,
      ),
  },
  {
    path: 'board',
    loadComponent: () =>
      import('./components/content/content.component').then(
        (m) => m.ContentComponent,
      ),
  },
  {
    path: 'content',
    loadComponent: () =>
      import('./components/content/content.component').then(
        (m) => m.ContentComponent,
      ),
  },
  {
    path: `pokemon-details/:id`,
    loadComponent: () =>
      import(
        './components/content/components/list-pokemon/pokemon-details/pokemon-details.component'
      ).then((m) => m.PokemonDetailsComponent),
    // resolve: {
    //   pokemon: DetailsDataResolver,
    // },
  },
  {
    path: 'analyse',
    loadComponent: () =>
      import('./components/analyse/analyse.component').then(
        (m) => m.AnalyseComponent,
      ),
  },
  {
    path: 'comments',
    loadComponent: () =>
      import('./components/ comments/comments.component').then(
        (m) => m.CommentsComponent,
      ),
  },
  {
    path: 'memorizing',
    loadComponent: () =>
      import('./components/memorize/memorize-calendar.component').then(
        (m) => m.MemorizeCalendarComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesDashboardPersonal)],
  exports: [RouterModule],
})
export class DashboardRoutes {}
