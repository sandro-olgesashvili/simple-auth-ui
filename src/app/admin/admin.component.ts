import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { AddProduct, User } from '../interface/add-product';
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

  @ViewChild('fileUpload') fileUpload: any;

  products2!: AddProduct[];

  usersArr: User[] = [];

  selectedUser!: User;

  statuses!: SelectItem[];

  formData: FormData = new FormData();

  addObj: AddProduct = {
    productName: '',
    quantity: 0,
    price: 0,
    imageName: '',
    imageFile: null,
  };

  clonedProducts: { [s: string]: AddProduct } = {};

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.authService.getProd().subscribe((x) => {
      this.products1 = x;
      console.log(x);
    });
    this.authService.getProd().subscribe((x) => (this.products2 = x));
    this.authService.getUsers().subscribe((x) => {
      this.usersArr = x;
    });

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
    const arr = this.products1.filter((item) => item.id !== product.id);

    if (
      product.price > 0 &&
      !arr.some((item) => item.productName === product.productName)
    ) {
      delete this.clonedProducts[product.id!];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product is updated',
      });
      this.authService.updateProd(product).subscribe();
    } else {
      this.products2 = this.products1;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid',
      });
    }
  }

  onRowEditCancel(product: AddProduct, index: number) {
    this.products2[index] = this.clonedProducts[product.id!];
    delete this.products2[product.id!];
  }

  deleteProd(data: AddProduct) {
    let data2 = { productName: data.productName, imageName: data.imageName };
    this.authService
      .deleteProduct(data2)
      .subscribe(
        (x) =>
          (this.products2 = this.products2.filter(
            (item) => item.id !== data.id
          ))
      );
  }

  addProduct() {
    if (
      this.addObj.productName.trim() &&
      this.addObj.price > 0 &&
      this.addObj.quantity > 0 &&
      this.addObj.imageFile !== null
    ) {
      this.formData.append('productName', this.addObj.productName);
      this.formData.append('quantity', this.addObj.quantity.toString());
      this.formData.append('price', this.addObj.price.toString());
      this.formData.append('imageName', this.addObj.imageName!);

      this.authService
        .addProduct(this.formData)
        .subscribe((x) => this.products2.push(x));

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'პროდუქტუ დამატებულია',
      });

      this.fileUpload.clear();
      this.addObj.productName = '';
      this.addObj.price = 0;
      this.addObj.quantity = 0;
      this.addObj.imageFile = null;
      this.formData = new FormData();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'შეავსეთ ყველა ველი',
      });
    }
  }

  myUploader(event: any) {
    this.addObj.imageName = event.currentFiles[0].name;
    this.formData.append('imageFile', event.currentFiles[0]);
    this.addObj.imageFile = event.currentFiles[0];

    console.log(this.addObj);

    console.log(this.addObj.imageFile);
  }

  logout() {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }

  onChange() {
    if (this.selectedUser !== null) {
      this.products2 = this.products2.filter(
        (x) => x.authId === this.selectedUser.code
      );
    } else {
      this.products2 = this.products1;
    }
  }

  onClear(event: any) {
    this.addObj.imageFile = null;
  }

  goBack() {
    this.route.navigate(['/voucher']);
  }
  soldList() {
    this.route.navigate(['/sold']);
  }
  report() {
    this.route.navigate(['/chart']);
  }
}
