import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Authobj } from '../interface/authobj';
import { Update } from '../interface/update';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://localhost:7102/api/auth';
  private urlReg = 'https://localhost:7102/api/auth/register';

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  sendReq(data: Authobj): Observable<any> {
    return this.http.post(this.url, data, { headers: this.httpHeader });
  }

  sendReg(data: Authobj): Observable<any> {
    return this.http.post(this.urlReg, data, { headers: this.httpHeader });
  }
  update(data: Update): Observable<any> {
    return this.http.put(this.url, data, { headers: this.httpHeader });
  }
}
