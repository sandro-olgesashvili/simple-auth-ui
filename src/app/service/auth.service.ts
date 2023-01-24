import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authobj } from '../interface/authobj';
import { AddProduct } from '../interface/add-product';
import { UserProd } from '../interface/user-prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlLogin = 'https://localhost:7102/api/auth';
  private urlReg = 'https://localhost:7102/api/auth/register';

  private urlProd = 'https://localhost:7102/api/auth/products?';
  private addProdUrl = 'https://localhost:7102/api/auth/product';
  private deleteUrl = 'https://localhost:7102/api/auth/products?';

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  reqLogin(data: Authobj): Observable<any> {
    return this.http.post(this.urlLogin, data, { headers: this.httpHeader });
  }

  reqRegister(data: Authobj): Observable<any> {
    return this.http.post(this.urlReg, data, { headers: this.httpHeader });
  }
  update(data: Authobj): Observable<any> {
    return this.http.put(this.urlLogin, data, { headers: this.httpHeader });
  }
  getProd(num: string): Observable<any> {
    return this.http.get(`${this.urlProd}Id=${num}`);
  }
  addProd(data: AddProduct): Observable<any> {
    return this.http.post(this.addProdUrl, data, { headers: this.httpHeader });
  }
  deleteProd(data: UserProd): Observable<any> {
    return this.http.delete(
      `${this.deleteUrl}UserId=${data.userId}&ProductId=${data.productId}`,
      { headers: this.httpHeader }
    );
  }
}
