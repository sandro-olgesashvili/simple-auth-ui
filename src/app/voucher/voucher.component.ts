import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetVoucher } from '../interface/voucher';
import { VoucherService } from '../service/voucher.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css'],
})
export class VoucherComponent implements OnInit {
  price: number = 1;

  voucherArr: GetVoucher[] = [];

  constructor(private voucherService: VoucherService, private router: Router) {}

  ngOnInit(): void {
    this.voucherService.getVoucher().subscribe((x) => (this.voucherArr = x));
  }

  onSubmit() {
    if (this.price > 0) {
      this.voucherService
        .createVoucher({ price: this.price })
        .subscribe((x) => this.voucherArr.push(x));

      this.price = 1;
    }
  }

  onDelete(data: string) {
    this.voucherService
      .deleteVoucher(data)
      .subscribe(
        (x) =>
          (this.voucherArr = this.voucherArr.filter((item) => item.id !== x.id))
      );
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}
