import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';

interface IssueListResponse {
  total: number;
  page: number;
  page_size: number;
  items: Issue[];
}

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private baseUrl = 'http://localhost:8000';  // Use localhost instead of 127.0.0.1  // FastAPI backend

  constructor(private http: HttpClient) {}

  getIssues(
    q?: string,
    status?: string,
    priority?: string,
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'created_at',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Observable<IssueListResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('page_size', pageSize)
      .set('sort_by', sortBy)
      .set('sort_order', sortOrder);

    if (q) params = params.set('q', q);
    if (status) params = params.set('status', status);
    if (priority) params = params.set('priority', priority);

    return this.http.get<IssueListResponse>(`${this.baseUrl}/issues`, { params });
  }

  getIssueById(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.baseUrl}/issues/${id}`);
  }

  createIssue(issue: Partial<Issue>): Observable<Issue> {
    return this.http.post<Issue>(`${this.baseUrl}/issues`, issue);
  }

  updateIssue(id: number, issue: Partial<Issue>): Observable<Issue> {
    return this.http.put<Issue>(`${this.baseUrl}/issues/${id}`, issue);
  }
}
