export interface Voucher {
  price: number;
}
export interface GetVoucher {
  id: number;
  voucherCode: string;
  price: number;
  used: boolean;
  authId: number;
}

export interface UseVoucher {
  voucherCode: string;
  orderId: number;
}
