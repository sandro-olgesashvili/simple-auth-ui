import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reportUrl = 'https://localhost:7102/api/Reports';

  constructor(private http: HttpClient) {}

  getReport(): Observable<any> {
    return this.http.get(this.reportUrl);
  }
}
