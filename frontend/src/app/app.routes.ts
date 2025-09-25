// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { IssueListComponent } from './components/issues-list/issues-list.component';
import { IssueDetailComponent } from './components/issue-detail/issue-detail.component';
import { IssueFormComponent } from './components/issue-form/issue-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'issues', pathMatch: 'full' },
  { path: 'issues', component: IssueListComponent },
  { path: 'issues/new', component: IssueFormComponent },   // 👈 NEW
  { path: 'issues/:id', component: IssueDetailComponent },
  { path: 'issues/:id/edit', component: IssueFormComponent },
];
