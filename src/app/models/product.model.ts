import { Comic } from "./comic.model";

export interface Product extends Pick<Comic, 'id' | 'prices' | 'title' | 'thumbnail' | 'rare'> {
  coupon: boolean
  quantity: number
  price: number
}

