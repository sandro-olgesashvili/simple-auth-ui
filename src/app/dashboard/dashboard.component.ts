import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddProduct } from '../interface/add-product';
import { OrderAdd } from '../interface/order-add';
import { ProductMain } from '../interface/product';
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

  productName: string = '';
  quantity: number = 1;
  price: number = 1;

  onOff: boolean = false;

  prodArr: AddProduct[] = [];

  cartProd: ProductMain[] = [];

  message: string = '';
  messageAdd: string = '';
  updatemsg: string = '';
  updateProdmsg:string =''
  

  sendData: AddProduct = {
    productName: '',
    quantity: 0,
    price: 0,
  };

  ls = JSON.parse(localStorage.getItem('user') || '');

  ngOnInit(): void {
    this.uiService.sendMess(true);

    this.authService.getProd().subscribe((x) => {
      this.prodArr = x;
      console.log(x);
    });

    this.authService.getOrders().subscribe((x) => {
      this.cartProd = x;
      console.log(x);
    });
  }

  plus(nm: string) {
    this.prodArr.map((item) => {
      if (item.productName === nm && item.quantity !== 0) {
        item.quantity--;
        this.cartProd.map((item) =>
          item.productName === nm ? item.quantity++ : item
        );
      }
    });
  }
  subtract(nm: string) {
    this.prodArr.map((item) =>
      item.productName === nm ? item.quantity++ : item
    );

    this.cartProd.map((item) =>
      item.productName === nm ? item.quantity-- : item
    );
  }

  remove(nm: string) {
    const oa: OrderAdd = {
      productName: nm,
    };

    let number = 0;

    this.cartProd.map((item) =>
      item.productName === nm ? (number = item.quantity) : item
    );

    this.prodArr.map((item) =>
      item.productName === nm ? (item.quantity += number) : item
    );

    this.authService.deleteProd(oa).subscribe((x) => {
      this.cartProd = this.cartProd.filter((item) => item.productName !== nm);
    });
  }

  addProduct(data: AddProduct) {
    const oa: OrderAdd = {
      productName: data.productName,
    };

    let check: any = this.prodArr.find(
      (item) => item.productName === data.productName
    );

    if (
      !this.cartProd.some((x) => x.productName === data.productName) &&
      check.quantity > 0
    ) {
      this.authService.addOrder(oa).subscribe((x) => {
        this.cartProd.push(x);
        this.prodArr.map((item) =>
          item.productName === data.productName ? item.quantity-- : item
        );
      });
    } else {
      if (check.quantity <= 0) {
        this.message = 'პროდუქტის რაოდენობა არ არის';
      } else {
        this.message = 'პროდუქტი უკვე დამატებულია';
      }

      setTimeout(() => {
        this.message = '';
      }, 2000);
    }
  }

  onSubmit() {
    const data: AddProduct = {
      productName: this.productName,
      quantity: this.quantity,
      price: this.price,
    };
    if (!this.productName.trim() || this.quantity <= 0 || this.price <= 0) {
      this.messageAdd = 'შეავსეთ ყველა ველი';
      setTimeout(() => {
        this.messageAdd = '';
      }, 2000);
      return;
    }

    if (
      !this.prodArr.some(
        (x) => x.productName.toLowerCase() === data.productName.toLowerCase()
      )
    ) {
      this.authService.addProduct(data).subscribe((x) => {
        this.prodArr.push(x);
      });

      this.productName = '';
      this.quantity = 1;
      this.price = 1;
    } else {
      this.messageAdd = 'პროდუქტი უკვე დამატებულია';
      setTimeout(() => {
        this.messageAdd = '';
      }, 2000);
    }
  }

  deleteProduct(data: string) {
    this.authService.deleteProduct(data).subscribe((x) => {
      x
        ? (this.prodArr = this.prodArr.filter((x) => x.productName !== data))
        : this.prodArr;
    });
  }

  updateSave() {
    this.authService.updateSave(this.cartProd).subscribe(() => {
      this.updatemsg = 'განახლებულია';
    });

    setTimeout(() => {
      this.updatemsg = '';
    }, 2000);
  }

  producteUpdate(data: AddProduct) {
    this.onOff = true;

    this.sendData.productName = data.productName;
    this.sendData.price = data.price;
    this.sendData.quantity = data.quantity;
    this.sendData.authId = data.authId;
    this.sendData.id = data.id;
  }

  onUpdate() {
    const prod = this.prodArr.find((item) => item.id === this.sendData.id);

    prod!.price = this.sendData.price;
    prod!.quantity = this.sendData.quantity;

    
    const data: AddProduct = { ...this.sendData };
    
    if (data.quantity <= 0 || data.price <= 0 || !data.productName.trim()) {
      this.updateProdmsg = 'შეავსეთ ყველა ველი'
      setTimeout(() => {
        this.updateProdmsg = ''
      }, 2000);
    } else {
      prod!.productName = this.sendData.productName;
      prod!.price = this.sendData.price;
      prod!.quantity = this.sendData.quantity;

      this.authService.updateProd(data).subscribe((x) => console.log(x));
      this.onOff = false;
    }
  }

  logout() {
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }
}
