import { Comic } from "./comic.model";

export interface Product extends Pick<Comic, 'id' | 'prices' | 'title'> {
  rare: boolean
  coupon: boolean
  quantity: number
}

