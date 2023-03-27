import { CartService } from './cart.service';
import { Product } from '../../models/product.model';

describe('CartService', () => {
  let cartService: CartService;

  beforeEach(() => {
    cartService = new CartService();
  });

  it('should be created', () => {
    expect(cartService).toBeTruthy();
  });

  describe('addToCart', () => {
    it('should add new items to the cart', () => {
      const product: Product = {
        id: '1',
        title: 'Test Product',
        thumbnail: {
          path: 'test',
          extension: 'jpg'
        },
        rare: false,
        prices: [
          {
            type: 'regular',
            price: '10.00'
          }
        ],
        coupon: false,
        quantity: 1,
        price: 10.00
      };

      cartService.addToCart(product);
      cartService.getItems().subscribe(items => {
        expect(items.length).toBe(1);
        expect(items[0]).toEqual(product);
      });
    });

    it('should update the quantity of existing items in the cart', () => {
      const product: Product = {
        id: '1',
        title: 'Test Product',
        thumbnail: {
          path: 'test',
          extension: 'jpg'
        },
        rare: false,
        prices: [
          {
            type: 'regular',
            price: '10.00'
          }
        ],
        coupon: false,
        quantity: 1,
        price: 10.00
      };

      cartService.addToCart(product);
      cartService.addToCart(product);
      cartService.getItems().subscribe(items => {
        expect(items.length).toBe(1);
        expect(items[0].quantity).toBe(2);
      });
    });

    it('should update the price of existing items in the cart', () => {
      const product: Product = {
        id: '1',
        title: 'Test Product',
        thumbnail: {
          path: 'test',
          extension: 'jpg'
        },
        rare: false,
        prices: [
          {
            type: 'regular',
            price: '10.00'
          }
        ],
        coupon: false,
        quantity: 1,
        price: 10.00
      };

      cartService.addToCart(product);
      cartService.addToCart(product);
      cartService.getItems().subscribe(items => {
        expect(items.length).toBe(1);
        expect(items[0].price).toBe(20.00);
      });
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the cart', () => {
      const product1: Product = {
        id: '1',
        title: 'Test Product 1',
        thumbnail: {
          path: 'test1',
          extension: 'jpg'
        },
        rare: false,
        prices: [
          {
            type: 'regular',
            price: '10.00'
          }
        ],
        coupon: false,
        quantity: 1,
        price: 10.00
      };

      const product2: Product = {
        id: '2',
        title: 'Test Product 2',
        thumbnail: {
          path: 'test2',
          extension: 'jpg'
        },
        rare: false,
        prices: [
          {
            type: 'regular',
            price: '15.00'
          }
        ],
        coupon: false,
        quantity: 1,
        price: 15.00
      };

      cartService.addToCart(product1);
      cartService.addToCart(product2);
      cartService.removeItem(product1);
      cartService.getItems().subscribe(items => {
        expect(items.length).toBe(1);
        expect(items[0]).toEqual(product2);
      });
    });

  })
})
