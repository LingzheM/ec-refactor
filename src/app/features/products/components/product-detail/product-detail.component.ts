import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../cart/services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private svc: ProductService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.svc.getById(id).subscribe({
      next: p => { this.product = p; this.loading = false; },
      error: () => { alert('商品詳細取得失敗'); this.loading = false; }
    }); 
  }

  addToCart() {
    if (!this.product) return;
    this.cart.addItem(this.product.id, 1).subscribe({
      next: () => alert('カートに追加しました'),
      error: () => alert('カート追加失敗')
    })
  }

}
