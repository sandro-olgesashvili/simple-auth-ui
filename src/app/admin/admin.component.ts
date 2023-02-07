import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { AddProduct } from '../interface/add-product';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  providers: [MessageService],
  styles: [
    `
      :host ::ng-deep .p-cell-editing {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    `,
  ],
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  products1!: AddProduct[];

  products2!: AddProduct[];

  statuses!: SelectItem[];

  addObj: AddProduct = {
    productName: '',
    quantity: 0,
    price: 0,
  };

  clonedProducts: { [s: string]: AddProduct } = {};

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.authService.getProd().subscribe((x) => (this.products1 = x));
    this.authService.getProd().subscribe((x) => (this.products2 = x));

    this.statuses = [
      { label: 10, value: 10 },
      { label: 20, value: 20 },
      { label: 30, value: 30 },
    ];
  }

  onRowEditInit(product: AddProduct) {
    this.clonedProducts[product.id!] = { ...product };
  }

  onRowEditSave(product: AddProduct) {
    if (product.price > 0) {
      delete this.clonedProducts[product.id!];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product is updated',
      });
      this.authService.updateProd(product).subscribe();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid Price',
      });
    }
  }

  onRowEditCancel(product: AddProduct, index: number) {
    this.products2[index] = this.clonedProducts[product.id!];
    delete this.products2[product.id!];
  }

  deleteProd(data: AddProduct) {
    this.authService
      .deleteProduct(data.productName)
      .subscribe(
        (x) =>
          (this.products2 = this.products2.filter(
            (x) => x.productName !== data.productName
          ))
      );
  }

  addProduct() {
    if (
      this.addObj.productName.trim() &&
      this.addObj.price > 0 &&
      this.addObj.quantity > 0
    ) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'პროდუქტუ დამატებულია',
      });
      this.authService
        .addProduct(this.addObj)
        .subscribe((x) => this.products2.push(x));
      this.addObj.productName = '';
      this.addObj.price = 0;
      this.addObj.quantity = 0;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'შეავსეთ ყველა ველი',
      });
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }
}
