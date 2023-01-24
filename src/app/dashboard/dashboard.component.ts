import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddProduct, AddProduct2 } from '../interface/add-product';
import { Product } from '../interface/product';
import { UserProd } from '../interface/user-prod';
import { AuthService } from '../service/auth.service';
import { UiService } from '../service/ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private uiService: UiService,
    private authService: AuthService
  ) {}

  prodArr: AddProduct[] = [
    { productName: 'apple', quantity: 1, price: 200 },
    { productName: 'samsung', quantity: 1, price: 300 },
    { productName: 'lenovo', quantity: 1, price: 400 },
    { productName: 'asus', quantity: 1, price: 500 },
  ];

  cartProd: Product[] = [];

  message: string = '';

  ngOnInit(): void {
    this.uiService.sendMess(this.router.url);
    const user = localStorage.getItem('user');
    if (user === null) {
      this.router.navigate(['/']);
    }

    const user2 = JSON.parse(localStorage.getItem('user') || '');

    this.getProd(user2.id);
  }

  plus(nm: string) {
    this.cartProd.map((item) =>
      item.productName === nm ? item.quantity++ : item
    );
  }
  subtract(nm: string) {
    this.cartProd.map((item) =>
      item.productName === nm ? item.quantity-- : item
    );
  }

  remove(nm: number) {
    const data: UserProd = {
      userId: JSON.parse(localStorage.getItem('user') || '').id,
      productId: nm,
    };

    console.log(data)
    this.authService.deleteProd(data).subscribe();
    this.cartProd = this.cartProd.filter((x) => x.id !== nm);
  }

  getProd(num: string) {
    this.authService.getProd(num).subscribe((x) => {
      this.cartProd = x;
      console.log(this.cartProd);
    });
  }

  addProduct(data: AddProduct) {
    const sendData: AddProduct2 = {
      productName: data.productName,
      quantity: data.quantity,
      price: data.price,
      authId: JSON.parse(localStorage.getItem('user') || '').id,
    };

    if (!this.cartProd.some((x) => x.productName === data.productName)) {
      this.authService.addProd(sendData).subscribe((x) => {
        this.cartProd.push(x);
      });
    } else {
      this.message = 'პროდუქტი უკვე დამატებულია';

      setTimeout(() => {
        this.message = '';
      }, 2000);
    }
  }
}
