export interface AddProduct {
  id?: number;
  productName: string;
  quantity: number;
  price: number;
  authId?: number;
  imageName?: string;
  imageSrc?: string;
  imageFile?: File | null;
}
export interface User {
  name: string;
  code: number;
}
