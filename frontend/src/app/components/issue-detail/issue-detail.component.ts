import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue.model';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ]
})
export class IssueDetailComponent implements OnInit {
  issue: Issue | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.issueService.getIssueById(id).subscribe({
        next: (data) => {
          this.issue = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load issue.';
          this.loading = false;
        }
      });
    }
  }
}
