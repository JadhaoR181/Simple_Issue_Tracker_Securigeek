import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field'; // mat-error is structural but no special import needed

import { IssueService } from '../../services/issue.service';
import { Issue, Status, Priority } from '../../models/issue.model';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class IssueFormComponent implements OnInit {
  issueForm: FormGroup;
  isEditMode = false;
  issueId: number | null = null;
  loading = false;
  error = '';

  statuses: Status[] = ['open', 'in_progress', 'closed'];
  priorities: Priority[] = ['low', 'medium', 'high'];

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.issueForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['open', Validators.required],
      priority: ['medium', Validators.required],
      assignee: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.issueId = Number(idParam);
      this.loadIssue();
    }
  }

  loadIssue(): void {
    if (!this.issueId) return;
    this.loading = true;
    this.issueService.getIssueById(this.issueId).subscribe({
      next: (issue) => {
        this.issueForm.patchValue(issue);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load issue';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.issueForm.invalid) return;

    this.loading = true;
    const formValue = this.issueForm.value;

    if (this.isEditMode && this.issueId) {
      this.issueService.updateIssue(this.issueId, formValue).subscribe({
        next: () => this.router.navigate(['/issues', this.issueId]),
        error: () => {
          this.error = 'Failed to update issue';
          this.loading = false;
        }
      });
    } else {
      this.issueService.createIssue(formValue).subscribe({
        next: (issue) => this.router.navigate(['/issues', issue.id]),
        error: () => {
          this.error = 'Failed to create issue';
          this.loading = false;
        }
      });
    }
  }
}
