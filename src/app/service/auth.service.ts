import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authobj } from '../interface/authobj';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uri = 'https://localhost:7102/api/auth';

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  sendReq(data: Authobj): Observable<any> {
    return this.http.post(this.uri, data, { headers: this.httpHeader });
  }
}
