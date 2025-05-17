// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) =>
        this.auth.login(email, password).pipe(
          map(() => {
            const user = this.auth.getProfileSync(); // sync getter or separate API call
            const token = localStorage.getItem('access_token')!;
            return AuthActions.loginSuccess({ user, token });
          }),
          catchError(err => of(AuthActions.loginFailure({ error: err.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/products']))
      ),
    { dispatch: false }
  );

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadProfile),
      exhaustMap(() =>
        this.auth.getProfile().pipe(
          map(user => AuthActions.loadProfileSuccess({ user })),
          catchError(err => of(AuthActions.loadProfileFailure({ error: err.message })))
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.auth.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
