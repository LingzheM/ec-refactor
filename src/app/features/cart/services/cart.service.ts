import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { delay } from "rxjs";
import { Product } from "../../products/models/product.model";
import { Cart } from "../models/cart.model";

@Injectable({ providedIn: 'root' })
export class CartService {
    private useMock = true;

    private mockCart: Cart = {
        items: [
          {
            id: 'item1',
            product: {
              id: '1',
              name: 'モック商品A',
              price: 1200,
              imageUrl: 'assets/mock-product-a.jpg',
              description: ''
            },
            quantity: 2
          },
          {
            id: 'item2',
            product: {
              id: '2',
              name: 'モック商品B',
              price: 3400,
              imageUrl: 'assets/mock-product-b.jpg',
              description: ''
            },
            quantity: 1
          }
        ]
      };

    constructor(private http: HttpClient) {}

    getCart(): Observable<Cart> {
        if (this.useMock) {
            return of(this.mockCart).pipe(delay(300));
        }
        return this.http.get<Cart>(`/cart`);
    }
    

    updateItem(itemId: string, quantity: number): Observable<Cart> {
        if (this.useMock) {
            if (quantity <= 0) {
                this.mockCart.items = this.mockCart.items.filter(i => i.id !== itemId);
            } else {
                const item = this.mockCart.items.find(i => i.id === itemId);
                if (item) {
                    item.quantity = quantity;
                }
            }
            return of(this.mockCart).pipe(delay(300));
        }
        return this.http.patch<Cart>(`/cart/items/${itemId}`, { quantity });
    }

    removeItem(itemId: string): Observable<Cart> {
        if (this.useMock) {
          this.mockCart.items = this.mockCart.items.filter(i => i.id !== itemId);
          return of(this.mockCart).pipe(delay(300));
        }
        // 本番 API 側で DELETE を使う場合
        return this.http.delete<Cart>(`/cart/items/${itemId}`);
    }

    addItem(productId: string, quantity = 1): Observable<Cart> {
      if (this.useMock) {
        // モック：既存アイテムに追加、なければ新規追加
        const item = this.mockCart.items.find(i => i.product.id === productId);
        if (item) {
          item.quantity += quantity;
        } else {
          this.mockCart.items.push({
            id: `item${Date.now()}`,
            product: { id: productId, name: '※モック', price: 0, imageUrl: '', description: '' },
            quantity
          });
        }
        return of(this.mockCart).pipe(delay(300));
      }
      return this.http.post<Cart>(`/cart/items`, { productId, quantity });
    }
}