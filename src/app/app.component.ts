import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './core/store/auth/auth.actions';
import { selectIsLoggedIn } from './core/store/auth/auth.selectors';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ec-refactor';
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectIsLoggedIn).pipe(
      take(1),
      filter(isLoggedIn => isLoggedIn)
    ).subscribe(() => {
      this.store.dispatch(AuthActions.loadProfile());
    });
  }
}
