import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoldService {

  private soldUrl = "https://localhost:7102/api/SoldProduct";

  private soldDelUrl = "https://localhost:7102/api/SoldProduct?id="

  constructor(private http:HttpClient) { }

  getSoldProduct():Observable<any> {
    return this.http.get(this.soldUrl);
  }

  delSoldProduct(id:number):Observable<any> {
    return this.http.delete(`${this.soldDelUrl}${id}`)
  }

  buyProduct():Observable<any> {
    return this.http.post(this.soldDelUrl, 'payload');
  }

  
}
