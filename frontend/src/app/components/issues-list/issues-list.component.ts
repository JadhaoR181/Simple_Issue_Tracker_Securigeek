import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue.model';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
  ]
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  total = 0;
  page = 1;
  pageSize = 10;

  searchText = '';
  filterStatus = '';
  filterPriority = '';
  sortBy = 'created_at';
  sortOrder: 'desc' | 'asc' = 'asc';

  displayedColumns: string[] = ['id', 'title', 'status', 'priority', 'assignee', 'updated_at', 'actions'];

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.issueService.getIssues(
      this.searchText,
      this.filterStatus,
      this.filterPriority,
      this.page,
      this.pageSize,
      this.sortBy,
      this.sortOrder
    ).subscribe(res => {
      this.issues = res.items;
      this.total = res.total;
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadIssues();
  }

  onSearch(): void {
    this.page = 1;
    this.loadIssues();
  }

  onSort(column: string): void {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'desc';
    }
    this.loadIssues();
  }
}
