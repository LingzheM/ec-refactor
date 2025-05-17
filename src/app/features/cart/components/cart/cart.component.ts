import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  loading = true;

  constructor(private svc: CarService) {}

  ngOnInit(): void {
    this.svc.getCart().subscribe({
      next: c => { this.cart = c; this.loading = false; },
      error: () => { alert('カート取得失敗'); this.loading = false; }
    });
  }

  update(itemId: string, qty: number) {
    this.svc.updateItem(itemId, qty).subscribe({
      next: c => (this.cart = c),
      error: () => alert('更新失敗')
    });
  }

  remove(itemId: string) { this.update(itemId, 0); }
}
