import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'issues'
  },
  {
    path: 'issues',
    loadComponent: () => import('./app/components/issues-list/issues-list.component').then(m => m.IssueListComponent)
  },
  {
    path: 'issues/new',
    loadComponent: () => import('./app/components/issue-form/issue-form.component').then(m => m.IssueFormComponent)
  },
  {
    path: 'issues/:id',
    loadComponent: () => import('./app/components/issue-detail/issue-detail.component').then(m => m.IssueDetailComponent)
  },
  {
    path: 'issues/:id/edit',
    loadComponent: () => import('./app/components/issue-form/issue-form.component').then(m => m.IssueFormComponent)
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)
  ]
}).catch(err => console.error(err));
