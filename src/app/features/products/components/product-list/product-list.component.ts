// src/app/features/products/components/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../../cart/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  keyword = '';

  constructor(
    private svc: ProductService,
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.list().subscribe({
      next: data => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        alert('商品取得失敗');
        this.loading = false;
      }
    });
  }

  onSearch(q: string) {
    this.loading = true;
    this.svc.search(q).subscribe({
      next: data => { this.products = data; this.loading = false; },
      error: () => { alert('検索に失敗しました'); this.loading = false; }
    });
  }

  goDetail(id: string) {
    this.router.navigate(['/products', id]);
  }

  addToCart(id: string) {
    this.cart.addItem(id, 1).subscribe({
      next: () => alert('カートに追加しました'),
      error: () => alert('カート追加失敗')
    });
  }
}
