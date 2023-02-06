import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authobj } from '../interface/authobj';

import { OrderAdd } from '../interface/order-add';
import { AddProduct } from '../interface/add-product';
import { ProductMain } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlLogin = 'https://localhost:7102/api/auth';
  private urlReg = 'https://localhost:7102/api/auth/register';

  private getProductUrl = 'https://localhost:7102/api/auth/products';

  private addProductUrl = "https://localhost:7102/api/auth/product"

  private getORderUrl = 'https://localhost:7102/api/auth/orders';
  private orderDelUrl = 'https://localhost:7102/api/auth/orders?ProductName='

  private deleteProductUrl = 'https://localhost:7102/api/auth/products?ProductName=';

  private saveChange = 'https://localhost:7102/api/auth/save';

  private updateProdUrl = 'https://localhost:7102/api/auth/update'

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
  getProd(): Observable<any> {
    let httpHeaderAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization":'Bearer ' + JSON.parse(localStorage.getItem('user') || '').token,
    });

    return this.http.get(this.getProductUrl, {headers:httpHeaderAuth});
  }

  getOrders(): Observable<any> {
    let httpHeaderAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + JSON.parse(localStorage.getItem('user') || '').token,
    });
    return this.http.get(this.getORderUrl,{headers: httpHeaderAuth})
  }
  
  addOrder(data: OrderAdd): Observable<any> {
    let httpHeaderAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + JSON.parse(localStorage.getItem('user') || '').token,
    });

    return this.http.post(this.getORderUrl, data , { headers: httpHeaderAuth });
  }

  addProduct(data: AddProduct): Observable<any> {
    let httpHeaderAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + JSON.parse(localStorage.getItem('user') || '').token,
    });

     return this.http.post(this.addProductUrl, data, {headers:httpHeaderAuth}) 
  }

  deleteProd(data: OrderAdd): Observable<any> {
    let httpHeaderAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + JSON.parse(localStorage.getItem('user') || '').token,
    });
    return this.http.delete(
      `${this.orderDelUrl}${data.productName}`,
      { headers: httpHeaderAuth }
    );
  }

  deleteProduct(data: string) :Observable<any> {
    let httpHeaderAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + JSON.parse(localStorage.getItem('user') || '').token,
    });
    return this.http.delete(`${this.deleteProductUrl}${data}`, {headers: httpHeaderAuth})
  }

  updateSave(data:ProductMain[]): Observable<any> {
    let httpHeaderAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + JSON.parse(localStorage.getItem('user') || '').token,
    });
    return this.http.patch(this.saveChange, data, {headers: httpHeaderAuth} )
  }

  updateProd(data:AddProduct):Observable<any> {
    let httpHeaderAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + JSON.parse(localStorage.getItem('user') || '').token,
    });
    return this.http.patch(this.updateProdUrl, data, {headers:httpHeaderAuth})
  }
}
