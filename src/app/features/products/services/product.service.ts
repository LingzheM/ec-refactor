// src/app/features/products/services/product.service.ts
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private base = `/products`;
  // 本来は環境変数で切り替えられるようにしても良い
  private useMock = true;

  /** 開発用モックデータ */
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'モック商品A',
      description: '開発中表示用サンプルA',
      price: 1200,
      imageUrl: 'assets/mock-product-a.jpg',
      stock: 15,
      category: 'サンプル'
    },
    {
      id: '2',
      name: 'モック商品B',
      description: '開発中表示用サンプルB',
      price: 3400,
      imageUrl: 'assets/mock-product-b.jpg',
      stock: 8,
      category: 'サンプル'
    }
    // 必要に応じて増やす
  ];

  constructor(
    private http: HttpClient  // HttpClientModule は不要になります
  ) {}

  /** 商品一覧取得 */
  list(): Observable<Product[]> {
    if (this.useMock) {
      return of(this.mockProducts);
    }
    // 本番接続時は ↓ を有効化
    // return this.http.get<Product[]>(`${environment.apiUrl}/products`);
    return of([]); // フォールバック
  }

  search(query: string): Observable<Product[]> {
    if (this.useMock) {
      const q = query.trim().toLocaleLowerCase();
      return of(
        this.mockProducts.filter(p => p.name.toLowerCase().includes(q) || (p.description?.toLowerCase().includes(q) ?? false))
      ).pipe(delay(200));
    }
    return this.http.get<Product[]>(`/products`, {
      params: {q: query}
    });
  }

  getById(id: string): Observable<Product> {
    if (this.useMock) {
      const product = this.mockProducts.find(p => p.id === id);
      // 存在しない場合はエラーを投げてもよい
      if (!product) {
        throw new Error(`モックデータにID=${id}の商品が見つかりません`);
      }
      return of(product).pipe(delay(300));
    }
    // 本番用API呼び出し
    return this.http.get<Product>(`/products/${id}`);
  }
}
